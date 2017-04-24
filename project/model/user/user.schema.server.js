
module.exports = function() {
    var mongoose = require("mongoose");
    var UsersSchema = mongoose.Schema({
        username: String,
        role: {type:String, enum:['ADMIN','MOVIE','SHOW','GUEST']},
        password: String,
        firstName: String,
        lastName: String,
        email: String,

        dateCreated: {type:Date, default: Date.now()},

        facebook: {
            id:    String,
            token: String
        },

        messages:[{
                id: String,
                name: String,
                message:String
            }]

    }, {collection: "project.users"});
    return UsersSchema;
};
