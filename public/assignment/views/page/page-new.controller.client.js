/**
 * Created by harsharahul on 15/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        console.log(vm.userId);
        vm.userId = $routeParams.uid;

        vm.createPage = createPage;
        vm.routeProfile = routeProfile;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        }
        init();

        function createPage (page) {

            PageService.createPage(vm.websiteId, page);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
            // $route.reload();
            console.log(page);
            //init();
        };
        function routeProfile()
        {
            $location.url("/profile/"+vm.userId);
        };

    }
})();
