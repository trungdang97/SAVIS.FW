define(['app'], function (app) {
    app.directive('chosen', function () {
        var linker = function (scope, element, attr) {
            // update the select when data is loaded
            scope.$watch(attr.chosen, function (oldVal, newVal) {
                element.trigger('chosen:updated');
            });

            // update the select when the model changes
            scope.$watch(attr.ngModel, function () {
                element.trigger('chosen:updated');
            });

            element.chosen();
        };

        return {
            restrict: 'A',
            link: linker
        };
    });
});