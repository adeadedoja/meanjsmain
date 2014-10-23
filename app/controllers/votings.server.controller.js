'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors'),
	Voting = mongoose.model('Voting'),
	_ = require('lodash');

/**
 * Create a Voting
 */
exports.create = function(req, res) {
	var voting = new Voting(req.body);
	voting.user = req.user;

	voting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voting);
		}
	});
};

/**
 * Show the current Voting
 */
exports.read = function(req, res) {
	res.jsonp(req.voting);
};

/**
 * Update a Voting
 */
exports.update = function(req, res) {
	var voting = req.voting ;

	voting = _.extend(voting , req.body);

	voting.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voting);
		}
	});
};

/**
 * Delete an Voting
 */
exports.delete = function(req, res) {
	var voting = req.voting ;

	voting.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(voting);
		}
	});
};

/**
 * List of Votings
 */
exports.list = function(req, res) { Voting.find().sort('-created').populate('user', 'displayName').exec(function(err, votings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(votings);
		}
	});
};

/**
 * Voting middleware
 */
exports.votingByID = function(req, res, next, id) { Voting.findById(id).populate('user', 'displayName').exec(function(err, voting) {
		if (err) return next(err);
		if (! voting) return next(new Error('Failed to load Voting ' + id));
		req.voting = voting ;
		next();
	});
};

/**
 * Voting authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.voting.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};