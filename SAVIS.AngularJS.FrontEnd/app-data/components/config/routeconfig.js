
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
                    controllerUrl: 'views/School/home/home'
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
                .when("/class-manager", angularAMD.route({
                    templateUrl: basedUrl + 'views/School/class/class.html',
                    controller: 'ClassCtrl',
                    controllerUrl: 'views/School/class/class'
                }))
                //.when("/formly", angularAMD.route({
                //    templateUrl: basedUrl + 'views/formly/formly.html',
                //    controller: 'FormlyCtrl',
                //    controllerUrl: 'views/formly/formly',
                //}))
                //.when("/field-manager", angularAMD.route({
                //    templateUrl: basedUrl + 'views/field/field.html',
                //    controller: 'FieldCtrl',
                //    controllerUrl: 'views/field/field',
                //}))
                //.when("/record-manager", angularAMD.route({
                //    templateUrl: basedUrl + 'views/record/record.html',
                //    controller: 'RecordCtrl',
                //    controllerUrl: 'views/record/record',
                //}))
                //.when("/document-manager", angularAMD.route({
                //    templateUrl: basedUrl + 'views/document/document.html',
                //    controller: 'DocumentCtrl',
                //    controllerUrl: 'views/document/document',
                //}))
                //.when("/archivetype-manager", angularAMD.route({
                //    templateUrl: basedUrl + 'views/archivetype/archivetype.html',
                //    controller: 'ArchiveTypeCtrl',
                //    controllerUrl: 'views/archivetype/archivetype',
                //}))
                .otherwise({
                    redirectTo: '/home'
                });
        }]);
    };

    return factory;
});
