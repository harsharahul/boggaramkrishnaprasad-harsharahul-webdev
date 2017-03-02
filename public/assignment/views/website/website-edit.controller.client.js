/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;
        vm.websiteNew = websiteNew;
        vm.routeWebsiteList = routeWebsiteList;
        vm.routeProfile = routeProfile;
        vm.routeEditWebsiteWithWebsiteId = routeEditWebsiteWithWebsiteId;

        function init() {
            // vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            // vm.website = WebsiteService.findWebsiteById(vm.websiteId);

            WebsiteService.findWebsitesByUser(vm.userId)
                .then(function (response) {
                    if(response.data){
                        vm.websites = response.data;
                    }
                })
            WebsiteService.findWebsiteById(vm.websiteId)
                .then(function (response) {
                    if(response.data){
                        vm.website = response.data;
                    }
                })
        }
        init();

        function deleteWebsite () {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/"+vm.userId+"/website");
        };

        function updateWebsite(updatedWebsite) {
            WebsiteService.updateWebsite(vm.websiteId,updatedWebsite);
            $location.url("/user/"+vm.userId+"/website/");
        };

        function websiteNew() {
            $location.url("/user/" + vm.userId + "/website/new/");
            //console.log("routing");
        };

        function routeWebsiteList() {
            $location.url("/user/" + vm.userId + "/website/");
        };

        function routeEditWebsiteWithWebsiteId(wid) {
            $location.url("/user/" + vm.userId + "/website/"+wid);
        }

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };
    }
})();
