'use strict';

//Setting up route
angular.module('votings').config(['$stateProvider',
	function($stateProvider) {
		// Votings state routing
		$stateProvider.
		state('listVotings', {
			url: '/votings',
			templateUrl: 'modules/votings/views/list-votings.client.view.html'
		}).
		state('createVoting', {
			url: '/votings/create',
			templateUrl: 'modules/votings/views/create-voting.client.view.html'
		}).
		state('viewVoting', {
			url: '/votings/:votingId',
			templateUrl: 'modules/votings/views/view-voting.client.view.html'
		}).
		state('editVoting', {
			url: '/votings/:votingId/edit',
			templateUrl: 'modules/votings/views/edit-voting.client.view.html'
		});
	}
]);