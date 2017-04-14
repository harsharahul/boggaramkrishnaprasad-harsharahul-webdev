/**
 * Created by harsharahul on 07/02/17.
 */
(function() {
    angular
        .module('UniversalSearchApp')
        .config(Config);

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin')
            .then(function(user) {

            $rootScope.errorMessage = null;

            //console.log("In check logged in");
            //console.log(user);

            if (user.data !== '0') {

                console.log("resolved")
                //console.log(user)
                $rootScope.currentUser = user.data;
                deferred.resolve();
                //$location.url('/user');
            } else {
                console.log("reject")

                deferred.reject();
                $location.url('/');
            }
        });
        return deferred.promise;
    };

    var checkIsAdmin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/isadmin')
            .then(function(user) {

                $rootScope.errorMessage = null;

                if (user.data !== '0') {

                    console.log("resolved")
                    console.log(user)
                    //$rootScope.currentUser = user;
                    deferred.resolve();
                    //$location.url('/user');
                } else {
                    console.log("reject")

                    deferred.reject();
                    $location.url('/');
                }
            });
        return deferred.promise;
    };


    var loggedUser = function($q, $timeout, $http, $location, $rootScope) {
        //var deferred = $q.defer();

        $http.get('/api/loggedin')
            .then(function(user) {

                $rootScope.errorMessage = null;

                if (user.data !== '0') {

                    console.log("resolved");
                    console.log(user.data);
                    $rootScope.currentUser = user.data;
                    //$rootScope.currentUser = user;
                    //deferred.resolve();
                    //$location.url('/user');
                } else {
                    //console.log("reject")

                    //deferred.reject();
                    //$location.url('/');
                }
            });
        //return deferred.promise;
    };



    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

        $routeProvider
            .when("/",{
                templateUrl:"views/user/templates/mainDisplay.view.client.html",
                controller: 'mainDisplayController',
                controllerAs: 'model',
                resolve: { user: loggedUser }
            })
            .when("/login", {
                templateUrl:'views/user/templates/login-page.view.client.html',
                controller: 'loginController',
                controllerAs: 'model',
                //resolve: { loggedin: checkLoggedin }
            })
            // .when("/user/:uid",{
            //     templateUrl:"views/user/templates/mainDisplay.view.client.html",
            //     controller: 'mainDisplayController',
            //     controllerAs: 'model'
            // })

            // .when("/user/:uid/movie/:mid",{
            //     templateUrl:"views/user/templates/details-page.view.client.html",
            //     controller: 'detailViewController',
            //     controllerAs: 'model'
            // })
            .when("/user/movie/:mid",{
                templateUrl:"views/user/templates/details-page.view.client.html",
                controller: 'detailViewController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/show/:mid",{
                templateUrl:"views/user/templates/showDetail.view.client.html",
                controller: 'showDetailViewController',
                controllerAs: 'model',
                //resolve: { loggedin: checkLoggedin }
            })
            .when("/register",{
                templateUrl:"views/user/templates/register-page.view.client.html",
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/admin",{
                templateUrl:"views/user/templates/admin-page.view.client.html",
                controller: 'adminViewController',
                controllerAs: 'model',
                resolve: { isAdmin: checkIsAdmin }
            })
            .when("/shows",{
                templateUrl:"views/user/templates/showsDisplay.view.client.html",
                controller: 'showsDisplayController',
                controllerAs: 'model'
                //resolve: { isAdmin: checkIsAdmin }
            })
            // .when("/profile/:uid",{
            //     templateUrl:"views/user/templates/profile-page.view.client.html",
            //     controller: 'profileViewController',
            //     controllerAs: 'model',
            //     resolve: { loggedin: checkLoggedin }
            //
            // })
            .when("/profile",{
                templateUrl:"views/user/templates/profile-page.view.client.html",
                controller: 'profileViewController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }

            })
            .when("/test",{
                templateUrl:"views/user/templates/test-page.view.client.html",
                controller: 'profileViewController',
                controllerAs: 'model'
            })
            .otherwise({
                templateUrl: "views/user/templates/login-page.view.client.html",
                controller: 'loginController',
                controllerAs: 'model'
            })
    }



})();