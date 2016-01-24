define([
		'services/Services',
		'decorators/FactoryDecorator',
		'factories/TournamentFactory'
	],
	function (Services) {
		Services.service('TournamentService', ['FactoryDecorator', 'TournamentFactory', function TournamentService(FactoryDecorator, TournamentFactory) {
			return {
				query: FactoryDecorator.decorate(TournamentFactory.query),
				get: FactoryDecorator.decorate(TournamentFactory.get),
				join: FactoryDecorator.decorate(TournamentFactory.join)
			};
		}]);
	});
