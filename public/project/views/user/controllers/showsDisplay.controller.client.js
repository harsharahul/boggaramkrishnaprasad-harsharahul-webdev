(function(){
    angular
        .module("UniversalSearchApp")
        .controller("showsDisplayController", showsDisplayController);

    function showsDisplayController(UserService,GuideBoxService, $location,$routeParams,$rootScope) {
        var vm = this;
        vm.routeToDetails = routeToDetails;
        //vm.uid = $routeParams.uid;
        vm.routeToProfile = routeToProfile;
        vm.logout = logout;
        vm.searchShows = searchShows;
        vm.routeLogin = routeLogin;
        vm.currentUser = $rootScope.currentUser;
        vm.routeToMain =routeToMain;
        vm.showRefresh= false;
        //vm.logged = true;

        function loadInitialData() {

            vm.showRefresh = true;

            var promise = GuideBoxService
                .getSeries();

            promise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                        vm.showRefresh = false;
                        console.log(vm.movies);
                    }
                    else{
                        vm.error = "Error Fetching Media.\n Please contact Admin";
                    }
                })
                .catch(function (error) {
                    vm.error = "Error Fetching Media.\n Please contact Admin";
                    console.log("Error from the API")
                });
            if(vm.currentUser){
                vm.logged = true;
                if(vm.currentUser.role == "ADMIN"){
                    vm.showAdmin = true;
                }
                else if(vm.currentUser.role == "GUEST"){
                    vm.disableDetailPage = true;
                }
            }
            else {
                vm.disableDetailPage = true;
                vm.logged = false;
            }



        }

        loadInitialData();

        function searchShows(key) {
            var promise = GuideBoxService.searchShows(key);

            promise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                    }
                })
                .catch(function (err) {
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
                    })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function routeToDetails(id) {
            //if(!vm.disableDetailPage) {
                if (id) {
                    //$location.url("/user/"+vm.uid+"/movie/"+id);
                    $location.url("/user/show/" + id);
                }
            //}
        }

        function routeToProfile() {
            $location.url("/profile/");
            // $location.url("/profile/"+vm.uid);
        }

        function routeLogin() {
            $location.url("/login");
        }

        function routeToMain() {
            $location.url("/");
        }
    }
})();

