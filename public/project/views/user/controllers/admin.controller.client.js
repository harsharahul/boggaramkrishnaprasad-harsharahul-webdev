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
                        vm.error = "Error getting the all users";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error getting the all users";
                });

            var commentPromise = SocialService.getAllComments();

            commentPromise
                .then(function (response) {
                    if(response.data){
                        vm.comments = response.data;
                        vm.commentCount = vm.comments.length;
                    }
                    else{
                        vm.error = "Error getting the all comments";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error getting the all comments";
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
            vm.loadProfileEditdiv = "EDITVIEW";
            vm.user = user;
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function(response) {
                        $rootScope.currentUser = null;
                        $location.url("/");
                    })
                .catch(function (err) {
                    vm.error = "logout Error, Contact Admin";
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
            console.log(vm.commentObj);
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

        function updateUser(user) {
            var promise = UserService.updateUserByID(user);

            promise
                .then(function (response) {
                    if(response){
                        init();
                        vm.success = "Updated User Successfully";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error updating the User";
                })
        }

        function deleteUser(user) {

            var response = confirm("Are you sure you want to delete " + vm.user.username)
            if (response === true){
                var promise = UserService.deleteUserById(user._id);
                promise
                    .then(function (response) {
                        if(response){
                            init();
                            vm.success = "Successfully deleted the user";
                        }
                        else {
                            vm.error = "Error deleting the user";

                        }
                    })
                    .catch(function (err) {
                        vm.error = "Error deleting the user";

                    })

            }
        }

        function routeProfile() {
            $location.url("/profile");
        }

    }
})();