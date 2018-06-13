define([
	'controllers/Controllers',
	'factories/RankingsFactory',
	'services/StateService'
], function (Controllers) {
	Controllers.controller("RankingsController", ['$scope', 'Rankings', 'State', function ($scope, Rankings, State) {
		$scope.rankingRange = 24;
		$scope.rankings = Rankings.get();

		State.setState({
			title: "Rankings"
		});
	}]);
});
