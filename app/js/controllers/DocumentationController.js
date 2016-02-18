/**
 * Created by Luiss_000 on 11/12/2015.
 */
define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("DocumentationController", ['$http', '$scope', 'State', function ($http, $scope, State) {

		$scope.editorOptions = {
			lineWrapping: true,
			lineNumbers: true,
			mode: 'javascript',
			readOnly: 'nocursor',
			theme: 'ambiance'
		};

		State.setState({
			title: "Documentation"
		});

		var codes = [
			"json-units",
			"js-agent",
			"json-map",
			"json-gameState",
			"json-teams",
			"js-getPath",
			"js-action",
			"js-vector2D",
			"json-bullet"
		];

		for (var i in codes) {
			var type = codes[i].split("-")[0];
			var code = codes[i].split("-")[1];
			var scopeName = "code" + code.charAt(0).toUpperCase() + code.slice(1);
			var json = "/samples/" + code + "." + type + "sample";

			(function (_scopeName) {
				$http({
					method: 'GET', url: json,
					transformResponse: function (data) {
						return data;
					}
				}).then(function (resource) {
						$scope[_scopeName] = resource.data;
					}
				);
			})(scopeName)

		}

		$(window).scroll(function () {
			$("#docmenu").css("top", Math.max(0, 250 - $(this).scrollTop()));
		});

		$scope.$on('$destroy', function () {
			$(window).unbind("scroll");
		});

	}]);
});
