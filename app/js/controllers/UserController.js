define([
    'controllers/Controllers',
    'factories/UserFactory'
], function (Controllers) {
    Controllers.controller("UserController", ['$scope', '$stateParams', 'User', 'State', function ($scope, $stateParams, User, State) {

        State.setState({});

        $scope.user = User.get({username: $stateParams.username});
    }]);
});