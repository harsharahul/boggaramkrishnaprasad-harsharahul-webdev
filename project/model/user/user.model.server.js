
module.exports = function () {

    var mongoose = require("mongoose");
    var UsersSchema = require('./user.schema.server')();
    var UsersModel = mongoose.model('UsersModel', UsersSchema);
    var model = null;


    var api = {
        "createUser": createUser,
        "findUserById":findUserById,
        "findUserbyUsername":findUserbyUsername,
        "findUserByCredentials":findUserByCredentials,
        "deleteUser":deleteUser,
        "updateUser":updateUser,
        "setModel":setModel,
        "getUsername":getUsername,
        "findUserByFacebookId": findUserByFacebookId,
        "getAllUsers": getAllUsers
    };

    return api;
    
    function findUserByFacebookId(facebookId) {
        return UsersModel.findOne({"facebook.id": facebookId});
    }

    function setModel(_model) {
        model = _model;
    }


    function getAllUsers() {
        return UsersModel.find();
    }


    function createUser(user) {
        delete user._id;
        user.dateCreated = Date.now();
        return UsersModel.create(user);
    }

    function findUserById(userId) {
        return UsersModel.findById(userId);
    }

    function findUserbyUsername(username) {
        return UsersModel.findOne({"username":username});
    }

    function findUserByCredentials(_username, _password) {
        return UsersModel.find({username:_username, password: _password});
    }

    function deleteUser(userId) {

        return UsersModel.findById({_id: userId})
            .then(function (user) {
                return UsersModel.remove({_id: userId});

            }, function (err) {
                return err;
            });
    }
    function updateUser(userId, updatedUser) {
        return UsersModel.update({_id:userId},{$set:updatedUser});
    }

    function getUsername(uid) {
         return UsersModel.findById({_id:uid});
    }

};
