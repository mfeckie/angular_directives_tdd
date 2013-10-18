mfApp.directive('hello', function() {
	return {
		restrict: 'E',
		template: '<p>Hello World!</p>',
		replace: true
	};
});

// This directive can only be used as an element, not as an attribute of an element.

mfApp.directive('helloUrl', function() {
	return {
		restrict: 'E',
		templateUrl: '/templates/helloUrl.html',
		replace: true
	}
})

mfApp.directive('helloTransclude', function() {
	return {
		template: "<div>Hello <span ng-transclude></span>, I'm transcluded!</div>",

		transclude: true
	}
})

mfApp.directive('helloWithInternalFunction', function() {
  return {
    restrict: 'EA',
    replace: true,
    template:
      '<div>' + 
        '<div class="scope-title" ng-click="toggle()">Hello </div>' +
        '<input type="textarea" ng-keyup="countdown()" class="scope-body"/>' +
    '<div>{{internalCounter}}</div>' +
      '</div>',
    scope: { counter:'=counterStart'},
    link: function(scope, element, attrs) {
      scope.showMe = false;
      //scope.counter = 500;
      scope.internalCounter = parseInt(scope.counter)
      scope.toggle = function() {
        scope.showMe = !scope.showMe;
      };
      scope.countdown = function () {
        scope.internCounter = scope.internalCounter - 1;     
      };
    }
  }  
});