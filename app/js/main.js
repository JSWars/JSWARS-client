"use strict";
require.config({
	'baseUrl': './js/',
	waitSeconds: 60,
	'paths': {
		'domReady': 'components/domReady/domReady',
		'jquery': 'components/jquery/dist/jquery',
		'bootstrap': 'components/bootstrap/dist/js/bootstrap',
		'moment': 'components/moment/moment',
		'codemirror': 'components/codemirror/lib/codemirror',
		'codemirror-wrapper': 'wrappers/CodeMirrorWrapper',
		'angular': 'components/angular/angular',
		'angular-ui-router': 'components/angular-ui-router/release/angular-ui-router',
		'angular-ui-bootstrap': 'components/angular-bootstrap/ui-bootstrap-tpls',
		'angular-resource': 'components/angular-resource/angular-resource',
		'angular-messages': 'components/angular-messages/angular-messages',
		'angular-codemirror': 'components/angular-ui-codemirror/ui-codemirror',
		'angular-moment': 'components/angular-moment/angular-moment',
		'angular-file-upload': 'components/angular-file-upload/angular-file-upload',
		'angular-prograss': 'components/ngprogress/build/ngprogress',
		'angular-local-storage': 'components/angular-local-storage/dist/angular-local-storage',
		'angular-bootstrap-colorpicker': 'components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module',
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
		'angular-messages': {
			'deps': ['angular']
		},
		'angular-moment': {
			'deps': ['angular']
		},
		'angular-codemirror': {
			'deps': ['angular', 'codemirror-wrapper']
		},
		'angular-file-upload': {
			'deps': ['angular']
		},
		'angular-prograss': {
			'deps': ['angular']
		},
		'angular-local-storage': {
			'deps': ['angular']
		},
		'angular-bootstrap-colorpicker': {
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
		"jquery",
		"angular"
	]
});

require([
	'app',
	'constants',
	'approuter',
	'appbootstrap',
	'bootstrap',
	//'lib/icheck',

	'directives/GameDirective',

	'controllers/TournamentsController',
	'controllers/LastBattlesController',
	'controllers/RankingsController',
	'controllers/DocumentationController',
	'controllers/BattleController',
	'controllers/UserController',
	'controllers/UserListController',
	'controllers/OverallController',
	'controllers/RootController',
	'controllers/common/NavbarController',

	'controllers/user/ActivityWidgetController',
	'controllers/user/AgentNewController',
	'controllers/user/AgentDetailController',


	'directives/BattleCreatorDrtv',
	'directives/BattleCreatorButtonDrtv',

	'services/StateService',

	'filters/CountryFilter'

], function (app) {

	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-1018881-6', 'auto');
	ga('send', 'pageview');


	app.config(['$logProvider', '$locationProvider', function ($logProvider, $locationProvider) {
		$logProvider.debugEnabled(true);
	}]);

	app.run(['$rootScope', '$http', 'ngProgressFactory', '$location', '$window', function ($rootScope, $http, ngProgressFactory, $location, $window) {
		var progressbar = ngProgressFactory.createInstance();

		$rootScope.isLoading = function () {
			return $http.pendingRequests.length > 0;
		};

		$rootScope.$watch('isLoading', function (loading) {
			if (loading) {
				progressbar.start();
			} else {
				progressbar.complete();
			}
		});

		$rootScope
			.$on('$stateChangeSuccess',
			function (event) {

				if (!$window.ga)
					return;

				$window.ga('send', 'pageview', {page: $location.path()});
			});
	}])
});
