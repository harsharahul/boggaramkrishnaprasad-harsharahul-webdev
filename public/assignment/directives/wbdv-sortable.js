// /**
//  * Created by harsharahul on 01/03/17.
//  */
// (function () {
//     angular
//         .module('WebAppMaker')
//         .directive('wbdvSortable', wbdvSortable);
//
//     function wbdvSortable() {
//         function linkFunc(scope, element, attributes) {
//             element.sortable({axis: 'y'});
//         }
//         return {
//             link: linkFunc
//         };
//     }
// })();

(function () {
    angular
        .module('WebAppMaker')
        .directive('wbdvSortable', wbdvSortable);

    function wbdvSortable() {
        function linkfunc(scope, element, attributes, sortingController) {
            element.sortable({
                start: function (event, ui) {
                    ui.item.startPos = ui.item.index();
                },
                update: function (event, ui) {
                    var endingIndex = ui.item.index();
                    var startingIndex = ui.item.startPos;
                    sortingController.sortTheWidget(startingIndex, endingIndex);
                },
                axis: 'y',
                cursor: "move"

            });
        }

        return {
            link: linkfunc,
            controller: sortableController
        }

    }

    function sortableController(WidgetService, $routeParams) {
        var vm = this;
        vm.sortTheWidget = sortTheWidget;

        function sortTheWidget(start, end) {
            var pageId = $routeParams.pid;

            WidgetService
                .WidgetsOrderUpdate(pageId, start, end)
                .then(function (response) {
                    console.log("in the order update function")
                })

        }
    }

})();
