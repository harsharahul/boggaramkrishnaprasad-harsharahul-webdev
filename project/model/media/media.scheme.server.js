module.exports = function() {
    var mongoose = require("mongoose");
    var MediaSchema = mongoose.Schema({
        user: [{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        guideboxId: String,
        title: String,
        type: String,
        poster: String,
        desc: String,
        //comment: String,
        //lastName: String,
        //email: String,
        //phone: String,
        //websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "project.media"});
    return MediaSchema;
};
