/**
 * Created by harsharahul on 15/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams,$location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.routeProfile =routeProfile;
        vm.deleteWidget = deleteWidget;
        vm.routeWidgetList = routeWidgetList;
        vm.updateWidget = updateWidget;
        vm.createAnewHTMLWidget = createAnewHTMLWidget;
        vm.createNewYoutubeWidget=createNewYoutubeWidget;
        vm.createNewImageWidget = createNewImageWidget;
        vm.createNewHeaderWidget =createNewHeaderWidget;


        console.log("in widget new controller");
        console.log(vm.userId);
        console.log(vm.websiteId);
        console.log(vm.pageId);
        //console.log(vm.widgetId);

        function init() {
            //vm.widget = WidgetService.findWidgetById(vm.widgetId);

            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    if(response.data){
                        vm.widget = response.data;
                    }
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/widget-'+type+'-editor.view.client.html';
        };

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };

        function createAnewHTMLWidget()
        {
            // var newWidget = WidgetService.createHTMLWidget();
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);

            WidgetService
                .createHTMLWidget(vm.pageId)
                .then(function (response) {
                    if(response.data){
                        var newWidgetId = response.data;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidgetId);
                    }
                })
        };

        function createNewYoutubeWidget()
        {
            // var newWidget = WidgetService.createNewYoutubeWidget();
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);
            WidgetService
                .createNewYoutubeWidget(vm.pageId)
                .then(function (response) {
                    if(response.data){
                        var newWidgetId = response.data;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidgetId);

                    }
                })

        };

        function createNewImageWidget(){
            // var newWidget = WidgetService.createNewImageWidget();
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);

            WidgetService
                .createNewImageWidget(vm.pageId)
                .then(function (response) {
                    if(response.data) {
                        var newWidgetId = response.data;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidgetId);
                    }
                })
        };
        
        function createNewHeaderWidget() {
            // var newWidget = WidgetService.createNewHeaderWidget();
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);

            WidgetService
                .createNewHeaderWidget(vm.pageId)
                .then(function (response) {
                    if(response.data){
                        var newWidgetId = response.data;

                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidgetId);
                    }
                })
        };

        function deleteWidget(){
            // WidgetService.deleteWidgetById(vm.widgetId);
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

            WidgetService
                .deleteWidgetById(vm.widgetId)
                .then(function (response) {
                    if(response.data){
                        //var newWidget = response.data;
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                })
        };

        function routeWidgetList(){
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        };

        function updateWidget(widget){
            // WidgetService.updateWidget(widget, vm.widgetId);
            // $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");

            WidgetService
                .updateWidget(widget, vm.widgetId)
                .then(function (response) {
                    if(response.data){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                })
        };
    }
})();
