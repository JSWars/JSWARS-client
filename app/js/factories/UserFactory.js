define([
        'factories/Factories'
    ],
    function (Factories) {
        Factories.factory('User', ['$resource', 'Config', function UserFactory($resource, Config) {
            return $resource(Config.host + 'users/:username', {}, {
                activity: {
                    url: Config.host + 'users/:username/activity',
                    method: 'GET',
                    isArray:true
                },
                agents: {
                    url: Config.host + 'users/:username/agents',
                    method: 'GET',
                    isArray:true
                }
            });
        }]);
    });