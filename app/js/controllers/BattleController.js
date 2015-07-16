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
				$scope.frameCount = frameCount;
				$scope.fps = fps;
				$scope.totalTime = moment(frameCount * (1000 / fps)).toDate();
			};


			$scope.onFrame = function (currentTime, frame) {
				$scope.currentTime = currentTime;
				angular.forEach(frame.teams, function (team) {

				});
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
