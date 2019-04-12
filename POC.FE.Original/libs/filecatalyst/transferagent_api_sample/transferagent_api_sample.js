// make a namespace for the TransferAgent using the Object Literal pattern of namespacing
var ta = ta || {};

// general logging mechanism. Can be replaced with console.log(), alert(), or any other
// custom logging function
ta.log = function(message) {
  var $logArea = $('#outputLog');
  $logArea.val($logArea.val() + message + '\r\n');
};

// configurable parameters. If these are collected elsewhere in your application, use
// the following as pointers

ta.config = {
  fcserver: {
    remoteServer: "192.168.1.139",
    remotePort: 21,
    username: "user",
    password: "user",
    usesSSL: false,
    remoteDirectory: "",
    lockInitialDirectory: true,
    pgpMessage: []
  },
  transferAgentURL: "https://localhost",
  transferAgentPort: 12680,
  transferAgentVersion: 'TransferAgent Deployment 3.5 ALPHA 1',
  transferDefaults: {
    SendEmailNotification: false,
    EmailAddress: "",
    EmailBody: "",
    SentFilelistInEmail: false,
    SourceConnectionKey: "local",
    DestinationConnectionKey: "",
    fileList: []
  },
  filelistDefaults: {
    sortby: "name",
    invert: false,
    connectionKey: "local",
    isInitial: false
  }
};

// Some defaults that all Ajax calls will make. beforeSend and complete turn a spinner
// on and off, but other pre- and post- housekeeping can be done. The statusCodes are
// codes that may be expected from incomplete or error states.
$.ajaxSetup({
  cache: false,
  dataType: 'json',
  type: 'GET',
  beforeSend: function() {
    // Code to execute before each Ajax call
  },
  complete: function() {
    // Code to execute after completion (successful or otherwise) of each Ajax call
  },
  statusCode: {
    0: function() {
      // handler for if request never returns or host is unreachable
    },
    500: function(xhr) {
      ta.log(xhr.responseText);
    }
  }
});

/**
 * ta.url is a simple concatenation utility, putting together hostname, port, and the supplied path in order to make REST calls to the TransferAgent
 * 
 * @param {String} path a string representing the relative REST path
 * @returns {String}
 */
ta.url = function(path) {
  // just a handy utility to shorten concatenation time
  var fullPath = ta.config.transferAgentURL + ":" + ta.config.transferAgentPort + "/rs" + path;
  return fullPath;
}

/**
 * ta.launch will first attempt to detect heartbeat. If one is there, the success handler takes over.
 * If there is no heartbeat, protocol handler is called using an injected iframe.
 * 
 * @returns {undefined}
 */
ta.launch = function() {
  function doLaunch() {
    try {
      var iFrame = $('#hiddenIframe');
      if (iFrame.length <= 0) {
        iFrame = $('<iframe id="hiddenIframe" src="about:blank" style="display:none"></iframe>').appendTo('body');
      }
      iFrame[0].contentWindow.location.href = "filecatalyst://localhost";
    } catch (e) {
      console.log(e);
    }
  }

  ta.heartbeat(ta.callbacks.launchedAlready, doLaunch);
};

/**
 * ta.connect establishes a connection to a remote FC Server
 * 
 * @param {Object} params object must mirror ta.config.fcserver and in fact that object may be passed in directly
 * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is always an object containing a connectionKey.
 * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
 * @returns {undefined}
 */
ta.connect = function(params, successCallback, errorCallback) {
  var url = ta.url('/agent/connect');

  // if no custom params are passed, try using ta.config.fcserver
  if (typeof(params) === "undefined" || params === null) {
    params = ta.config.fcserver;
  }

  // if no custom handlers are provided, wire up the default callbacks
  if (typeof(successCallback) === "undefined" || successCallback === null) {
    successCallback = ta.callbacks.connectSuccess;
  }
  if (typeof(errorCallback) === "undefined" || errorCallback === null) {
    errorCallback = ta.callbacks.connectError;
  }

  // this object is conditionally modified before being passed into the Ajax
  // method
  var ajaxOpts = ({
    url: url,
    type: 'GET',
    data: params,
    success: function(returnedData) {
      successCallback(returnedData);
    },
    error: function(xhr, opts, error) {
      errorCallback(xhr);
    },
    statusCode: {
      500: function() {
        // override default by doing nothing
      }
    }
  });

  // if there is a pgpMessage present, switch type to POST, which the TransferAgent
  // will recognize as being the REST call for use with pgpMessage
  if (typeof(params.pgpMessage) !== "undefined") {
    if (params.pgpMessage.length > 0) {
      params.pgpMessage = params.pgpMessage.join('\n');
      params.MungedConnectionRequest = params.pgpMessage;
      params = JSON.stringify(params);
      ajaxOpts.type = 'POST';
      ajaxOpts.contentType = 'application/json';
      ajaxOpts.data = params;
    }
  }

  // make the actual REST request and pass results to relevant handlers
  $.ajax(ajaxOpts);
};

/* ta.files is a container object with methods for retrieving file listings */
ta.files = {
  /**
   * ta.files.local will retrieve a local listing based on the path (to a permitted local directory) provided
   * 
   * @param {Object} params Request parameter object, containing sortby, invert, connectionKey, and isInitial
   * @param {String} path A string representing a local path. For a successful call, TA must have permission to read the path provided
   * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is an object containing file listings.
   * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
   * @returns {undefined}
   */
  local: function(params, path, successCallback, errorCallback) {
    if (typeof(path) === "undefined" || path === null) {
      path = "";
    }
    var url = ta.url('/files/local/' + path);

    // if no custom handlers are provided, wire up the default callbacks
    if (typeof(successCallback) === "undefined" || successCallback === null) {
      successCallback = ta.callbacks.localFilesSuccess;
    }
    if (typeof(errorCallback) === "undefined" || errorCallback === null) {
      errorCallback = ta.callbacks.localFilesError;
    }

    // the default request parameters
    var requestParams = ta.config.filelistDefaults;

    // extend default request parameters with custom/override parameters
    // on first request, "isInitial" should be true
    if (typeof(params) === "object") {
      $.extend(requestParams, params);
    }
    $.ajax({
      url: url,
      data: requestParams,
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        errorCallback(xhr);
      }
    });
  },
  /**
   * ta.files.remote will retrieve a remote listing based on the path (to a permitted directory) provided
   * 
   * @param {Object} params Request parameter object, containing sortby, invert, connectionKey, and isInitial
   * @param {String} path A string representing a local path. For a successful call, TA must have permission to read the path provided
   * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is an object containing file listings.
   * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
   * @returns {undefined}
   */
  remote: function(params, path, successCallback, errorCallback) {
    if (typeof(path) === "undefined" || path === null) {
      path = "";
    }
    var url = ta.url('/files/remote/' + path);

    // if no custom handlers are provided, wire up the default callbacks
    if (typeof(successCallback) === "undefined" || successCallback === null) {
      successCallback = ta.callbacks.remoteFilesSuccess;
    }
    if (typeof(errorCallback) === "undefined" || errorCallback === null) {
      errorCallback = ta.callbacks.remoteFilesError;
    }

    // the default request parameters
    var requestParams = ta.config.filelistDefaults;

    // extend default request parameters with custom/override parameters
    // on first request, "isInitial" should be true
    if (typeof(params) === "object") {
      $.extend(requestParams, params);
    }
    
    if(requestParams.connectionKey === "local") {
      var message = 'A remote connection key has not been supplied.'
      ta.log(message);
      return message;
    }

    $.ajax({
      url: url,
      data: requestParams,
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        errorCallback(xhr);
      }
    });
  }
};

/**
 * ta.heartbeat pings the configured TA to see if it is present and "listening"
 * 
 * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is an object containing the TA's status (usually "OK").
 * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
 * @returns {undefined}
 */
ta.heartbeat = function(successCallback, errorCallback) {
  // if no custom handlers are provided, wire up the default callbacks
  if (typeof(successCallback) === "undefined" || successCallback === null) {
    successCallback = ta.callbacks.heartbeatSuccess;
  }
  if (typeof(errorCallback) === "undefined" || errorCallback === null) {
    errorCallback = ta.callbacks.heartbeatError;
  }


  $.ajax({
    url: ta.url('/agent/heartbeat/'),
    success: function(data) {
      successCallback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      errorCallback(xhr);
    }
  });
};

/**
 * ta.transfer is used for both uploads and downloads, depending on the connection keys.
 * By default it is an upload, therefore ta.upload is an alias for this method and receives the same parameters
 * 
 * @param {Object} params Transfer parameters containing string DestinationConnectionKey, SourceConnectionKey, array fileList, and optional string EmailAddress, string EmailBody, boolean SendEmailNotification, and boolean SentFilelistInEmail
 * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is an object containing echoed parameters but also the jobId.
 * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
 * @returns {undefined}
 */
ta.transfer = function(params, successCallback, errorCallback) {
  if (typeof(params) === "undefined" || params === null) {
    var message = 'Cannot initiate a transfer without any parameters supplied';
    ta.log(message);
    return message;
  } else {
    // if no custom handlers are provided, wire up the default callbacks
    if (typeof(successCallback) === "undefined" || successCallback === null) {
      successCallback = ta.callbacks.uploadRequestSuccess;
      errorCallback = ta.callbacks.uploadRequestError;
    }
    if (typeof(errorCallback) === "undefined" || errorCallback === null) {
      errorCallback = ta.callbacks.uploadRequestError;
    }

    // the default request parameters
    var requestParams = $.extend(true, {}, ta.config.transferDefaults);

    // extend default request parameters with custom/override parameters
    // on first request, "isInitial" should be true
    if (typeof(params) === "object") {
      $.extend(requestParams, params);
    }

    var url = ta.url("/files/transfer/");

    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(requestParams),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        errorCallback(xhr);
      }
    });
  }
};

/* an alias for ta.transfer, accepting the same parameters */
ta.upload = ta.transfer;

/**
 * ta.download is a functional alias for ta.transfer, performing some logic to pass appropriate callbacks and ensure DestinationConnectionKey is "local"
 * 
 * @param {Object} params Transfer parameters containing string DestinationConnectionKey, SourceConnectionKey, array fileList, and optional string EmailAddress, string EmailBody, boolean SendEmailNotification, and boolean SentFilelistInEmail
 * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is an object containing echoed parameters but also the jobId.
 * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
 * @returns {undefined}
 */
ta.download = function(params, successCallback, errorCallback) {
  if (typeof(params) === "undefined" || params === null) {
    var message = 'Cannot attempt to download without a request parameters object'
    ta.log(message);
    return message;
  } else {
    // if no custom handlers are provided, wire up the default callbacks
    if (typeof(successCallback) === "undefined" || successCallback === null) {
      successCallback = ta.callbacks.downloadRequestSuccess;
    }
    if (typeof(errorCallback) === "undefined" || errorCallback === null) {
      errorCallback = ta.callbacks.downloadRequestError;
    }

    // the default request parameters
    var requestParams = $.extend(true, {}, ta.config.transferDefaults);

    // extend default request parameters with custom/override parameters
    // on first request, "isInitial" should be true
    if (typeof(params) === "object") {
      $.extend(requestParams, params);
    }

    requestParams.DestinationConnectionKey = "local";

    if (requestParams.SourceConnectionKey === "" || requestParams.SourceConnectionKey === "local") {
      requestParams.SourceConnectionKey = ta.config.remoteKey;
    }

    ta.transfer(requestParams, successCallback, errorCallback);
  }
};

ta.status = function(transferID, successCallback, errorCallback) {
  if (typeof(transferID) === "undefined" || transferID === null) {
    var message = 'Cannot request status without supplying a transferID'
    ta.log(message);
    return message;
  } else {
    // if no custom handlers are provided, wire up the default callbacks
    if (typeof(successCallback) === "undefined" || successCallback === null) {
      successCallback = ta.callbacks.statusSuccess;
    }
    if (typeof(errorCallback) === "undefined" || errorCallback === null) {
      errorCallback = ta.callbacks.statusError;
    }

    var url = ta.url('/agent/status/');
    $.ajax({
      url: url,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({transferID: transferID}),
      success: function(data) {
        successCallback(data);
      },
      error: function(xhr, ajaxOptions, thrownError) {
        errorCallback(xhr);
      }
    });
  }
};

/**
 * ta.version sends the JavaScript's registered version (the system administrator sets this to the version they have on their website) and the TA responds with its current version.
 * 
 * @param {Function} successCallback is a function that accepts and handle the data returned by the request. For this method, the data is an object containing version information.
 * @param {Function} errorCallback is a function that accepts and handles the xhr object from an error state request
 * @returns {undefined}
 */
ta.version = function(successCallback, errorCallback) {
  // if no custom handlers are provided, wire up the default callbacks
  if (typeof(successCallback) === "undefined" || successCallback === null) {
    successCallback = ta.callbacks.versionSuccess;
  }
  if (typeof(errorCallback) === "undefined" || errorCallback === null) {
    errorCallback = ta.callbacks.versionError;
  }

  $.ajax({
    url: ta.url('/agent/version/'),
    data: {requester: ta.config.transferAgentVersion},
    success: function(data) {
      successCallback(data);
    },
    error: function(xhr, ajaxOptions, thrownError) {
      errorCallback(xhr);
    }
  });
};

ta.callbacks = {
  connectSuccess: function(data) {
    ta.config.remoteKey = data.connectionKey;
    ta.log(ta.config.remoteKey);
  },
  connectError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  localFilesSuccess: function(data) {
    data = JSON.stringify(data);
    ta.log(data);
  },
  localFilesError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  remoteFilesSuccess: function(data) {
    data = JSON.stringify(data);
    ta.log(data);
  },
  remoteFilesError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  heartbeatSuccess: function(data) {
    data = JSON.stringify(data);
    ta.log(data);
  },
  heartbeatError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  versionSuccess: function(data) {
    data = JSON.stringify(data);
    ta.log(data);
  },
  versionError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  uploadRequestSuccess: function(data) {
    dataText = JSON.stringify(data);
    ta.config.currentJobId = data.jobId;
    ta.status(ta.config.currentJobId);
  },
  uploadRequestError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  downloadRequestSuccess: function(data) {
    data = JSON.stringify(data);
    ta.config.currentJobId = data.jobId;
    ta.log(data);
  },
  downloadRequestError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  statusSuccess: function(data) {
    var progress = data.percent;
    var dataText = JSON.stringify(data);
    ta.log(dataText);
    var $progressDiv = $('#latestProgress')
    if(!data.transferComplete) {
      $progressDiv.attr('value',progress);
      // get another status
      setTimeout(function(){ta.status(ta.config.currentJobId)}, 1000);
    } else {
      // in case percent is reported as 99 even with complete transfer, render as 100
      $progressDiv.attr('value',100);
      $progressDiv.after('<p>Transfer Complete</p>')      
    }
  },
  statusError: function(xhr) {
    var errorObj = $.parseJSON(xhr.responseText);
    ta.log(errorObj.reason.text);
  },
  launchedAlready: function(data) {
    ta.log('TransferAgent is already running');
  }
};