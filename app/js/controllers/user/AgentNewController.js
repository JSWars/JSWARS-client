define([
	'controllers/Controllers',
	'services/AgentService',
	'services/StateService'
], function (Controllers) {
	Controllers.controller('AgentNewController', ['$scope', '$state', '$stateParams', 'AgentService', 'State', function ($scope, $state, $stateParams, AgentService, State) {

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
				color: $scope.agent.color,
				username: $stateParams.username
			})
				.then(function () {
					$state.transitionTo('user.overall', {
						username: $stateParams.username
					});
				}, function (e) {
					alert(e.errorId);
				});
		};

	}]);
});
