define([
    'controllers/Controllers',
    'components/moment/moment',
    'factories/UserFactory'
], function (Controllers, Moment) {
    Controllers.controller("UserController", ['$scope', '$stateParams', 'User', 'State', function ($scope, $stateParams, User, State) {

        State.setState({});

        $scope.user = User.get({username: $stateParams.username});
        $scope.activity = User.activity({username: $stateParams.username});

    }]);
});