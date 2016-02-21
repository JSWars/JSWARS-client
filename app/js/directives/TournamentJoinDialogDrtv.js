define([
		'directives/Directives',
		'services/SessionService',
		'services/TournamentService'
	],
	function (Directives) {
		Directives
			.directive('tournamentJoin', ['$rootScope', '$modal', '$compile', 'SessionService', function TournamentJoinDirective($rootScope, $modal, $compile, SessionService) {
				return {
					restrict: 'A',
					scope: {
						'onComplete': '=',
						'tournamentRegister': '=tournamentId'
					},
					link: function ($scope, element, attrs) {
						function TournamentJoinModalController($modalScope, $modalInstance, TournamentService) {


							var searchAgent = function (search) {
								return TournamentService.query({search: search});
							};

							$modalScope.update = function () {
								//Here we need to update profile
								//UserService.update({
								//	username: $modalScope.profile.username,
								//	name: $modalScope.profile.name,
								//	email: $modalScope.profile.email,
								//	//avatar: $modalScope.profile.avatar,
								//	country: $modalScope.profile.country.code
								//})
								//	.then(function () {
								//		$modalInstance.close();
								//	},
								//	function () {
								//		$modalInstance.dismiss({errorId: 'UPDATE_ERROR'});
								//	});

							};

							$modalScope.cancel = function () {
								$modalInstance.dismiss({errorId: 'MODAL_CLOSED'});
							};
						}

						$scope.open = function () {
							SessionService.get()
								.then(function () {
									$modal.open({
										templateUrl: '/views/directives/TournamentJoinDialogView.html',
										controller: ['$scope', '$modalInstance', 'TournamentService', TournamentJoinModalController]
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
