define([
		'services/Services'
	],
	function (Services) {
		Services.service('ModalService', ['$modal', function ($modal) {


			var ModalService = {
				message: function () {
					var modalInstance = $modal.open({
						template: 'texto de prueba'
					});
					modalInstance.result.then(function (selectedItem) {
						//
					});
				}
			};

			return ModalService;

		}]);
	});
