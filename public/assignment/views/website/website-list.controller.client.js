/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
    }
})();
