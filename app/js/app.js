"use strict";
define([
	'angular',
	'angular-ui-router',
	'angular-resource',
	'angular-messages',
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
		'ngMessages',
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
