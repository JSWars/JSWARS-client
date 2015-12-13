/**
 * Created by Luiss_000 on 11/12/2015.
 */
define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("DocumentationController", ['$scope','State', function ($scope, State) {

		State.setState({
			title: "Documentation"
		});
	}]);
});
