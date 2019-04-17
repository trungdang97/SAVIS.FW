define(['jquery', 'app',
    'jquery-ui',
    'slimscroll',
    'components/factory/factory',

    'components/formly-template/formly-factory',

    'angular-sanitize',
    'views/formly/formly-edit-label',
    'views/formly/formly-edit-control',
    'views/formly/formly-edit-row',
], function(jQuery, app) {
    app.controller('HomeCtrl', ['$scope', '$sce', '$timeout', '$log', '$http', '$uibModal', 'constantsFactory', 'constantsAMD', '$routeParams', 'HomeService',
    function ($scope, $sce, $timeout, $log, $http, $uibModal, constantsFactory, constantsAMD, $routeParams, HomeService) {
        /* START Declare variable and constant */

        //declare variable for API
        var api = {
            GetStudentQuantity: constantsFactory.ApiUrl + 'api/v1/summary/studen/quantity'
            //GetListData: constantsFactory.ApiUrl + 'api/formlymaster/getlist',
            //CheckFormCode: constantsFactory.ApiUrl + 'api/formlymaster/checkFormCode',
            //UpdateForm: constantsFactory.ApiUrl + 'api/formlymaster/update',
            //CreateForm: constantsFactory.ApiUrl + 'api/formlymaster/add',
            //DeleteForm : constantsFactory.ApiUrl + "api/formlymaster/delete/"
        };

        //khai báo các template
        var template = {
            editLabelUrl: '/app-data/views/formly/formly-edit-label.html',
            editControlUrl: '/app-data/views/formly/formly-edit-control.html',
            editRowUrl: '/app-data/views/formly/formly-edit-row.html'
        };

        //khai báo các controller
        var controller = {
            editLabelCtr : 'FormlyEditLabel',
            editControlCtr: 'FormlyEditControl',
            editRowCtr:'FormlyEditRow'
        };
        //declare variable for Create Form or Update Form
        $scope.action = {
            add: 'Add', // create form
            edit: 'Edit' // update form
        }
        //variable for form valid
        $scope.FormValid = {
            FormName: true,
            FormCode: true,
            StartDate: true,
            EndDate: true
        };

        //variable check formcode Exist
        $scope.FormExist = {
            FormCode: true,
        };
          
        //init default Action is Create Form
        $scope.ActionName = $scope.action.add;
        $scope.activeClass = '';

        /* END Declare variable and constant */


        /*START common function-----------------------------------------------------------*/ 
        $scope.deliberatelyTrustDangerousSnippet = function(html) {
            return $sce.trustAsHtml(html);
        };
        /*END common function-----------------------------------------------------------*/
        /*START declare variable..........................................................*/
        $scope.IsShowInfo = false;
        var selectingItem = {
            data: {}
        };
        $scope.FormMode = 'config';
        $scope.vm = {};
        $scope.vm.Data = {};
        $scope.vm.Model = [];
        $scope.vm.Scheme = [];
        $scope.component = [];

        /*END declare variable..........................................................*/

        /*START do animation..........................................................*/

        // request to api Create Form and dynamic table
        var CreateForm = function () {
            $http({method: 'POST',url: api.CreateForm + '?TTHCGiayToId=' + $routeParams.Id,headers: {'Content-type': ' application/json'},data: postData}).success(CreateFormSuccess).error(CreateFormError)
        }
    ]);
});
