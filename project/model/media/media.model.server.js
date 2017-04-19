
module.exports = function () {

    var mongoose = require("mongoose");
    var MediaSchema = require('./media.scheme.server')();
    var MediaModel = mongoose.model('MediaModel', MediaSchema);

    var model = null;


    var api = {

         
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

};
