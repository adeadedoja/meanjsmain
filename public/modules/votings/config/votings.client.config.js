'use strict';

// Configuring the Articles module
angular.module('votings').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Votings', 'votings', 'dropdown', '/votings(/create)?');
		Menus.addSubMenuItem('topbar', 'votings', 'List Votings', 'votings');
		Menus.addSubMenuItem('topbar', 'votings', 'New Voting', 'votings/create');
	}
]);