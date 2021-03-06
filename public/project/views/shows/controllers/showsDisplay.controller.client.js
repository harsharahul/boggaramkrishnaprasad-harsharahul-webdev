(function(){
    angular
        .module("UniversalSearchApp")
        .controller("showsDisplayController", showsDisplayController);

    function showsDisplayController(UserService,GuideBoxService, $location,$routeParams,$rootScope) {
        var vm = this;
        vm.routeToDetails = routeToDetails;
        vm.routeToProfile = routeToProfile;
        vm.logout = logout;
        vm.searchShows = searchShows;
        vm.routeLogin = routeLogin;
        vm.currentUser = $rootScope.currentUser;
        vm.routeToMain =routeToMain;
        vm.showRefresh= false;

        function loadInitialData() {

            vm.showRefresh = true;

            var promise = GuideBoxService
                .getSeries();

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

            if(!key){
                return;
            }

            vm.showRefresh = true;
            var promise = GuideBoxService.searchShows(key);

            promise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                        vm.showRefresh = false;
                    }
                    vm.showRefresh = false;
                })
                .catch(function (err) {
                    vm.error = "Error fetching the Search results";
                    vm.showRefresh = false;
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
                if (id) {
                    $location.url("/user/show/" + id);
                }
        }

        function routeToProfile() {
            $location.url("/profile/");
        }

        function routeLogin() {
            $location.url("/login");
        }

        function routeToMain() {
            $location.url("/");
        }
    }
})();

