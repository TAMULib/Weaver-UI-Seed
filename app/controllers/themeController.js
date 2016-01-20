app.controller('ThemeController', function ($controller, $scope, $window, ThemeModel) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.themes = ThemeModel.get();

	$scope.updateThemeProperty = function(theme,propertyId,value) {
		ThemeModel.updateThemeProperty(theme.id,propertyId,value).then(function() {
			if (theme.active == true) {
				$window.location.reload();
			}
		});
	};

	$scope.addTheme = function(newTheme) {
		ThemeModel.addTheme(newTheme);
	};

	$scope.activateTheme = function(themeId) {
		ThemeModel.activateTheme(themeId).then(function() {
			$window.location.reload();
		});
	};
/*
	$scope.getThemeGloss = function(field) {
		return (typeof themeFieldGlosses[field] !== 'undefined' && themeFieldGlosses[field]) ? themeFieldGlosses[field]:field;
	};
*/
});
