define([
		'factories/Factories'
	],
	function (Factories) {
		Factories.factory('Session', ['$resource', 'Config', function Session($resource, Config) {
			return $resource('/api/session/', {}, {});
		}]);
	});
