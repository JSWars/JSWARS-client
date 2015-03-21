define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('BattleFactory', ['$resource', 'Config', function BattleFactory($resource, Config) {
			return $resource(Config.host + 'battle/:id', {}, {
				get: {
					url: Config.host + 'battle/:id',
					method: 'GET',
					isArray: false
				},
				chunk: {
					url:  Config.host + 'battle/:id/chunk/:chunkId',
					method: 'GET',
					isArray: true //todo: probably object
				}
			});
		}]);
	});
