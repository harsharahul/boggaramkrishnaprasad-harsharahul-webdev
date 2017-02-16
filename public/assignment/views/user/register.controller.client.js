

(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(user) {
            var registerUser = UserService.createUser(user);

            console.log(registerUser);
            $location.url("/profile/"+registerUser);
            if(registerUser != null) {
                vm.error="You are registered";
            }
        }
    }})();
