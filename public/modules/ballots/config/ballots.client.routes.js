'use strict';

//Setting up route
angular.module('ballots').config(['$stateProvider',
	function($stateProvider) {
		// Ballots state routing
		$stateProvider.
		state('listBallots', {
			url: '/ballots',
			templateUrl: 'modules/ballots/views/list-ballots.client.view.html'
		}).
		state('createBallot', {
			url: '/ballots/create',
			templateUrl: 'modules/ballots/views/create-ballot.client.view.html'
		}).
		state('viewBallot', {
			url: '/ballots/:ballotId',
			templateUrl: 'modules/ballots/views/view-ballot.client.view.html'
		}).
		state('editBallot', {
			url: '/ballots/:ballotId/edit',
			templateUrl: 'modules/ballots/views/edit-ballot.client.view.html'
		});
	}
]);