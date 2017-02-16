/**
 * Created by harsharahul on 15/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
        vm.newPage = newPage;
        vm.backToWebsiteList = backToWebsiteList;
        vm.routeProfile = routeProfile;
        vm.routeEdit = routeEdit;
        vm.routeWidget= routeWidget;



        function newPage()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/new");
        }
        function routeEdit(id)
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+id);
        }
        function routeWidget(page)
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+page._id+"/widget");
        }
        function backToWebsiteList()
        {
            $location.url("/user/"+vm.userId+"/website/");
        }
        function routeProfile()
        {
            $location.url("/profile/"+vm.userId);
        }
    }
})();
