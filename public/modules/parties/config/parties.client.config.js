'use strict';

// Configuring the Articles module
angular.module('parties').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Parties', 'parties', 'dropdown', '/parties(/create)?');
		Menus.addSubMenuItem('topbar', 'parties', 'List Parties', 'parties');
		Menus.addSubMenuItem('topbar', 'parties', 'New Party', 'parties/create');
	}
]);