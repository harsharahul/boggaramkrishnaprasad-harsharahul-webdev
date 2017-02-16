(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "https://i.kinja-img.com/gawker-media/image/upload/s--UE7cu6DV--/c_scale,fl_progressive,q_80,w_800/xoo0evqxzxrrmrn4ayoq.jpg"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": '<p>Anker’s kevlar-reinforced PowerLine cables are <a href="http://gear.lifehacker.com/your-favorite-lightning-cables-anker-powerline-and-pow-1782036601" target="_blank" rel="noopener">far and away our readers’ top choice for charging their gadgets</a>, and you can save on several models today, including some from the nylon-wrapped PowerLine+ collection. I use these cables every single day, and I’ve never had one fray or stop working. Just be sure to note the promo codes below.<br></p>'},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        this.findAllWidgets = findAllWidgets;
        this.findWidgetById = findWidgetById;
        this.deleteWidgetById = deleteWidgetById;
        this.updateWidget = updateWidget;
        this.createHTMLWidget = createHTMLWidget;
        this.createNewYoutubeWidget = createNewYoutubeWidget;
        this.createNewImageWidget = createNewImageWidget;
        this.createNewHeaderWidget = createNewHeaderWidget;

        function findAllWidgets(pageId) {
            return widgets;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }


        function createHTMLWidget()
        {
            var newWidget = new Object();
            newWidget._id = "234234";
            newWidget.widgetType = "HTML";
            newWidget.pageId = "321";
            widgets.push(newWidget);
            return newWidget._id;

        };

        function createNewYoutubeWidget()
        {
            var newWidget = new Object();
            newWidget._id = "1122";
            newWidget.widgetType = "YOUTUBE";
            newWidget.pageId = "321";
            widgets.push(newWidget);
            return newWidget._id;
        };

        function createNewHeaderWidget(){
            var newWidget = new Object();
            newWidget._id = "1166";
            newWidget.widgetType = "HEADER";
            newWidget.pageId = "321";
            widgets.push(newWidget);
            return newWidget._id;
        };

        function createNewImageWidget(){
            var newWidget = new Object();
            newWidget._id = "1177";
            newWidget.widgetType = "IMAGE";
            newWidget.pageId = "321";
            widgets.push(newWidget);
            return newWidget._id;
        };

        function deleteWidgetById(widgetId){
            for(var w in widgets){
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w,1);
                }
            }
        }

        function updateWidget(widget,widgetId){
            for(var w in widgets){
                if(widgets[w]._id === widgetId) {
                    widgets[w]= widget;
                }
            }
        }
    }
})();