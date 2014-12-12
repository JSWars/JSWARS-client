define([
        'factories/Factories'
    ],
    function (Factories, Config) {
        Factories.factory('Rankings', ['$resource', 'Config', function RankingFactory($resource, Config) {
            return $resource(Config.host + 'rankings/');
        }]);
    });