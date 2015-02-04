"use strict";
require.config({
	'baseUrl': 'js/',
	'paths': {
		'domReady': 'components/domReady/domReady',
		'jquery': 'components/jquery/dist/jquery',
		'bootstrap': 'components/bootstrap/dist/js/bootstrap',
		'moment': 'components/moment/moment',
		'angular': 'components/angular/angular',
		'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
		'angular-ui-bootstrap': 'components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-resource': 'components/angular-resource/angular-resource',
		'angular-moment': 'components/angular-moment/angular-moment',
		'angular-easypiechart': 'components/jquery.easy-pie-chart/dist/angular.easypiechart',
		'angular-file-upload': 'components/angular-file-upload/angular-file-upload',
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
		'angular-easypiechart': {
			'deps': ['angular']
		},
		'angular-file-upload':{
			'deps':['angular']
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
		"jquery",
		"angular"
	]
});

require([
	'app',
	'approuter',
	'appbootstrap',
	'bootstrap',

	'directives/GameDirective',

	'controllers/SigninController',
	'controllers/SignupController',
	'controllers/RankingsController',
	'controllers/BattleController',
	'controllers/UserController',
	'controllers/RootController',
	'controllers/common/NavbarController',

	'directives/MapDrtv',

	'services/StateService',

	'filters/CountryFilter'

], function (app) {

	app.config(function($logProvider){
		$logProvider.debugEnabled(true);
	});
});
