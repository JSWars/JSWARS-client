"use strict";
require.config({
    'baseUrl': 'js/',
    'paths': {
        'domReady': 'components/domReady/domReady',
        'jquery': 'components/jquery/dist/jquery',
        'bootstrap': 'components/bootstrap/dist/js/bootstrap',
        'moment': "components/moment/moment",
        'angular': 'components/angular/angular',
        'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
        'angular-ui-bootstrap': 'components/angular-bootstrap/ui-bootstrap-tpls',
        'angular-resource': 'components/angular-resource/angular-resource',
        'angular-moment' : 'components/angular-moment/angular-moment',
        'angular-easypiechart': 'components/jquery.easy-pie-chart/dist/angular.easypiechart',
        'appbootstrap': 'appbootstrap'
    },
    'shim': {
        'bootstrap': {
            'deps': ['jquery']
        },
        'angular': {
            'exports': 'angular'
        },
        'angular-ui-router': {
            'deps': ['angular']
        },
        'angular-ui-bootstrap': {
            'deps': ['angular']
        },
        'angular-resource': {
            'deps': ['angular']
        },
        'angular-moment': {
            'deps': ['angular']
        },
        'angular-easypiechart':{
            'deps': ['angular']
        },
        'approuter': {
            'deps': ['app']
        },
        'appbootstrap': {
            'deps': ['approuter']
        }
    },
    config: {
        moment: {
            noGlobal: true
        }
    },
    'priority': [
        "angular",
        "jquery"
    ]
});

require([
    'app',
    'approuter',
    'appbootstrap',
    'bootstrap',

    'factories/ConfigFactory',
    'factories/RankingsFactory',
    'factories/UserFactory',

    'controllers/SigninController',
    'controllers/SignupController',
    'controllers/RankingsController',
    'controllers/UserController',
    'controllers/RootController',
    'controllers/common/NavbarController',

    'directives/MapDirective',

    'services/StateService',

    'filters/CountryFilter'


], function (app) {
});