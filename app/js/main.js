"use strict";
require.config({
    'baseUrl': 'js/',
    'paths': {
        'domReady': 'components/domReady/domReady',
        'angular': 'components/angular/angular',
        'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
        'angular-resource': 'components/angular-resource/angular-resource',
        'controllers': 'controllers',
        'factories': 'factories',
        'directives': 'directives',
        'filters': 'filters'
    },
    'shim': {
        'angular': {
            'exports': 'angular'
        },
        'angular-ui-router': {
            'deps': ['angular']
        },
        'angular-resource': {
            'deps': ['angular']
        },
        'controllers': {
            deps: ['angular']
        },
        'factories': {
            deps: ['angular']
        },
        'directives': {
            deps: ['angular']
        },
        'filters': {
            deps: ['angular']
        }
    }
});

require([
    'app',
    'domReady',
    'controllers/SigninCrtl',
    'controllers/common/NavbarCrtl'
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

                    .rule(function ($injector, $location) {

                        var path = $location.path();
                        var hasTrailingSlash = path[path.length - 1] === '/';

                        if (hasTrailingSlash) {

                            //if last charcter is a slash, return the same url without the slash
                            var newPath = path.substr(0, path.length - 1);
                            return newPath;
                        }

                    })

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
                    .state("signin", {
                        url: "/signin",
                        templateUrl: '../views/SigninView.html',
                        controller: "SigninController as Signin"
                    })
                    .state("signup", {
                        url: "/signup",
                        templateUrl: '../views/SignupView.html',
                        controller: "SignupController as Signup"
                    })

                    .state('about', {
                        url: '/about'
                    });
            }
        ]
    );

    domReady(function () {
        angular.bootstrap(document.documentElement, [app.name]);
    });


})
;