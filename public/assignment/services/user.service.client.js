/**
 * Created by harsharahul on 08/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .factory('UserService', userService);

    function userService($http) {
        // var users = [
        //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        //     {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        // ];

        var api = {
            //"users": users,
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "createUser": createUser,
            "findUserByUsername":findUserByUsername,
            "updateUser":updateUser,
            "deleteUser":deleteUser
        };
        return api;

        function updateUser(userId, newUser) {
            // for(var u in users) {
            //     var user = users[u];
            //     if( user._id === userId ) {
            //         users[u].firstName = newUser.firstName;
            //         users[u].lastName = newUser.lastName;
            //         return user;
            //     }
            // }
            // return null;
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            // for(var u in users) {
            //     var user = users[u];
            //     if( user._id === uid ) {
            //         return angular.copy(user);
            //     }
            // }
            // return null;
            return $http.get("/api/user/"+uid)
        }

        function findUserByCredentials(username, password) {
            // for(var u in users) {
            //     var user = users[u];
            //     if( user.username === username &&
            //         user.password === password) {
            //         return user;
            //     }
            // }
            // return null;
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function createUser(user) {
            // users.push(user);
            // return null;
            return $http.post("/api/user", user);

        }

        function findUserByUsername(username) {
            // for(var u in users) {
            //     var user = users[u];
            //     if( user.username === username ){
            //         return angular.copy(user);
            //     }
            // }
            // return null;
            return $http.get("/api/user?username="+username);

        }

        function updateUser(userId, user) {
            // for(var u in users) {
            //     var user = users[u];
            //     if( user._id === userId ){
            //         users[u]._id = user._id;
            //         users[u].username = user.username;
            //         users[u].password = user.password;
            //         users[u].firstName = user.firstName;
            //         users[u].lastName = user.lastName;
            //
            //         return users[u];
            //     }
            // }
            // return null;
            return $http.put("/api/user/"+userId, user);

        }

        function deleteUser(userId) {
            // for(var u in users) {
            //     var user = users[u];
            //     if( user._id === userId ){
            //         users.splice(user,1);
            //     }
            // }
            // return null;
            return $http.delete('/api/user/'+userId);

        }
    }
})();