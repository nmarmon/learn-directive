(function(){
    angular.module("attr.directives", [])
        //Está directiva solo cogera el atributo src de un img e insertará el atributo del scope padre 'scope.logo'
        //este atrbuto deberá de ser la ruta al logo.
        .directive("myLogo", function(){
            return {
                //Tipo de diretiva, es decir, que si ponemos my-nav como attibuto, class-name o comment no asociará está lógica al elemento.
                restrict: 'A',
                //templateUrl: './templates/my-logo.html',
                link: function(scope, element, attrs){
                    //TOKNOW: Entender que es el objeto scope, por que no es directamente el padre,
                    //y si creamos el alcance propio de la directiva tampoco directamente el propio scope.
                    //Entonces para obtenerlo directamente es neceario el require: {} para traer el controller, ok, pero ...
                    //Entonces no entiendo para que es el scope en este caso.
                    console.log('scope:');
                    console.log(scope);
                    console.log('element:');
                    console.log(element);
                    console.log('attrs:');
                    console.log(attrs);
                    //TODO: Esta manera de acceder no es muy correcta puesto que el alias puede cambiar en la vista y fallaría.
                    //Quizás lo más correcto en este caso es requerir el controller del padre.
                    element[0].src = scope.vm.logo;
                }
            }
        })
        //Esta directiva va a permtir pasarle un HTML como anuncio de publicidad con su estructura y directivas con funcionalidad asociada.
        .directive("myBanner", function(){
            return {
                //Está directiva va a ser de 2 tipos, Element o Attribute.
                //Esto es así por que quizás sea conveniente usar de tipo article o si va a haber más de un banner
                // o de un solo elemento si no se necesita respetar la semántica u otros motivos.
                restrict: 'EA', //TOKNOW: Probando solo con la E y usandolo como attribute ha funcionado ¿¿??
                transclude: true,
                scope: {},
                link: function link(scope, element, attrs) {
                    console.log('myBanner link!!!!');
                    console.log(attrs);
                    console.log(scope);
                },
                templateUrl: './templates/my-banner.html',
            }
        })
        //Esta es una directiva de tipo atributo sin scope
        .directive("myTime", ['$interval', '$filter', myCurrentTimeFn ]);

    	function myCurrentTimeFn($interval, $filter) {
      		return {
    			link: function link(scope, element, attrs) {
                    console.log('myCurrentTimeFn link!!!!');
                    console.log(attrs);
                    console.log(scope);
    				//scope es cambiará dependiendo si hemos aislado el padre o no?
    				var format;
        			var timeoutId;
    				// cuando cambia myCurrentTime se ejecuta el callback
    				scope.$watch(attrs.myTime, cb$watch);
    				//El callback recoge value, que es el valor del attributo myTime y
                    //su valor lo metemos en la variable format y ejecutamos la funcion updateTime()....
    				function cb$watch(value) {
                        console.log('cambiando formato!!!!');
          				format = value;
          				updateTime();
        			}
                    //.. updateTime() inserta en el nodo de texto del elemento donde se ha declarado el atributo myTime
                    //con el formato indicado en format, que cada vez que cambie ejecutará de nuevo updateTime() para cambiar el formato.
    				function updateTime() {
    					//dateFilter es un filtro de Angular.
          				element.text($filter('date')(Date.now(), format, '+01'));
        			}

    				// Pero, esto no sería suficiente puesot que solo se ejecutaría una vez cuando se cambie el formato o al cargar la página.
                    // Para que se actualice el DOM (nodo de texto del elemento donde se inserte la directiva de tipo atributo, en este caso)...
                    // ...creamos un interval de para ejecutar upateTime() cada X tiempo.
    				//Lo guardamos en una variable, por que sucede que si no tiene un ID de variable, no podríamos destruirlo si no se destruye la página por completo.
                    //Y queremos destruirlo cuando se destruya el elemento, como hacemos justo después.
                    timeoutId = $interval(function() {
          				updateTime(); // update DOM
        			}, 1000);

                    //Cuando recibimos en evento de que el elemento se ha destruido (LifeCycle hooks) cancelamos el interval
    				element.on('$destroy', function() {
          				$interval.cancel(timeoutId);
        			});

	            }
	        };
        }

})();
