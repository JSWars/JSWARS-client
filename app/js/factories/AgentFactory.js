define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('AgentFactory', ['$resource', 'Config', function AgentFactory($resource, Config) {
			return $resource(Config.host + 'users/:username/agents/:id/', {
					username: '@username',
					id: '@id'
				}, {
					query: {
						isArray: false
					},
					create: {
						method: 'POST'

					},
					update: {
						method: 'PUT'
					}
				}
			);
		}]);
	});
