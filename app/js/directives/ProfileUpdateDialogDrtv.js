define([
        'directives/directives',
        'factories/CountriesFactory',
        'services/SessionService'
    ],
    function (directives) {
        directives
            .directive('profileUpdate', ['$modal', function ($modal) {
                return {
                    restrict: 'A',
                    scope: {
                        'onComplete': '='
                    },
                    link: function ($scope, element, attrs) {

                        function ProfileUpdateModalController($modalScope, $modalInstance, Session, Countries) {

                            $modalScope.profile = Session.get();

                            $modalScope.countries = [];
                            angular.forEach(Countries, function (country, code) {
                                $modalScope.countries.push({
                                    code: code,
                                    name: country
                                });
                            });

                            $modalScope.update = function () {
                                //Here we need to update profile
                            };

                            $modalScope.cancel = function () {
                                $modalInstance.dismiss('Ventana cerrada');
                            };
                        }

                        $scope.open = function () {
                            $modal.open({
                                templateUrl: '/views/directives/ProfileUpdateDialogView.html',
                                controller: ['$scope', '$modalInstance', 'Session', 'Countries', ProfileUpdateModalController]
                            })
                                .result.then(function (result) {
                                    ($scope.onComplete || angular.noop)(false)
                                }, function (err) {
                                    ($scope.onComplete || angular.noop)(true, err);
                                });
                        };

                        $(element).click(element, $scope.open);

                    }
                };
            }])
        ;
    })
;
