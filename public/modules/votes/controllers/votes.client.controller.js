'use strict';

// Votes controller
angular.module('votes').controller('VotesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Votes', 'Ballots', 'Elections',
	function($scope, $stateParams, $location, Authentication, Votes, Elections, Ballots ) {
		$scope.authentication = Authentication;
		$scope.elections = Elections.query();
		$scope.ballots = Ballots.query();
		$scope.groupaOptions = [{electionname:'presidential'}, {electionname:'B'}];
  
  $scope.persons =  [{
    'name' : 'Steve',
    'group' : 'presidential'
  },
  {
    'name' : 'Bob',
    'group' : 'B'
  },
  {
    'name' : 'Peter',
    'group' : 'B'
  }];
		// Create new Vote
		$scope.create = function() {
			// Create new Vote object
			var vote = new Votes ({
				election: this.election,
				voter: this.voter,
				choice: this.choice
			});

			// Redirect after save
			vote.$save(function(response) {
				$location.path('votes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Vote
		$scope.remove = function( vote ) {
			if ( vote ) { vote.$remove();

				for (var i in $scope.votes ) {
					if ($scope.votes [i] === vote ) {
						$scope.votes.splice(i, 1);
					}
				}
			} else {
				$scope.vote.$remove(function() {
					$location.path('votes');
				});
			}
		};

		// Update existing Vote
		$scope.update = function() {
			var vote = $scope.vote ;

			vote.$update(function() {
				$location.path('votes/' + vote._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Votes
		$scope.find = function() {
			$scope.votes = Votes.query();
		};

		// Find existing Vote
		$scope.findOne = function() {
			$scope.vote = Votes.get({ 
				voteId: $stateParams.voteId
			});
		};
	}
]);