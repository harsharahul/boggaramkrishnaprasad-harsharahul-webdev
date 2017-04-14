module.exports = function () {

    var usersModel       = require("./user/user.model.server")();
    var mediaModel    = require("./media/media.model.server")();
    var socialModel       = require("./social/social.model.server")();
    //var widgetModel     = require("./widget/widget.model.server")();

    var model = {
        usersModel: usersModel,
        mediaModel: mediaModel,
        socialModel:socialModel
        //widgetModel:widgetModel
    };

    usersModel.setModel(model);
    mediaModel.setModel(model);
    socialModel.setModel(model);
    //widgetModel.setModel(model);

    return model;
};