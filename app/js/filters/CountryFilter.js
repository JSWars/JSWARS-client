define([
		'filters/Filters'
	],
	function (Filters) {
		Filters
			.filter('CountryFilter', ['Countries', function (Countries) {
				return function (input) {
					var countries = Countries;
					return countries[input] || input;
				};
			}]);
	});




