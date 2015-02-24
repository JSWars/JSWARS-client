define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("SigninController", ['$scope', function SigninController($scope) {

		$scope.ghLogin = function (e) {
			e.preventDefault();
			document.location.href = '/api/login/github?return=' + encodeURIComponent('/#/user/:username/');
		};

	}]);
});
