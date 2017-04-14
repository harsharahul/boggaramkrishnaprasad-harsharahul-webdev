(function(){
    angular
        .module("UniversalSearchApp")
        .factory('SocialService', SocialService);

    function SocialService($http) {


        var api = {
            "updateThread": updateThread,
            "findThreadByUserId": findThreadByUserId,
            "findThreadById": findThreadById,
            "findThreadByMediaId": findThreadByMediaId,
            "saveThread": saveThread,
            "deleteThread":deleteThread,
            "getAllComments": getAllComments

        };
        return api;

        function getAllComments() {
            console.log("sevice cient")
            return $http.get("/universalSearch/api/social/all");
        }

        function findThreadByMediaId(mediaId) {
            return $http.get("/universalSearch/api/social/media/"+mediaId);
        }

        function findThreadByUserId(userId) {
            return $http.get("/universalSearch/api/social/user/"+userId);
        }

        function findThreadById(threadId) {
            return $http.get("/universalSearch/api/social/"+threadId);
        }

        function saveThread(thread) {
            return $http.post("/universalSearch/api/social", thread);
        }


        function updateThread(threadId, thread) {
            return $http.put("/universalSearch/api/social/"+threadId, thread);
        }

        function deleteThread(threadId) {
            return $http.delete('/universalSearch/api/social/'+threadId);
        }
    }
})();