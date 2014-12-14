"use strict";
define([
    'directives/Directives',
    'moment'
], function (Directives, moment) {
    Directives.directive("fromNow", ['$interval', function ($interval) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var update = function () {
                    var date = moment(attrs.fromNow, 'x');
                    if (date.isValid()) {
                        element.text(date.fromNow());
                    } else {
                        element.text("Invalid Date");
                    }
                };

                $interval(update, 10000);
                update();
            }
        };
    }]);
});
