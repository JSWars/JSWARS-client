define([
		'controllers/Controllers',
		'moment',
		'factories/UserFactory',
		'services/BattleService',
		'directives/GameDirective'
	], function (Controllers, moment) {
		Controllers.controller("BattleController", ['$scope', '$timeout', '$stateParams', 'State', 'BattleService', function ($scope, $timeout, $stateParams, State, BattleService) {

			State.setState({
				title: "Jugador 1 VS Jugador 2"
			});

			$scope.onStart = function (frameCount, fps) {
				$scope.totalTime = moment($scope.battle.frameCount * (1000 / $scope.battle.fps)).toDate();
			};

			$scope.onFrame = function (currentTime, frame) {
				$scope.currentTime = currentTime;
			};

			BattleService.get({id: $stateParams.id})
				.$promise
				.then(function (battle) {
					$scope.battle = battle;
				});
		}]);
	}
)
;
