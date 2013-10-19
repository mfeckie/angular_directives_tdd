mfApp.directive('hello', function() {
	return {
		restrict: 'E',
		template: '<p>Hello World!</p>',
		replace: true
	};
});

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
    transclude: true,
    template:
      '<div>' + 
        '<div class="scope-title" ng-click="toggle()">Hello </div>' +
        '<input type="textarea" ng-model="characters" ng-keyup="countdown()" class="scope-body"/>' +
        '<div>{{charactersLeft}}</div>' +
      '</div>',
    scope: { counter:'=counterstart'},
    link: function(scope, element, attrs) {
      scope.internalCounter = scope.counter || 500;
      scope.countdown = function () {
        scope.charactersLeft = scope.internalCounter - scope.characters.length;     
      }
    }
  }  
});