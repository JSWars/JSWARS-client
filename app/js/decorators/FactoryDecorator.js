/* global Messenger */
define([
		'services/Services'
	],
	function (Services) {
		Services.service('FactoryDecorator', ['$q', function ($q) {
			var FactoryDecorator = {
				decorate: function (resource) {
					return function (data) {
						var deferred = $q.defer();
						resource(data)
							.$promise
							.then(function (response) {
								deferred.resolve(response);
							}, function (errorResponse) {
								var data = errorResponse.data;
								deferred.reject(angular.extend({errorId: data.errorId || 'FATAL_ERROR'}, errorResponse.data));
							});

						return deferred.promise;
					};
				}

			};
			return FactoryDecorator;
		}
		]);
	});
