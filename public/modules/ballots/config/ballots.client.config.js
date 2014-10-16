'use strict';

// Configuring the Articles module
angular.module('ballots').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ballots', 'ballots', 'dropdown', '/ballots(/create)?');
		Menus.addSubMenuItem('topbar', 'ballots', 'List Ballots', 'ballots');
		Menus.addSubMenuItem('topbar', 'ballots', 'New Ballot', 'ballots/create');
	}
]);