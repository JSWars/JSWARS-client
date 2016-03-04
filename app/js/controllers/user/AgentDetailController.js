define([
	'controllers/Controllers',
	'services/AgentService',
	'services/AgentVersionService',
	'services/StateService'
], function (Controllers) {
	Controllers.controller('AgentDetailController', ['$scope', '$state', '$stateParams', '$timeout', 'AgentService', 'AgentVersionService', 'State', function ($scope, $state, $stateParams, $timeout, AgentService, AgentVersionService, State) {

		State.setState({});

		$scope.editorOptions = {
			lineWrapping: true,
			lineNumbers: true,
			mode: 'javascript',
			theme: 'ambiance'
		};

		AgentService.get({
			id: $stateParams.agent,
			username: $stateParams.username
		})
			.then(function (agent) {
				$scope.agent = agent;
			}, function () {
				$scope.error = "Can't get agent";
			});

		$scope.versionsPageChanged = function () {
			AgentVersionService.query({
				id: $stateParams.agent,
				username: $stateParams.username,
				page: $scope.page || 1
			})
				.then(function (versions) {
					$scope.versions = versions;
					$scope.editVersion = versions.docs[0];
				}, function () {
					$scope.error = "Can't get agent versions";
				});

		};
		$scope.versionsPageChanged();

		$scope.loadVersion = function (e, version) {
			e.preventDefault();
			$scope.isOld = true;
			$scope.editVersion = version;
		};

		$scope.update = function (e) {
			e.preventDefault();
			AgentService.update({
				username: $stateParams.username,
				id: $stateParams.agent,
				code: $scope.editVersion.code
			})
				.then(function (response) {
					$scope.message = "Agent saved. New version created";
					$timeout(function () {
						$scope.message = false;
					}, 4000);
					$scope.versionsPageChanged();
				}, function (errorResponse) {
					$scope.error = errorResponse.errorId;
					$scope.exceptionMessage = errorResponse.exceptionMessage;
					$timeout(function () {
						$scope.error = false;
					}, 4000);

				}
			)
		}
	}
	])
});
