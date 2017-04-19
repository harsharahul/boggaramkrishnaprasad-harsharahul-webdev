
module.exports = function () {

    var mongoose = require("mongoose");
    var SocialSchema = require('./social.schema.server')();



    var SocialModel = mongoose.model('SocialModel', SocialSchema);
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

};
