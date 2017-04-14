
module.exports = function () {

    var mongoose = require("mongoose");
    var MediaSchema = require('./media.scheme.server')();
    var MediaModel = mongoose.model('MediaModel', MediaSchema);

    var model = null;


    var api = {
        // "createUser": createUser,
        // "findUserById":findUserById,
        // "findUserbyUsername":findUserbyUsername,
        // "findUserByCredentials":findUserByCredentials,
        // "deleteUser":deleteUser,
        // "updateUser":updateUser,
         
        "setModel":setModel,
        "saveMedia":saveMedia,
        "findMediaByUser": findMediaByUser,
        "updateMedia": updateMedia,
        "deleteMediaById": deleteMediaById,
        "deleteMediaByUser":deleteMediaByUser
    };

    return api;

    function setModel(_model) {
        model = _model;
    }

    function saveMedia(media) {
        delete media._id;
        return MediaModel.create(media);
    }

    function findMediaByUser(uid) {
        return MediaModel.find({"user":uid});
    }

    function updateMedia(mediaId, updatedMedia) {
        return MediaModel.update({_id:mediaId},{$set:updatedMedia});
    }
    
    function deleteMediaById(mediaId) {
        return MediaModel.remove({_id: mediaId})
            .then(function (res) {
               if(res.result.n == 1 && res.result.ok == 1){
                   return res;
               }
            }, function (err) {
                return err;
            });
    }

    function deleteMediaByUser(userId) {
        return MediaModel.remove({user: userId})
            .then(function (res) {
                if(res.result.ok == 1){
                    return res;
                }
            }, function (err) {
                return err;
            });
    }
    // function recursiveDelete(websitesOfUser, userId) {
    //     if(websitesOfUser.length == 0){
    //         return UserModel.remove({_id: userId})
    //             .then(function (response) {
    //                 if(response.result.n == 1 && response.result.ok == 1){
    //                     return response;
    //                 }
    //             }, function (err) {
    //                 return err;
    //             });
    //     }
    //
    //     return model.websiteModel.deleteWebsiteAndChildren(websitesOfUser.shift())
    //         .then(function (response) {
    //             if(response.result.n == 1 && response.result.ok == 1){
    //                 return recursiveDelete(websitesOfUser, userId);
    //             }
    //         }, function (err) {
    //             return err;
    //         });
    // };

    // function createUser(user) {
    //     delete user._id;
    //     return UserModel.create(user);
    // }
    //
    // function findUserById(userId) {
    //     return UserModel.findById(userId);
    // }
    //
    // function findUserbyUsername(username) {
    //     return UserModel.find({"username":username});
    // }
    //
    // function findUserByCredentials(_username, _password) {
    //     return UserModel.find({username:_username, password: _password});
    // }
    //
    // function deleteUser(userId) {
    //     return UserModel.findById({_id: userId})
    //         .then(function (user) {
    //             var websitesOfUser = user.websites;
    //             return recursiveDelete(websitesOfUser, userId);
    //         }, function (err) {
    //             return err;
    //         });
    // }
    // function updateUser(userId, updatedUser) {
    //     return UserModel.update({_id:userId},{$set:updatedUser});
    // }

};
