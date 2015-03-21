define([
		'services/Services',
		'factories/UserFactory'
	],
	function (Services) {
		Services.service('UserService', ['FactoryDecorator', 'UserFactory', function UserService(FactoryDecorator, UserFactory) {
			return {
				update: FactoryDecorator.decorate(UserFactory.update),
				get: FactoryDecorator.decorate(UserFactory.get)
			};

		}]);
	});
