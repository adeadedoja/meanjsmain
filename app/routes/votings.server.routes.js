'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var votings = require('../../app/controllers/votings');

	// Votings Routes
	app.route('/votings')
		.get(votings.list)
		.post(users.requiresLogin, votings.create);

	app.route('/votings/:votingId')
		.get(votings.read)
		.put(users.requiresLogin, votings.hasAuthorization, votings.update)
		.delete(users.requiresLogin, votings.hasAuthorization, votings.delete);

	// Finish by binding the Voting middleware
	app.param('votingId', votings.votingByID);
};