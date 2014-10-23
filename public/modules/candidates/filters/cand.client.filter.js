'use strict';

angular.module('candidates').filter('cand', [
	function() {
		return function(input) {
			// Cand directive logic
			// ...

			return 'cand filter: ' + input;
		};
	}
]);