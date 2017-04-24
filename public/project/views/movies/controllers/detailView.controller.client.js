(function(){
    angular
        .module("UniversalSearchApp")
        .controller("detailViewController", detailViewController);

    function detailViewController(UserService,SocialService,GuideBoxService,
                                  $location, $routeParams,$sce,$anchorScroll,MediaService,loggedin,$rootScope) {
        var vm = this;
        vm.error = "";
        var guideBoxId = $routeParams.mid;
        vm.getVideoFroMedia = getVideoFroMedia;
        vm.saveMedia =saveMedia;
        vm.addComment=addComment;
        vm.routeMainPage = routeMainPage;
        vm.logout = logout;
        vm.routeProfile =routeProfile;
        vm.parseIntoHttps =parseIntoHttps;
        vm.showRefresh = false;


        function init() {

            // $location.hash("detailsPageView");
            // $anchorScroll();

            vm.showRefresh = true;


            var promise = GuideBoxService.getMovieDetails(guideBoxId);

            promise
                .then(function (response) {
                    if(response.data){
                        vm.media = response.data;
                        vm.mediaTrailer = getVideoFroMedia(vm.media.trailers.web[0].embed);
                        vm.mediaTrailerLink = vm.media.trailers.web[0].link;
                        vm.mediaTrailerEmbedded = vm.media.trailers.web[0].embed;
                        vm.showRefresh = false;

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
                    }
                })
                .catch(function (err) {
                    vm.error = "Error in loading the comments";
                })
        }

        function getVideoFroMedia(mediaUrl) {
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
            thread.guideBoxMediaId = guideBoxId;
            thread.mediaName =  vm.media.title;


            var promise = SocialService.saveThread(thread);

            promise
                .then(function (response) {
                    if(response.data){
                        loadComments();
                        vm.comment = null;
                    }
                })
                .catch(function (err) {
                    vm.error = "Error Saving the Comment, Contact Admin";
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