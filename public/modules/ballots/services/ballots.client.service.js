'use strict';

//Ballots service used to communicate Ballots REST endpoints
angular.module('ballots').factory('Ballots', ['$resource',
	function($resource) {
		return $resource('ballots/:ballotId', { ballotId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);