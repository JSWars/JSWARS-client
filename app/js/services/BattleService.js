define([
		'services/Services',
		'decorators/FactoryDecorator',
		'factories/BattleFactory'
	],
	function (Services) {
		Services.service('BattleService', ['FactoryDecorator', 'BattleFactory', function BattleService(FactoryDecorator, BattleFactory) {
			return {
				list: FactoryDecorator.decorate(BattleFactory.list),
				get: FactoryDecorator.decorate(BattleFactory.get),
				chunk: FactoryDecorator.decorate(BattleFactory.chunk),
				queue: FactoryDecorator.decorate(BattleFactory.queue),
				queueGet: FactoryDecorator.decorate(BattleFactory.queueGet)
			};
		}]);
	});
