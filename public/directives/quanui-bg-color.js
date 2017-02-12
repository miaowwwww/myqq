angular.module('myApp')
  //主页底部选择样式变化
  .directive('quanuiBgColor', function(){
    // Runs during compile
    return {
      restrict: 'A',
      link: function($scope, ele, attrs, ctrl) {
        var lists = ele.find('li');

        lists.bind('click',function(){
          lists.css({'backgroundColor':'#fff'});
          angular.element(this).css({'backgroundColor':'#eee'});
        })
      }
    };
  })
