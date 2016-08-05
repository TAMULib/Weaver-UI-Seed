app.controller('AdminController', function ($controller, $injector, $route, $scope, AssumedControl, AuthServiceApi, StorageService, UserService, WsApi) {

    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

    if($scope.isAdmin()) {

    	var User = $injector.get("User");

    	var UserRepo = $injector.get("UserRepo");

    	var services = [
			User,
			UserRepo
		];

		$scope.user = UserService.getCurrentUser();

	    $scope.assumedControl = AssumedControl.get();

	    AssumedControl.set({
			'netid': '',
			'button': StorageService.get("assuming") == 'true' ? 'Unassume User' : 'Assume User',
			'status': StorageService.get("assuming") == 'true' ? 'assumed' : '',
		});

		$scope.$watch('user.role', function() {
			if($scope.user.role) {
				StorageService.set('role', $scope.user.role);
				if ($scope.user.role == 'ROLE_ADMIN') {
					$scope.admin = true;
				}
				else {
					$scope.admin = false;
				}
			}
		});

		$scope.assumeUser = function(user) {
		
			if($scope.isAssuming() == 'false') {

				if ((typeof user !== 'undefined') && user.netid) {	
					
					AssumedControl.assume(user, services).then(function(assumed) {
						if(assumed) {
							$scope.closeModal();
							$route.reload();
						}
					});

				}
				else {
					logger.log("User to assume undefined!");
				}

			} else {
				
				AssumedControl.unassume(user, services, $scope.user.role).then(function(unassumed) {
					$route.reload();
				});
				
			}
			
		};
			
		$scope.isMocking = function() {
			if(appConfig.mockRole) {
				return true;
			}
			else {
				return false;
			}
		};

		$scope.logout = function(url) {
			StorageService.delete('token');
			StorageService.delete('role');
			window.open(url, "_self");
		};

		$scope.sync = function() {
			WsApi.fetch({
					endpoint: '/private/queue', 
					controller: 'admin', 
					method: 'sync'
			}).then(function(data) {
				logger.log(data);
			});
		};

    }
	
});
