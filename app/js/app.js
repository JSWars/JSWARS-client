"use strict";
define([
    'angular',
    'angular-ui-router',
    'angular-resource',
    'angular-ui-bootstrap',
    'controllers/Controllers',
    'services/Services',
    'factories/Factories',
    'directives/Directives',
    'filters/Filters'
], function () {
    var app;
    app = angular.module('tfg', [
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'controllers',
        'services',
        'factories',
        'directives',
        'filters'
    ]);

    return app;
});