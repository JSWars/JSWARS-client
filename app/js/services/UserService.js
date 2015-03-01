define([
		'services/Services',
		'factories/UserFactory'
	],
	function (Services) {
		Services.service('UserService', ['$timeout', '$q', '$log', 'UserFactory', function ($timeout, $q, $log, UserFactory) {
			return {
				/**
				 *
				 * @returns {{username: string}}
				 */
				update: function update(userData) {
					var deferred = $q.defer();
					UserFactory.update(userData)
						.$promise
						.then(function () {
							deferred.resolve();
						}, function (errorResponse) {
							$log.error(errorResponse);
							deferred.reject(errorResponse);
						});
					return deferred.promise;
				},
				get: function get(userData) {
					var deferred = $q.defer();
					UserFactory.get(userData)
						.$promise
						.then(function (user) {
							deferred.resolve(user);
						}, function (errorResponse) {
							$log.error(errorResponse);
							deferred.reject(errorResponse);
						});
					return deferred.promise;
				}
			};

		}]);
	});
