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

        console.log("Login Controller Loaded")
        function login(user) {
            if(!user)
            {
                vm.error = "Template returns NULL";
                console.log("user is null");
                return;
            }
            UserService
                //.findUserByCredentials(user.username, user.password)
                .login(user)
                .then(function (response) {
                    var user = response.data;
                    if(user){
                        console.log(user);
                        $rootScope.currentUser = user;
                        $location.url("/");
                        // if(user.role == "USER"){
                        //     $rootScope.currentUser = user;
                        //     $location.url("/user/"+user._id);
                        // }
                        // else if (user.role == "ADMIN"){
                        //     $rootScope.currentUser = user;
                        //     $location.url("/admin/"+user._id);
                        // }
                        // else{
                        //     $rootScope.currentUser = user;
                        //     $location.url("/guest/"+user._id);
                        // }

                    }
                    else {
                        console.log("hello 2");
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