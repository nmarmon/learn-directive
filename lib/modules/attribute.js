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
                templateUrl: './templates/my-banner.html',
            }
        });
})();
