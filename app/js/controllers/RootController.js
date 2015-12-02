define([
		'controllers/Controllers',
		'services/SessionService'
	],
	function (Controllers) {
		Controllers.controller('RootController', ['$scope', '$rootScope', '$http', 'SessionService', function ($scope, $rootScope, $http, SessionService) {
			$rootScope.$on('state.title', function (x, data) {
				$scope.title = data.title;
			});

			$scope.online;

			SessionService.get()
				.then(function (session) {
					$scope.session = session;
				}, function () {

				});

			$http.get('/api/status/')
				.then(function () {
					$scope.online = true;
				},
				function () {
					$scope.online = false;
				});


			$scope.ghLogin = function (e) {
				e.preventDefault();
				document.location.href = '/api/login/github?return=' + encodeURIComponent('/#/user/:username/');
			};
		}]);
	});
