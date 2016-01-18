define([
		'factories/Factories'
	],
	function (Factories) {
		Factories.factory('UserFactory', ['$resource', 'Config', function UserFactory($resource, Config) {
			return $resource(Config.host + 'users/:username', {
					'username': '@username'
				},
				{
					query:{
						isArray:false
					},
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
