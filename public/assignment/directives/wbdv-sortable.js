/**
 * Created by harsharahul on 01/03/17.
 */
(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {
        function linkFunc(scope, element, attributes) {
            element.sortable({axis: 'y'});
        }
        return {
            link: linkFunc
        };
    }
})();
