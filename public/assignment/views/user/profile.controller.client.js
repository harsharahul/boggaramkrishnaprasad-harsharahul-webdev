/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, $location,UserService) {
        var vm = this;
        var userId = $routeParams['uid'];

        vm.update = update;
        vm.routeProfile = routeProfile;


        // var user = UserService.findUserById(userId);
        // vm.user = user;
        function init() {
            var promise = UserService.findUserById(userId);
            promise.then(function (response) {
                vm.user = response.data;
                if (vm.user == null){
                    $location.url("/login");
                }
                else{
                    vm.user = angular.copy(vm.user);
                }
            })
                .catch(function (err) {

                });

        }
        init();

        // vm.update = function (newUser) {
        //     // var user = UserService.updateUser(userId, newUser);
        //     // if(user == null) {
        //     //     vm.error = "unable to update user";
        //     // } else {
        //     //     vm.message = "user successfully updated"
        //     // }
        //
        //     UserService
        //         .updateUser(userId,newUser)
        //         .then(function (response) {
        //             var u = response;
        //             if(u != null)
        //             {
        //                 vm.error = "User successfully updated";
        //             }
        //             else
        //             {
        //                 vm.error = "Unable to update the user"
        //             }
        //
        //         })
        // };

        function update(user) {
            // console.log("in the update funciton")
            //     var localuser = UserService.updateUser(userId, user);
            // console.log("st1");
            //
            // if(localuser == null) {
            //         vm.error = "unable to update user";
            //         console.log("st2");
            //     console.log(localuser.username);
            //
            //
            // } else {
            //         vm.message = "user successfully updated"
            //         console.log(localuser.username);
            //     }

            UserService
                .updateUser(userId,user)
                .then(function (response) {
                    var u = response.data;
                    if(u)
                    {
                        vm.message = "user successfully updated";
                    }
                    else
                    {
                        vm.error = "unable to update user";
                    }
                })

        }

        function routeProfile()
        {
            $location.url("/profile/"+userId);
        };




    }
})();