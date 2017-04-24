module.exports = function (app, socialModel, userModel) {

    app.get("/universalSearch/api/social/all", getAllComments);
    app.get("/universalSearch/api/social/:tid", findThreadById);
    app.get("/universalSearch/api/social/media/:mid", findThreadByMediaId);
    app.get("/universalSearch/api/social/user/:uid", findThreadByUserId);
    app.put("/universalSearch/api/social/:tid", updateThread);
    app.post("/universalSearch/api/social", saveThread);
    app.delete("/universalSearch/api/social/:tid", deleteThread);


    function getAllComments(req,res) {

        var promise = socialModel.getAllComments();
        promise
            .then(function (thread) {
                if(thread){
                    res.json(thread);
                }
                else {
                    res.sendStatus(404);
                }
            }),function (err) {
            res.sendStatus(404);
        }
    }

    function findThreadById(req,res) {
        var id = req.params.tid;

        var promise = socialModel.findThreadById(id);

        promise
            .then(function (thread) {
                if(thread){
                    res.json(thread);
                }
                else {
                    res.sendStatus(404);
                }
            }),function (err) {
            res.sendStatus(404);
        }
    }

    function findThreadByMediaId(req,res) {
        var id = req.params.mid;

        var promise = socialModel.findThreadByMedia(id);

        promise
            .then(function (thread) {
                if(thread){
                    res.json(thread);
                }
                else {
                    res.sendStatus(404);
                }
            }),function (err) {
            res.sendStatus(404);
        }
    }

    function findThreadByUserId(req,res) {
        //var userId = req.params.uid;

        if(!req.sessionID)
            res.sendStatus(419);

        var userId = req.user._id;

        var promise = socialModel.findThreadByUser(userId);
        promise
            .then(function (thread) {
                if(thread){
                    res.json(thread);
                }
                else {
                    res.sendStatus(404);
                }
            })
            .catch(function (err) {
                res.sendStatus(404);

            })
    }

    function updateThread(req,res) {
        var threadId = req.params.tid;
        var updatedThread = req.body;

        var promise = socialModel.updateThread(threadId, updatedThread);
        promise
            .then(function (thread) {
                if(thread){
                    res.json(thread);
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

    function saveThread(req,res) {

        if(!req.sessionID){
            res.sendStatus(419);
        }


        var newThread = req.body;

        var localThread = new Object();
        localThread.comment  = newThread.comment;
        localThread.user =  req.user._id;//newThread.user;//taking from passport
        localThread.guideBoxMediaId = newThread.guideBoxMediaId;
        localThread.mediaName = newThread.mediaName;

        userModel.getUsername(localThread.user)
            .then(function (response) {
                if(!response.firstName && !response.lastName)
                    localThread.userName = response.firstName+ " "+ response.lastName;
                else
                    localThread.userName = response.username;
                var promise = socialModel.createThread(localThread);

                promise
                    .then(function (thread) {
                        if(thread){
                            res.json(thread);
                        }
                        else {
                            res.sendStatus(404);
                        }
                    })
                    .catch(function (err) {
                        res.sendStatus(404);
                    })

            }).catch(function (err) {
            console.log("Error in fetch username");
        })


    }

    function deleteThread(req,res) {

        var type = req.query.type;
        var id = req.query.id;
        var threadId = req.params.tid;

        var promise = socialModel.deleteThread(threadId);

        promise
            .then(function (thread) {
                if(thread){
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

