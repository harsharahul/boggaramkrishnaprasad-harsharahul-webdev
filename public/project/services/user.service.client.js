(function(){
    angular
        .module("UniversalSearchApp")
        .factory('UserService', userService);

    function userService($http) {


        var api = {
            //"users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "getCurrentUser": getCurrentUser,
            "createUser": createUser,
            "findUserByUsername":findUserByUsername,
            //"updateUser":updateUser,
            "deleteUser":deleteUser,
            "getAllUsers": getAllUsers,
            "login":login,
            "logout": logout,
            "register": register,
            "deleteUserById":deleteUserById,
            "updateUserByID":updateUserByID
        };
        return api;

        function deleteUserById(id) {
            console.log(id);
            console.log("client service user");
            return $http.delete("/universalSearch/api/user/"+id);
        }

        function register(user) {
            return $http.post("/api/register", user);
        }

        function logout(user) {
            return $http.post("/api/logout");
        }


        function login(user) {
            return $http.post("/api/login", user);
        }

        // function updateUser(userId, newUser) {
        //     return $http.put("/universalSearch/api/user/"+userId, newUser);
        // }

        function getAllUsers() {
            return $http.get("/universalSearch/api/user/all");
        }
        // function findUserById(uid) {
        //     return $http.get("/universalSearch/api/user/"+uid)
        // }

        function getCurrentUser() {
            return $http.get("/universalSearch/api/loggeduser");
        }

        function findUserByCredentials(username, password) {
            return $http.get("/universalSearch/api/user?username="+username+"&password="+password);
        }

        function createUser(user) {
            return $http.post("/universalSearch/api/user", user);
        }

        function findUserByUsername(username) {
            return $http.get("/universalSearch/api/user?username="+username);
        }

        // function updateUser(userId, user) {
        //     return $http.put("/universalSearch/api/user/"+userId, user);
        // }

        function updateUser(user) {
            return $http.put("/universalSearch/api/user", user);
        }

        function updateUserByID(user) {
            return $http.put("/universalSearch/api/user/"+user._id, user);
        }
        // function deleteUser(userId) {
        //     return $http.delete('/universalSearch/api/user/'+userId);
        // }

        function deleteUser() {
            return $http.delete('/universalSearch/api/user');
        }
    }
})();