define([
		'services/Services',
		'factories/AgentVersionFactory',
		'decorators/FactoryDecorator'
	],
	function (Services) {
		Services.service('AgentVersionService', ['FactoryDecorator', 'AgentVersionFactory', function AgentVersionFactory(FactoryDecorator, AgentVersionFactory) {
			return {
				get: FactoryDecorator.decorate(AgentVersionFactory.get),
				query: FactoryDecorator.decorate(AgentVersionFactory.query)

			};
		}]);
	});
