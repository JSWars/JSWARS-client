define([
		'directives/Directives',
		'services/AgentService',
		'services/UserService',
		'services/BattleService'
	],
	function (Directives) {
		Directives
			.directive('battleCreator', ['$q', '$rootScope', '$modal', '$state', 'localStorageService', 'AgentService', 'UserService', 'BattleService', function BattleCreator($q, $rootScope, $modal, $state, LocalStorage, AgentService, UserService, BattleService) {
				return {
					restrict: 'E',
					templateUrl: '/views/directives/battleCreator.html',
					link: function ($scope, element, attrs) {

						$scope.hidden = false;
						$scope.waiting = false;

						$scope.battle = {
							agents: LocalStorage.get("battle.creator.agents") || []
						};

						$scope.error = false;

						$scope.cleanError = function () {
							$scope.error = false;
						};

						$scope.clearQueue = function (e) {
							e.preventDefault();
							$scope.battle.agents = [];
							LocalStorage.remove("battle.creator.agents");
						};

						$scope.putInQueue = function (e) {
							e.preventDefault();
							$scope.waiting = true;

							BattleService.queue({
								agents: [$scope.battle.agents[0]._id, $scope.battle.agents[1]._id]
							})
								.then(function (queueItem) {
									BattleService.queueGet({id: queueItem._id})
										.then(function (queueItem) {
											$scope.waiting = false;
											$scope.battle.agents = [];
											//LocalStorage.remove("battle.creator.agents");
											$state.go('battle', {
												battle: queueItem.battle
											});
										}, function (error) {
											$scope.waiting = false;
											$scope.error = "Se ha producido un error";
										});

								}, function () {
									alert("Error");
								})
						};

						$rootScope.$on('addToBattle', function (event, originalData) {
							function storeAndPrepareConfiguration(data) {

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

							}

							if (($scope.battle.agents[0] !== undefined && $scope.battle.agents[0]._id === originalData.agentId)) {
								return
							}
							if ($scope.battle.agents.length >= 2) {
								$modal.open({
									templateUrl: '/views/dialogs/battleFullDialogView.html',
									controller: ['$scope', '$modalInstance', function ($modalScope, $modalInstance) {
										$modalScope.cancel = function (e) {
											$modalInstance.close();
										};

										$modalScope.clear = function (e) {
											$scope.clearQueue(e);
											storeAndPrepareConfiguration(originalData);
											$modalInstance.close();
										}
									}]
								});
								return;
							}
							storeAndPrepareConfiguration(originalData);
						});
					}
				};
			}])
		;
	})
;
