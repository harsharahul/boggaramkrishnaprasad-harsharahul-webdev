/**
 * Created by harsharahul on 08/02/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem", created: new Date() },
        //     { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem", created: new Date() },
        //     { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem", created: new Date() },
        //     { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem", created: new Date() },
        //     { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem", created: new Date() },
        //     { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem", created: new Date() }
        // ];

        var api = {
            "createWebsite": createWebsite,
            "findWebsiteById": findWebsiteById,
            "deleteWebsite": deleteWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "updateWebsite":updateWebsite
        };
        return api;

        function findWebsiteById(wid) {
            // for(var w in websites) {
            //     if(websites[w]._id === wid) {
            //         //return angular.copy(websites[w]);
            //         console.log("Found website")
            //         return websites[w];
            //     }
            // }
            // return null;

            return $http.get("/api/website/"+wid);

        }
        function deleteWebsite(websiteId) {
            // for(var w in websites) {
            //     if(websites[w]._id === websiteId) {
            //         websites.splice(websites[w], 1);
            //     }
            // }

            return $http.delete("/api/website/"+websiteId);

        }

        function createWebsite(userId, website) {
            // website.developerId = userId;
            // website._id = (new Date()).getTime().toString();
            // // website.description="blahh";
            // // website.created = new Date();
            // console.log(website);
            // websites.push(website);

            return $http.post("/api/user/"+userId+"/website", website);

        }

        function findWebsitesByUser(userId) {
            // var sites = [];
            // for(var w in websites) {
            //     if(websites[w].developerId === userId) {
            //         sites.push(websites[w]);
            //     }
            // }
            // return sites;

            return $http.get("/api/user/"+userId+"/website");

        }

        function updateWebsite(websiteId, website) {
            // for(var w in websites) {
            //     if(websites[w]._id === websiteId) {
            //         websites[w].name = website;
            //     }
            // }
            // return null;

            return $http.put("/api/website/"+websiteId, website);

        }

    }
})();
