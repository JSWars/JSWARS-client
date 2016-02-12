define([
		'controllers/Controllers',
		'moment',
		'factories/UserFactory',
		'services/BattleService',
		'directives/GameDirective'
	], function (Controllers, moment) {
		Controllers.controller("BattleController", ['$scope', '$timeout', '$stateParams', 'State', 'BattleService', function ($scope, $timeout, $stateParams, State, BattleService) {


			$scope.onStart = function (frameCount, fps) {
				$scope.totalTime = moment($scope.battle.frameCount * (1000 / $scope.battle.fps)).toDate();
			};

			$scope.battleId = $stateParams.id;

			BattleService.get({id: $stateParams.id})
				.then(function (battle) {
					$scope.battle = battle;

					State.setState({
						title: battle.teams[0].name + " vs " + battle.teams[1].name
					});

				});
		}]);
	}
)
;
