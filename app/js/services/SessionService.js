define([
        'services/Services'
    ],
    function (Services) {
        Services.service('Session', ['$timeout', '$q', function ($timeout, $q) {
            return {
                /**
                 *
                 * @returns {{username: string}}
                 */
                get: function getUser() {
                    //Returning always the same user for testing porpuses
                    //Simulating a delay
                    return {
                        username: 'djwmarcx',
                        email: 'djwedo@gmail.com',
                        country: 'ES',
                        avantar: 'img/avatars/Awesome.png',
                        name: 'Marcos Pérez Ferro'
                    };
                }
            };

        }]);
    });