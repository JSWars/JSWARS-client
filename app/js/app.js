"use strict";
define([
    'angular',
    'angular-ui-router',
    'angular-resource',
    'controllers',
    'factories',
    'directives',
    'filters'
], function () {
    var app;

    app = angular.module('tfg', [
        'ui.router'
    ]);

    return app;
});