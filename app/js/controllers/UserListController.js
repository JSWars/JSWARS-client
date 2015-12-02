define([
	'controllers/Controllers',
	'factories/ConfigFactory'
], function (Controllers) {
	Controllers.controller("UserListController", ['$scope', 'UserService', 'State', function UserListController($scope, UserService, State) {


		State.setState({
			title: "Users"
		});


		UserService.query({})
			.then(function (users) {
				$scope.users = users;
			}, function () {
				$log.error('Error loading agent list');
			});

	}]);
});
