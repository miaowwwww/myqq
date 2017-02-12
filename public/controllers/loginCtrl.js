angular.module('myApp')
  // .constant('loginUrl', '../userdb.json')
  .constant('loginUrl', './login')
  .controller('loginCtrl', ['$scope', '$http','$state','loginUrl', 'ui_mask','userdbservice', function($scope, $http,$state, loginUrl, ui_mask,userdbservice) {

    $scope.submit = function(loginId, password) {
      if (angular.isUndefined(loginId)) {
        ui_mask.setmask('请输入账号！');
      } else if (angular.isUndefined(password)) {
        ui_mask.setmask('请输入密码！');
      } else {
        $http.post(loginUrl, {
          loginId: loginId,
          password: password
        }).success(function(data, status) {
          if(data.sign===1){
            console.log(data.sign + '--登录成功!--');
            userdbservice.setUser(data.user);
            $state.go('user.communicating');
          }else if(data.sign === 2){
            ui_mask.setmask('用户不存在');
          }else if(data.sign === 3){
            ui_mask.setmask('密码不正确');
          }else{
            console.log("unknow error");
          }
        }).error(function(data, status) {
          console.log(status + '登录失败');
          ui_mask.setmask('找不到服务！');
        })
      }

    }
  }])