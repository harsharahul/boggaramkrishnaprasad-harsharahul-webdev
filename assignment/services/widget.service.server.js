module.exports = function (app, widgetModel) {
    // var widgets = [
    //     {_id: "123", widgetType : "HEADER", pageId: "321", size:"1", text: "GIZMODO"},
    //     {_id: "234", widgetType : "HEADER", pageId: "123", size:"4", text: "Something"},
    //     {_id: "345", widgetType : "IMAGE", pageId: "321", width:"100%", url : "https://s-media-cache-ak0.pinimg.com/originals/a2/2a/0a/a22a0a7e624943303b23cc326598c167.jpg"},
    //     {_id: "666", widgetType : "HEADER", pageId: "321", size:"4", text: "Newssss"},
    //     {_id: "777", widgetType : "IMAGE", pageId: "321", width:"100%", url : "https://i.kinja-img.com/gawker-media/image/upload/s--ED7QVZP0--/c_scale,fl_progressive,q_80,w_800/ecfupc12g0erm3rveesg.jpg"},
    //     {_id: "456", widgetType : "HTML", pageId: "123", text: "<p>Some text of paragraph</p>"},
    //     {_id: "567", widgetType : "HEADER", pageId: "321", size:"5", text: "Something else"},
    //     {_id: "678", widgetType : "YOUTUBE", pageId: "321", width:"75%", url: "https://www.youtube.com/embed/vlDzYIIOYmM"},
    //     {_id: "789", widgetType : "HTML", pageId: "321", text: "<p>Lorem <i>Ipsum</i> something</p>"}
    // ];

    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+"/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now()+ '.' +extension)
        }
    });
    var upload = multer({storage: storage});
    app.post("/api/upload",upload.single('myFile'), uploadImage);

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post("/api/page/:pageId/widget_image", createImageWidget);
    app.post("/api/page/:pageId/widget_html", createHtmlWidget);
    app.post("/api/page/:pageId/widget_youtube", createYoutubeWidget);
    app.post("/api/page/:pageId/widget_header", createHeaderWidget);
    app.post("/api/page/:pageId/widget_text", createTextWidget);
    app.put("/page/:pageId/widget", WidgetsOrderUpdate);

    function createTextWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "TEXT";
        widget.pageId = pageId;
        widget.name = "Default";
        widget.formatted = false;
        widget.rows = 2;
        widget.placeholder = "ABCD";
        widget.text = "BLAHH";
        //widget.width = "100%";
        //widget.url ="";
        //widget.tag = "new"
        // widgets.push(widget);
        // res.send(widget._id);

        var promise = widgetModel
            .createWidget(pageId, widget);
        promise
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function createImageWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "IMAGE";
        widget.pageId = pageId;
        widget.width = "100%";
        widget.url ="";
        //widget.tag = "new"
        // widgets.push(widget);
        // res.send(widget._id);

        var promise = widgetModel
            .createWidget(pageId, widget);
        promise
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function createHtmlWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "HTML";
        widget.pageId = pageId;
        widget.text = "Hello"
        //widget.tag = "new"
        // widgets.push(widget);
        // res.send(widget._id);

        var promise = widgetModel
            .createWidget(pageId, widget);
        promise
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function createYoutubeWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        //widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "YOUTUBE";
        widget.pageId = pageId;
        widget.url = "";
        widget.width = "100%";
        //widget.tag = "new"
        // widgets.push(widget);
        // res.send(widget._id);

        var promise = widgetModel
            .createWidget(pageId, widget);
        promise
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function createHeaderWidget(req,res) {
        var pageId = req.params.pageId;

        console.log("server side "+ pageId);
        var widget = new Object();
        //widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "HEADER";
        widget.pageId = pageId;
        widget.size ="4" ;
        widget.text = "Header";
        //widget.tag = "new"
        // widgets.push(widget);
        // //return widget._id;
        // res.send(widget._id);

        var promise = widgetModel
            .createWidget(pageId, widget);
        promise
            .then(function (widget) {
                console.log("widget createde");
                console.log(widget);
                res.json(widget);
            }, function (err) {
                console.log("sending error");
                res.sendStatus(404);
            });
    }

    function WidgetsOrderUpdate(req, res)
    {
        var start = parseInt(req.query.initial);
        var end = parseInt(req.query.final);
        var pageId = req.params.pageId;
        //widgets.splice(end, 0, widgets.splice(start, 1)[0]);

        var promise = widgetModel
            .reorderWidget(pageId, start, end);
        promise
            .then (function (result)
            {
                res.sendStatus(result)
            }, function (err)
            {
                res.sendStatus(404)
            })

    }

    function findAllWidgetsForPage(req, res){
        // var pageId = req.params.pageId;
        // var widgetsList = widgets.filter(function(widget){
        //     return widget.pageId === pageId;
        // });
        // res.json(widgetsList);


        var promise = widgetModel
            .findAllWidgetsForPage(req.params.pageId);
        promise
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function findWidgetById(req, res){
        // var widgetId = req.params.widgetId;
        // var widget = widgets.find(function (widget) {
        //     return widget._id === widgetId;
        // })
        // res.json(widget);

        var promise = widgetModel
            .findWidgetById(req.params.widgetId);
        promise
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.sendStatus(404);
            });
    }

    // Might need update to the function to support the flicker image
    function updateWidget(req, res){
        // var wgid = req.params.widgetId;
        // var updatedWidget = req.body;
        // for(var i in widgets) {
        //     var widget = widgets[i];
        //     if( widget._id === wgid) {
        //         widgets[i] = updatedWidget;
        //         res.json(widget);
        //         return;
        //     }
        // }
        // res.sendStatus(404);

        var updatedWidget = req.body;

        var promise = widgetModel
            .updateWidget(req.params.widgetId, updatedWidget);
        promise
            .then(function (response) {
                // if(response.nModified === 1 && response.ok === 1 && response.n === 1){
                if(response.ok === 1 && response.n === 1){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(404);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }
    function deleteWidget(req, res){
        var wgid = req.params.widgetId;
        // for(var i in widgets) {
        //     var widget = widgets[i];
        //     if( widget._id === wgid ) {
        //         widgets.splice(i,1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);

        var promise = widgetModel
            .deleteWidget(wgid);
        promise
            .then(function (response) {
                if(response.result.n == 1 && response.result.ok == 1){
                    res.sendStatus(200);
                }
            }, function (err) {
                res.sendStatus(404);
            });
    }

    function uploadImage(req, res){
        console.log("Server side upload Image Func");
        console.log("HELLOOOO")

        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var uid = req.body.userId;
        var pid = req.body.pageId;
        var wid = req.body.websiteId;
        var myFile = req.file;

        var originalname = myFile.originalname; // File name on user's computer
        var path = myFile.path; // full path of uploaded file
        console.log("Path of the image"+path);
        var destination = myFile.destination; // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        // var imageWidget = widgets.find(function (widget) {
        //     return widget._id == widgetId;
        // })
        // imageWidget.width = width;
        // imageWidget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
        // res.redirect("/assignment/#!/user/"+uid+"/website/"+wid+"/page/"+imageWidget.pageId+"/widget");

        var promise = widgetModel
            .findWidgetById(widgetId);
        promise
            .then(function (widget)
            {
                widget.width = width;
                widget.url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                widgetModel
                    .updateWidget(widgetId, widget)
                    .then(function (updated)
                    {
                        console.log("successful change");
                        console.log(uid);
                        console.log(wid);
                        console.log(pid);

                        res.redirect("/assignment/#!/user/" + uid + "/website/" + wid + "/page/" + pid + "/widget");
                        //res.redirect("/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                        //res.redirect("/assignment/#!/user/58d21b3ae58af3db7bb006c9/website/58d2a61ea80f0de271362676/page/58d32af0afd508f3029769ea/widget");

                        res.sendStatus(200);
                    }, function (error)
                    {
                        console.log(error)
                        res.sendStatus()
                    })

            }, function (error)
            {
                console.log(error)
                res.sendStatus(404)


            })
    }
}