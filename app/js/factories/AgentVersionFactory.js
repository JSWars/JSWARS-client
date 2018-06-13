define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('AgentVersionFactory', ['$resource', 'Config', function AgentFactory($resource, Config) {
			return $resource(Config.host + 'users/:username/agents/:id/versions/:versionId', {
					username: '@username',
					id: '@id',
					versionId: '@versionId'
				}, {
					query: {
						isArray: false
					}
				}
			);
		}]);
	});
