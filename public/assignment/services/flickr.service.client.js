/**
 * Created by harsharahul on 22/03/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    function FlickrService($http) {
        var key = "0d7ef606619c223af5a4fc03ce4feb84";
        var secret = "2eed5e6405478860";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            "searchPhotos":searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
