/**
 * Created by Luiss_000 on 11/12/2015.
 */
define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("DocumentationController", ['$scope','State', function ($scope, State) {

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
	}]);
});
