"use strict";
require.config({
	'baseUrl': './js/',
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

	'directives/GameDirective',

	'controllers/SigninController',
	'controllers/SignupController',
	'controllers/LastBattlesController',
	'controllers/RankingsController',
	'controllers/BattleController',
	'controllers/UserController',
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
	app.config(['$logProvider', function ($logProvider) {
		$logProvider.debugEnabled(true);
	}]);

	app.run(['$rootScope', '$http', 'ngProgressFactory', function ($rootScope, $http, ngProgressFactory) {
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
	}])
});
