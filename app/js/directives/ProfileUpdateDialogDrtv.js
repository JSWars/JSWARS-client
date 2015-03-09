define([
		'directives/Directives',
		'services/SessionService',
		'services/UserService'
	],
	function (Directives) {
		Directives
			.directive('profileUpdate', ['$modal', '$compile', function ProfileUpdateDirective($modal, $compile) {
				return {
					restrict: 'A',
					scope: {
						'onComplete': '='
					},
					link: function ($scope, element, attrs) {
						function ProfileUpdateModalController($modalScope, $modalInstance, SessionService, UserService, Countries) {
							$modalScope.countries = [];
							angular.forEach(Countries, function (country, code) {
								$modalScope.countries.push({
									code: code,
									name: country
								});
							});

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
									$modalInstance.dismiss({errorId: 'SESSION_ERROR'});
								});

							//$scope.onSelectCountry = function ($item, $model, $label) {
							//	console.log($item, $model, $label);
							//};

							$modalScope.update = function () {
								//Here we need to update profile
								UserService.update({
									username: $modalScope.profile.username,
									name: $modalScope.profile.name,
									email: $modalScope.profile.email,
									//avatar: $modalScope.profile.avatar,
									country: $modalScope.profile.country.code
								})
									.then(function () {
										$modalInstance.close();
									},
									function () {
										$modalInstance.dismiss({errorId: 'UPDATE_ERROR'});
									});

							};

							$modalScope.cancel = function () {
								$modalInstance.dismiss({errorId: 'MODAL_CLOSED'});
							};
						}

						$scope.open = function () {
							$modal.open({
								templateUrl: '/views/directives/ProfileUpdateDialogView.html',
								controller: ['$scope', '$modalInstance', 'SessionService', 'UserService', 'Countries', ProfileUpdateModalController]
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
