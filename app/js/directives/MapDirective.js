define([
    'directives/Directives',
    'assets/maps/world',
    'components/jvectormap/jquery-jvectormap'
], function (Directives, WorldMapData) {
    Directives.directive("worldMap", [function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.vectorMap({
                    map: 'worldMillEn',
                    backgroundColor: 'transparent',
                    hoverColor: false
                });
                element
                    .find("svg")
                    .height(300)
            }
        }
    }])
});
