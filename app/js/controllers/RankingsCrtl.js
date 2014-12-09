define([
    'app',
    'factories/RankingsFctr',
    'filters/CountryFltr'
], function (app) {
    app.controller("RankingsController", ['$scope', 'Rankings', function ($scope, Rankings) {

        $scope.rankingRange = 24;

        $scope.rankings = Rankings.get();
    }]);
});