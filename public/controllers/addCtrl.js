angular.module('myApp')
  .constant('addFriendUrl', './addFriend')
  .controller('addCtrl', ['$scope', '$http','$state','$timeout','getChatInFo','addFriendUrl','ui_mask','userdbservice', function($scope, $http,$state,$timeout,getChatInFo,addFriendUrl,ui_mask,userdbservice) {
    $scope.addLoginId;
    $scope.addFriend = function() {
      console.log('addFriend')
      if(userdbservice.getUser().loginId == $scope.addLoginId){
        ui_mask.setmask('不可添加自己为好友');
      }else{
        $http.post(addFriendUrl, {
          addLoginId: $scope.addLoginId
          }).success(function(data,status){
          getChatInFo.fetchList();
          if(data.sign == 2){
            ui_mask.setmask('用户不存在');
          }else if(data.sign == 3){
            ui_mask.setmask('用户已添加');
          }else{
            ui_mask.setmask('添加成功，1s后返回');
            $timeout(function(){
              $state.go('user.communicating');
            },1000);
          }
        }).error(function(data,status){
          console.log('fetchList error--');
        })
      }
    }
  }])