'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Election Schema
 */
var ElectionSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Election name',
		trim: true
	},
	start_time: {
		type: String,
		default: '',
		trim: true
	},	
	end_time: {
		type: String,
		default: '',
		trim: true
	},	
	election_date: {
		type: Date,
		default: '',
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

mongoose.model('Election', ElectionSchema);