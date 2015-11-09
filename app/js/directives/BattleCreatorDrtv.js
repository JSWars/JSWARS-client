define([
		'directives/Directives'
	],
	function (Directives) {
		Directives
			.directive('battleCreator', ['$rootScope', 'localStorageService', 'AgentService', function BattleCreator($rootScope, LocalStorage, AgentService) {
				return {
					restrict: 'E',
					templateUrl: '/views/directives/battle-creator.html',
					link: function ($scope, element, attrs) {

						$scope.hidden = false;

						$scope.battle = {
							agents: []
						};

						$rootScope.$on('addToBattle', function (event, data) {
							if ($scope.battle.agents.length >= 2) {
								return;
							}

							var agentId = data.agentId;

							AgentService.get(agentId)
								.then(function (agent) {
									$scope.agents.push(agent);
								});


							//LocalStorage.set(key,val)
							//LocalStorage.get(key)

						});
					}
				};
			}])
		;
	})
;
