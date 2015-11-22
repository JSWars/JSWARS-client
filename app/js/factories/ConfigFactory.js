define([
		'factories/Factories'
	],
	function (Factories) {
		Factories.factory('Config', [function Config() {
			return {
				host: 'http://jswars.io/api/'
			};
		}]);
	});
