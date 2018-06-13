define([
		'controllers/Controllers',
		'services/SessionService'
	],
	function (Controllers) {
		Controllers.controller('RootController', ['$scope', '$rootScope', '$modal', '$http', 'SessionService', function ($scope, $rootScope, $modal, $http, SessionService) {
			$rootScope.$on('state.title', function (x, data) {
				$scope.title = data.title;
			});

			$scope.online;

			SessionService.get()
				.then(function (session) {
					$scope.session = session;
				}, function () {

				});

			$http.get('/api/status/')
				.then(function () {
					$scope.online = true;
				},
				function () {
					$scope.online = false;
				});


			$scope.ghLogin = function (e) {
				e.preventDefault();
				document.location.href = '/api/login/github?return=' + encodeURIComponent('/#/user/:username/');
			};

			$rootScope.$on("general.login.required", function () {
				$modal.open({
					templateUrl: '/views/dialogs/loginAlertDialogView.html',
					controller: ['$scope', '$modalInstance', function ($modalScope, $modalInstance) {

						$modalScope.cancel = function (e) {
							$modalInstance.close();
						};

						$modalScope.login = function (e) {
							$scope.ghLogin(e);
						}

					}]
				})
			});
		}]);
	});
