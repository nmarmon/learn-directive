(function(){
    angular.module("app", ['attr.directives', 'elem.directives'])
        .controller('headerCtrl', function(){
            var that = this;
            this.logo = 'images/logo.jpg';
            //this.orientation = 'vertical';

        });
})();
