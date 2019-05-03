'use strict';
define(['app', 'components/factory/factory'], function (app) {
    app.service('HomeService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        var service = {};
        var baseUrl = constantsFactory.ApiUrl;
        var prefixCoreApiUrl = "api/v1/summary";

        service.GetFilter = function (model) {
            var stringFilter = angular.toJson(model);
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "?filter=" + stringFilter
            });
            return promise;
        }
    }]);
    app.service('StudentService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        var service = {};
        var baseUrl = constantsFactory.ApiUrl;
        var prefixCoreApiUrl = "api/v1/students";

        service.GetFilter = function (model) {
            var stringFilter = angular.toJson(model);
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "?filter=" + stringFilter
            });
            return promise;
        }

        service.GetById = function (id) {
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "/" + id
            });
            return promise;
        };

        service.Create = function (model) {
            var promise = $http({
                method: 'POST',
                url: baseUrl + prefixCoreApiUrl,
                data: model
            });
            return promise;
        }

        service.Update = function (model) {
            var promise = $http({
                method: 'PUT',
                url: baseUrl + prefixCoreApiUrl,
                data: model
            });
            return promise;

        }

        service.Delete = function (id) {
            var promise = $http({
                method: 'DELETE',
                url: baseUrl + prefixCoreApiUrl + "/" + id,
            });
            return promise;
        }

        service.DeleteMany = function (model) {
            var promise = $http({
                headers: {
                    'Accept': 'application/vnd.hal+json',
                    'Content-Type': 'application/json'
                }, // <--- content type
                contentType: "application/json; charset=utf-8",
                method: 'DELETE',
                url: baseUrl + prefixCoreApiUrl + "/deletemany",
                data: model
            });
            return promise;
        }
        return service;

    }]);
    app.service('TeacherService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        var service = {};
        var baseUrl = constantsFactory.ApiUrl;
        var prefixCoreApiUrl = "api/v1/teachers";

        service.GetFilter = function (model) {
            var stringFilter = angular.toJson(model);
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "?filter=" + stringFilter
            });
            return promise;
        }

        service.GetById = function (id) {
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "/" + id
            });
            return promise;
        };

        service.Create = function (model) {
            var promise = $http({
                method: 'POST',
                url: baseUrl + prefixCoreApiUrl,
                data: model
            });
            return promise;
        }

        service.Update = function (id, model) {
            var promise = $http({
                method: 'PUT',
                url: baseUrl + prefixCoreApiUrl + "/" + id,
                data: model
            });
            return promise;

        }

        service.Delete = function (id) {
            var promise = $http({
                method: 'DELETE',
                url: baseUrl + prefixCoreApiUrl + "/" + id,
            });
            return promise;
        }

        service.DeleteMany = function (model) {
            var promise = $http({
                headers: {
                    'Accept': 'application/vnd.hal+json',
                    'Content-Type': 'application/json'
                }, // <--- content type
                contentType: "application/json; charset=utf-8",
                method: 'DELETE',
                url: baseUrl + prefixCoreApiUrl,
                data: model
            });
            return promise;
        }
        return service;

    }]);
    app.service('ClassService', ['$http', 'constantsFactory', function ($http, constantsFactory) {

        var service = {};
        var baseUrl = constantsFactory.ApiUrl;
        var prefixCoreApiUrl = "api/v1/classes";

        service.GetAll = function () {
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "/all"
            });
            return promise;
        }

        service.GetFilter = function (model) {
            var stringFilter = angular.toJson(model);
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "?filter=" + stringFilter
            });
            return promise;
        }

        service.GetById = function (id) {
            var promise = $http({
                method: 'GET',
                url: baseUrl + prefixCoreApiUrl + "/" + id
            });
            return promise;
        }

        service.Create = function (model) {
            var promise = $http({
                method: 'POST',
                url: baseUrl + prefixCoreApiUrl,
                data: model
            });
            return promise;
        }

        service.Update = function (id, model) {
            var promise = $http({
                method: 'PUT',
                url: baseUrl + prefixCoreApiUrl + "/" + id,
                data: model
            });
            return promise;

        }

        service.Delete = function (id) {
            var promise = $http({
                method: 'DELETE',
                url: baseUrl + prefixCoreApiUrl + "/" + id,
            });
            return promise;
        }

        service.DeleteMany = function (model) {
            var promise = $http({
                headers: {
                    'Accept': 'application/vnd.hal+json',
                    'Content-Type': 'application/json'
                }, // <--- content type
                contentType: "application/json; charset=utf-8",
                method: 'DELETE',
                url: baseUrl + prefixCoreApiUrl + "/deletemany",
                data: model
            });
            return promise;
        }
        return service;

    }]);

});

