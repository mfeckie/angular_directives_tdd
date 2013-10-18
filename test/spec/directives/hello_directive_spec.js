describe('Unit test for hello directive', function () {
	var $compile;
	var $rootScope;

	beforeEach(module('mfApp'));

	beforeEach(inject(function(_$compile_, _$rootScope_){
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('Replaces the hello directive with a p element', function() {
		var element = $compile("<hello></hello>")($rootScope);
		$rootScope.$digest();

		expect(element.html()).toContain("Hello World!");
	})


})

describe('Unit test of helloUrl directive', function() {
	var $compile;
	var $rootScope;
	var $httpBackend;

	beforeEach(module('mfApp'));

	beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
		$httpBackend = _$httpBackend_;

		$httpBackend.expect('GET', '/templates/helloUrl.html').respond('<div>Hello World from a URL!</div>')
	}));

	it('Replaces the hello-url directive with a div element', function() {
		var element = $compile("<hello-url></hello-url>")($rootScope);
		$rootScope.$digest();
		$httpBackend.flush();

		expect(element.html()).toContain("Hello World from a URL!");
	});
});

describe('Unit test of a transcluded directive', function() {
	var $compile;
	var $rootScope;

	beforeEach(module('mfApp'));

	beforeEach(inject(function(_$compile_, _$rootScope_) {
		$compile = _$compile_;
		$rootScope = _$rootScope_;
	}));

	it('Transcludes with a hello-transclude directive', function() {
		var element = $compile("<div hello-transclude>Dave</div>")($rootScope);
		$rootScope.$digest();

		expect(element.html()).toContain('<div>Hello <span ng-transclude=""><span class="ng-scope">Dave</span></span>, I\'m transcluded!</div>');

	});

});

describe('Unit test of a directive with internal scope', function() {
  var $compile;
  var $rootScope;
  
  beforeEach(module('mfApp'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  
  it('Transcludes with an internal scope', function() {
    var element = $compile("<hello-with-internal-function>Dave</hello-with-internal-function>")($rootScope);
    $rootScope.$digest();
    
    expect(element.html()).toEqual('<div class="scope-title" ng-click="toggle()">Hello </div><div class="scope-body"' + 
                                   ' ng-show="showMe" ng-transclude="" style="display: none; "><span class="ng-scope">Dave</span></div>');

  });
});

describe('For playing with', function() {
  var $compile;
  var $rootScope;
  
  beforeEach(module('mfApp'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  
  it('Transcludes with an internal scope', function() {
    var element = $compile("<hello-with-internal-function>Dave</hello-with-internal-function>")($rootScope);
    $rootScope.$digest();
    
    expect(element.html()).toEqual('<div class="scope-title" ng-click="toggle()">Hello </div><div class="scope-body ng-binding" ng-show="showMe" ng-transclude="" style="display: none; ">500<span class="ng-scope">Dave</span></div>');

  });
});
