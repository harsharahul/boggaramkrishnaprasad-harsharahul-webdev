/**
 * Created by harsharahul on 09/02/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, $location,WidgetService) {
        var vm = this;
        vm.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        vm.getTrustedHtml = getTrustedHtml;
        vm.getWidgetTemplateUrl = getWidgetTemplateUrl;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;

        vm.routeNewWidget = routeNewWidget;
        vm.routeProfile=routeProfile;

        function init() {
            //vm.widgets = WidgetService.findAllWidgets(vm.pageId);
            WidgetService
                .findAllWidgets(vm.pageId)
                .then(function (response) {
                    if(response.data){
                        vm.widgets = response.data;
                    }

                })
        }

        init();

        function getWidgetTemplateUrl(widgetType) {
            var url = 'views/widget/widget-'+widgetType+'.view.client.html';
            return url;
        }

        function getTrustedHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function getYouTubeEmbedUrl(widgetUrl) {
            var urlParts = widgetUrl.split('/');
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function routeNewWidget()
        {
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/new");
        };

        function routeProfile(){
            $location.url("/profile/"+vm.userId);
        };
    }
})();