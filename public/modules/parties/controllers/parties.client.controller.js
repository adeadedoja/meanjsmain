'use strict';

// Parties controller
angular.module('parties').controller('PartiesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Parties',
	function($scope, $stateParams, $location, Authentication, Parties ) {
		$scope.authentication = Authentication;

		// Create new Party
		$scope.create = function() {
			// Create new Party object
			var party = new Parties ({
				name: this.name
			});

			// Redirect after save
			party.$save(function(response) {
				$location.path('parties/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Party
		$scope.remove = function( party ) {
			if ( party ) { party.$remove();

				for (var i in $scope.parties ) {
					if ($scope.parties [i] === party ) {
						$scope.parties.splice(i, 1);
					}
				}
			} else {
				$scope.party.$remove(function() {
					$location.path('parties');
				});
			}
		};

		// Update existing Party
		$scope.update = function() {
			var party = $scope.party ;

			party.$update(function() {
				$location.path('parties/' + party._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Parties
		$scope.find = function() {
			$scope.parties = Parties.query();
		};

		// Find existing Party
		$scope.findOne = function() {
			$scope.party = Parties.get({ 
				partyId: $stateParams.partyId
			});
		};
	}
]);