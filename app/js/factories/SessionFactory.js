define([
		'factories/Factories'
	],
	function (Factories) {
		Factories.factory('SessionFactory', ['$resource', 'Config', function SessionFactory($resource, Config) {
			return $resource('/api/session/', {}, {});
		}]);
	});
