define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("StartController", ['$scope', 'State', function ($scope, State) {

		State.setState({
			title: ""
		});

		$scope.ghLogin = function (e) {
			e.preventDefault();
			document.location.href = '/api/login/github?return=' + encodeURIComponent('/#/user/:username/');
		};

	}]);
});
