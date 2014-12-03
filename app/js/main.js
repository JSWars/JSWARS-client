"use strict";
// contents of main.js:
require.config({
    'baseUrl': './',
    'paths': {
        'app': 'js/app',
        'domReady': 'components/domReady/domReady',
        'angular': 'components/angular/angular',
        'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
    },
    'shim': {
        'angular': {
            'exports': 'angular'
        },
        'angular-ui-router': {
            'deps': ['angular']
        }
    }
});

require([
    'app',
    'domReady',
    'js/controllers/LoginCrtl',
    'js/controllers/common/NavbarCrtl'
], function (app, domReady) {

    app.run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    );

    app.config(
        ['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {

                /////////////////////////////
                // Redirects and Otherwise //
                /////////////////////////////

                // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
                $urlRouterProvider

                    // The `when` method says if the url is ever the 1st param, then redirect to the 2nd param
                    // Here we are just setting up some convenience urls.
                    .when('/c?id', '/contacts/:id')
                    .when('/user/:id', '/contacts/:id')

                    // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
                    .otherwise('/');


                //////////////////////////
                // State Configurations //
                //////////////////////////

                // Use $stateProvider to configure your states.
                $stateProvider

                    //////////
                    // Home //
                    //////////

                    .state("login", {
                        url: "/login",
                        templateUrl: './views/LoginView.html',
                        controller: "LoginController as Login"
                    })

                    ///////////
                    // About //
                    ///////////

                    .state('about', {
                        url: '/about'
                    });
            }
        ]
    )
    ;

    domReady(function () {
        angular.bootstrap(document.documentElement, [app.name]);
    });


})
;