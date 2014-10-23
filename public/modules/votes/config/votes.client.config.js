'use strict';

// Configuring the Articles module
angular.module('votes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Votes', 'votes', 'dropdown', '/votes(/create)?');
		Menus.addSubMenuItem('topbar', 'votes', 'Lista Votes', 'votes');
		Menus.addSubMenuItem('topbar', 'votes', 'New Vote', 'votes/create');
	}
]);