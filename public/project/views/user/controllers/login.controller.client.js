/**
 * Created by harsharahul on 08/04/17.
 */

(function(){
    angular
        .module("UniversalSearchApp")
        .controller("loginController", loginController);

    function loginController(UserService, $location,$rootScope) {
        var vm = this;
        vm.login = login;
        vm.routeRegister = routeRegister;

        function login(user) {
            if(!user)
            {
                vm.error = "Template returns NULL";
                return;
            }
            UserService
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    if(user){
                        $rootScope.currentUser = user;
                        $location.url("/");


                    }
                    else {
                        vm.error = "user not found";
                    }
                })
                .catch(function (err) {
                    vm.error = "User Not Found"
                })

        }

        function routeRegister() {
            $location.url("/register/");
        }
    }
})();