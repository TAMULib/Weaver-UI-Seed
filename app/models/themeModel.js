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

	Theme.get = function() {
		
		var newThemePromise = WsApi.fetch({
				endpoint: '/private/queue', 
				controller: 'theme', 
				method: "all",
		});

		Theme.promise = newThemePromise;
		Theme.data = new Theme(newThemePromise);
		
		return Theme.data;
	};

	Theme.ready = function() {
		return Theme.promise;
	};

	Theme.refresh = function() {
		Theme.promise = null;
		Theme.get();
	};

	Theme.updateThemeProperty = function(themeId,propertyId,value) {
		return $q(function(resolve,reject) {
			WsApi.fetch({
					endpoint: '/private/queue', 
					controller: 'theme', 
					method: 'update-property',
					data: {
						"themeId":themeId,
						"propertyId":propertyId,
						"value":value,
					}
			}).then(function() {
				resolve("Theme Property Updated");
			},function() {
				reject("Failed to update Theme Property");
			});
		});
	};

	Theme.addTheme = function(newTheme) {
		console.log(newTheme);
		return $q(function(resolve,reject) {
			WsApi.fetch({
					endpoint: '/private/queue', 
					controller: 'theme', 
					method: 'add-theme',
					data: {"newTheme":newTheme}
			}).then(function() {
				resolve("Theme Added");
			},function() {
				reject("Failed to add new Theme");
			});
		});
	};

	return Theme;
	
});