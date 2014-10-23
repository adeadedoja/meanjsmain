'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Voting Schema
 */
var VotingSchema = new Schema({
	election: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	voter: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	choice: {
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

mongoose.model('Voting', VotingSchema);