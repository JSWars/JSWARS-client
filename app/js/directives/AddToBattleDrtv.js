define([
		'directives/Directives',
		'services/SessionService',
		'services/UserService'
	],
	function (Directives) {
		Directives
			.directive('addToBattle', ['$modal', '$compile', function ProfileUpdateDirective($modal, $compile) {
				return {
					restrict: 'A',
					scope: {
						'addToBattke': '='
					},
					link: function ($scope, element, attrs) {
						function addToBattleController($modalScope, $modalInstance, SessionService, UserService, Countries) {

							SessionService.get()
								.then(function (session) {
									$modalScope.profile = session;
									//Transform regular country code to object
									if (!angular.isUndefined($modalScope.profile.country)) {
										$modalScope.profile.country = {
											code: $modalScope.profile.country,
											name: Countries[$modalScope.profile.country]
										};
									}
								}, function () {

								});
							$modalInstance.dismiss({errorId: 'SESSION_ERROR'});
							$modalInstance.close();
							$modalInstance.dismiss({errorId: 'MODAL_CLOSED'});
						}

						$scope.open = function () {
							$modal.open({
								templateUrl: '/views/directives/ProfileUpdateDialogView.html',
								controller: ['$scope', '$modalInstance', 'SessionService', 'UserService', 'Countries', addToBattleController]
							})
								.result.then(function (result) {
									($scope.onComplete || angular.noop)(false);
								}, function (err) {
									($scope.onComplete || angular.noop)(true, err);
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
