/**
 * Created by harsharahul on 09/02/17.
 */
// (function(){
//     angular
//         .module("WebAppMaker")
//         .controller("RegisterController", registerController);
//
//     function registerController($routeParams, UserService) {
//         var vm = this;
//         var userId = $routeParams['uid'];
//         vm.update = function (newUser) {
//             var user = UserService.updateUser(userId, newUser);
//             if(user == null) {
//                 vm.error = "unable to update user";
//             } else {
//                 vm.message = "user successfully updated"
//             }
//         };
//
//
//         var user = UserService.findUserById(userId);
//         vm.user = user;
//
//         console.log(user);
//     }
// })();

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
