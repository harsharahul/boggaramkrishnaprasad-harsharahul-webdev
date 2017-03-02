/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams,$location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.routeProfile =routeProfile;
        vm.routeNewWebsite = routeNewWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    vm.websites = response.data;
                })

        }

        init();

        //Making this an init function
        //vm.websites = WebsiteService.findWebsitesByUser(vm.userId);


        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };

        function routeNewWebsite() {
            $location.url("/user/"+vm.userId+"/website/new");
        };

    }
})();
