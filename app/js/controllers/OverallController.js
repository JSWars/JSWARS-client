define([
	'controllers/Controllers',
	'services/AgentService'
], function (Controllers) {
	Controllers.controller("OverallController", ['$scope', '$log', '$stateParams', 'AgentService', function OverallController($scope, $log, $stateParams, AgentService) {
		$scope.userPageChanged = function () {
			AgentService.query({
				username: $stateParams.username,
				page: $scope.page
			})
				.then(function (agents) {
					$scope.agents = agents;
				}, function () {
					$log.error('Error loading agent list');
				});

		};
		$scope.userPageChanged();
	}]);
});
