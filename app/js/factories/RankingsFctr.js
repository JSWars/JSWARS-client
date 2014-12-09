require([
    'factories',
    'factories/ConfigFctr'
], function (factories, Config) {
    factories.factory('Rankings', ['$resource', 'Config', function ($resource, Config) {
        return $resource(Config.host + 'rankings/');
    }]);
});