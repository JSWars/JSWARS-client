define([
	'app'
], function (app) {

	app.run(
		['$rootScope', '$state', '$stateParams',
			function ($rootScope, $state, $stateParams) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}
		]
	);

	app.config(
		['$stateProvider', '$urlRouterProvider',
			function ($stateProvider, $urlRouterProvider) {

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
					//.state("signin", {
					//	url: "/signin",
					//	templateUrl: '../views/SigninView.html',
					//	controller: "SigninController"
					//})
					//.state("signup", {
					//	url: "/signup",
					//	templateUrl: '../views/SignupView.html',
					//	controller: "SignupController"
					//})
					.state("rankings", {
						url: "/rankings",
						templateUrl: '../views/RankingsView.html',
						controller: "RankingsController"
					})
					.state("user", {
						url: "/user/{username}",
						templateUrl: '../views/UserView.html',
						controller: "UserController",
						abstract:true
					})

					.state("user.overall", {
						url: '',
						templateUrl: '../views/user/OverallView.html'
						//controller: "UserController",

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
						abstract:true
					})
					.state("user.agents.new", {
						url: '/new',
						templateUrl: '../views/user/NewAgentView.html',
						controller: "NewAgentController"
					})

					.state("battle", {
						url: "/battle/{id}",
						templateUrl: '../views/BattleView.html',
						controller: "BattleController"
					})

					.state('about', {
						url: '/about'
					});
			}
		]
	);
});
