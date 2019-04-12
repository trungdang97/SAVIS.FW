'use strict';
define(['app', 'components/factory/factory'], function (app) {
    app.service('SummaryApiService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        var service = {};
        var baseUrl = constantsFactory.ApiUrl;
        var prefixCoreApiUrl = "api/field";
        var prefixCoreApiUrl1 = "api/v1/summary/";

        service.TotalClassQuantity = function (model) {
            var stringFilter = angular.toJson(model);
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl1 + "class/quantity"
            });
            return promise;
        }

        //    service.GetFilter = function (model) {
        //        var stringFilter = angular.toJson(model);
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "?stringFilter=" + stringFilter
        //        });
        //        return promise;
        //    }

        //    service.GetById = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id
        //        });
        //        return promise;
        //    };

        //    service.Create = function (model) {
        //        var promise = $http({
        //            method: 'POST',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.Update = function (id, model) {
        //        var promise = $http({
        //            method: 'PUT',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //            data: model
        //        });
        //        return promise;

        //    }

        //    service.Delete = function (id) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id ,
        //        });
        //        return promise;
        //    }

        //    service.DeleteMany = function (model) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl ,
        //            data: model
        //        });
        //        return promise;
        //    }
        //    return service;

        //}]);

        //app.service('ArchiveTypeService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        //    var service = {};
        //    var baseUrl = constantsFactory.ApiUrl;
        //    var prefixCoreApiUrl = "api/archivetype";

        //    service.GetFilter = function (model) {
        //        var stringFilter = angular.toJson(model);
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "?stringFilter=" + stringFilter
        //        });
        //        return promise;
        //    }

        //    service.GetById = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id
        //        });
        //        return promise;
        //    };

        //    service.Create = function (model) {
        //        var promise = $http({
        //            method: 'POST',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.Update = function (id, model) {
        //        var promise = $http({
        //            method: 'PUT',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //            data: model
        //        });
        //        return promise;

        //    }

        //    service.Delete = function (id, isDeleteChild) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //        });
        //        return promise;
        //    }

        //    service.DeleteMany = function (model, isDeleteChild) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.GetFieldByArchiveTypeId = function (id, type) {
        //        if (id=="all") {
        //            id ="00000000-0000-0000-0000-000000000000";
        //        }
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id + "/field/" + type
        //        });
        //        return promise;
        //    }
        //    return service;

        //}]);
        //app.service('RecordService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        //    var service = {};
        //    var baseUrl = constantsFactory.ApiUrl;
        //    var prefixCoreApiUrl = "api/record";

        //    service.GetFilter = function (model) {
        //        var stringFilter = angular.toJson(model);
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "?stringFilter=" + stringFilter
        //        });
        //        return promise;
        //    }

        //    service.GetById = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id
        //        });
        //        return promise;
        //    };

        //    service.Create = function (model) {
        //        var promise = $http({
        //            method: 'POST',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.Update = function (id, model) {
        //        var promise = $http({
        //            method: 'PUT',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //            data: model
        //        });
        //        return promise;

        //    }

        //    service.Delete = function (id, isDeleteChild) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //        });
        //        return promise;
        //    }

        //    service.DeleteMany = function (model, isDeleteChild) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.GetFieldByRecordId = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id + "/field"
        //        });
        //        return promise;
        //    }

        //    service.GetAtributeById = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id + "/data/" 
        //        });
        //        return promise;
        //    }
        //    return service;

        //}]);
        //app.service('DocumentService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        //    var service = {};
        //    var baseUrl = constantsFactory.ApiUrl;
        //    var prefixCoreApiUrl = "api/document";

        //    service.GetFilter = function (model) {
        //        var stringFilter = angular.toJson(model);
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "?stringFilter=" + stringFilter
        //        });
        //        return promise;
        //    }

        //    service.GetById = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id
        //        });
        //        return promise;
        //    };

        //    service.Create = function (model) {
        //        var promise = $http({
        //            method: 'POST',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.Update = function (id, model) {
        //        var promise = $http({
        //            method: 'PUT',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //            data: model
        //        });
        //        return promise;

        //    }

        //    service.Delete = function (id, isDeleteChild) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id,
        //        });
        //        return promise;
        //    }

        //    service.DeleteMany = function (model, isDeleteChild) {
        //        var promise = $http({
        //            method: 'DELETE',
        //            url: baseUrl + prefixCoreApiUrl,
        //            data: model
        //        });
        //        return promise;
        //    }

        //    service.GetFieldByDocumentId = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id + "/field"
        //        });
        //        return promise;
        //    }

        //    service.GetAtributeById = function (id) {
        //        var promise = $http({
        //            method: 'GET',
        //            url: baseUrl + prefixCoreApiUrl + "/" + id + "/data/"
        //        });
        //        return promise;
        //    }
        //    return service;

    }]);
});

