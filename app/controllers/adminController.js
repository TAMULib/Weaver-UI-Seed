export default function AdminController($controller, $injector, $route, $scope) {

  angular.extend(this, $controller('CoreAdminController', {$scope: $scope}));

}
