define([
		'directives/Directives'
	],
	function (Directives) {
		Directives
			.directive('battleCreator', ['$q', '$rootScope', 'localStorageService', 'AgentService', 'UserService', 'BattleService', function BattleCreator($q, $rootScope, LocalStorage, AgentService, UserService, BattleService) {
				return {
					restrict: 'E',
					templateUrl: '/views/directives/battle-creator.html',
					link: function ($scope, element, attrs) {

						$scope.hidden = false;

						$scope.battle = {
							agents: LocalStorage.get("battle.creator.agents") || []
						};

						$scope.putInQueue = function (e) {
							e.preventDefault();

							BattleService.queue({
								agents: [$scope.battle.agents[0]._id, $scope.battle.agents[1]._id]
							})
								.then(function () {
									alert("Battle requested!");
									$scope.battle.agents = [];
									LocalStorage.remove("battle.creator.agents");
								}, function () {
									alert("Error");
								})
						};

						$rootScope.$on('addToBattle', function (event, data) {
							if ($scope.battle.agents.length >= 2) {
								return;
							}

							var username = data.username;
							var agentId = data.agentId;

							var promises = [];

							promises.push(AgentService.get({
									username: username,
									id: agentId
								})
							);


							promises.push(UserService.get({
								username: username
							}));


							$q.all(promises)
								.then(function (responses) {
									var agent = responses[0].toJSON();
									agent.user = responses[1].toJSON();
									$scope.battle.agents.push(agent);
								})
								.finally(function () {
									LocalStorage.set("battle.creator.agents", $scope.battle.agents)
								})

						});
					}
				};
			}])
		;
	})
;
