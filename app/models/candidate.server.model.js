'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Candidate Schema
 */
var CandidateSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Candidate name',
		trim: true
	},
	vision: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	dob: {
		type: Date,
		default: '',
		trim: true
	},
	post: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	province: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	municipal: {
		type: String,
		default: '',
		required: '',
		trim: true
	},
	pa: {
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

mongoose.model('Candidate', CandidateSchema);