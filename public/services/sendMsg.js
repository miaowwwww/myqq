angular.module('myApp')
  // 使用服务，记录聊天记录
  .factory('sendMsg', ['$q', 'getChatInFo', function($q, getChatInFo) {
    var chatHistory = [];

    function getHistoty() {
      chatHistory = getChatInFo.getChating().chatHistory || [];
      return chatHistory;
    }

    function addHistory(content) {
      chatHistory = getChatInFo.getChating().chatHistory || [];
      chatHistory.push(content);
      console.log(chatHistory);
    }
    return {
      getHistoty: getHistoty,
      addHistory: addHistory
    };
  }])