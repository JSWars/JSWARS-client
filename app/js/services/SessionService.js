define([
		'services/Services',
		'factories/SessionFactory',
		'decorators/FactoryDecorator'
	],
	function (Services) {
		Services.service('SessionService', ['FactoryDecorator', 'SessionFactory', function (FactoryDecorator, SessionFactory) {
			return {
				get: FactoryDecorator.decorate(SessionFactory.get)
			};
		}]);
	});
