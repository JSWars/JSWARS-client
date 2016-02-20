define([
		'controllers/Controllers',
		'moment',
		'factories/UserFactory',
		'services/TournamentService',
		'directives/TournamentJoinDialogDrtv'
	], function (Controllers) {
		Controllers.controller("TournamentsController", ['$scope', '$timeout', '$stateParams', 'State', 'TournamentService', function ($scope, $timeout, $stateParams, State, TournamentService) {
			State.setState({
				title: "Tournaments"
			});

			$scope.availableTournamentsPageChanged = function () {
				TournamentService.query({page: $scope.availableTournamentsPage})
					.then(function (availableTournaments) {
						$scope.availableTournaments = availableTournaments;
					});

			};
			$scope.availableTournamentsPageChanged();
		}]);
	}
)
;
