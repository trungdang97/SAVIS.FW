 

/* 
* Main function Require
* By Savis Software Team
*/
//nguyenbv
require.config({
    baseUrl: "/app-data",
    urlArgs: "bust=" + "v26.06",
    packages: [{
        name: "codemirror",
        location: "../libs/codemirror",
        main: "lib/codemirror"
    }],
    paths: {
        'angular': '../libs/angular/angular',//updated
        'angular-cookies': '../libs/angular/angular-cookies.min',
        'angular-route': '../libs/angular/angular-route.min',
        'angular-sanitize': '../libs/angular/angular-sanitize.min',
        'angular-messages': '../libs/angular/angular-messages.min',
        'angularAMD': '../libs/angularAMD/angularAMD.min',

        
        'api-check': '../libs/api-check/dist/api-check.min',
        'angular-formly': '../libs/angular-formly/dist/formly.min',
        'angular-formly-templates-bootstrap': '../libs/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.min',
        

       


        'ngStorage': '../libs/ngstorage/ngStorage.min',
        'tmhDynamicLocale': '../libs/angular-translate-location/angular-dynamic-locale/tmhDynamicLocale.min',//https://github.com/lgalfaso/angular-dynamic-locale


        'angular-translate': '../libs/angular-translate-location/angular-translate/angular-translate',
        'angular-translate-loader-url': '../libs/angular-translate-location/angular-translate-loader-url/angular-translate-loader-url',
        'angular-translate-loader-static-files': '../libs/angular-translate-location/angular-translate-loader-static-files/angular-translate-loader-static-files',
        'angular-translate-loader-partial': '../libs/angular-translate-location/angular-translate-loader-partial/angular-translate-loader-partial',
        'angular-translate-handler-log': '../libs/angular-translate-location/angular-translate-handler-log/angular-translate-handler-log',



        'angular-translate-storage-cookie': '../libs/angular-translate-location/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
        'angular-translate-storage-local': '../libs/angular-translate-location/angular-translate-storage-local/angular-translate-storage-local.min',



        'angular-loading-bar': '../libs/loadingbar/loading-bar',

        'jquery': '../libs/jquery/jquery-1.11.1.min',

        'jquery-ui': '../libs/jquery-ui/js/jquery-ui-1.9.2.custom.min',

        'bootstrap': '../libs/bootstrap/js/bootstrap.min',

        'ui-bootstrap': '../libs/ui-bootstrap/ui-bootstrap-tpls.min',//updated

        'ui-select': '../libs/ui-select/select.min',//updated

        'angular-xeditable': '../libs/angular-xeditable/js/xeditable.min',

        'jwplayer': '../libs/jwplayer/jwplayer',

        "truncate": "../libs/truncate/truncate",
        "underscore": "../libs/underscore/underscore-min",//http://underscorejs.org/

        'lodash': '../libs/lodash.min',//https://toidicodedao.com/2015/04/16/tang-suc-manh-cho-javascript-voi-lodash/

        'toastr': '../libs/toastr/toastr.min',

        "ngfileupload": "../libs/ng-file-upload/ng-file-upload",

        "ngtaginput": "../libs/ngtaginput/ng-tags-input",

        "angular-filter": "../libs/angular-filter/dist/angular-filter.min",

        "slimscroll": "../libs/slimscroll/jquery.slimscroll",

        "mb-scrollbar": "../libs/mb-scrollbar/mb-scrollbar",

        
        'bootstrap-hover-dropdown': '../libs/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min',
        'Metronic.App': '../assets/global/scripts/app',
        'Metronic.Layout': '../assets/layouts/layout4/scripts/layout',
        'Metronic.QuickSidebar': '../assets/layouts/global/scripts/quick-sidebar',
        
         'wysiwyg': '../libs/ngWYSIWYG/wysiwyg',

        'ckeditor': '../libs/ckeditor/ckeditor',

        'ng-ckeditor': "../libs/ng-ckeditor/ng-ckeditor",

        "google-maps": "../libs/google-maps/angular-google-maps",
        "google-maps-search-box": "../libs/google-maps/search-box",
        "google-maps-search-box-autocomplete": "../libs/google-maps/search-box-autocomplete",
        "google-maps-search-box-ngmodel": "../libs/google-maps/search-box-ngmodel",
        "google-dev-deps": "../libs/google-maps/website_libs/dev_deps",

        "calendar": "../libs/calendar/fullcalendar.min",
        "moment": "../libs/calendar/lib/moment.min",

        "camanjs": "../libs/caman-js/caman.full.min",
        "ngimgcrop": "../libs/ng-img-crop/compile/minified/ng-img-crop",
        "colorthief": "../libs/color-thief-master/src/color-thief",

        "bootstrap-slider": "../libs/bootstrap-slider-master/dist/bootstrap-slider.min",

        "hotkeys": "../libs/angular-hotkeys-master/build/hotkeys.min",

        "rightclick": "../libs/angular-bootstrap-contextmenu/contextMenu",

        "colresizable": "../libs/colresizable/colResizable-1.6.min",

        /*-armchart region---------------------------------------------------------------------------------------------------*/
        "amcharts": "../libs/amcharts/amcharts/amcharts",
        "amcharts-serial": "../libs/amcharts/amcharts/serial",
        "amcharts-pie": "../libs/amcharts/amcharts/pie",
        "amcharts-plugin-export": "../libs/amcharts/amcharts/plugins/export/export.min",
        "amcharts-theme-chalk": "../libs/amcharts/amcharts/themes/chalk",
        "amcharts-theme-black": "../libs/amcharts/amcharts/themes/black",
        "amcharts-theme-dark": "../libs/amcharts/amcharts/themes/dark",
        "amcharts-theme-light": "../libs/amcharts/amcharts/themes/light",

        /*-----------------------------------------------------------------------------------------------------------------*/
    },
    shim: {

        "angular": {
            exports: "angular"
        },

        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'angular-cookies': ['angular'],
        'angular-sanitize': ['angular'],
        'angular-messages': ['angular'],
        'ngStorage': ['angular'],
        'tmhDynamicLocale': ['angular'],
        'angular-translate': ['angular'],

        'angular-translate-loader-url': [ 'angular-translate'],
        'angular-translate-loader-static-files': [ 'angular-translate'],
        'angular-translate-storage-local': [ 'angular-translate', 'angular-cookies'],
        'angular-translate-storage-cookie': [ 'angular-translate', 'angular-cookies'],
        'angular-translate-handler-log': ['angular-translate'],
        'angular-translate-loader-partial': ['angular-translate-loader-static-files'],


        "angular-formly": {
            exports: "formly",
            deps: ['api-check','angular']
        },
        "angular-formly-templates-bootstrap": {
            deps: ['angular-formly']
        },

        'angular-translate-loader-partial': ['angular-translate-loader-static-files'],


        'ui-bootstrap': ['angular'],
        'ui-select': ['angular'],
        'angular-xeditable': ['angular'],
        'angular-loading-bar': ['angular'],
        'hotkeys': ['angular'],
        'bootstrap-slider': ['angular'],
        'ngfileupload': ['angular'],
        'angular-filter': ['angular'],
        'mb-scrollbar': ['angular'],
        'ngtaginput': ['angular', 'jquery'],
        'slimscroll': ['angular', 'jquery'],
        "jquery": {
            exports: "$"
        },
        'camanjs': {
            exports: 'Caman'
        },
        'jwplayer': {
            exports: 'jwplayer'
        },
        'ngimgcrop': {
            deps: ['jquery', 'angular', 'colorthief']
        },
        'toastr': {
            deps: ['jquery']
        },
        'jquery-ui': {
            deps: ['jquery']
        },
        'colresizable': {
            deps: ['jquery']
        },
        "bootstrap": {
            "deps": ['jquery']
        },
        "wysiwyg": ['jquery', 'angular'],
        "bootstrap-hover-dropdown": ['jquery'],

        "Metronic.App": {
            "deps": ['angular','bootstrap-hover-dropdown','slimscroll']
        },
        "Metronic.Layout": {
            "deps": ['Metronic.App',]
        },
        "Metronic.QuickSidebar": {
            "deps": [ 'Metronic.App']
        },
        "calendar": {
            deps: ['jquery']
        },
        "underscore": {
            exports: "_"
        },
        //"lodash": {
        //exports: "_"
        //},
        'google-maps': ['angular'],
        'googlechart': ['angular'],
        'ng-ckeditor': {
            deps: ['jquery', 'angular', 'ckeditor']
        },
        'ckeditor': {
            'exports': 'CKEDITOR'
        },
        /*-armchart region-------------------------------------------------------------------------------------------------*/
        'amcharts-serial': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts-pie': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts-plugin-export': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts-theme-light': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts-theme-dark': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts-theme-black': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        'amcharts-theme-chalk': {
            deps: ['amcharts'],
            exports: 'AmCharts',
            init: function () {
                AmCharts.isReady = true;
            }
        },
        /*-------------------------------------------------------------------------------------------*/

    },
    deps: ['app']
});
