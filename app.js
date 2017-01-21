(function(){
    angular.module("app", ['attr.directives', 'elem.directives', 'comment.directives'])
        .controller('headerCtrl', function(){
            var that = this;
            this.logo = 'images/logo.jpg';
            //this.orientation = 'vertical';

        })
        .controller('asideCtrl', function(){
            var that = this;
            //TODO: Podría ser que no siempre en el aside existe una widget-area y
            //que sea esta la que tengqa que traerlos, puesto que si no se traerian en vano.
            //En asideCtrl solo nos encargamos de mostrar unos widgets u otros dependiendo la vista(o estado) y el user.
            //De momento suponemos una vista blog y que el user X, que en combinación tiene derecho a estos 3 widgets.
            //Esto puede estar establecido por un admin como en wordpress, el propio user como en Elgg o una mezcla de ambos.
            this.widgets = [
                {
                    title: 'Calendar',
                    slug: 'calendar',
                    template: 'templates/widget-calendar.html',
                    area: 1, //Aside
                    position: 1,
                },
                {
                    title: 'Facebook',
                    slug: 'facebook',
                    template: 'templates/widget-facebook.html',
                    area: 1,
                    position: 3,
                },
                {
                    title: 'Bookmarks',
                    slug: 'bookmarks',
                    template: 'templates/widget-bookmarks.html',
                    area: 1,
                    position: 2,
                    bookmarks: [
                        {
                            name: 'Github',
                            url: 'https://github.com'
                        },
                        {
                            name: 'GitLab',
                            url: 'https://gitlab.com'
                        },
                        {
                            name: 'BitBucket',
                            url: 'https://bitbucket.athlassian.com'
                        }
                    ]
                }
            ];
        });
})();
