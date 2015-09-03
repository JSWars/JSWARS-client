define([
	'controllers/Controllers',
	'services/AgentService',
	'services/AgentVersionService'
], function (Controllers) {
	Controllers.controller('AgentDetailController', ['$scope', '$state', '$stateParams', 'AgentService', 'AgentVersionService', 'State', function ($scope, $state, $stateParams, AgentService, AgentVersionService, State) {

		State.setState({});

		$scope.currentIndex = 0;

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
				alert("error");
			});

		AgentVersionService.query({
			id: $stateParams.id,
			username: $stateParams.username
		})
			.then(function (versions) {
				$scope.versions = versions;
				$scope.version = versions[0];
			}, function () {
				alert("error");
			});

		$scope.loadVersion = function (e, versionId) {
			e.preventDefault();

			AgentVersionService.get({
				username: $stateParams.username,
				id: $stateParams.id,
				versionId: versionId
			})
				.then(function (response) {
					$scope.isOld = true;
					$scope.version = response;
				}, function () {
					alert("Error recovering version");
				})


		};

		$scope.update = function (e) {
			e.preventDefault();
			AgentService.update({
				username: $stateParams.username,
				id: $stateParams.id,
				code: $scope.version	.code
			})
				.then(function (response) {
					alert("Agent updated");
					$state.reload();
				}, function () {
					alert("Error update agent")
				})
		}

	}]);
});
