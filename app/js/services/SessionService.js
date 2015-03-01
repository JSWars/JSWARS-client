define([
		'services/Services',
		'factories/SessionFactory'
	],
	function (Services) {
		Services.service('SessionService', ['$timeout', '$q', '$log', 'SessionFactory', function ($timeout, $q, $log, SessionFactory) {
			return {
				/**
				 *
				 * @returns {{username: string}}
				 */
				get: function get() {
					var deferred = $q.defer();
					SessionFactory.get()
						.$promise
						.then(function (session) {
							deferred.resolve(session);
						}, function (errorResponse) {
							$log.error(errorResponse);
							deferred.reject(errorResponse);
						});
					return deferred.promise;
				}
			};

		}]);
	});
