define([
		'directives/Directives',
		'services/SessionService',
		'services/UserService',
		'services/TournamentService'
	],
	function (Directives) {
		Directives
			.directive('tournamentJoin', ['$rootScope', '$q', '$modal', '$timeout', '$compile', 'SessionService', function TournamentJoinDirective($rootScope, $q, $modal, $timeout, $compile, SessionService) {
				return {
					restrict: 'A',
					scope: {
						'onComplete': '&',
						'tournamentJoin': '='
					},
					link: function ($scope, element, attrs) {

						$timeout(function () {
							element[0].focus()
						});
						function TournamentJoinModalController($modalScope, $modalInstance, AgentService, TournamentService) {

							$modalScope.searchAgent = function (search) {
								return AgentService.query({username: $scope.username, search: search})
									.then(function (results) {
										return results.docs
									});
							};

							$modalScope.join = function () {
								TournamentService.join({agent: $modalScope.selectedAgent._id, id: $scope.tournamentJoin})
									.then(function () {
										$modalInstance.close();
									}, function () {
										$modalInstance.dismiss({errorId: 'ERROR'});
									});
							};

							$modalScope.cancel = function () {
								$modalInstance.dismiss({errorId: 'MODAL_CLOSED'});
							};
						}

						$scope.open = function () {
							SessionService.get()
								.then(function (session) {
									$scope.username = session.username;
									$modal.open({
										templateUrl: '/views/directives/TournamentJoinDialogView.html',
										controller: ['$scope', '$modalInstance', 'AgentService', 'TournamentService', TournamentJoinModalController]
									})
										.result.then(function (result) {
											($scope.onComplete || angular.noop)(false);
										}, function (err) {
											($scope.onComplete || angular.noop)(true, err);
										});
								}, function () {
									$rootScope.$broadcast("general.login.required");
								});
						};

						$compile(element.contents())($scope);
						jQuery(element).click(element, $scope.open);

					}
				};
			}])
		;
	})
;
