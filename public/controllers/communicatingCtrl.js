angular.module('myApp')
  .constant('getCommunicatingUrl', './getCommunicating')
  .controller('communicatingCtrl', ['$scope', '$http', '$state','getChatInFo','addFriendUrl', 'userdbservice', function($scope, $http, $state,getChatInFo,addFriendUrl,userdbservice) {
    // -----------获取联系的人list------------
    var chatList = getChatInFo.getList();
    if(chatList.length != 0){
      // 已经不是第一次获取
      $scope.communicaters = chatList;
    }else{
      // 第一次获取
      getChatInFo.fetchList().then(function(data){
        $scope.communicaters = data;
        getChatInFo.getHistory();
      });
    };
    // ---------设置正在聊天的人-------------
    $scope.chatWith = function(chater){
      getChatInFo.fetchChating(chater);
    };


  }])

  