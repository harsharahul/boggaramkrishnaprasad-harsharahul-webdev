/**
 * Created by harsharahul on 08/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
                { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
                { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
                { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Post 4", "websiteId": "567", "description": "Lorem" }
            ];
        var api = {
            "createPage":createPage,
            "findPageByWebsiteId":findPageByWebsiteId,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            pages.push(page);
            return null;
        }

        function findPageByWebsiteId(websiteId) {
            var pgs = [];
            for(var p in pages) {
                var page = pages[p];
                if( page.websiteId === websiteId ){
                    //return angular.copy(page);
                    pgs.push(page);
                }
            }
            return pgs;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId ){
                    return angular.copy(page);

                }
            }

            return null;
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages[p].name = page;
                }
            }
        }

        function deletePage(pageId) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId ){
                    pages.splice(page,1);
                }
            }
        }
    }
})();
