define([
		'factories/Factories',
		'factories/ConfigFactory'
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
					}
				});
		}]);
	});
