define([
    'controllers/Controllers',
    'factories/UserFactory',
    'factories/BattleFactory'
], function (Controllers) {
    Controllers.controller("BattleController", ['$scope', '$stateParams', 'State', 'Battle', function ($scope, $stateParams, State, Battle) {

        State.setState({
            title: "Jugador 1 VS Jugador 2"
        });

        $scope.battle = Battle.get({id: $stateParams.id})

    }]);
});