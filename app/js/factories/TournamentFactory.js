define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('TournamentFactory', ['$resource', 'Config', function TournamentFactory($resource, Config) {
			return $resource(Config.host + 'tournaments/:id', {}, {
				query: {
					method: 'GET',
					isArray: false
				},
				join: {
					url: Config.host + 'tournaments/:id',
					method: 'POST'

				}
			});
		}]);
	});
