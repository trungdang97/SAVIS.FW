
/* SAVIS Vietnam Corporation
*
* This module is to separate configuration of routing to app.js
* TruongND - May 2015
*/

define(function () {

    'use strict';
    var basedUrl = "/app-data/";

    var factory = {};

    

    /* Setup all routings */
    factory.setupRouteConfig = function (app, angularAMD) {
        // Route config
        app.config(['$routeProvider', 'Auth', function ($routeProvider, Auth) {

            var onlyLoggedIn = function ($location, $q) {
                var deferred = $q.defer();
                if (Auth()) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
                return deferred.promise;
            };

            // User profile
            $routeProvider
                .when("/home", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/home/home.html',
                    controller: 'HomeCtrl',
                    controllerUrl: 'views/School/home/home',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                }))
                .when("/student-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/student/student.html',
                    controller: 'StudentCtrl',
                    controllerUrl: 'views/School/student/student',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                }))
                .when("/teacher-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/teacher/teacher.html',
                    controller: 'TeacherCtrl',
                    controllerUrl: 'views/School/teacher/teacher',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                    
                }))
                .when("/teacher-manager/detail/:code", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/teacher/teacher-detail.html',
                    controller: 'TeacherDetailCtrl',
                    controllerUrl: 'views/School/teacher/teacher-detail',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                }))
                .when("/class-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/class/class.html',
                    controller: 'ClassCtrl',
                    controllerUrl: 'views/School/class/class',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                }))
                .when("/class-detail/:ClassCode", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/class/class-detail.html',
                    controller: 'ClassDetailCtrl',
                    controllerUrl: 'views/School/class/class-detail',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                }))
                .otherwise({
                    redirectTo: '/home',
                    resolve: {
                        loggedIn: onlyLoggedIn
                    }
                });
        }]);
    };

    return factory;
});
