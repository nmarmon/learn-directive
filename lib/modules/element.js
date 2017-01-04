(function(){
    angular.module("elem.directives", [])
        .directive("myNav", function(){
            return {
                //Tipo de diretiva, es decir, que si ponemos my-nav como attibuto, class-name o comment no asociará está lógica al elemento.
    			restrict: 'E',
                //Le declaramos un alcance aislado, en lugar de usar el del padre.
                //TODO: Ahora podríamos usar el alcance del padre, solo quitando el scope:{}
                scope: {},
    			templateUrl: './templates/my-nav.html',
                link: function(scope, element, attrs){
                    scope.selected = '/';

                    scope.select = function(item){
                        scope.selected = item.name;
                    }
                    //TODO: Estos items se traerán de la BBDD, la duda es si los coge el headerCtrl o este mismo.
                    scope.items = [
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
                }


            }
        })
        .directive("myItems", function(){
            return {
                restrict: 'E',
                scope: {
                    items: '=',
                    onSelect: '&'
                },
                templateUrl: './templates/my-items.html',
                link: function(scope, element, attrs){

                }
            }
        });
})();
