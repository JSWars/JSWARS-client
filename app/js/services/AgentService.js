define([
		'services/Services',
		'factories/AgentFactory',
		'decorators/FactoryDecorator'
	],
	function (Services) {
		Services.service('AgentService', ['FactoryDecorator', 'AgentFactory', function AgentService(FactoryDecorator, AgentFactory) {
			return {
				get: FactoryDecorator.decorate(AgentFactory.get),
				getVersion: FactoryDecorator.decorate(AgentFactory.getVersion),
				create: FactoryDecorator.decorate(AgentFactory.create),
				update: FactoryDecorator.decorate(AgentFactory.update),
				query: FactoryDecorator.decorate(AgentFactory.query)
			};
		}]);
	});
