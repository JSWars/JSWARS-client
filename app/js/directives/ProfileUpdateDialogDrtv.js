define([
		'directives/Directives',
		'factories/CountriesFactory',
		'services/SessionService'
	],
	function (Directives) {
		Directives
			.directive('profileUpdate', ['$modal', '$compile', function ($modal, $compile) {
				return {
					restrict: 'A',
					scope: {
						'onComplete': '='
					},
					link: function ($scope, element, attrs) {

						function ProfileUpdateModalController($modalScope, $modalInstance, Session, Countries) {


							$modalScope.countries = [];
							angular.forEach(Countries, function (country, code) {
								$modalScope.countries.push({
									code: code,
									name: country
								});
							});

							$modalScope.profile = Session.get();

							//Transform regular country code to object
							$modalScope.profile.country = {
								code: $modalScope.profile.country,
								name: Countries[$modalScope.profile.country]
							};

							$scope.onSelectCountry = function ($item, $model, $label) {
								console.log($item, $model, $label);
							};

							$modalScope.update = function () {
								//Transform country object to code again
								$modalScope.profile.country = $modalScope.profile.country.code;
								//Here we need to update profile
							};

							$modalScope.cancel = function () {
								$modalInstance.dismiss('Ventana cerrada');
							};
						}

						$scope.open = function () {
							$modal.open({
								templateUrl: '/views/directives/ProfileUpdateDialogView.html',
								controller: ['$scope', '$modalInstance', 'Session', 'Countries', ProfileUpdateModalController]
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
