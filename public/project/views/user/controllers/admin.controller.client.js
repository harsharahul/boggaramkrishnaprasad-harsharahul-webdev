(function(){
    angular
        .module("UniversalSearchApp")
        .controller("adminViewController", adminViewController);

    function adminViewController(SocialService,UserService, $location, $routeParams,$sce,$anchorScroll,MediaService) {
        var vm = this;
        vm.showUsers = showUsers;
        vm.showComments = showComments;
        vm.showDashboard = showDashboard;
        vm.usersCall = true;
        vm.commentsCall = true;
        vm.dashboardCall = false;


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
        }

        function showComments() {
            vm.commentsCall = false;
            vm.usersCall = true;
            vm.dashboardCall = true;
        }

        function  showDashboard() {
            vm.usersCall = true;
            vm.commentsCall = true;
            vm.dashboardCall = false;
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