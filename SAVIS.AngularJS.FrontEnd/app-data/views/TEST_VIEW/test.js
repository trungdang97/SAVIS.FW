define(['jquery', 'app',
    'jquery-ui',
    'slimscroll',
    'components/factory/factory',

    'components/formly-template/formly-factory',

    'angular-sanitize'
], function (jQuery, app) {
    app.controller('TestCtrl', ['$scope', '$sce', '$timeout', '$log', '$http', '$uibModal', 'constantsFactory', 'constantsAMD', '$routeParams', 'FormlyFactory', 'SummaryApiService',
        function ($scope, $sce, $timeout, $log, $http, $uibModal, constantsFactory, constantsAMD, $routeParams, FormlyFactory, SummaryApiService) {
            /* START Declare variable and constant */

            //declare variable for API
            var api = {
                TotalClassQuantity: constantsFactory.ApiUrl + ''
                //GetData: constantsFactory.ApiUrl + 'api/formlymaster',
                //GetListData: constantsFactory.ApiUrl + 'api/formlymaster/getlist',
                //CheckFormCode: constantsFactory.ApiUrl + 'api/formlymaster/checkFormCode',
                //UpdateForm: constantsFactory.ApiUrl + 'api/formlymaster/update',
                //CreateForm: constantsFactory.ApiUrl + 'api/formlymaster/add',
                //DeleteForm: constantsFactory.ApiUrl + "api/formlymaster/delete/"
            };

            //khai báo các template
            //var template = {
            //    editLabelUrl: '/app-data/views/formly/formly-edit-label.html',
            //    editControlUrl: '/app-data/views/formly/formly-edit-control.html',
            //    editRowUrl: '/app-data/views/formly/formly-edit-row.html'
            //};

            //khai báo các controller
            //var controller = {
            //    editLabelCtr: 'FormlyEditLabel',
            //    editControlCtr: 'FormlyEditControl',
            //    editRowCtr: 'FormlyEditRow'
            //};
    ]);
});
