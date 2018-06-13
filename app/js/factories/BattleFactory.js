define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('BattleFactory', ['$resource', 'Config', function BattleFactory($resource, Config) {
			return $resource(Config.host + 'battle/:id', {}, {
				list: {
					url: Config.host + 'battle/',
					method: 'GET'
				},
				get: {
					url: Config.host + 'battle/:id',
					method: 'GET',
					isArray: false
				},
				chunk: {
					url:  Config.host + 'battle/:id/chunk/:chunkId',
					method: 'GET',
					isArray: true
				},
				queue:{
					url:  Config.host + 'battle/',
					method: 'POST',
					isArray: false
				},
				queueGet:{
					url:  Config.host + 'battle/queue/:id/',
					method: 'GET',
					isArray: false
				}
			});
		}]);
	});
