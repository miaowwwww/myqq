angular.module('myApp')

// 聊天websocket服务
.factory('socket', ['$rootScope', 'getChatInFo' ,function($rootScope,getChatInFo) {
  //所有的Socket.IO客户端暴露出来的方法和类都在io命名空间中
  //建立连接
  var socket = null;
  if (!socket) {
    socket = io.connect();
    console.log('socket connect+++++++++++++++')
  }
  // 接收信息
  socket.on('broadcastMsg', function(chatHistory) {
      var chatList = getChatInFo.getList();
      for (var i = 0, len = chatList.length; i < len; i++) {
        if (chatHistory.fromUserId._id == chatList[i].friendId._id) {
          break;
        }
      }
      // 在正在聊天的人中找到
      if (i < len) {
        chatList[i].chatHistory.push(chatHistory);
        // 为什么需要digest，因为chatList并不是$scope.chatList，chatlist改变并不触发什么
        $rootScope.$digest();
        console.log(chatList)
      }

    })
    // 断开连接
  socket.on('disconnect', function(msg) {
    console.log('断开连接')
  })
  socket.on('connect', function() {
    console.log('开始连接')
  })

  function on(eventName, callback) {
    socket.on(eventName, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        callback.apply(socket, args);
      });
    });
  };

  function emit(eventName, data, callback) {
    socket.emit(eventName, data, function() {
      var args = arguments;
      $rootScope.$apply(function() {
        if (callback) {
          callback.apply(socket, args);
        }
      });
    })
  }

  return {
    on: on,
    emit: emit
  }
}])