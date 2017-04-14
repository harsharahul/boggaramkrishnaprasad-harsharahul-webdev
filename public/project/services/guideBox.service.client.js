(function () {
    angular
        .module("UniversalSearchApp")
        .factory("GuideBoxService",GuideBoxService);

    function GuideBoxService($http) {
        var key = "8e5af978b3471be36a5ed879a009d9ea80689bf9";
        var limit = 100;
        //var secret = "2eed5e6405478860";
        var urlBase = "http://api-public.guidebox.com/v2/TYPE?api_key=API_KEY&limit=LIMIT";
        var searchUrlBase = "http://api-public.guidebox.com/v2/search?api_key=API_KEY&type=TYPE&field=title&query=KEY";

        var api = {
            "getMovies":getMovies,
            "getMovieDetails":getMovieDetails,
            "searchMovies":searchMovies,
            "getSeries":getSeries,
            "searchShows":searchShows,
            "getShowDetails":getShowDetails
        };
        return api;

        function getMovies() {
            var url = urlBase.replace("API_KEY", key).replace("TYPE","movies").replace("LIMIT",limit);
            return $http.get(url);
        }

        function getSeries() {
            var url = urlBase.replace("API_KEY", key).replace("TYPE","shows").replace("LIMIT",limit);
            return $http.get(url);
        }
        // function getSeries() {
        //
        // }
        function getMovieDetails(id) {
            var urlDetailsBase = "http://api-public.guidebox.com/v2/movies/ID?api_key=API_KEY";
            var url = urlDetailsBase.replace("API_KEY", key).replace("ID",id);
            return $http.get(url);
        }

        function getShowDetails(id) {
            var urlDetailsBase = "http://api-public.guidebox.com/v2/shows/ID?api_key=API_KEY";
            var url = urlDetailsBase.replace("API_KEY", key).replace("ID",id);
            return $http.get(url);
        }

        function searchMovies(searchKey) {
            var url = searchUrlBase.replace("TYPE","movie").replace("API_KEY", key).replace("KEY",searchKey);
            return $http.get(url);
        }
        function searchShows(searchKey) {
            var url = searchUrlBase.replace("TYPE","show").replace("API_KEY", key).replace("KEY",searchKey);
            return $http.get(url);
        }
    }
})();

