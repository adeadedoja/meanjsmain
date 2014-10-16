'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var parties = require('../../app/controllers/parties');

	// Parties Routes
	app.route('/parties')
		.get(parties.list)
		.post(users.requiresLogin, parties.create);

	app.route('/parties/:partyId')
		.get(parties.read)
		.put(users.requiresLogin, parties.hasAuthorization, parties.update)
		.delete(users.requiresLogin, parties.hasAuthorization, parties.delete);

	// Finish by binding the Party middleware
	app.param('partyId', parties.partyByID);
};