define([
        'factories/Factories'
    ],
    function (Factories) {
        Factories.factory('Config', [function ConfigFactory() {
            return {
                host: 'http://private-00a3-aibattle1.apiary-mock.com/'
            };
        }]);
    });