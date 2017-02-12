angular.module('myApp')
  // 未读条数拖动
  .directive('quanuiInfoDrag', function(){
    // Runs during compile
    return {
      // name: '',
      // priority: 1,
      // terminal: true,
      // scope: {}, // {} = isolate, true = child, false/undefined = no change
      // controller: function($scope, $element, $attrs, $transclude) {},
      // require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
      restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
      // template: '',
      // templateUrl: '',
      // replace: true,
      // transclude: true,
      // compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
      link: function($scope, iElm, iAttrs, controller) {
        var eleH = iElm[0].offsetHeight/2,
            eleW = iElm[0].offsetWidth/2,
            _parentA = iElm.parent().parent().parent(), //这个是A
            _parent = _parentA.parent(),
            parentTop = _parent[0].offsetTop,
            parentLeft = _parent[0].offsetLeft;

            _left = parseFloat(_parentA.css('left')) || 0;

        var scrollTop = document.getElementsByClassName('user_contacts')[0];
        var _scrollTop = '-1';



        iElm.bind('touchstart',function(e){
          e.stopPropagation();

          // 给父元素li增加overflow属性,使可超出容器显示
          _parent.css('overflow','visible');

          _left = parseFloat(_parentA.css('left')) || 0;
          _scrollTop = scrollTop.scrollTop;

          var touch = e.targetTouches[0];
          iElm.css({'top':touch.pageY-parentTop-eleH +_scrollTop +'px','left':(touch.pageX -parentLeft-eleW-_left)+'px'});
        });

        iElm.bind('touchmove',function(e){
          e.stopPropagation();
          e.preventDefault();
          var touch = e.targetTouches[0];

          iElm.css({'top':touch.pageY-parentTop-eleH +_scrollTop+'px','left':(touch.pageX -parentLeft-eleW-_left)+'px'});
        })
        iElm.bind('touchend',function(e){
          e.stopPropagation();
          iElm.remove();
          // 给父元素li增加overflow属性
          _parent.css('overflow','hidden');
        })
      }
    };
  });
