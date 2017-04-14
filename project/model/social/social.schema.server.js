
module.exports = function() {
    var mongoose = require("mongoose");
    var SocialSchema = mongoose.Schema({
        user: [{type: mongoose.Schema.Types.ObjectId, ref:'UsersModel'}],
        userName: String,
        //media: [{type: mongoose.Schema.Types.ObjectId, ref:'MediaModel'}],
        guideBoxMediaId: String,
        comment: String,
        //lastName: String,
        //email: String,
        //phone: String,
        //websites: [{type: mongoose.Schema.Types.ObjectId, ref:'WebsiteModel'}],
        dateCreated: {type:Date, default: Date.now()}
    }, {collection: "project.social"});
    return SocialSchema;
};
