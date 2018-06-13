define([
	'controllers/Controllers'
], function (Controllers) {
	Controllers.controller("CookiesController", ['State', function (State) {

		State.setState({
			title: "Cookies"
		});

	}]);
});
