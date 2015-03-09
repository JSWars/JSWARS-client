define([
		'services/Services',
		'factories/AgentFactory',
		'decorators/FactoryDecorator'
	],
	function (Services) {
		Services.service('AgentService', ['FactoryDecorator', 'AgentFactory', function AgentService(FactoryDecorator, AgentFactory) {
			return {
				create: FactoryDecorator.decorate(AgentFactory.create),
				query: FactoryDecorator.decorate(AgentFactory.query)
			};
		}]);
	});
