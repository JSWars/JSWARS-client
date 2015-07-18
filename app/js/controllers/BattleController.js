define([
		'controllers/Controllers',
		'moment',
		'factories/UserFactory',
		'factories/BattleFactory',
		'directives/GameDirective'
	], function (Controllers, moment) {
		Controllers.controller("BattleController", ['$scope', '$timeout', '$stateParams', 'State', 'BattleFactory', function ($scope, $timeout, $stateParams, State, BattleFactory) {

			State.setState({
				title: "Jugador 1 VS Jugador 2"
			});

			$scope.onStart = function (frameCount, fps) {
				$scope.totalTime = moment($scope.battle.frameCount * (1000 / $scope.battle.fps)).toDate();
			};


			$scope.onFrame = function (currentTime, frame) {
				$scope.currentTime = currentTime;
			};

			BattleFactory.get({id: $stateParams.id})
				.$promise
				.then(function (battle) {
					$scope.battle = battle;
				});
		}]);
	}
)
;
