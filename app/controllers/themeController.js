app.controller('ThemeController', function ($controller, $scope, $window, ThemeModel) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.themeValues = {
		"primary": "#500000",
		"secondary": "#3c0000",
		"linkcolor": "#337ab7",
		"basefontsize": "14px"
	}

	themeFieldGlosses = {"linkcolor":"Link Color","basefontsize":"Base Font Size"};
    
	$scope.themes = ThemeModel.get();

	$scope.updateThemeProperty = function(themeId,propertyId,value) {
		ThemeModel.updateThemeProperty(themeId,propertyId,value).then(function() {
			$window.location.reload();
		});
	};

	$scope.getThemeGloss = function(field) {
		return (typeof themeFieldGlosses[field] !== 'undefined' && themeFieldGlosses[field]) ? themeFieldGlosses[field]:field;
	};
});
