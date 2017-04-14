module.exports = function (app) {
    var models = require('./model/models.server')();
    require("./services/user.service.server.js")(app,models.usersModel);
    require("./services/social.service.server.js")(app,models.socialModel, models.usersModel);
    //require("./services/user.service.server.js")(app,models.socialModel);
    require("./services/media.service.server.js")(app, models.mediaModel);
};
