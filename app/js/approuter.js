define([
	'app',
	'directives/GameDirective',
	'directives/BattleCreatorDrtv',
	'directives/BattleCreatorButtonDrtv',

	'controllers/RootController',
	'controllers/common/NavbarController',
	'controllers/tournament/TournamentListController',
	'controllers/tournament/TournamentController',
	'controllers/LastBattlesController',
	'controllers/RankingsController',
	'controllers/DocumentationController',
	'controllers/CookiesController',
	'controllers/BattleController',
	'controllers/UserController',
	'controllers/UserListController',
	'controllers/OverallController',
	'controllers/StartController',

	'controllers/user/AgentNewController',
	'controllers/user/AgentDetailController',

	'filters/CountryFilter'
], function (app) {
	/*
	 app.run(
	 ['$rootScope', '$state', '$stateParams',
	 function ($rootScope, $state, $stateParams) {
	 $rootScope.$state = $state;
	 $rootScope.$stateParams = $stateParams;
	 }
	 ]
	 );
	 */
	app.config(
		['$stateProvider', '$locationProvider', '$urlRouterProvider',
			function ($stateProvider, $locationProvider, $urlRouterProvider) {

				$locationProvider.html5Mode(true);

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
					/*.when('/c?id', '/contacts/:id')
					 .when('/user/:id', '/contacts/:id')
					 */
					// If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
					.otherwise('/');


				//////////////////////////
				// State Configurations //
				//////////////////////////

				// Use $stateProvider to configure your states.
				$stateProvider
					.state("start", {
					 url: "/",
					 templateUrl: 'views/StartView.html',
						controller: "StartController"
					 })
					.state("rankings", {
						url: "/rankings",
						templateUrl: 'views/RankingsView.html',
						controller: "RankingsController"
					})
					.state("cookies", {
						url: "/cookies",
						templateUrl: 'views/CookiesView.html',
						controller: "CookiesController"
					})
					.state("last-battles", {
						url: "/last-battles",
						templateUrl: 'views/LastBattlesView.html',
						controller: "LastBattlesController"
					})
					.state("tournament-list", {
						url: "/tournaments",
						templateUrl: 'views/tournament/TournamentListView.html',
						controller: "TournamentListController"
					})
					.state("tournament", {
						url: "/tournament/:id",
						templateUrl: 'views/tournament/TournamentView.html',
						controller: "TournamentController"
					})
					.state("users", {
						url: "/users",
						templateUrl: 'views/UserListView.html',
						controller: "UserListController"
					})

					.state("documentation", {
						url: "/documentation",
						templateUrl: 'views/DocumentationView.html',
						controller: "DocumentationController"
					})

					.state("user", {
						url: "/user/{username}",
						templateUrl: 'views/UserView.html',
						controller: "UserController",
						abstract: true
					})

					.state("user.overall", {
						url: '',
						templateUrl: 'views/user/OverallView.html',
						controller: "OverallController"

						//La parte de las subviews no funciona, por ahora lo hago con ng-include
						//views:{
						//	'activity':{
						//		templateUrl: '../views/user/ActivityWidgetView.html'
						//	}
						//}
					})

					//AGENTS
					.state("user.agents", {
						url: '/agents',
						template: '<ui-view/>',
						abstract: true
					})
					.state("user.agents.new", {
						url: '/new',
						templateUrl: 'views/user/AgentNewView.html',
						controller: "AgentNewController"
					})
					.state("user.agents.detail", {
						url: '/:agent',
						templateUrl: 'views/user/AgentDetailView.html',
						controller: "AgentDetailController"
					})
					.state("user.agents.version.detail", {
						url: '/:agent/:version',
						templateUrl: 'views/user/AgentDetailView.html',
						controller: "AgentDetailController"
					})

					.state("battle", {
						url: "/battle/:battle",
						templateUrl: 'views/BattleView.html',
						controller: "BattleController"
					})

					.state('about', {
						url: '/about'
					});
			}
		]
	);
});
