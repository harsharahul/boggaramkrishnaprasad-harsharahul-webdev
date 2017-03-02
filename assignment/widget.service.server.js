module.exports = function (app) {
    var widgets = [
        {_id: "123", widgetType : "HEADER", pageId: "321", size:"1", text: "GIZMODO"},
        {_id: "234", widgetType : "HEADER", pageId: "123", size:"4", text: "Something"},
        {_id: "345", widgetType : "IMAGE", pageId: "321", width:"100%", url : "https://s-media-cache-ak0.pinimg.com/originals/a2/2a/0a/a22a0a7e624943303b23cc326598c167.jpg"},
        {_id: "666", widgetType : "HEADER", pageId: "321", size:"4", text: "Newssss"},
        {_id: "777", widgetType : "IMAGE", pageId: "321", width:"100%", url : "https://i.kinja-img.com/gawker-media/image/upload/s--ED7QVZP0--/c_scale,fl_progressive,q_80,w_800/ecfupc12g0erm3rveesg.jpg"},
        {_id: "456", widgetType : "HTML", pageId: "123", text: "<p>Some text of paragraph</p>"},
        {_id: "567", widgetType : "HEADER", pageId: "321", size:"5", text: "Something else"},
        {_id: "678", widgetType : "YOUTUBE", pageId: "321", width:"75%", url: "https://www.youtube.com/embed/vlDzYIIOYmM"},
        {_id: "789", widgetType : "HTML", pageId: "321", text: "<p>Lorem <i>Ipsum</i> something</p>"}
    ];

    var multer = require('multer'); // npm install multer --save
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname+"/../public/uploads")
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

    function createImageWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "IMAGE";
        widget.pageId = pageId;
        widget.width = "100%";
        widget.url ="";
        //widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function createHtmlWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "HTML";
        widget.pageId = pageId;
        widget.text = "Hello"
        //widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function createYoutubeWidget(req,res) {
        var pageId = req.params.pageId;
        var widget = new Object();
        widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "YOUTUBE";
        widget.pageId = pageId;
        widget.url = "";
        widget.width = "100%";
        //widget.tag = "new"
        widgets.push(widget);
        res.send(widget._id);
    }

    function createHeaderWidget(req,res) {
        var pageId = req.params.pageId;

        console.log("server side "+ pageId);
        var widget = new Object();
        widget._id = (parseInt(widgets[widgets.length -1]._id) + 1).toString();
        widget.widgetType = "HEADER";
        widget.pageId = pageId;
        widget.size ="4" ;
        widget.text = "Header";
        //widget.tag = "new"
        widgets.push(widget);
        //return widget._id;
        res.send(widget._id);
    }


    function findAllWidgetsForPage(req, res){
        var pageId = req.params.pageId;
        var widgetsList = widgets.filter(function(widget){
            return widget.pageId === pageId;
        });
        res.json(widgetsList);
    }
    function findWidgetById(req, res){
        var widgetId = req.params.widgetId;
        var widget = widgets.find(function (widget) {
            return widget._id === widgetId;
        })
        res.json(widget);
    }
    function updateWidget(req, res){
        var wgid = req.params.widgetId;
        var updatedWidget = req.body;
        for(var i in widgets) {
            var widget = widgets[i];
            if( widget._id === wgid) {
                widgets[i] = updatedWidget;
                res.json(widget);
                return;
            }
        }
        res.sendStatus(404);
    }
    function deleteWidget(req, res){
        var wgid = req.params.widgetId;
        for(var i in widgets) {
            var widget = widgets[i];
            if( widget._id === wgid ) {
                widgets.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function uploadImage(req, res){
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var uid = req.body.userId;
        var wid = req.body.websiteId;
        var myFile = req.file;

        var originalname = myFile.originalname; // File name on user's computer
        var path = myFile.path; // full path of uploaded file
        var destination = myFile.destination; // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var imageWidget = widgets.find(function (widget) {
            return widget._id == widgetId;
        })
        imageWidget.width = width;
        imageWidget.url = req.protocol + '://' +req.get('host')+"/uploads/"+myFile.filename;
        res.redirect("/assignment/#!/user/"+uid+"/website/"+wid+"/page/"+imageWidget.pageId+"/widget");
    }
}