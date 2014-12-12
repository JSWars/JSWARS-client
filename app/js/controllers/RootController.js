define([
        'controllers/Controllers'
    ],
    function (Controllers) {
        Controllers.controller("RootController", ['$scope', '$rootScope', function RootController($scope, $rootScope) {
            $rootScope.$on("state.title", function (x,data) {
                $scope.title = data.title;
            });
        }]);
    });