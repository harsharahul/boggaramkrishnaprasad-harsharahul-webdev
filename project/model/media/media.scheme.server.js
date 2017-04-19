module.exports = function() {
    var mongoose = require("mongoose");
    var MediaSchema = mongoose.Schema({
        user: [{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        guideboxId: String,
        title: String,
        type: String,
        poster: String,
        desc: String,
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "project.media"});
    return MediaSchema;
};
