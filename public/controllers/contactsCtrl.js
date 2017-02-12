angular.module('myApp')
  .controller('contactsCtrl', ['$scope', function($scope) {
    // $scope.listOpen = false;


  }])
  .controller('friendGroupCtrl', ['$scope', function($scope) {
    $scope.listOpen = false;
    $scope.groupToggle = function() {
      $scope.listOpen = !$scope.listOpen;
    }
  }])