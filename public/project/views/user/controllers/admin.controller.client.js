(function(){
    angular
        .module("UniversalSearchApp")
        .controller("adminViewController", adminViewController);

    function adminViewController(SocialService,UserService, $location,
                                 $routeParams,$sce,$anchorScroll,MediaService,$rootScope) {
        var vm = this;
        vm.showUsers = showUsers;
        vm.showComments = showComments;
        vm.showDashboard = showDashboard;
        vm.showEditUser = showEditUser;
        vm.logout=logout;
        vm.routeProfile=routeProfile;
        vm.okClick = okClick;
        vm.ediComment =ediComment;
        vm.removeComment =removeComment;
        vm.updateUser=updateUser;
        vm.deleteUser=deleteUser;
        vm.usersCall = true;
        vm.commentsCall = true;
        vm.dashboardCall = false;
        vm.loadProfileEditdiv = "DASHBOARD";
        vm.config = true;
        vm.edit = false;
        vm.editBarDisable = true;
        vm.showAdmin = true;


        function init(){
            var userPromise = UserService.getAllUsers();

            userPromise
                .then(function (response) {
                    if(response.data){
                        vm.users = response.data;
                        vm.userCount = vm.users.length;
                    }
                    else{
                        console.log("Error getting the all users");
                    }
                })
                .catch(function (err) {
                    console.log("Error getting all the users")
                })

            var commentPromise = SocialService.getAllComments();

            commentPromise
                .then(function (response) {
                    if(response.data){
                        vm.comments = response.data;
                        vm.commentCount = vm.comments.length;
                    }
                    else{
                        console.log("Error getting the all comments");
                    }
                })
                .catch(function (err) {
                    console.log("Error getting all the comments")
                })
        }

        init();

        function showUsers() {
            vm.usersCall = false;
            vm.commentsCall = true
            vm.dashboardCall = true;
            vm.loadProfileEditdiv = "USERVIEW";

        }

        function showComments() {
            vm.commentsCall = false;
            vm.usersCall = true;
            vm.dashboardCall = true;
            vm.loadProfileEditdiv = "EDITCOMMENTS";
        }

        function  showDashboard() {
            vm.usersCall = true;
            vm.commentsCall = true;
            vm.dashboardCall = false;
            vm.loadProfileEditdiv = "DASHBOARD";
        }

        function showEditUser(user) {
            console.log("Editing user")
            vm.loadProfileEditdiv = "EDITVIEW";
            vm.user = user;
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        console.log("Logout successful")
                        $rootScope.currentUser = null;
                        $location.url("/");
                        //vm.logged = false;
                        //vm.showAdmin = false;
                        //vm.showShows = false;
                        console.log("Logged Out");
                    })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function routeProfile() {
            $location.url("/profile");
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

        function updateUser(user) {
            //user.role = "USER";
            var promise = UserService.updateUserByID(user);

            promise
                .then(function (response) {
                    if(response){
                        init();
                        console.log("Updated successfully")
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
        }

        function deleteUser(user) {

            console.log(user);
            var response = confirm("Are you sure you want to delete " + vm.user.username)
            if (response === true){
                console.log("Deleting User");
                var promise = UserService.deleteUserById(user._id);
                promise
                    .then(function (response) {
                        if(response){
                            init();
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

        // //vm.login = login;
        // vm.error = "";
        // var guideBoxId = $routeParams.mid;
        // var uid = $routeParams.uid;
        // vm.getVideoFroMedia = getVideoFroMedia;
        // vm.saveMedia =saveMedia;
        // vm.addComment=addComment;
        //
        //
        // function init() {
        //
        //     //$location.hash("detailsPageView");
        //     //$anchorScroll();
        //
        //
        //
        //     var promise = GuideBoxService.getMovieDetails(guideBoxId);
        //
        //     promise
        //         .then(function (response) {
        //             if(response.data){
        //                 vm.media = response.data;
        //                 vm.mediaTrailer = getVideoFroMedia(vm.media.trailers.web[0].embed);
        //
        //             }
        //             else{
        //                 vm.error = "Error fetching the Movie details\n Please contact the administrator";
        //             }
        //         })
        //         .catch(function (err) {
        //             vm.error = "Error loading, Please contact the administrator";
        //         })
        // }
        //
        //
        // init();
        // loadComments();
        // isMediaSaved();
        //
        // function loadComments() {
        //     var promise = SocialService.findThreadByMediaId(guideBoxId);
        //
        //     promise
        //         .then(function (response) {
        //             if(response.data){
        //                 vm.comments = response.data;
        //                 console.log(vm.comments);
        //             }
        //         })
        //         .catch(function (err) {
        //             console.log("Error in lodaing the comments")
        //         })
        // }
        //
        // function getVideoFroMedia(mediaUrl) {
        //     return $sce.trustAsResourceUrl(mediaUrl);
        // }
        //
        // function isMediaSaved() {
        //     var promise = MediaService.findMediaByUserId(uid);
        //     promise
        //         .then(function (response) {
        //             if(response.data){
        //                 var allSaved = response.data;
        //                 for (var i=0; i < allSaved.length; i++)
        //                     if (allSaved[i].guideboxId == guideBoxId)
        //                         vm.saved = true;
        //             }
        //         })
        // }
        //
        // function saveMedia() {
        //
        //     var media = new Object();
        //     media.user = uid;
        //     media.guideboxId = vm.media.id;
        //     media.title = vm.media.title;
        //     media.type = "MOVIE";
        //     media.poster = vm.media.poster_400x570;
        //     media.desc = vm.media.overview;
        //
        //     var promsise = MediaService.saveMedia(media);
        //
        //     promsise
        //         .then(function (response) {
        //             if(response.data){
        //                 vm.message = "Successfully saved the media";
        //                 console.log("Successfully saved media");
        //                 vm.saved = true;
        //             }
        //             else {
        //                 vm.error="Error in saving the Media";
        //             }
        //         })
        //         .catch(function (err) {
        //             vm.error = err.message;
        //         })
        // }
        //
        // function addComment(comment) {
        //     var thread = new Object();
        //
        //     thread.comment = comment;
        //     thread.user = uid;
        //     thread.guideBoxMediaId = guideBoxId;
        //
        //     var promise = SocialService.saveThread(thread);
        //
        //     promise
        //         .then(function (response) {
        //             if(response.data){
        //                 console.log("Thread saved successfully");
        //                 loadComments();
        //             }
        //         })
        //         .catch(function (err) {
        //             console.log("Error saving the comment");
        //         })
        // }

    }
})();