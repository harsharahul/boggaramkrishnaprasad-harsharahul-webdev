
module.exports = function () {

    var mongoose = require("mongoose");
    var SocialSchema = require('./social.schema.server')();

    //var UsersSchema = require('./services/user.schema.server')();


    var SocialModel = mongoose.model('SocialModel', SocialSchema);
    // var UsersModel = SocialModel.model.usersModel;
    var model = null;


    var api = {

         "setModel":setModel,
         "createThread":createThread,
         "findThreadByUser": findThreadByUser,
         "findThreadByMedia": findThreadByMedia,
         "findThreadById": findThreadById,
         "updateThread": updateThread,
         "deleteThread": deleteThread,
         "getAllComments": getAllComments,
         "deleteThreadByUserId":deleteThreadByUserId
    };

    return api;

    function deleteThreadByUserId(uid) {
        return SocialModel.remove({"user":uid});
    }

    function getAllComments() {
        return SocialModel.find();
    }

    function setModel(_model) {
        model = _model;
    }

    function createThread(thread) {
        delete thread._id;
        thread.dateCreated = Date.now();
        return SocialModel.create(thread);
    }

    function findThreadByUser(uid) {
        return SocialModel.find({"user":uid});
    }

    function findThreadByMedia(mid) {
        return SocialModel.find({"guideBoxMediaId":mid});
    }

    function findThreadById(tid) {
        return SocialModel.find({_id: tid});
    }

    function updateThread(tid, updatedThread) {
        return SocialModel.update({_id:tid},{$set:updatedThread});
    }

    function deleteThread(tid) {
        return SocialModel.remove({_id: tid})
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
