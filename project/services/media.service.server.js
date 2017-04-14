/**
 * Created by harsharahul on 07/04/17.
 */
module.exports = function (app, mediaModel) {

    app.get("/universalSearch/api/media/user", findMediaByUserId);
    app.get("/universalSearch/api/media/:mid", findMediaById);
    app.put("/universalSearch/api/media/:mid", updateMedia);
    app.post("/universalSearch/api/media", saveMedia);
    app.delete("/universalSearch/api/media/:mid", deleteMedia);


    function findMediaById(req,res) {
        var id = req.params.mid;

        var promise = mediaModel.findMediaById(id);
        promise
            .then(function (media) {
                if(media){
                    res.json(media);
                }
                else {
                    res.sendStatus(404);
                }
            }),function (err) {
            res.sendStatus(404);
        }
    }

    function findMediaByUserId(req,res) {

        if(!req.sessionID){
            res.sendStatus(419);
        }

        var userId = req.user._id;


        //var userId = req.params.uid;

        var promise = mediaModel.findMediaByUser(userId);
        promise
            .then(function (medias) {
                if(medias){
                    res.json(medias);
                }
                else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.sendStatus(404);

            })
    }

    function updateMedia(req,res) {
        var mediaId = req.params.mid;
        var updatedMedia = req.body;

        var promise = mediaModel.updateMedia(mediaId,updatedMedia);
        promise
            .then(function (media) {
                if(media){
                    res.json(media);
                }
                else
                {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.sendStatus(404);
            })
    }

    function saveMedia(req,res) {
        //console.log(req);
        //console.log(req.cookie);
        //console.log(req.sessionID);
        //console.log(req.session);
        //console.log(req.user);
        if(!req.sessionID)
            res.sendStatus(419);

        var newMedia = req.body;
        newMedia.user = req.user._id;

        console.log(newMedia);

        var promise = mediaModel.saveMedia(newMedia);

        promise
            .then(function (media) {
                if(media){
                    res.json(media);
                }
                else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.sendStatus(404);
            })
    }

    function deleteMedia(req,res) {
        var mediaId = req.params.mid;

        var promise = mediaModel.deleteMediaById(mediaId);

        promise
            .then(function (media) {
                if(media){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(200);
                }
            })
            .catch(function (err) {
                res.sendStatus(200);
            })
    }


}
