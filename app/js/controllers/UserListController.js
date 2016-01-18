define([
	'controllers/Controllers',
	'factories/ConfigFactory'
], function (Controllers) {
	Controllers.controller("UserListController", ['$scope', 'UserService', 'State', function UserListController($scope, UserService, State) {


		State.setState({
			title: "Users"
		});

		$scope.page = 1;

		$scope.pageChanged = function () {
			UserService.query({page: $scope.page})
				.then(function (users) {
					$scope.users = users;
				}, function () {
					$log.error('Error loading agent list');
				});
		};

		$scope.pageChanged();

	}]);
});
