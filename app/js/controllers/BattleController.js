define([
	'controllers/Controllers',
	'factories/UserFactory',
	'factories/BattleFactory',
	'directives/GameDirective'
], function (Controllers) {
	Controllers.controller("BattleController", ['$scope', '$stateParams', 'State', 'BattleFactory', function ($scope, $stateParams, State, BattleFactory) {

		State.setState({
			title: "Jugador 1 VS Jugador 2"
		});

		$scope.battle = BattleFactory.get({id: $stateParams.id});

	}]);
});
