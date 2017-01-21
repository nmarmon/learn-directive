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
        })
        .directive("myWidgetArea", function(){
            return {
                restrict: 'E',
                transclude: true,
                //En este caso vamos a probar a usar el scope del padre, esto crea una dependencia de este componente de un scope padre,
                //pero como hemos dicho siempre un myWidgetArea va a depender de un controller de layout que tendrá sus widgets cargados.
                controller: function(){
                    //La tarea de este controller, que es el de asideCtrl o el del padre donde se incluya esta directiva es la de ordenar los widgets y reordenar si se tiene permiso para ello.
                    console.log('myWidgetArea Controller!');
                },
                templateUrl:  function(elem, attr) {
                    //De está manera vincularemos a la directiva un template u otro, gracias al atributo type.
                    //Devolvemos un template dinamico. Uno para cada widget.
            	    return 'templates/widget-area-' + attr.type + '.html';
                }
            }
        })
        .directive("myWidget", function(){
            return {
                restrict: 'E',
                scope:{
                    //TODO: Si los datos del widget vienen del padre, tendremos que hacer un binding, si van a subir datos desde el hijo un due binding,
                    //y si es este el que los recoge en base a el string pasado en widget un @. Cuando en base a un evento del hijo haya que ejecutar un método del padre pasandole datos, será un &.
                    widget: '<',
                    classes: '@',
                    onReorder: '&' //myWidgetArea se encarga de informar el nuevo orden a los hermanos de este.
                    //TODO: Asignar un capturador de evento a los widgets que deberán de ser dragables, dropables entre si.
                    //TODO: Cuando se cambie la posición de este widget se deberá notificar al padre para que actuie en consecuencia, en este cambiar al atributo order de todos los widgets, de este widget area.
                },
                //TODO: En este caso el asideCtrl ha traido todos los datos de los widgets,
                //pero hemos dicho que es cada widget el que debe de traer sus datos. Y esto habrá que hacerse en require o en link
                controller: function($scope){
                    console.log(this.widget);
                    console.log($scope.widget);
                    console.log('myWidget Controller!');
                    //con @ es el propio componente quien trae sus datos e inserta (STATELESS y SATATEFULL ??)
                    //$scope.widget = $HTTP.get(url+this.widget);
                    //con < es el padre el que le pasa un objeto que queda bindeado, en una o las dos direcciones, dependiendo la necesidad.
                    //$scope.widget = this.widget; //TOKNOW: Esto hay que hacerlo así?
                },
                templateUrl: 'templates/widget.html'
            }
        });
})();
