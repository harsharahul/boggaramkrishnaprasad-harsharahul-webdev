(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams,$location, WidgetService) {
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
        vm.routeNewWidget = routeNewWidget;
        vm.routeFlickr = routeFlickr;

        function init() {
            //vm.widget = WidgetService.findWidgetById(vm.widgetId);
            console.log(vm.widgetId);
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    if(response.data){

                        vm.widget = response.data;
                        console.log(vm.widget);
                    }
                })
        }
        init();

        function getEditorTemplateUrl(type) {
            //console.log(type.toString()+"hi");
            if(type){
                return 'views/widget/widget-'+type+'-editor.view.client.html';
            }
        };

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };

        function deleteWidget(){
            WidgetService
                .deleteWidgetById(vm.widgetId)
                .then(function (response) {
                    if(response.data){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                })
        };

        function routeWidgetList(){
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
        };

        function updateWidget(widget){
            WidgetService
                .updateWidget(widget, vm.widgetId)
                .then(function (response) {
                    if(response.data){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }
                })
        };

        function routeNewWidget()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new");
        };

        function routeFlickr() {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widgetId+"/flickrsearch");
        }
    }
})();