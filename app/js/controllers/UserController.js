define([
	'controllers/Controllers',
	'services/SessionService',
	'services/AgentService',
	'services/UserService',
	'services/StateService',
	'directives/ProfileUpdateDialogDrtv'
], function (Controllers) {
	Controllers.controller("UserController", ['$scope', '$log', '$stateParams', '$modal', 'SessionService', 'UserService', 'AgentService', 'State', function UserController($scope, $log, $stateParams, $modal, SessionService, UserService, AgentService, State) {

		State.setState({});


		//Obtain user stored in client session to compare with current profile id
		SessionService.get()
			.then(function (session) {
				$scope.session = session;
			}, function () {
				$log.error('Error obtaining session info');
			});


		//Profile data externalized because is called an page load and after profile update
		var loadProfileData = function () {
			UserService.get({username: $stateParams.username})
				.then(function (user) {
					$scope.user = user;
				}, function () {
					$log.error('Error loading profile info');
				});
		};

		//Profile update directive callback
		$scope.profileUpdated = function (err) {
			if (err) {
				return;
			}
			loadProfileData();
		};

		AgentService.query({
			username: $stateParams.username
		})
			.then(function (agents) {
				$scope.agents = agents;
			}, function () {
				$log.error('Error loading agent list');
			});

		//$scope.tournaments = User.tournaments({username: $stateParams.username});

		//First profile load
		loadProfileData();

	}]);
});
