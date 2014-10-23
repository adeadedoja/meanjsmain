'use strict';

// Votings controller
angular.module('votings').controller('VotingsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Votings', 'Ballots', 'Elections',
	function($scope, $stateParams, $location, Authentication, Votings, Ballots, Elections ) {
		$scope.authentication = Authentication;
		$scope.ballots = Ballots.query();
		$scope.elections = Elections.query();
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

		// Create new Voting
		$scope.create = function() {
			// Create new Voting object
			var voting = new Votings ({
				election: this.electiona,
				voter: this.voter,
				choice: this.choice
			});

			// Redirect after save
			voting.$save(function(response) {
				$location.path('votings/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Voting
		$scope.remove = function( voting ) {
			if ( voting ) { voting.$remove();

				for (var i in $scope.votings ) {
					if ($scope.votings [i] === voting ) {
						$scope.votings.splice(i, 1);
					}
				}
			} else {
				$scope.voting.$remove(function() {
					$location.path('votings');
				});
			}
		};

		// Update existing Voting
		$scope.update = function() {
			var voting = $scope.voting ;

			voting.$update(function() {
				$location.path('votings/' + voting._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Votings
		$scope.find = function() {
			$scope.votings = Votings.query();
		};

		// Find existing Voting
		$scope.findOne = function() {
			$scope.voting = Votings.get({ 
				votingId: $stateParams.votingId
			});
		};
	}
]);