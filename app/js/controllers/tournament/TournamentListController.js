define([
		'controllers/Controllers',
		'factories/UserFactory',
		'services/TournamentService',
		'services/StateService'
	], function (Controllers) {
		Controllers.controller("TournamentListController", ['$scope', '$state', '$timeout', '$stateParams', 'State', 'TournamentService', function ($scope, $state, $timeout, $stateParams, State, TournamentService) {
			State.setState({
				title: "Tournaments"
			});

			$scope.availableTournamentsPageChanged = function () {
				TournamentService.query({page: $scope.availableTournamentsPage, joinable: true})
					.then(function (availableTournaments) {
						$scope.availableTournaments = availableTournaments;
					});
			};

			$scope.pastTournamentsPageChanged = function () {
				TournamentService.query({page: $scope.pastTournamentsPage, joinable: false})
					.then(function (pastTournaments) {
						$scope.pastTournaments = pastTournaments;
					});
			};

			$scope.refresh = function () {
				$state.reload();
			};


			$scope.availableTournamentsPageChanged();
			$scope.pastTournamentsPageChanged();
		}]);
	}
)
;
