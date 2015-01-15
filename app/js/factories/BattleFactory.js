define([
        'factories/Factories'
    ],
    function (Factories) {
        Factories.factory('Battle', ['$resource', 'Config', function BattleFactory($resource, Config) {
            return $resource(Config.host + 'battle/:id', {}, {
            });
        }]);
    });