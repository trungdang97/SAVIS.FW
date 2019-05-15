
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
        app.config(['$routeProvider',  function ($routeProvider) {

            // User profile
            $routeProvider
                .when("/home", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/home/home.html',
                    controller: 'HomeCtrl',
                    controllerUrl: 'views/School/home/home',
                }))
                .when("/student-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/student/student.html',
                    controller: 'StudentCtrl',
                    controllerUrl: 'views/School/student/student'
                }))
                .when("/teacher-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/teacher/teacher.html',
                    controller: 'TeacherCtrl',
                    controllerUrl: 'views/School/teacher/teacher'
                }))
                .when("/teacher-manager/detail/:code", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/teacher/teacher-detail.html',
                    controller: 'TeacherDetailCtrl',
                    controllerUrl: 'views/School/teacher/teacher-detail'
                }))
                .when("/class-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/class/class.html',
                    controller: 'ClassCtrl',
                    controllerUrl: 'views/School/class/class'
                }))
                .when("/class-detail/:ClassCode", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/class/class-detail.html',
                    controller: 'ClassDetailCtrl',
                    controllerUrl: 'views/School/class/class-detail'
                }))
                .otherwise({
                    redirectTo: '/home'
                });
        }]);
    };

    return factory;
});
