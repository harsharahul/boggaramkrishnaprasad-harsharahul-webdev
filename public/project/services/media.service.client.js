(function(){
    angular
        .module("UniversalSearchApp")
        .factory('MediaService', MediaService);

    function MediaService($http) {


        var api = {
            "updateMedia": updateMedia,
            "findMediaByUserId": findMediaByUserId,
            "findMediaById": findMediaById,
            "saveMedia": saveMedia,
            "deleteMedia":deleteMedia

        };
        return api;


        function findMediaByUserId() {
            return $http.get("/universalSearch/api/media/user/");
        }

        function findMediaById(mediaId) {
            return $http.get("/universalSearch/api/media/"+mediaId);
        }

        function saveMedia(media) {
            return $http.post("/universalSearch/api/media", media);
        }


        function updateMedia(mediaId, media) {
            return $http.put("/universalSearch/api/media/"+mediaId, media);
        }

        function deleteMedia(mediaId) {
            return $http.delete('/universalSearch/api/media/'+mediaId);
        }
    }
})();