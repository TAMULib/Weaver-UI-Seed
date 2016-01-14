app.config(function($routeProvider) {
	
	$routeProvider.
		when('/users', {
			templateUrl: 'views/users.html'
		}).
		when('/myview', {
			templateUrl: 'views/myview.html'
		}).
		when('/restrictedAccess', {
			templateUrl: 'views/restrictedAccess.html'
		}).
		otherwise({redirectTo: '/',
			templateUrl: 'views/home.html'
		});

});