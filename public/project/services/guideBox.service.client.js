(function () {
    angular
        .module("UniversalSearchApp")
        .factory("GuideBoxService",GuideBoxService);

    function GuideBoxService($http) {
        var key = "8e5af978b3471be36a5ed879a009d9ea80689bf9";
        var limit = 100;
        //var secret = "2eed5e6405478860";
        var urlBase = "https://api-public.guidebox.com/v2/TYPE?api_key=API_KEY&limit=LIMIT";
        var searchUrlBase = "https://api-public.guidebox.com/v2/search?api_key=API_KEY&type=TYPE&field=title&query=KEY";

        var api = {
            "getMovies":getMovies,
            "getMovieDetails":getMovieDetails,
            "searchMovies":searchMovies,
            "getSeries":getSeries,
            "searchShows":searchShows,
            "getShowDetails":getShowDetails,
            "getallepisodes":getallepisodes
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
            var urlDetailsBase = "https://api-public.guidebox.com/v2/movies/ID?api_key=API_KEY";
            var url = urlDetailsBase.replace("API_KEY", key).replace("ID",id);
            return $http.get(url);
        }

        function getShowDetails(id) {
            var urlDetailsBase = "https://api-public.guidebox.com/v2/shows/ID?api_key=API_KEY";
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

        function getallepisodes(showId,limit) {
            var urlBuilder = "https://api-public.guidebox.com/v2/shows/SHOWID/episodes?api_key=KEY&include_links=true&limit=LIMIT"
            var urlQuery = urlBuilder.replace("SHOWID",showId).replace("KEY",key).replace("LIMIT",limit);
            return $http.get(urlQuery);

            // promise
            //     .then(function (response) {
            //         if(response.data){
            //             var totalEpisodes = response.data.total_results;
            //
            //             if(totalEpisodes>250){
            //                 totalEpisodes = 250;
            //             }
            //
            //             var mainUrl = urlBuilder.replace("SHOWID",showId).replace("KEY",key).replace("LIMIT",totalEpisodes);
            //
            //             return $http.get(mainUrl);
            //         }
            //     })
            //     .catch(function (err) {
            //         console.log("Error getAll Espisodes");
            //     })

        }
    }
})();

