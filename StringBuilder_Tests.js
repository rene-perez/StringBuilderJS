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
});