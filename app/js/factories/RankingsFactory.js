define([
        'factories/Factories'
    ],
    function (Factories, Config) {
        Factories.factory('Rankings', ['$resource', 'Config', function Ranking($resource, Config) {
            return $resource(Config.host + 'rankings/');
        }]);
    });