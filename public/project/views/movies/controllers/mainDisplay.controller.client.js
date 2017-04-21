(function(){
    angular
        .module("UniversalSearchApp")
        .controller("mainDisplayController", mainDisplayController);

    function mainDisplayController(UserService,GuideBoxService, $location,$routeParams,$rootScope) {
        var vm = this;
        vm.routeToDetails = routeToDetails;
        vm.routeToProfile = routeToProfile;
        vm.logout = logout;
        vm.searchMovies = searchMovies;
        vm.routeLogin = routeLogin;
        vm.currentUser = $rootScope.currentUser;
        vm.routeToAdmin = routeToAdmin;
        vm.showShows = false;
        vm.routeToShows = routeToShows;
        vm.parseIntoHttps =parseIntoHttps;
        vm.showRefresh = false;
        vm.loadMore =loadMore;
        vm.pageNumber = 100;

        function loadInitialData() {
            vm.showRefresh = true;
            var promise = GuideBoxService
                .getMovies();

            promise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                        vm.showRefresh = false;
                    }
                    else{
                        vm.error = "Error Fetching Media.\n Please contact Admin";
                    }
                })
                .catch(function (error) {
                    vm.error = "Error Fetching Media.\n Please contact Admin";
                });
            if(vm.currentUser){
                vm.logged = true;
                if(vm.currentUser.role == "ADMIN"){
                    vm.showAdmin = true;
                    vm.showShows = true;
                }
                else if(vm.currentUser.role == "SHOW"){
                    vm.showShows = true;
                }
            }
            else {
                vm.disableDetailPage = true;
                vm.logged = false;
                vm.showAdmin = false;
            }


        }

        loadInitialData();
        
        function searchMovies(key) {



            if(!key){
                return;
            }
            vm.showRefresh = true;
            var promise = GuideBoxService.searchMovies(key);

            promise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                        vm.showRefresh = false;
                    }
                    vm.showRefresh = false;
                })
                .catch(function (err) {
                    vm.showRefresh = false;
                    vm.error = "Error fetching the Search results";
                })
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {

                        $rootScope.currentUser = null;
                        $location.url("/");
                        vm.logged = false;
                        vm.showAdmin = false;
                        vm.showShows = false;
                    })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function routeToDetails(id) {
            if(!vm.disableDetailPage) {
                if (id) {
                    $location.url("/user/movie/" + id);
                }
            }
        }

        function routeToProfile() {
                $location.url("/profile/");
        }

        function routeLogin() {
            $location.url("/login");
        }

        function routeToAdmin() {
            $location.url("/admin");
        }

        function routeToShows() {
            $location.url("/shows");
        }

        function parseIntoHttps(url) {
            return url.replace("http","https");
        }

        function loadMore() {

            vm.showRefresh = true;
            var promise = GuideBoxService.getMoviesfromOffset(vm.pageNumber);

            promise
                .then(function (response) {
                    if(response.data){

                        for (var i = 0, len = response.data.results.length; i < len; i++) {
                            vm.movies.results.push(response.data.results[0]);
                        }


                        vm.showRefresh = false;
                        vm.pageNumber = vm.pageNumber + 100;//100 is the limit which is getting set everytime.
                    }
                })
                .catch(function (err) {
                    vm.error = "Not able to load any more";
                })

        }
    }
})();
