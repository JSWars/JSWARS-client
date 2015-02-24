define([
	'controllers/Controllers',
	'factories/UserFactory',
	'factories/ConfigFactory',
	'factories/SessionFactory',
	'directives/ProfileUpdateDialogDrtv'
], function (Controllers) {
	Controllers.controller("UserController", ['$scope', '$stateParams', '$modal', 'Session', 'User', 'State', function ($scope, $stateParams, $modal, Session, User, State) {

		State.setState({});

		$scope.session = Session.get();

		$scope.user = User.get({username: $stateParams.username});
		$scope.activity = User.activity({username: $stateParams.username});
		$scope.agents = User.agents({username: $stateParams.username});
		$scope.tournaments = User.tournaments({username: $stateParams.username});

		$scope.edit = function (attr) {
			switch (attr) {
				case 'name':

					break;
			}
		};

	}]);
});
