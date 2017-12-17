angular.module('monitora', ['ngSanitize', 'deviceDirectives', 'services', 'toggle-switch', 'ngRoute'])
	.config(function($routeProvider, $locationProvider) {

		$locationProvider.html5Mode(true);

		$routeProvider.when('/devices', {
			templateUrl: 'partials/principal.html',
			controller: 'DevicesController'
		});

		$routeProvider.when('/device/new', {
			templateUrl: 'partials/device.html',
			controller: 'DeviceController'
		});

		$routeProvider.when('/device/edit/:deviceId', {
			templateUrl: 'partials/device.html',
			controller: 'DeviceController'
		});

		$routeProvider.otherwise({redirectTo: '/devices'})

	});
