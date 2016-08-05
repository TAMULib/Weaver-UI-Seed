app.controller('ThemeController', function ($controller, $scope, $window, ThemeModel) {
	
    angular.extend(this, $controller('AbstractController', {$scope: $scope}));

	$scope.themes = ThemeModel.get();

	console.log($scope.themes)

	$scope.refreshable = false;

	var reset = function() {
		$scope.newTheme = {
			active: false,
			name: '',
			properties: [
				{
					themePropertyName: {
						name: 'baseFontSize'
					},
					value: '14pt'
				},
				{
					themePropertyName: {
						name: 'primary'
					},
					value: '#500000'
				},
				{
					themePropertyName: {
						name: 'secondary'
					},
					value: '#3c0000'
				},
				{
					themePropertyName: {
						name: 'linkColor'
					},
					value: '#337ab7'
				}
			]
		};
	};

	reset();

	$scope.updateThemeProperty = function(theme,propertyId,value) {
		ThemeModel.updateThemeProperty(theme.id, propertyId, value).then(function() {
			if (theme.active == true) {
				$scope.refreshable = true;
			}
		});
	};

	$scope.addTheme = function(newTheme) {
		ThemeModel.addTheme(newTheme).then(function() {
			reset();
		});
	};

	$scope.removeTheme = function(theme) {
		ThemeModel.removeTheme(theme).then(function() {
			reset();
		});
	};

	$scope.activateTheme = function(themeId) {
		ThemeModel.activateTheme(themeId).then(function() {
			$scope.refreshPage();
		});
	};

	$scope.refreshPage = function() {
		$window.location.reload();
	};
});
