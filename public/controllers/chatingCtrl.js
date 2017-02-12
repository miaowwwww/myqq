angular.module('myApp')
  .controller('chatingCtrl', ['$scope', 'getChatInFo', 'userdbservice', 'sendMsg', 'socket', function($scope, getChatInFo, userdbservice, sendMsg, socket) {
    $scope.chater = getChatInFo.getChating();
    $scope.user = userdbservice.getUser();

    // 判断是谁说的message
    $scope.msgFrom_class = function(id){
      if(id == $scope.user._id){
        return 'chat_user';
      }else{
        return 'chat_friend';
      }
    }
      // ---------socket--begin---------
      // 发送信息
    $scope.send_msg = function() {
      socket.emit('sendMsg', {
          postMessage: $scope.chat_msg,
          fromUserId: $scope.user._id,
          toUserId: $scope.chater.friendId._id,
          time: Date.now()
        },
        function(data) {
          $scope.chater.chatHistory.push(data);
          $scope.chat_msg = "";
        })
    }
    

  }])

  