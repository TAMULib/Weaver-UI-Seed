app.config(function($routeProvider, $locationProvider, $sceDelegateProvider) {
	$locationProvider.html5Mode(true);
	
	$sceDelegateProvider.resourceUrlWhitelist([
        'self',
        appConfig.webService + "/**"
    ]);
	
	$routeProvider.
		when('/users', {
			templateUrl: 'views/users.html',
			access: ["ROLE_ADMIN", "ROLE_MANGER"]
		}).
		when('/myView', {
			templateUrl: 'views/myview.html'
		}).
		when('/', {
			templateUrl: 'views/home.html'
		}).

		// Error Routes
		when('/error/403', {
			templateUrl: 'views/errors/403.html',
			controller: 'ErrorPageController'
		}).
		when('/error/404', {
			templateUrl: 'views/errors/404.html',
			controller: 'ErrorPageController'

		}).
		when('/error/500', {
			templateUrl: 'views/errors/500.html',
			controller: 'ErrorPageController'
		}).
		otherwise({redirectTo: '/error/404'});

});