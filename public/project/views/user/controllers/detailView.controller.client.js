(function(){
    angular
        .module("UniversalSearchApp")
        .controller("detailViewController", detailViewController);

    function detailViewController(UserService,SocialService,GuideBoxService,
                                  $location, $routeParams,$sce,$anchorScroll,MediaService,loggedin,$rootScope) {
        var vm = this;
        //vm.login = login;
        vm.error = "";
        var guideBoxId = $routeParams.mid;
        //var uid = $routeParams.uid;
        vm.getVideoFroMedia = getVideoFroMedia;
        vm.saveMedia =saveMedia;
        vm.addComment=addComment;
        vm.routeMainPage = routeMainPage;
        vm.logout = logout;
        vm.routeProfile =routeProfile;
        vm.parseIntoHttps =parseIntoHttps;
        vm.showRefresh = false;
        //vm.loggedin = loggedin.role;


        function init() {

            // $location.hash("detailsPageView");
            // $anchorScroll();

            vm.showRefresh = true;


            var promise = GuideBoxService.getMovieDetails(guideBoxId);

            promise
                .then(function (response) {
                    if(response.data){
                        vm.media = response.data;
                        //console.log(vm.media)
                        vm.mediaTrailer = getVideoFroMedia(vm.media.trailers.web[0].embed);
                        vm.mediaTrailerLink = vm.media.trailers.web[0].link;
                        vm.mediaTrailerEmbedded = vm.media.trailers.web[0].embed;
                        vm.showRefresh = false;
                        //console.log(vm.media.trailers.web[0].embed);

                    }
                    else{
                        vm.error = "Error fetching the Movie details\n Please contact the administrator";
                    }
                })
                .catch(function (err) {
                    vm.error = "Error loading, Please contact the administrator";
                })
        }


        init();
        loadComments();
        isMediaSaved();

        function loadComments() {
            var promise = SocialService.findThreadByMediaId(guideBoxId);

            promise
                .then(function (response) {
                    if(response.data){
                        vm.comments = response.data;
                        console.log(vm.comments);
                    }
                })
                .catch(function (err) {
                    console.log("Error in lodaing the comments")
                })
        }

        function getVideoFroMedia(mediaUrl) {
            //console.log(mediaUrl);
            return $sce.trustAsResourceUrl(mediaUrl);
        }

        function isMediaSaved() {
            var promise = MediaService.findMediaByUserId();
            promise
                .then(function (response) {
                    if(response.data){
                        var allSaved = response.data;
                        for (var i=0; i < allSaved.length; i++)
                            if (allSaved[i].guideboxId == guideBoxId)
                                vm.saved = true;
                    }
                })
        }

        function saveMedia() {

            var media = new Object();
            //media.user = uid;
            media.guideboxId = vm.media.id;
            media.title = vm.media.title;
            media.type = "MOVIE";
            media.poster = vm.media.poster_400x570;
            media.desc = vm.media.overview;

            var promsise = MediaService.saveMedia(media);

            promsise
                .then(function (response) {
                    if(response.data){
                        vm.message = "Successfully saved the media";
                        console.log("Successfully saved media");
                        vm.saved = true;
                    }
                    else {
                        vm.error="Error in saving the Media";
                    }
                })
                .catch(function (err) {
                    vm.error = err.message;
                })
        }

        function addComment(comment) {

            if(!comment)
                return;

            var thread = new Object();

            thread.comment = comment;
            //thread.user = uid;
            thread.guideBoxMediaId = guideBoxId;

            var promise = SocialService.saveThread(thread);

            promise
                .then(function (response) {
                    if(response.data){
                        console.log("Thread saved successfully");
                        loadComments();
                        vm.comment = null;
                    }
                })
                .catch(function (err) {
                    console.log("Error saving the comment");
                })
        }

        function routeMainPage() {
            $location.url("/user");
        }

        function routeProfile() {
            $location.url("/profile");
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
                    console.log(err);
                })
        }

        function parseIntoHttps(url) {
            return url.replace("http","https");
        }
    }
})();