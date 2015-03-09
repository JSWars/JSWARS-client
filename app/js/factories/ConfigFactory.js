define([
		'factories/Factories'
	],
	function (Factories) {
		Factories.factory('Config', [function Config() {
			return {
				host: 'http://dev.tfg.com/api/'
			};
		}]);
	});
