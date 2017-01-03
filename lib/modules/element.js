(function(){
    angular.module("directives", [])
        .directive("myNav", function(){
            return {
                //Tipo de diretiva, es decir, que si ponemos my-nav como attibuto, class-name o comment no asociará está lógica al elemento.
    			restrict: 'E',
                //Le declaramos un alcance aislado, en lugar de usar el del padre.
                scope: {
                    //Se puede crear un alias del atributo para uso interno de la directiva.
                    myItems: '=items'
    			},
    			templateUrl: 'my-nav.html'
            }
        });
})();
