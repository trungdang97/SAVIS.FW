   
define(['angularAMD', 'jquery',
    'components/config/routeconfig',
    "components/formly-template/formly-template",
    'views/sidebar/sidebar-controller', 
    'views/quick-sidebar/quick-sidebar', 
    "views/header/header", 
    "views/footer/footer",
    'lodash',
    'bootstrap',
    'jwplayer',
    'angular-route',
    'angular-cookies',
    'angular-loading-bar',
    'angular-sanitize',
    'angular-messages',
    'ng-ckeditor',
    'ngtaginput',
    'ui-bootstrap',
    'ui-select',
    'ngStorage',
    'tmhDynamicLocale',
    'angular-translate',
    'angular-translate-loader-url',
    'angular-translate-loader-partial',
    'angular-translate-loader-static-files',
    'angular-translate-storage-cookie',
    'angular-translate-storage-local',
    'angular-translate-handler-log',
    'components/service/amdservice',
    'components/directive/stop-propagation-directive',
    'components/service/timeoutservice',
    'ngfileupload',
    'angular-formly',
    'angular-formly-templates-bootstrap',
    'Metronic.App',
    'Metronic.Layout',
    'Metronic.QuickSidebar',

], function (angularAMD, jquery, routeConfig,formlyConfig, sidebarCtrl, quickSidebarCtrl, headerCtrl, footerCtrl) {
    'use strict';

    // Declare app level module which depends on views, and components
    var app = angular.module('myApp', [
        'ngRoute',
        'ngCookies',
        'angular-loading-bar',
        'ngSanitize',
        'ngMessages',
        'ngCkeditor',
        'ngTagsInput',
        'ui.bootstrap',
        'ui.select',
        'ngStorage',
        'ngFileUpload',
        'tmh.dynamicLocale',
        'pascalprecht.translate',
        'formly',
        'formlyBootstrap',
    ]);

    

    angularAMD.Version = "26.06";
    app.factory('settings', ['$rootScope', function ($rootScope) {
        var settings = {
            layout: {
                pageSidebarClosed: false, // sidebar menu state
                pageContentWhite: true, // set page content layout
                pageBodySolid: false, // solid body color state
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            assetsPath: '../assets',
            globalPath: '../assets/global',
            layoutPath: '../assets/layouts/layout4',
        };

        $rootScope.settings = settings;

        return settings;
    }]);

    /*Translate config*/

    app.config(['$translateProvider', '$translatePartialLoaderProvider', function ($translateProvider, $translatePartialLoaderProvider) {

        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: '../app-data/{part}/i18n/lang_{lang}.json'
        });
        $translatePartialLoaderProvider.addPart('views/header');
        $translatePartialLoaderProvider.addPart('views/sidebar');
        $translatePartialLoaderProvider.addPart('views/footer');


        $translateProvider.preferredLanguage('vi');
        $translateProvider.useLocalStorage();
        $translateProvider.useMissingTranslationHandlerLog();
    }]);

    app.config(['tmhDynamicLocaleProvider', function (tmhDynamicLocaleProvider) {
        tmhDynamicLocaleProvider.localeLocationPattern('../libs/angular/i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.defaultLocale('vi');
    }]);

    app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.latencyThreshold = 100;
    }]);

    /*End translate config*/

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" ng-model="ngModel" placeholder="Search">');
        $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
    }]);   

    App.initComponents();
    // Init header footer sidebar

    headerCtrl.init(app);
    sidebarCtrl.init(app);
    quickSidebarCtrl.init(app);
    footerCtrl.init(app);
    routeConfig.setupRouteConfig(app,angularAMD)
    // Init Formly
    formlyConfig.init(app);

    // Hide loading
    jquery("#loadingDiv").css('display', 'none');

   return angularAMD.bootstrap(app);
});
