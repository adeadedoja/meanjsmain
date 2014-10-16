'use strict';

(function() {
	// Parties Controller Spec
	describe('Parties Controller Tests', function() {
		// Initialize global variables
		var PartiesController,
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

			// Initialize the Parties controller.
			PartiesController = $controller('PartiesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Party object fetched from XHR', inject(function(Parties) {
			// Create sample Party using the Parties service
			var sampleParty = new Parties({
				name: 'New Party'
			});

			// Create a sample Parties array that includes the new Party
			var sampleParties = [sampleParty];

			// Set GET response
			$httpBackend.expectGET('parties').respond(sampleParties);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.parties).toEqualData(sampleParties);
		}));

		it('$scope.findOne() should create an array with one Party object fetched from XHR using a partyId URL parameter', inject(function(Parties) {
			// Define a sample Party object
			var sampleParty = new Parties({
				name: 'New Party'
			});

			// Set the URL parameter
			$stateParams.partyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/parties\/([0-9a-fA-F]{24})$/).respond(sampleParty);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.party).toEqualData(sampleParty);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Parties) {
			// Create a sample Party object
			var samplePartyPostData = new Parties({
				name: 'New Party'
			});

			// Create a sample Party response
			var samplePartyResponse = new Parties({
				_id: '525cf20451979dea2c000001',
				name: 'New Party'
			});

			// Fixture mock form input values
			scope.name = 'New Party';

			// Set POST response
			$httpBackend.expectPOST('parties', samplePartyPostData).respond(samplePartyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Party was created
			expect($location.path()).toBe('/parties/' + samplePartyResponse._id);
		}));

		it('$scope.update() should update a valid Party', inject(function(Parties) {
			// Define a sample Party put data
			var samplePartyPutData = new Parties({
				_id: '525cf20451979dea2c000001',
				name: 'New Party'
			});

			// Mock Party in scope
			scope.party = samplePartyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/parties\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/parties/' + samplePartyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid partyId and remove the Party from the scope', inject(function(Parties) {
			// Create new Party object
			var sampleParty = new Parties({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Parties array and include the Party
			scope.parties = [sampleParty];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/parties\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleParty);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.parties.length).toBe(0);
		}));
	});
}());