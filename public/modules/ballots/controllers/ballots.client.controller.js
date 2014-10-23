'use strict';

// Ballots controller
angular.module('ballots').controller('BallotsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ballots', 'Elections', 'Candidates',
	function($scope, $stateParams, $location, Authentication, Ballots, Elections, Candidates ) {
		$scope.authentication = Authentication;
		$scope.elections = Elections.query();
		$scope.contestants = Candidates.query();
		// Create new Ballot
		$scope.create = function() {
			// Create new Ballot object
			var ballot = new Ballots ({
				election: this.election,
				contestant: this.contestant 
			});

			// Redirect after save
			ballot.$save(function(response) {
				$location.path('ballots/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Ballot
		$scope.remove = function( ballot ) {
			if ( ballot ) { ballot.$remove();

				for (var i in $scope.ballots ) {
					if ($scope.ballots [i] === ballot ) {
						$scope.ballots.splice(i, 1);
					}
				}
			} else {
				$scope.ballot.$remove(function() {
					$location.path('ballots');
				});
			}
		};

		// Update existing Ballot
		$scope.update = function() {
			var ballot = $scope.ballot ;

			ballot.$update(function() {
				$location.path('ballots/' + ballot._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ballots
		$scope.find = function() {
			$scope.ballots = Ballots.query();
		};

		// Find existing Ballot
		$scope.findOne = function() {
			$scope.ballot = Ballots.get({ 
				ballotId: $stateParams.ballotId
			});
		};
	}
]);