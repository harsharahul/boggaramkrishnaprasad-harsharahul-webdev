/**
 * Created by harsharahul on 22/03/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller('FlickrImageSearchController',FlickrImageSearchController);


    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService)
    {

        var vm = this;

        vm.userId = $routeParams['uid'];
        vm.websiteId = $routeParams['wid'];
        vm.pageId = $routeParams['pid'];
        vm.widgetId = $routeParams['wgid'];
        vm.routeProfile = routeProfile;


        function init()
        {

            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function(result)
                {
                    vm.widget = result
                }, function (error)
                {
                    console.log(error);
                })

        }

        init();


        vm.searchPhotos = function (searchTerm) {
            FlickrService
                .searchPhotos(searchTerm)
                .then(function (response) {
                    console.log(response);
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                }, function (err) {
                    vm.error = err;
                });
        };

        vm.selectPhoto = function (photo) {

            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.widget.data.url = url;

            WidgetService
                .updateWidget(vm.widget.data,vm.widgetId )
                .then(function (response) {
                    console.log("widget Id is"+vm.widgetId);
                    console.log(vm.widget);
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/");
                }, function (err) {
                    vm.error = "Failed to update widget";
                });
        }

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };
    }
})();







