/**
 * Created by harsharahul on 08/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        // var pages = [
        //         { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //         { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        //         { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
        //         { "_id": "567", "name": "Post 4", "websiteId": "567", "description": "Lorem" }
        //     ];

        var api = {
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function createPage(websiteId, page) {
            // page.websiteId = websiteId;
            // pages.push(page);
            // return null;

            return $http.post("/api/website/"+websiteId+"/page", page);

        }

        function findPageByWebsiteId(websiteId) {
            // var pgs = [];
            // for(var p in pages) {
            //     var page = pages[p];
            //     if( page.websiteId === websiteId ){
            //         //return angular.copy(page);
            //         pgs.push(page);
            //     }
            // }
            // return pgs;

            return $http.get("/api/website/"+websiteId+"/page");

        }

        function findPageById(pageId) {
            // for(var p in pages) {
            //     var page = pages[p];
            //     if( page._id === pageId ){
            //         return angular.copy(page);
            //
            //     }
            // }
            //
            // return null;
            return $http.get("/api/page/"+pageId);

        }

        function updatePage(pageId, page) {
            // for(var p in pages) {
            //     if(pages[p]._id === pageId) {
            //         pages[p].name = page;
            //     }
            // }
            return $http.put("/api/page/"+pageId, page);


        }

        function deletePage(pageId) {
            // for(var p in pages) {
            //     var page = pages[p];
            //     if( page._id === pageId ){
            //         pages.splice(page,1);
            //     }
            // }

            return $http.delete("/api/page/"+pageId);

        }
    }
})();
