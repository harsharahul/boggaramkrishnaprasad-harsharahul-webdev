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
                console.log("user is null");
                return;
            }
            // var loginUser = UserService.findUserByCredentials(user.username, user.password);
            // if(loginUser != null) {
            //     $location.url('/profile/' + loginUser._id);
            // } else {
            //     vm.error = 'user not found';
            //     console.log("error in login... user not found")
            // }


            UserService
                .findUserByCredentials(user.username, user.password)
                .then(function (response) {
                    var user = response.data;
                    if(user){

                        $location.url("/user/"+user._id);
                    }
                    else {

                        vm.error = "user not found";
                    }
                })
                .catch(function (err) {
                    vm.error = err.statusCode;
                })

        }
    }
})();