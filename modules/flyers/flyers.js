/* 
code based on plugin: https://github.com/codrops/Windy
created by Codrops
License: http://tympanus.net/codrops/licensing/

Background Pattern(s) from http://subtlepatterns.com/
http://creativecommons.org/licenses/by-sa/3.0/deed.en_US

normalize.css by Nicolas Gallagher: http://github.com/necolas/normalize.css
*/

angular.module('flyers', [])
.controller('flyersCtrl', function($scope){
 console.log('flyersCtrl');
  var $el = 
  console.log($scope.flyers);
  $scope.next = function() {
    windy.next();
    setTimeout( function() {  
      navnext();
    }, 150 );
  };

  $scope.prev = function() {
    windy.prev();
    setTimeout( function() {  
      navprev();
    }, 150 );
  };

  $scope.$watch('flyers', function(flyers){
    console.log(flyers);
    $('#wi-el').windy();
  });
})

.directive('flyers', function(){
  return {
    restrict: 'E',
    templateUrl: 'modules/flyers/flyers.html',
    scope:{
      flyers: "=data"
    }
  };
});

