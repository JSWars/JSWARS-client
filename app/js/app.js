"use strict";
define([
	'angular',
	'angular-ui-router',
	'angular-resource',
	'angular-ui-bootstrap',
	'angular-moment',
	'angular-easypiechart',
	'angular-file-upload',
	'controllers/Controllers',
	'services/Services',
	'factories/Factories',
	'directives/Directives',
	'filters/Filters'
], function () {
	var app;
	app = angular.module('tfg', [
		'ui.router',
		'ui.bootstrap',
		'ngResource',
		'angularFileUpload',
		'angularMoment',
		'easypiechart',
		'controllers',
		'services',
		'factories',
		'directives',
		'filters'
	]);

	return app;
});
