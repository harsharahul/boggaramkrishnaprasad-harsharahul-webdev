
module.exports = function() {
    var mongoose = require("mongoose");
    var SocialSchema = mongoose.Schema({
        user: [{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        userName: String,
        guideBoxMediaId: String,
        comment: String,
        mediaName: String,
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "project.social"});
    return SocialSchema;
};
