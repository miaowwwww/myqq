angular.module('myApp')
  .directive('quanuiUserLeft', function(){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      controller: function($scope, $element, $attrs, $transclude) {
        $scope.header_img = function(){
          console.log("ni")
        }
      },
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      templateUrl: "./views/user_left.html",
      replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, ele, attrs, ctrl) {
        var _wrap = ele.parent(),
            leftSideW = ele[0].offsetWidth,
            isShowing = false,
            startX = -1,
            startY = -1,
            endX = -1,
            isHorizontal = false;

        // 触摸开始
        _wrap.bind("touchstart",function(e){
          var touch = e.touches[0];
          startX = touch.clientX,
          startY = touch.clientY;
        })
        // 触摸移动
        _wrap.bind("touchmove",function(e){
          var touch = e.changedTouches[0],
            diffX =startX - touch.clientX, // +：右~左、-：左~右
            diffY =startY - touch.clientY;
            // 判断左右还是上下
            isHorizontal = Math.abs(diffX) > Math.abs(diffY)?true:false;
          if(isHorizontal){
            if(isShowing && diffX > 0 && diffX < leftSideW){
              _wrap.css('transform','translate3d('+(-diffX)+'px,0,0)');
            }
            else{
              if(!isShowing && diffX < 0 && diffX > -leftSideW){
                _wrap.css('transform','translate3d('+(-leftSideW-diffX)+'px,0,0)');
              }
              else{}
            }
          }
        })
        // 触摸结束
        _wrap.bind("touchend",function(e){
          if(isHorizontal){ 
            var touch = e.changedTouches[0];
            endX = touch.clientX;
            var diffX = endX - startX;
            _wrap.addClass('centainter_wrap_move');

            if(diffX > 100 ){
              _wrap.css('transform','translate3d(0,0,0)');
              isShowing = true;
            }else if(diffX < -100){
              _wrap.css('transform','translate3d('+(-leftSideW)+'px,0,0)');
              isShowing = false;  
            }else if(isShowing){
              _wrap.css('transform','translate3d(0,0,0)');
            }else{
              _wrap.css('transform','translate3d('+(-leftSideW)+'px,0,0)');
            }
            setTimeout(function(){
              _wrap.removeClass('centainter_wrap_move');
            },300);
          }
        })
      }
    };
  });