'use strict';

//Votings service used to communicate Votings REST endpoints
angular.module('votings').factory('Votings', ['$resource',
	function($resource) {
		return $resource('votings/:votingId', { votingId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);