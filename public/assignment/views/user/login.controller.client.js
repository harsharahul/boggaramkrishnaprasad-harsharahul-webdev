/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);

    function loginController(UserService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            if(user==null)
            {
                return;
            }
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/profile/' + loginUser._id);
            } else {
                vm.error = 'user not found';
                console.log("error in login... user not found")
            }
        }
    }
})();