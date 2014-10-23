'use strict';

(function() {
	// Votings Controller Spec
	describe('Votings Controller Tests', function() {
		// Initialize global variables
		var VotingsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Votings controller.
			VotingsController = $controller('VotingsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Voting object fetched from XHR', inject(function(Votings) {
			// Create sample Voting using the Votings service
			var sampleVoting = new Votings({
				name: 'New Voting'
			});

			// Create a sample Votings array that includes the new Voting
			var sampleVotings = [sampleVoting];

			// Set GET response
			$httpBackend.expectGET('votings').respond(sampleVotings);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.votings).toEqualData(sampleVotings);
		}));

		it('$scope.findOne() should create an array with one Voting object fetched from XHR using a votingId URL parameter', inject(function(Votings) {
			// Define a sample Voting object
			var sampleVoting = new Votings({
				name: 'New Voting'
			});

			// Set the URL parameter
			$stateParams.votingId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/votings\/([0-9a-fA-F]{24})$/).respond(sampleVoting);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.voting).toEqualData(sampleVoting);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Votings) {
			// Create a sample Voting object
			var sampleVotingPostData = new Votings({
				name: 'New Voting'
			});

			// Create a sample Voting response
			var sampleVotingResponse = new Votings({
				_id: '525cf20451979dea2c000001',
				name: 'New Voting'
			});

			// Fixture mock form input values
			scope.name = 'New Voting';

			// Set POST response
			$httpBackend.expectPOST('votings', sampleVotingPostData).respond(sampleVotingResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Voting was created
			expect($location.path()).toBe('/votings/' + sampleVotingResponse._id);
		}));

		it('$scope.update() should update a valid Voting', inject(function(Votings) {
			// Define a sample Voting put data
			var sampleVotingPutData = new Votings({
				_id: '525cf20451979dea2c000001',
				name: 'New Voting'
			});

			// Mock Voting in scope
			scope.voting = sampleVotingPutData;

			// Set PUT response
			$httpBackend.expectPUT(/votings\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/votings/' + sampleVotingPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid votingId and remove the Voting from the scope', inject(function(Votings) {
			// Create new Voting object
			var sampleVoting = new Votings({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Votings array and include the Voting
			scope.votings = [sampleVoting];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/votings\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVoting);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.votings.length).toBe(0);
		}));
	});
}());