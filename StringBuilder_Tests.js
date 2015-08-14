/// <reference path="typings/mocha/mocha.d.ts"/>
var expect = chai.expect;

describe("StringBuilder Tests", function(){
	describe("", function(){
		it("", function(){
			
		});
	});
	
	describe("cat", function(){
		it("Retunrs current StringBuilder object", function(){
			var sb = new StringBuilder();
			var actual = sb.cat('hello','world');
			
			expect(actual).to.equal(sb);
		});
		
		it("Appending multiple strings", function(){
			var sb = new StringBuilder();
			var expected = ['hello', 'world'];
			sb.cat('hello','world');
			
			expect(sb.buffer).to.deep.equal(expected);
		});
		
		it("Appending function result", function(){
			var sb = new StringBuilder();
			var expected = ['hello', 'world'];
			sb.cat('hello', function(){return 'world';});
			
			expect(sb.buffer).to.deep.equal(expected);
		});
		
		it("Appending array elements", function(){
			var sb = new StringBuilder();
			var expected = ['hello', 'world'];
			sb.cat(['hello', 'world']);
			
			expect(sb.buffer).to.deep.equal(expected);
		});
		
		it("Appending the elements of an array that is resolved by a function", function(){
			var sb = new StringBuilder();
			var expected = ['Yei','hello', 'world'];
			sb.cat('Yei', function(){return ['hello', 'world'];});
			
			expect(sb.buffer).to.deep.equal(expected);
		});
	});
	
	describe("rep", function(){
		it("Retunrs current StringBuilder object", function(){
			var sb = new StringBuilder();
			var actual = sb.rep('hello',3);
			
			expect(actual).to.equal(sb);
		});
		
		it("Add a string the x times defined", function(){
			var sb = new StringBuilder();
			var expected = ['Hello', 'Hello', 'Hello'];
			sb.rep('Hello', 3);
			
			expect(sb.buffer).to.deep.equal(expected);
		});
		
		it("With empty paramenters", function(){
			var sb = new StringBuilder();
			var expected = [];
			sb.rep();
			
			expect(sb.buffer).to.deep.equal(expected);
		});
		
		it("With 1 paramenter", function(){
			var sb = new StringBuilder();
			var expected = [];
			sb.rep(123);
			
			expect(sb.buffer).to.deep.equal(expected);
		});
	});
	
	describe("catIf", function(){
		it("Retunrs current StringBuilder object", function(){
			var sb = new StringBuilder();
			var actual = sb.catIf('hello', 'world', true);
			
			expect(actual).to.equal(sb);
		});
		
		it("Adds the content if the flag is true", function(){
			var sb = new StringBuilder();
			var expected = ['hello', 'world'];
			sb.catIf('hello', 'world', true);
			expect(sb.buffer).to.deep.equal(expected);
		});
		
		it("Does not add the content if the flag is true", function(){
			var sb = new StringBuilder();
			var expected = [];
			sb.catIf('hello', 'world', false);
			expect(sb.buffer).to.deep.equal(expected);
		});
	});
	
	describe("string", function(){
		it("Retunrs the string values of the buffer", function(){
			var sb = new StringBuilder();
			var expected = "hello world"
			var actual = sb.cat('hello', ' world').string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("wrap", function(){
		it("Prepends prefix and appends suffix", function(){
			var sb = new StringBuilder();
			var expected = '1ahellob21aworldb2';
			var actual = sb.wrap('1', '2').wrap('a','b').cat('hello').cat('world').end().string();
			
			expect(actual).to.equal(expected);
		});
		
		it("Works with functions and arrays", function(){
			var sb = new StringBuilder();
			var expected = '0helloab1helloab2helloab';
			var actual = sb.wrap(function(){var count =0; return function(){return count++;}}(), ['a', 'b']).rep('hello',3).end().string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("end", function(){
		it("without deep specified", function(){
			var sb = new StringBuilder();
			var expected = '1ahellob21world2';
			var actual = sb.wrap('1', '2').wrap('a','b').cat('hello').end().cat('world').end().string();
			
			expect(actual).to.equal(expected);
		});
		
		it("with deep greather than operations count", function(){
			var sb = new StringBuilder();
			var expected = '1ahellob2world';
			var actual = sb.wrap('1', '2').wrap('a','b').cat('hello').end(4).cat('world').end().string();
			
			expect(actual).to.equal(expected);
		});
		
		it("with deep lower than operations count", function(){
			var sb = new StringBuilder();
			var expected = '1axhelloyb21world2';
			var actual = sb.wrap('1', '2').wrap('a','b').wrap('x', 'y').cat('hello').end(2).cat('world').end().string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("prefix", function(){
		it("Adds the prefix to operations", function(){
			var sb = new StringBuilder();
			var expected = '1234hello1234world';
			var actual = sb.prefix('1',['2','3'],function(){return 4;}).cat('hello').cat('world').end().string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("suffix", function(){
		it("Adds the suffix to operations", function(){
			var sb = new StringBuilder();
			var expected = 'hello1234world1234';
			var actual = sb.suffix('1',['2','3'],function(){return 4;}).cat('hello').cat('world').end().string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("each", function(){
		it("Apply the string builder operations to all the array members", function(){
			var sb = new StringBuilder();
			var array = ['hello', 'world'];
			var expected = 'hello world ';
			var actual = sb.suffix(' ').each(array, function(element){
				this.cat(element);
			}).string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("suspend", function(){
		it("makes to stop current wrap, prefix and suffix operations", function(){
			var sb = new StringBuilder();
			var expected = '1hello2world1!2';
			var actual = sb.prefix('1').suffix('2').cat('hello').suspend().cat('world').end().cat('!').string();
			
			expect(actual).to.equal(expected);
		});
	});
	
	describe("when", function(){
		it("Applies then args when expressions is true", function(){
			var sb = new StringBuilder();
			var expected = 'this';
			var actual = sb.when(true, 'this', 'not this').string();
			
			expect(actual).to.equal(expected);
		});
		
		it("Applies otherwise args when expressions is false", function(){
			var sb = new StringBuilder();
			var expected = 'this';
			var actual = sb.when(false, 'not this', 'this').string();
			
			expect(actual).to.equal(expected);
		});
		
		it("If expression is a function it evaluates it", function(){
			var sb = new StringBuilder();
			var expected = 'this';
			var actual = sb.when(function(){return false;}, 'not this', 'this').string();
			
			expect(actual).to.equal(expected);
		});
	});
});