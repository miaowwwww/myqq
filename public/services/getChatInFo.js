angular.module('myApp')
  .constant('getHistoryUrl', '/getHistory')
  // ---获取聊天者---
  .factory('getChatInFo', ['$q', '$http', 'getCommunicatingUrl','getHistoryUrl', function($q, $http, getCommunicatingUrl,getHistoryUrl) {
    var chatList = [];
    var chatingOne  = null;

    function getList() {
      return chatList
    };

    function fetchList() {
      var defer = $q.defer();
      $http.get(getCommunicatingUrl)
        .success(function(data, status) {
          chatList = data.friends;
          // chatHistorys = data.chatHistorys;
          console.log("friends--list:::")
          console.log(chatList);
          defer.resolve(data.friends);
        }).error(function(data, status) {
          console.log("get communicaters error");
        });

      return defer.promise;
    };
    function getHistory(){
      for(var i=0,len=chatList.length; i<len; i++){
        var s = i;
        doGetHistory(s);
      }
    }
    function doGetHistory(i){
      $http.post(getHistoryUrl, {
          friendId: chatList[i].friendId._id
        })
        .success(function(data, status) {
          chatList[i].chatHistory = data.chatHistory;
        }).error(function(data, status) {
          console.log('getChatHistory error')
          console.log(data)
        })
    }

    function getChating(){
      return chatingOne;
    }

    function fetchChating(chater){
      chatingOne = chater;
    }
    return {
      getList: getList,
      fetchList: fetchList,
      getChating:getChating,
      fetchChating:fetchChating,
      getHistory:getHistory
    }
  }])