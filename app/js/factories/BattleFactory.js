define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('Battle', ['$resource', 'Config', function Battle($resource, Config) {
			return $resource(Config.host + 'battle/:id', {}, {
				map: {
					url: Config.host + 'battle/:id/map',
					method: 'GET',
					isArray: false
				},
				chunk: {
					//url: Config.host + 'battle/:id/chunk/:chunkId',
					url: 'chunks.json',
					method: 'GET',
					isArray: true //todo: probably object
				}
			});
		}]);
	});
