
/* Session time out function
* This service will define the time that user will be auto re-direct to logout page
* Author : TruongND
*/
define(['angularAMD', 'jquery'], function (angularAMD, jquery) {

    'use strict';

    angularAMD.TimeOut = {};
    angularAMD.TimeOut.WarningTimer = {};
    angularAMD.TimeOut.IdleWarning = function () {
        console.log("warning");
    }


    // Set timeout variables.
    var timoutWarning = 10000; // Display warning in 14 Mins.
    var timoutNow = 6000; // Warning has been shown, give the user 1 minute to interact
    var logoutUrl = '/Account/Login'; // URL to logout page.

    var warningTimer;
    var timeoutTimer;

    // Start warning timer.
    angularAMD.TimeOut.StartWarningTimer = function () {
        angularAMD.TimeOut.WarningTimer = setTimeout(angularAMD.TimeOut.IdleWarning, timoutWarning);
    };

    // Reset timers.
    function ResetTimeOutTimer() {
        clearTimeout(timeoutTimer);
        StartWarningTimer();
        $("#timeout").dialog('close');
    }

    // Show idle timeout warning dialog.
    function IdleWarning() {
        clearTimeout(warningTimer);
        timeoutTimer = setTimeout("IdleTimeout()", timoutNow);
        $("#timeout").dialog({
            modal: true
        });
        // Add code in the #timeout element to call ResetTimeOutTimer() if
        // the "Stay Logged In" button is clicked
    };

    // Logout the user.
    function IdleTimeout() {
        alert('Nav now');
        window.location = logoutUrl;
    };

    // angularAMD.TimeOut.StartWarningTimer();

});
