define([
		'controllers/Controllers',
		'moment',
		'factories/UserFactory',
		'services/BattleService',
		'directives/GameDirective'
	], function (Controllers, moment) {
		Controllers.controller("LastBattlesController", ['$scope', '$timeout', '$stateParams', 'State', 'BattleService', function ($scope, $timeout, $stateParams, State, BattleService) {

			State.setState({
				title: "Últimas Batallas"
			});

			BattleService.get()
				.then(function (battle) {
					$scope.battle = battle;
				});
		}]);
	}
)
;
