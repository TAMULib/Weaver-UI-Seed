app.service("ThemeModel", function($q,AbstractModel, WsApi) {

	var self;

	var Theme = function(futureData) {
		self = this;
		angular.extend(self, AbstractModel);	
		self.unwrap(self, futureData);		
	};

	Theme.data = null;

	Theme.promise = null;
	
	Theme.set = function(data) {
		self.unwrap(self, data);
	};

	Theme.receive = function(theme, response) {
		if(JSON.parse(response.body).payload.String) {
			console.log(JSON.parse(response.body).payload.String);
		}
		else {
			var newTheme = true;
			for(var key in Theme.data.list) {
				if(Theme.data.list[key].id == theme.id) {
					Theme.data.list[key] = JSON.parse(response.body).payload.CoreTheme;
					newTheme = false;
					break;
				}
			}
			if(newTheme && Theme.data.list != null) {
				Theme.data.list.push(JSON.parse(response.body).payload.CoreTheme);
			}
		}
	};

	Theme.remove = function(theme) {
		for(var i in Theme.data.list) {
			if(Theme.data.list[i].id == theme.id) {
				Theme.data.list.splice(i, 1);
				break;
			}
		}
	}

	Theme.get = function() {
		
		Theme.promise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: "all",
		});

		Theme.data = new Theme(Theme.promise);

		WsApi.listen({
			endpoint: '/channel', 
			controller: 'theme'
		}).then(null, null, function(response) {
			Theme.receive(JSON.parse(response.body).payload.CoreTheme, response);
		});

		WsApi.listen({
			endpoint: '/channel', 
			controller: 'theme/removed'
		}).then(null, null, function(response) {
			Theme.remove(JSON.parse(response.body).payload.CoreTheme);
		});
		
		return Theme.data;
	};

	Theme.ready = function() {
		return Theme.promise;
	};

	Theme.refresh = function() {
		Theme.promise = null;
		Theme.get();
	};

	Theme.updateThemeProperty = function(themeId, propertyId, value) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: 'update-property',
				data: {
					"themeId": themeId,
					"propertyId": propertyId,
					"value": value,
				}
			}).then(function() {
				resolve("Theme Property Updated");
			},function() {
				reject("Failed to update Theme Property");
			});
		});
	};

	Theme.addTheme = function(theme) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: 'add-theme',
				data: { 
					"theme": theme
				}
			}).then(function() {
				resolve("Theme Added");
			},function() {
				reject("Failed to add new Theme");
			});
		});
	};

	Theme.removeTheme = function(theme) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: 'remove-theme',
				data: {
					"theme": theme
				}
			}).then(function() {				
				resolve("Theme Removed");
			},function() {
				reject("Failed to remove Theme");
			});
		});
	};

	Theme.activateTheme = function(theme) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: 'activate-theme',
				data: { 
					"theme": theme
				}
			}).then(function() {
				resolve("Theme Activated");
			},function() {
				reject("Failed to activate Theme");
			});
		});
	};

	return Theme;
	
});