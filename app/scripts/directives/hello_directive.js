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