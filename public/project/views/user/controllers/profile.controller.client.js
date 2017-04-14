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


            // SocialService.updateThread(id,)
        }

        function okClick(updateMessage) {
            vm.edit = false;
            vm.config = true;
            vm.editingComment = null;

            vm.commentObj.comment = updateMessage;
            console.log(vm.commentObj);
            vm.editBarDisable = true;

            var promise =  SocialService.updateThread(vm.commentObj._id,vm.commentObj);

            promise
                .then(function (respose) {
                    if(respose.data){
                        console.log("Updated thread successfully");
                    }
                    else
                        console.log("Update thread error");

                })
                .catch(function (err) {
                    console.log("Update thread error");

                })
        }

        vm.logout = logout;

        console.log(loggedin);

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
                .catch(function (err) {
                    console.log(err);
                })
        }


        function init(){

            var moviePromise = MediaService.findMediaByUserId();

            moviePromise
                .then(function (response) {
                    if(response.data){
                        vm.movies = response.data;
                    }
                    else{
                        console.log("Error getting the all movies");
                    }
                })
                .catch(function (err) {
                    console.log("Error getting all the movies")
                })

            var commentPromise = SocialService.findThreadByUserId(uid);

            commentPromise
                .then(function (response) {
                    if(response.data){
                        vm.comments = response.data;
                    }
                    else{
                        console.log("Error getting the all comments");
                    }
                })
                .catch(function (err) {
                    console.log("Error getting all the comments")
                })

            var userPromise = UserService.getCurrentUser();

            userPromise
                .then(function (response) {
                    if(response.data){
                        vm.user = response.data;
                    }
                    else{
                        console.log("Error getting the user !!");
                    }
                })
                .catch(function (err) {
                    console.log("Error getting all user")
                })

        }

        init();

        function setDisplayMode(mode) {
            vm.mode = mode;
        }

        function routeToDetails(id) {
            if(id){
                $location.url("/user/movie/"+id);
                // $location.url("/user/"+uid+"/movie/"+id);
            }
        }

        function updateUser(user) {
            user.role = "USER";
            var promise = UserService.updateUser(user);

            promise
                .then(function (response) {
                    if(response){
                        console.log("Updated successfully")
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function deleteUser() {
            var response = confirm("Are you sure you want to delete " + vm.user.username)
            if (response === true){
                console.log("Deleting User");
                var promise = UserService.deleteUser();
                promise
                    .then(function (response) {
                        if(response){
                            console.log("Successfully deleted the user")
                        }
                        else {
                            console.log("Error deleting the user")

                        }
                    })
                    .catch(function (err) {
                        console.log(err);

                    })

            }
        }

        function removeMovie(id) {
            //console.log("Removing movie:"+ id);
            var promise = MediaService.deleteMedia(id);

            promise
                .then(function (response) {
                    if(response.data){
                        init();
                        console.log("Movie successsfuly removed")
                    }
                    else{
                        console.log("error removing movie")
                    }
                })
                .catch(function (err) {
                    console.log("error removing movie")
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
                        console.log("Error deleting the comment")
                    }
                })
                .catch(function (err) {
                    console.log("Error deleting the comment")

                })
        }
    }
})();