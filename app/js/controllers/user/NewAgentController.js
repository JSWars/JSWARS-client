define([
	'controllers/Controllers',
	'services/AgentService'
], function (Controllers) {
	Controllers.controller('NewAgentController', ['$scope', '$state', '$stateParams', 'AgentService', 'State', function ($scope, $state, $stateParams, AgentService, State) {

		State.setState({});

		$scope.editorOptions = {
			lineWrapping: true,
			lineNumbers: true,
			mode: 'javascript',
			theme: 'ambiance'
		};

		$scope.create = function () {
			AgentService.create({
				name: $scope.agent.name,
				code: $scope.agent.code,
				username: $stateParams.username
			})
				.then(function () {
					$state.transitionTo('user.overall', {
						username: $stateParams.username
					});
				}, function () {
					alert("Agent can't be created");
				});
		};

	}]);
});
