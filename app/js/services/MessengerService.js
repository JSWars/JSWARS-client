/* global Messenger */
define([
		'services/Services',
		'messenger',
		'messenger-future'
	],
	function (Services) {
		Services.service('Messenger', function () {


			Messenger.options = {
				extraClasses: 'messenger-fixed messenger-on-top',
				theme: 'future'
			};

			var showMessenger = function (message, messengerType) {

				if (!_.isUndefined(chrome.notifications)) {
					var options = {
						templateType: "simple",
						title: "Opera servicios",
						message: message,
						iconUrl: "http://dev.operaservicios.es/images/ico/favicon.png",
						priority: 0
					};
					chrome.notifications.create("opera", options, angular.noop)
				} else {
					new Messenger({
						parentLocation: ['.messenger-wrapper']
					}).post({
							showCloseButton: true,
							hideAfter: 3,
							hideOnNavigate: true,
							message: message,
							type: messengerType
						});
				}
			};

			return {
				error: function (message) {
					showMessenger(message, 'error');
				},
				info: function (message) {
					showMessenger(message, 'info');
				},
				success: function (message) {
					showMessenger(message, undefined);
				}

			};
		});
	});
