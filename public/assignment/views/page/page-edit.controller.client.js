/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.pageId = $routeParams.pid;
        vm.routePageList = routePageList;
        vm.routeEdit = routeEdit;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.routeProfile = routeProfile;
        vm.newPage=newPage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.websiteId);
            vm.pagess = PageService.findPageById(vm.pageId);
        }
        init();

        function deletePage(){
            var a = PageService.deletePage(vm.pageId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function updatePage (pages) {
            var a = PageService.updatePage(vm.pageId,vm.pagess);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");

        };

        function routeProfile()
        {
            $location.url("/profile/"+vm.userId);
        };

        function routePageList()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
        };

        function routeEdit(page)
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+page);
        };

        function newPage()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/new");
        };

    }
})();
