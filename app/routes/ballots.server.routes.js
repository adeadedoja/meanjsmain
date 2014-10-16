'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var ballots = require('../../app/controllers/ballots');

	// Ballots Routes
	app.route('/ballots')
		.get(ballots.list)
		.post(users.requiresLogin, ballots.create);

	app.route('/ballots/:ballotId')
		.get(ballots.read)
		.put(users.requiresLogin, ballots.hasAuthorization, ballots.update)
		.delete(users.requiresLogin, ballots.hasAuthorization, ballots.delete);

	// Finish by binding the Ballot middleware
	app.param('ballotId', ballots.ballotByID);
};