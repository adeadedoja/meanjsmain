'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ballot Schema
 */
var BallotSchema = new Schema({
	election: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	contestant: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Ballot', BallotSchema);