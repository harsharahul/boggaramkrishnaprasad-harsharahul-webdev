/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;
        vm.routeEditWebsite = routeEditWebsite;
        vm.routeListWebsite = routeListWebsite;
        vm.routeProfile = routeProfile;
        vm.routeWebsiteNew = routeWebsiteNew;

        function init() {
            //vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    if(response.data){
                        vm.websites = response.data;
                    }
                })
        }
        init();

        function createWebsite (website) {
            // WebsiteService.createWebsite(vm.userId, website);
            // //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            // $location.url("/user/"+vm.userId+"/website");
            WebsiteService
                .createWebsite(vm.userId, website)
                .findWebsitesByUser(vm.userId)
                .then(function (response) {
                    $location.url("/user/"+vm.userId+"/website");
                })

        };

        function routeEditWebsite(websiteID){
            $location.url("/user/"+vm.userId+"/website/"+websiteID);
            //console.log(websiteID);
        };

        function routeListWebsite() {
            $location.url("/user/"+vm.userId+"/website/");
        };

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };

        function routeWebsiteNew(){
            $location.url("/user/"+vm.userId+"/website/new");
        }
    }
})();
