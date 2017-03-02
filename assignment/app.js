/**
 * Created by harsharahul on 28/02/17.
 */
module.exports = function (app) {
    require("./user.service.server.js")(app);
    require("./website.service.server.js")(app);
    require("./page.service.server.js")(app);
    require("./widget.service.server.js")(app);
};
