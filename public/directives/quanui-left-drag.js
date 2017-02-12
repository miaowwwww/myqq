angular.module('myApp')
  .directive('quanuiLeftDrag', function() {
    var _link = function($scope, ele, attrs, ctrl) {
      var _parentLl = ele.parent(),
        _parentUl = _parentLl.parent(),
        _startTouchX = -1,
        _startTouchY = -1,
        _endTouchX = -1,
        _left = -1,
        rightSideW = ele.find('section')[0].offsetWidth;


      // touchstart
      ele.bind('touchstart', function(e) {

        // 清除所有显示右边设置的li
        var aList = _parentUl.find('a');

        var currentTarget = angular.element(e.currentTarget);
        if (currentTarget.css('left') != -rightSideW + 'px') {
          aList.css('left', '0px');
          setTimeout(function() {
            aList.removeClass('communicatingMove');
          }, 200);
        }
        var touch = e.targetTouches[0];
        _startTouchX = touch.clientX;
        _startTouchY = touch.clientY;
        _left = parseFloat(ele.css('left')) || 0; //JQlist 返回带有单位的left，
      });

      // // --------touchmove-------------
      ele.bind('touchmove', function(e) {
        if (_left < 0) {
          e.stopPropagation();
        }
        // e.preventDefault();

        var touch = e.targetTouches[0],
          diffX = touch.clientX - _startTouchX,
          diffY = touch.clientY - _startTouchY;

        // 判定拖动方向为上下还是左右
        if (Math.abs(diffY) < Math.abs(diffX)) {
          var left = _left + diffX;
          if ((-rightSideW < left) && (left < 0)) {
            ele.css("left", left + 'px');
          }

          // // touchend判定为左右拖动时，绑定函数
          ele.bind('touchend', function(e) {
            e = e || window.event;
            // e.stopPropagation();
            if (_left < 0) {
              e.stopPropagation();
            }

            var touch = e.changedTouches[0];
            _endTouchX = touch.clientX;

            var _direction = _startTouchX - _endTouchX; // +:左~右、-：右~左、

            ele.addClass('communicatingMove');
            if (_direction > rightSideW / 4) {
              ele.css('left', -rightSideW + 'px');
            } else if (_direction < -rightSideW / 4) {
              ele.css('left', 0 + 'px')
            } else {
              ele.css('left', _left + 'px');
            }
          });

        }else{
  

        }
      });


    }

    // Runs during compile
    return {
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      link: _link
    };
  });