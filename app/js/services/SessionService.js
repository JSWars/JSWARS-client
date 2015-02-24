define([
		'services/Services',
		'factories/SessionFactory'
	],
	function (Services) {
		Services.service('Session', ['$timeout', '$q', 'Session', function ($timeout, $q, Session) {
			return {
				/**
				 *
				 * @returns {{username: string}}
				 */
				get: function get() {
					Session.get()
						.$promise
						.then(function () {

						}, function () {

						});
				}
			};

		}]);
	});
