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
		when('/403', {
			templateUrl: 'views/errors/403.html'
		}).
		when('/404', {
			templateUrl: 'views/errors/404.html'
		}).
		when('/500', {
			templateUrl: 'views/errors/500.html'
		}).
		otherwise({redirectTo: '/404'});

});