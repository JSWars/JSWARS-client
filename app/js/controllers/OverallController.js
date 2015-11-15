define([
	'controllers/Controllers',
	'services/AgentService',
], function (Controllers) {
	Controllers.controller("OverallController", ['$scope', '$log', '$stateParams', 'AgentService', 'State', function OverallController($scope, $log, $stateParams, AgentService) {


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

	}]);
});
