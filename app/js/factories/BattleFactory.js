define([
        'factories/Factories',
        'factories/ConfigFactory'
    ],
    function (Factories) {
        Factories.factory('Battle', ['$resource', 'Config', function Battle($resource, Config) {
            return $resource(Config.host + 'battle/:id', {}, {
            });
        }]);
    });