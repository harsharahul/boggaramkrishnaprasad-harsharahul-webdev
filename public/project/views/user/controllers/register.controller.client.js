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

            if(user.username && user.firstName && user.lastName && user.email && user.password)
            {
                ret = true;
                var username = user.username.toString().trim();
                 if(username == String.empty()){
                     ret = false;
                     vm.error = "Username cannot be empty";
                 }
                var pass = user.password.toString().trim();
                 if(pass == String.empty()){
                     ret = false;
                     vm.error ="Password cannot be empty";
                 }

            }
            else {
                vm.error ="Please enter all Details."
            }
            return ret;
        }

        function register(user) {
            // console.log("register controller")
            // console.log(user);

            if(!validateData(user)){
                return;
            }
            // console.log("Validatred")

            if(!user){
                vm.error = "Please give a valid Input";
            }
            if(!user.role)
                user.role = "SHOW";
            var promise = UserService.register(user);

            promise
                .then(function (response) {
                    // console.log("success");
                    // console.log(response);
                    if(response){
                        var user = response.data;

                        // console.log("before rootscope")
                        $rootScope.currentUser = user;
                        // console.log("after rootscope")
                        // console.log($rootScope.currentUser);

                        $location.url("/");
                        // console.log("after route")

                    }
                    else{
                        // console.log("error 1");

                        vm.error = "Error in creating user";
                    }
                })
                .catch(function (err) {
                    // console.log("error 2");

                    vm.error = "Error in  creating User";
                })
        }

        function routeLogin() {
            $location.url("/login");
        }
    }
})();