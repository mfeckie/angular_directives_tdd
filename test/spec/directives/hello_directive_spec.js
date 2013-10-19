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

describe('hello-with-internal-function', function() {
  var $compile;
  var $rootScope;
  
  beforeEach(module('mfApp'));
  
  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  
  it('when counterstart is 20', function() {
    var element = $compile('<hello-with-internal-function counterstart="20">Dave</hello-with-internal-function>')($rootScope);
    $rootScope.$digest();
    expect(element.html()).toContain('<input type="textarea"');
    var el = element.find('.scope-body').scope();
    expect(el.counter).toBe(20);
    expect(el.internalCounter).toBe(20);
  });

  it('when counterstart is not set', function() {
    var element = $compile('<hello-with-internal-function>Dave</hello-with-internal-function>')($rootScope);
    $rootScope.$digest();
    var el = element.find('.scope-body').scope();
    expect(el.counter).toBeUndefined;
    expect(el.internalCounter).toBe(500);
  });

  it('Counts down', function() {
    var element = $compile('<hello-with-internal-function counterstart="20">Dave</hello-with-internal-function>')($rootScope);
    $rootScope.$digest();
    var el = element.find('.scope-body').scope();
    expect(el.internalCounter).toBe(20);
	el.characters = "12345"
	el.countdown()
    expect(el.charactersLeft).toBe(15);
  });

});
