define([
		'filters/Filters'
	],
	function (Filters) {
		Filters
			.filter('errorFilter', [function () {
				return function (input) {
					var errorDescriptions = {
						'AGENT_NOT_FOUND': 'Agent not found.',
						'AGENT_NOT_SAVED': 'Agent not saved.',
						'AGENT_VERSION_NOT_SAVED': 'Agent version not saved.',
						'ALREADY_JOINED': 'Tournament already joined.',
						'CODE_REQUIRED': 'Code is required.',
						'ERROR_CREATING_VERSION': 'Error creating agente version.',
						'ERROR_RECOVERING_AGENT': 'Error recovering agent.',
						'ERROR_RECOVERING_AGENT_VERSIONS': 'Error recovering agent version.',
						'ID_REQUIRED': 'Agent identifier required.',
						'INVALID_CODE': 'Invalid code.',
						'INVALID_SYNTAX': 'Invalid code syntax.',
						'INVALID_TOURNAMENT_STATE': 'Invalid tournament state. Unable to join.',
						'NAME_ALREADY_IN_USE': 'Agent name already in use.',
						'NAME_REQUIRED': 'Agent name required.',
						'NO_INIT_OR_TICK_FUNCTION': 'Tick or init function are not present. Check the documentation.',
						'TOURNAMENT_FULL': 'Tournament is already full.',
						'TOURNAMENT_NOT_FOUND': 'Tournament not found.',
						'UNAUTHORIZED': 'Unauthorized.',
						'VERSION_ID_REQUIRED': 'Agent version identifier required.',
						'ITEM_QUEUE_NOT_FOUND': 'Item queue not found.',
						'ERROR_LOADING_AGENT_CODE': 'An agent can\'t be loaded.',
						'ERROR_CONFIGURING_BATTLE': 'Error configuring battle.',
						'ERROR_LOADING_CHUNKS': "Error loading game frames. Please press play again."

					};
					return errorDescriptions[input] || input;
				};
			}]);
	});




