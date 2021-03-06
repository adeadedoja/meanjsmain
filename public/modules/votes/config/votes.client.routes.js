'use strict';

//Setting up route
angular.module('votes').config(['$stateProvider',
	function($stateProvider) {
		// Votes state routing
		$stateProvider.
		state('vt', {
			url: '/vt',
			templateUrl: 'modules/votes/views/vt.client.view.html'
		}).
		state('vote-now', {
			url: '/vote-now',
			templateUrl: 'modules/votes/views/vote-now.client.view.html'
		}).
		state('listVotes', {
			url: '/votes',
			templateUrl: 'modules/votes/views/list-votes.client.view.html'
		}).
		state('createVote', {
			url: '/votes/create',
			templateUrl: 'modules/votes/views/create-vote.client.view.html'
		}).
		state('chooseElection', {
			url: '/votes/choose',
			templateUrl: 'modules/votes/views/choose-election.client.view.html'
		}).
		state('viewVote', {
			url: '/votes/:voteId',
			templateUrl: 'modules/votes/views/view-vote.client.view.html'
		}).
		state('editVote', {
			url: '/votes/:voteId/edit',
			templateUrl: 'modules/votes/views/edit-vote.client.view.html'
		});
	}
]);