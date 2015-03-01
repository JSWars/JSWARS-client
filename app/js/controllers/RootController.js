define([
		'controllers/Controllers',
		'services/SessionService'
	],
	function (Controllers) {
		Controllers.controller("RootController", ['$scope', '$rootScope', 'SessionService', function RootController($scope, $rootScope, SessionService) {
			$rootScope.$on("state.title", function (x, data) {
				$scope.title = data.title;
			});

			SessionService.get()
				.then(function (session) {
					$scope.session = session;
				}, function () {

				});

			$scope.ghLogin = function (e) {
				e.preventDefault();
				document.location.href = '/api/login/github?return=' + encodeURIComponent('/#/user/:username/');
			};
		}]);
	});
