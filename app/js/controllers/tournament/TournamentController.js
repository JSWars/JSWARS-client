define([
		'controllers/Controllers',
		'moment',
		'services/TournamentService',
		'directives/TournamentJoinDialogDrtv'
	], function (Controllers) {
		Controllers.controller("TournamentController", ['$scope', '$state', '$timeout', '$stateParams', 'State', 'TournamentService', function ($scope, $state, $timeout, $stateParams, State, TournamentService) {


			var getTournament = function () {
				TournamentService.get({id: $stateParams.id})
					.then(function (tournament) {
						State.setState({
							title: "Tournament: " + tournament.name
						});

						$scope.tournament = tournament;

						$scope.tournament.roundDetails = [];

						for (var i = $scope.tournament.rounds; i > 0; i--) {
							$scope.tournament.roundDetails.push({
								round: i,
								battles: Math.pow(2, i - 1),
								agents: Math.pow(2, i)
							})
						}

						if (tournament.status == 'RUNNING') {
							$timeout(getTournament, 5000);
						}

					})
			};

			getTournament();

			$scope.refresh = function () {
				$state.reload();
			};
		}]);
	}
);
