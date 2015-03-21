define([
	'controllers/Controllers',
	'services/UserService'
], function (Controllers) {
	Controllers.controller("ActivityWidgetController", ['$scope', '$stateParams', 'User', function ($scope, $stateParams, User) {
		$scope.activity = User.activity({username: $stateParams.username});
	}]);
});
