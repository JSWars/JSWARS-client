define([
		'directives/Directives'
	],
	function (Directives) {
		Directives
			.directive('battleCreatorButton', ['$rootScope', function BattleCreatorButton($rootScope) {
				return {
					restrict: 'A',
					scope: {
						battleCreatorButton: '='
					},
					link: function ($scope, element, attrs) {

						element.click(function (event) {
							event.preventDefault();
							$rootScope.$emit("addToBattle", {
								agentId: $scope.battleCreatorButton
							})
						});
					}
				};
			}])
		;
	})
;
