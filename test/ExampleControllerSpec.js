describe('ExampleController', function() {
    var scope, controller, httpBackend;

    // Initialization of the AngularJS application before each test case
    beforeEach(module('ExampleApp'));

    // Injection of dependencies, $http will be mocked with $httpBackend
    beforeEach(inject(function($rootScope, $controller, $httpBackend) {
        scope = $rootScope;
        controller = $controller;
        httpBackend = $httpBackend;
    }));

    it('should query the webservice', function() {

        // Which HTTP requests do we expect to occur, and how do we respond?
        httpBackend.expectGET('/users').respond('[{"name": "First User"}, {"name": "Second User"}]');

        // Starting the controller
        controller('ExampleController', {'$scope': scope });

        // Respond to all HTTP requests
        httpBackend.flush();

        // Trigger the AngularJS digest cycle in order to resolve all promises
        scope.$apply();

        // We expect the controller to put the right value onto the scope
        expect(scope.firstUsername).toEqual('First User');

    });

});
