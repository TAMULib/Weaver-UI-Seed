app.service("UserRepo", function($route, WsApi, AbstractModel) {

	var self;
	
	var Users = function(futureData) {
		self = this;

		//This causes our model to extend AbstractModel
		angular.extend(self, AbstractModel);
		
		self.unwrap(self, futureData);
		
	};
	
	Users.data = null;
	
	Users.listener = null;

	Users.promise = null;
	
	Users.set = function(data) {
		self.unwrap(self, data);
	};

	Users.get = function() {

		if(Users.promise) return Users.data;

		Users.promise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'user', 
				method: 'all',
		});

		if(Users.data) {
			self.update(self, Users.promise);
		}
		else {
			Users.data = new Users(Users.promise);	
		}
		
		Users.listener = WsApi.listen({
			endpoint: '/channel', 
			controller: 'users', 
			method: '',
		});
				
		Users.set(Users.listener);
		

		return Users.data;
	
	};
	
	Users.updateRole = function(user) {
		var change = {
			'uin': user.uin,
			'role': user.role
		};
		
		var updateUserRolePromise = WsApi.fetch({
			endpoint: '/private/queue', 
			controller: 'user', 
			method: 'update-role',
			data: change
		});
		
		if(updateUserRolePromise.$$state) {
			updateUserRolePromise.then(function(data) {
				logger.log(data);
			});
		}		
	};

	Users.ready = function() {
		return Users.promise;
	};

	Users.refresh = function() {
		Users.promise = null;
		Users.get();
	};
	
	Users.listen = function() {
		return Users.listener;
	};
	
	return Users;
	
});
