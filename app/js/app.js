"use strict";
define([
    'angular',
    'angular-ui-router',
    'angular-resource',
    'angular-ui-bootstrap',
    'controllers',
    'factories',
    'directives',
    'filters'
], function () {
    var app;

    app = angular.module('tfg', [
        'ui.router',
        'ngResource',
        'ui.bootstrap',
        'controllers',
        'factories',
        'directives',
        'filters'
    ]);

    return app;
});