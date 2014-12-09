require([
    'factories',
    'factories/ConfigFctr'
], function (factories, Config) {
    factories.factory('Users', ['$resource', 'Config', function ($resource, Config) {
        return $resource(Config.host + 'users/');
    }]);
});