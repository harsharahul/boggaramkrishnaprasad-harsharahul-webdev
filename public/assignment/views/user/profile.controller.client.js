/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.update = update;


        var user = UserService.findUserById(userId);
        vm.user = user;
        //vm.error = "No Data";

        console.log(user);
        vm.update = function (newUser) {
            var user = UserService.updateUser(userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        function update(user) {
            console.log("in the update funciton")
                var localuser = UserService.updateUser(userId, user);
            console.log("st1");

            if(localuser == null) {
                    vm.error = "unable to update user";
                    console.log("st2");
                console.log(localuser.username);


            } else {
                    vm.message = "user successfully updated"
                    console.log(localuser.username);
                }

        }




    }
})();