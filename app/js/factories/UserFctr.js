require([
    'factories',
    'factories/configFactory'
], function (factories, config) {
    factories.factory('Users', ['$resource', 'Config', function ($resource, Config) {
        return $resource(Config.host + 'users/');
    }]);
});