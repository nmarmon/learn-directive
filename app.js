(function(){
    angular.module("app", ['directives'])
        .controller('navCtrl', function(){
            var that = this;
            this.items = [
                {
                    name: 'portada',
                    route: '/',
                    order: null
                },
                {
                    name: 'blog',
                    route: 'blog',
                    order: null
                },
                {
                    name: 'gallery',
                    route: 'gallery',
                    order: null,

                }
            ];
            //this.orientation = 'vertical';

        });
})();
