define([
	'controllers/Controllers',
	'services/SessionService',
	'factories/ConfigFactory',
	'directives/ProfileUpdateDialogDrtv'
], function (Controllers) {
	Controllers.controller("UserController", ['$scope', '$stateParams', '$modal', 'SessionService', 'UserService', 'State', function ($scope, $stateParams, $modal, SessionService, UserService, State) {

		State.setState({});

		SessionService.get()
			.then(function (session) {
				$scope.session = session;
			}, function () {

			});

		UserService.get({username: $stateParams.username})
			.then(function (user) {
				$scope.user = user;
			}, function () {

			});


		//$scope.activity = User.activity({username: $stateParams.username});
		//$scope.agents = User.agents({username: $stateParams.username});
		//$scope.tournaments = User.tournaments({username: $stateParams.username});

		$scope.edit = function (attr) {
			switch (attr) {
				case 'name':

					break;
			}
		};

	}]);
});
