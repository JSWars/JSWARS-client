define([
        'factories/Factories'
    ],
    function (Factories) {
        Factories.factory('Config', [function Config() {
            return {
                host: 'http://private-00a3-aibattle1.apiary-mock.com/'
            };
        }]);
    });