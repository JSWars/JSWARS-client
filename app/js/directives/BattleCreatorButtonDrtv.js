define([
		'directives/Directives',
		'services/SessionService'
	],
	function (Directives) {
		Directives
			.directive('battleCreatorButton', ['$rootScope', 'SessionService', function BattleCreatorButton($rootScope, SessionService) {
				return {
					restrict: 'A',
					scope: {
						battleCreatorButton: '='
					},
					link: function ($scope, element, attrs) {

						element.click(function (event) {
							SessionService.get()
								.then(function () {
									event.preventDefault();
									$rootScope.$emit("addToBattle", {
										agentId: $scope.battleCreatorButton.id,
										username: $scope.battleCreatorButton.username
									})
								}, function () {
									$rootScope.$broadcast("general.login.required");
								});

						});
					}
				};
			}])
		;
	})
;
