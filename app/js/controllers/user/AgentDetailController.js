define([
	'controllers/Controllers',
	'services/AgentService'
], function (Controllers) {
	Controllers.controller('AgentDetailController', ['$scope', '$state', '$stateParams', 'AgentService', 'State', function ($scope, $state, $stateParams, AgentService, State) {

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

	}]);
});
