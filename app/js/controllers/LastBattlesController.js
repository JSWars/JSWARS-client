define([
		'controllers/Controllers',
		'services/BattleService'
	], function (Controllers) {
		Controllers.controller("LastBattlesController", ['$scope', '$timeout', '$stateParams', 'State', 'BattleService', function ($scope, $timeout, $stateParams, State, BattleService) {

			State.setState({
				title: "Last Battles"
			});

			$scope.pageChanged = function () {
				BattleService.list({page: $scope.page})
					.then(function (battles) {
						$scope.battles = battles;
					});

			};
			$scope.pageChanged();
		}]);
	}
)
;
