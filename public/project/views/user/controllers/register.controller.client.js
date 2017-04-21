/**
 * Created by harsharahul on 08/04/17.
 */
(function(){
    angular
        .module("UniversalSearchApp")
        .controller("registerController", registerController);

    function registerController(UserService, $location, $routeParams,$rootScope) {
        var vm = this;
        vm.register = register;
        vm.routeLogin = routeLogin;
        vm.showAdmin = true;

        function validateData(user) {
            var ret = false;

            if(!user){
                vm.error = "Please give a valid Input";
                return false;
            }

            if(user.username && user.password)
            {
                ret = true;

            }

            return ret;
        }

        function register(user) {

            if(!validateData(user)){
                vm.error = "Username and Password are required fields";
                return;
            }


            if(!user){
                vm.error = "Please give a valid Input";
            }
            if(!user.role)
                user.role = "SHOW";

            var checkPromise = UserService.findUserByCredentials(user.username,null,true);

            checkPromise
                .then(function (res) {
                    var promise = UserService.register(user);

                    promise
                        .then(function (response) {
                            if(response){
                                var user = response.data;

                                $rootScope.currentUser = user;

                                $location.url("/");

                            }
                            else{
                                vm.error = "Error in creating user";
                            }
                        })
                        .catch(function (err) {

                            vm.error = "Error in  creating User";
                        })

                })
                .catch(function (err) {
                    vm.error = "Username Not available, Please use another Username";
                })


        }

        function routeLogin() {
            $location.url("/login");
        }
    }
})();