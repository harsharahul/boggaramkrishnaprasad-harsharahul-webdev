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

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            console.log(type);
            return 'views/widget/widget-'+type+'-editor.view.client.html';
        };

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };

        function createAnewHTMLWidget()
        {
            var newWidget = WidgetService.createHTMLWidget();
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);
        };

        function createNewYoutubeWidget()
        {
            var newWidget = WidgetService.createNewYoutubeWidget();
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);
        };

        function createNewImageWidget(){
            var newWidget = WidgetService.createNewImageWidget();
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);
        };
        
        function createNewHeaderWidget() {
            var newWidget = WidgetService.createNewHeaderWidget();
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+newWidget);
        };

        function deleteWidget(){
            WidgetService.deleteWidgetById(vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        };

        function routeWidgetList(){
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        };

        function updateWidget(widget){
            WidgetService.updateWidget(widget, vm.widgetId);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        };
    }
})();
