define([
		'factories/Factories',
		'factories/ConfigFactory'
	],
	function (Factories) {
		Factories.factory('SessionFactory', ['$resource', 'Config', function SessionFactory($resource, Config) {
			return $resource('/api/session/', {}, {});
		}]);
	});
