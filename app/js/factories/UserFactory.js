define([
		'factories/Factories'
	],
	function (Factories) {
		Factories.factory('UserFactory', ['$resource', 'Config', function UserFactory($resource, Config) {
			return $resource('/api/users/:username', {
				'username': '@username'
			}, {
				update: {
					method: 'PUT'
				},
				activity: {
					url: Config.host + 'users/:username/activity',
					method: 'GET',
					isArray: true
				},
				agents: {
					url: Config.host + 'users/:username/agents',
					method: 'GET',
					isArray: true
				},
				tournaments: {
					url: Config.host + 'users/:username/tournaments',
					method: 'GET',
					isArray: true
				}
			});
		}]);
	});
