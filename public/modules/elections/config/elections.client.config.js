'use strict';

// Configuring the Articles module
angular.module('elections').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Elections', 'elections', 'dropdown', '/elections(/create)?');
		Menus.addSubMenuItem('topbar', 'elections', 'List Elections', 'elections');
		Menus.addSubMenuItem('topbar', 'elections', 'New Election', 'elections/create');
	}
]);