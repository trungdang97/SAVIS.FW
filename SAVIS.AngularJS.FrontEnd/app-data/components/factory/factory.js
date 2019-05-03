'use strict';
define(['app'], function (app) {
    app.service('constantsFactory', function () {
         var factory = {};
        // Return factory
        factory.ApiUrl = "http://localhost:9000/";

        factory.Formatter = {};

        factory.Teacher = {};
        factory.Class = {};
        factory.Student = {};
        factory.ClassDetailId = null;

		return factory;

    });

    

    app.factory('beforeUnload', function ($rootScope, $window) {
        // Events are broadcast outside the Scope Lifecycle
    
        $window.onbeforeunload = function (e) {
            var confirmation = {};
            var event = $rootScope.$broadcast('onBeforeUnload', confirmation);
            if (event.defaultPrevented) {
                return confirmation.message;
            }
        };
    
        $window.onunload = function () {
            $rootScope.$broadcast('onUnload');
        };
        return {};
    })
    .run(function (beforeUnload) {
        // Must invoke the service at least once
    });


});


