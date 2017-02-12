angular.module('myApp')
  .constant('logoutUrl', './logout')
  .controller('userCtrl', ['$scope','$http','$state','userdbservice','addFriendUrl','socket','sendMsg','getChatInFo','logoutUrl', function($scope,$http,$state,userdbservice,addFriendUrl,socket,sendMsg,getChatInFo,logoutUrl){
    $scope.user = userdbservice.getUser();
    

    // 添加数据库所有朋友--添加朋友
    $scope.addFriend = function(){
      $state.go('addFriend');
    }
    // 退出登录
    $scope.logout = function(){
      $http.get(logoutUrl)
          .success(function(data,status){
            userdbservice.setUser(null);
            getChatInFo.getList().length = 0;
            getChatInFo.fetchChating(null);
            $state.go('login');
          }).error(function(data,status){
            console.log(data);
          })
    }


  }])
