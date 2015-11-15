define([
	'controllers/Controllers',
	'services/AgentService',
	'services/AgentVersionService'
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
			id: $stateParams.id,
			username: $stateParams.username
		})
			.then(function (agent) {
				$scope.agent = agent;
			}, function () {
				$scope.error = "Can't get agent";
			});

		var agentVersionsQuery = function () {
			AgentVersionService.query({
				id: $stateParams.id,
				username: $stateParams.username
			})
				.then(function (versions) {
					$scope.versions = versions;
					$scope.editVersion = versions[0];
				}, function () {
					$scope.error = "Can't get agent versions";
				});

		};
		agentVersionsQuery();

		$scope.loadVersion = function (e, version) {
			e.preventDefault();
			$scope.isOld = true;
			$scope.editVersion = version;
		};

		$scope.update = function (e) {
			e.preventDefault();
			AgentService.update({
				username: $stateParams.username,
				id: $stateParams.id,
				code: $scope.editVersion.code
			})
				.then(function (response) {
					$scope.message = "Agent saved. New version created";
					$timeout(function () {
						$scope.message = false;
					}, 4000);
					agentVersionsQuery();
				}, function () {
					$scope.error = "Can't create agent";
					$timeout(function () {
						$scope.error = false;
					}, 4000);

				}
			)
		}
	}
	])
})
