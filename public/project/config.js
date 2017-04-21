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


            if (user.data !== '0') {

                $rootScope.currentUser = user.data;
                deferred.resolve();
            } else {

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

                    // $rootScope.currentUser = user;
                    deferred.resolve();
                } else {

                    deferred.reject();
                    $location.url('/');
                }
            });
        return deferred.promise;
    };

    var checkIsShow = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/isshow')
            .then(function(user) {

                $rootScope.errorMessage = null;

                if (user.data !== '0') {

                    deferred.resolve();
                } else {

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

                    $rootScope.currentUser = user.data;
                } else {
                    $location.url('/');
                }
            });
        //return deferred.promise;
    };



    function Config($routeProvider, $httpProvider) {

        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

        $routeProvider
            .when("/",{
                templateUrl:"views/movies/templates/mainDisplay.view.client.html",
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
            .when("/user/movie/:mid",{
                templateUrl:"views/movies/templates/details-page.view.client.html",
                controller: 'detailViewController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }
            })
            .when("/user/show/:mid",{
                templateUrl:"views/shows/templates/showDetail.view.client.html",
                controller: 'showDetailViewController',
                controllerAs: 'model',
                resolve: { checkIsShow: checkIsShow }
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
                templateUrl:"views/shows/templates/showsDisplay.view.client.html",
                controller: 'showsDisplayController',
                controllerAs: 'model',
                resolve: { checkIsShow: checkIsShow }
            })
            .when("/profile",{
                templateUrl:"views/user/templates/profile-page.view.client.html",
                controller: 'profileViewController',
                controllerAs: 'model',
                resolve: { loggedin: checkLoggedin }

            })
            .otherwise({
                templateUrl:"views/movies/templates/mainDisplay.view.client.html",
                controller: 'mainDisplayController',
                controllerAs: 'model',
                resolve: { user: loggedUser }
            })
    }



})();