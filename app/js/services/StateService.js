define([
        'services/Services'
    ],
    function (Services) {
        Services.service('State', ['$rootScope', function ($rootScope) {
            return {
                setState: function setState(state) {
                    $rootScope.$emit("state.title", state);
                }
            };

        }]);
    });