/**
 * Created by harsharahul on 11/04/17.
 */
(function(){
    angular
        .module("UniversalSearchApp")
        .controller("profileViewController", profileViewController);

    function profileViewController(SocialService,UserService, $location,
                                   $routeParams,$sce,$anchorScroll,MediaService,
                                   loggedin,$rootScope) {
        var vm = this;
        var uid = $routeParams.uid;

        vm.setDisplayMode = setDisplayMode;
        vm.routeToDetails = routeToDetails;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.removeMovie = removeMovie;
        vm.removeComment = removeComment;
        vm.routeAdmin=routeAdmin;
        vm.showAdmin= false;

        vm.editingComment = '';
        vm.editingId = 0;

        vm.config = true;
        vm.edit = false;

        vm.editBarDisable = true;


        vm.ediComment = ediComment;
        vm.okClick = okClick;

        function ediComment(comment) {

            vm.editBarDisable = false;
            vm.edit = true;
            vm.config = false;
            vm.editingComment = comment.comment;
            vm.editingId = comment._id;
            vm.commentObj = comment;


        }

        function okClick(updateMessage) {
            vm.edit = false;
            vm.config = true;
            vm.editingComment = null;

            vm.commentObj.comment = updateMessage;
            vm.editBarDisable = true;

            var promise =  SocialService.updateThread(vm.commentObj._id,vm.commentObj);

            promise
                .then(function (respose) {
                    if(respose.data){
                        vm.success = "Updated thread successfully";
                    }
                    else{
                        vm.error = "Update thread error";
                    }

                })
                .catch(function (err) {
                    vm.error = "Update thread error";

                })
        }

        vm.logout = logout;


        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
                .catch(function (err) {
                    vm.error = "Error Logging out";
                })
        }


        function init(){

            if($rootScope.currentUser){
                if($rootScope.currentUser.role == "ADMIN"){
                    vm.showAdmin = true;
                }
            }
            var moviePromise = MediaService.findMediaByUserId();

            moviePromise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                    }
                    else{
                        vm.error = "Error getting the all movies";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error getting the all movies";
                })

            var commentPromise = SocialService.findThreadByUserId(uid);

            commentPromise
                .then(function (response) {
                    if(response.data){
                        vm.comments = response.data;
                    }
                    else{
                        vm.error = "Error getting the all comments";
                        console.log("Error getting the all comments");
                    }
                })
                .catch(function (err) {
                    vm.error = "Error getting the all comments";
                })

            var userPromise = UserService.getCurrentUser();

            userPromise
                .then(function (response) {
                    if(response.data){
                        vm.user = response.data;
                    }
                    else{
                        vm.error = "Error getting the User Information!";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error getting the User Information!";
                })

        }

        init();

        function setDisplayMode(mode) {
            vm.mode = mode;
        }

        function routeToDetails(id) {
            if(id){
                $location.url("/user/movie/"+id);
            }
        }

        function updateUser(user) {
            var promise = UserService.updateUser(user);

            promise
                .then(function (response) {
                    if(response){
                        vm.success = "Updated successfully";
                        init();
                    }
                })
                .catch(function (err) {
                    vm.error = "Error Updating the user";
                })
        }

        function deleteUser(user) {
            var response = confirm("Are you sure you want to delete " + vm.user.username)
            if (response === true){
                var promise = UserService.deleteUser();
                promise
                    .then(function (response) {
                        if(response){
                            logout();
                        }
                        else {
                            console.log("Error deleting the user")

                        }
                    })
                    .catch(function (err) {
                        vm.error = "Error Deleting the User";

                    })

            }
        }

        function removeMovie(id) {
            var promise = MediaService.deleteMedia(id);

            promise
                .then(function (response) {
                    if(response.data){
                        init();
                    }
                    else{
                        vm.error = "error removing movie";
                    }
                })
                .catch(function (err) {
                    vm.error = "error removing movie";
                })
        }

        function removeComment(id) {
            var promise = SocialService.deleteThread(id);

            promise
                .then(function (response) {
                    if(response.data){
                        init();
                    }
                    else {
                        vm.error = "Error deleting the comment";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error deleting the comment";

                })
        }

        function routeAdmin() {
            $location.url("/admin");
        }
    }
})();