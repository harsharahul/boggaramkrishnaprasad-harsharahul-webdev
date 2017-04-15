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



        function register(user) {
            console.log("register controller")
            console.log(user);

            if(!user){
                vm.error = "Please give a valid Input";
            }
            if(!user.role)
                user.role = "SHOW";
            var promise = UserService.register(user);

            promise
                .then(function (response) {
                    console.log("success");
                    console.log(response);
                    if(response){
                        var user = response.data;

                        console.log("before rootscope")
                        $rootScope.currentUser = user;
                        console.log("after rootscope")
                        console.log($rootScope.currentUser);

                        $location.url("/");
                        console.log("after route")

                        // if(user.role == "USER"){
                        //     $rootScope.currentUser = user;
                        //     $location.url("/user/"+user._id);
                        // }
                        // else if(user.role == "ADMIN"){
                        //     $rootScope.currentUser = user;
                        //     $location.url("/admin/"+user._id);
                        // }
                        // else{
                        //     $rootScope.currentUser = user;
                        //     $location.url("/guest/"+user._id);
                        // }
                    }
                    else{
                        console.log("error 1");

                        vm.error = "Error in creating user";
                    }
                })
                .catch(function (err) {
                    console.log("error 2");

                    vm.error = "Error in  creating User";
                })
        }

        function routeLogin() {
            $location.url("/login");
        }
    }
})();