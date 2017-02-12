angular.module('myApp')
  .factory('ui_mask', function($timeout) {
    function mask(text) {
      var $ = angular.element;
      var _body = $(document.querySelector('body'));
      var mask_div = $('<h1></h1>').addClass('mask').text(text);
      $(_body).append(mask_div)

      //定时删除提示弹幕
      $timeout(function(){
        mask_div.remove();
      },1000)
    };
    return {
      setmask:mask
    }
  })