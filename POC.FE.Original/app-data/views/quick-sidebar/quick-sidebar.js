// 'use strict';
/* SAVIS Vietnam Corporation
 *
 * This module is to separate configuration of authentication to app.js
 * NguyenBv - Jan 2017
 */

define(['jquery', 'angularAMD'], function(jQuery, angularAMD) {
    'use strict';
    /* Init the auth config, interceptor, and runtime modules */
    var factory = {};


    factory.init = function(app) {
        app.controller('QuickSidebarCtrl', ['$scope','$timeout',
            function($scope,$timeout) {
                $timeout(function() {
                    QuickSidebar.init();
                }, 2000);
            }

        ]);
    };

return factory;
});