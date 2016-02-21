define([
		'controllers/Controllers',
		'moment',
		'services/TournamentService',
		'directives/TournamentJoinDialogDrtv'
	], function (Controllers) {
		Controllers.controller("TournamentController", ['$scope', '$state', '$stateParams', 'State', 'TournamentService', function ($scope, $state, $stateParams, State, TournamentService) {

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
				})
		}]);
	}
);
