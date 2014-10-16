'use strict';

// Candidates controller

angular.module('candidates').controller('CandidatesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Candidates', 'Parties',  
	function($scope, $stateParams, $location, Authentication, Candidates, Parties ) {
		$scope.authentication = Authentication;
		$scope.pas = Parties.query();

		// Create new Candidate
		$scope.create = function() {
			// Create new Candidate object
			
			var candidate = new Candidates ({
				name: this.name,
				vision: this.vision,
				dob: this.dob,
				post: this.post,
				province: this.province,
				municipal: this.municipal,
				pa: this.pa
			});

			// Redirect after save
			candidate.$save(function(response) {
				$location.path('candidates/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Candidate
		$scope.remove = function( candidate ) {
			if ( candidate ) { candidate.$remove();

				for (var i in $scope.candidates ) {
					if ($scope.candidates [i] === candidate ) {
						$scope.candidates.splice(i, 1);
					}
				}
			} else {
				$scope.candidate.$remove(function() {
					$location.path('candidates');
				});
			}
		};

		// Update existing Candidate
		$scope.update = function() {
			var candidate = $scope.candidate ;

			candidate.$update(function() {
				$location.path('candidates/' + candidate._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Candidates
		$scope.find = function() {
			$scope.candidates = Candidates.query();
		};

		// Find existing Candidate
		$scope.findOne = function() {
			$scope.candidate = Candidates.get({ 
				candidateId: $stateParams.candidateId
			});
		};
	}
]);