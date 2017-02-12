angular.module('myApp')
  .constant('registerUrl', './register')
  .controller('registerCtrl', ['$scope','$http','$state','registerUrl', 'ui_mask',function($scope,$http,$state,registerUrl,ui_mask){
    $scope.register = null;
    $scope.submit = function(){
      $http.post(registerUrl,{
        register:$scope.register
      }).success(function(data,status){
        //1-success;2-存在
        if(data.sign===1){
          console.log("注册成功");
          $state.go('login');
        }else{
            console.log('用户已存在');
            ui_mask.setmask('用户已存在');
        }
      }).error(function(data,status){
        console.log('register-error-'+status);
      });
      return false;
    }
  }])