define([
		'services/Services'
	],
	function (Services) {
		Services.service('AnimationFrame', ['$window', '$timeout', function ($window, $timeout) {

			var lastTime = 0;
			var vendors = ['ms', 'moz', 'webkit', 'o'];
			for (var x = 0; x < vendors.length && !$window.requestAnimationFrame; x = x + 1) {
				$window.requestAnimationFrame = $window[vendors[x] + 'RequestAnimationFrame'];
				$window.cancelAnimationFrame = $window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
			}

			if (!$window.requestAnimationFrame) {
				$window.requestAnimationFrame = function (callback) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = $timeout(function () {
							callback(currTime + timeToCall);
						},
						timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
			}

			if (!$window.cancelAnimationFrame) {
				$window.cancelAnimationFrame = function (id) {
					clearTimeout(id);
				};
			}

			return {
				request: function (fn) {
					$window.requestAnimationFrame.call($window, fn);
				},
				cancel: function (fn) {
					$window.cancelAnimationFrame.call($window, fn);
				}
			};
		}]);
	});
