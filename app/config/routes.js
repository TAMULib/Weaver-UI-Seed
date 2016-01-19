app.config(['$routeProvider', '$locationProvider', '$sceDelegateProvider', function($routeProvider, $locationProvider, $sceDelegateProvider) {
	$locationProvider.html5Mode(true);
	$sceDelegateProvider.resourceUrlWhitelist([
        'self',
        appConfig.webService + "/**"
    ]);
	$routeProvider.
		when('/users', {
			templateUrl: 'views/users.html'
		}).
		when('/myview', {
			templateUrl: 'views/myview.html'
		}).
		when('/theme', {
			templateUrl: 'views/theme.html'
		}).
		when('/restrictedAccess', {
			templateUrl: 'views/restrictedAccess.html'
		}).
		otherwise({redirectTo: '/',
			templateUrl: 'views/home.html'
		});
}]);