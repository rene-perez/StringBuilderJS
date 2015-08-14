'use strict';

function StringBuilder(){
	this.buffer = [];
	this.operationsStack = [];
}

StringBuilder.prototype.cat = function(){
	
	var prefixSb = new StringBuilder();
	var lastOperation = this.operationsStack.last();
	var element;
	for(var k = 0, length = this.operationsStack.length; k < length; k++){
		if(lastOperation && lastOperation.suspend){
			break;
		}
		element = this.operationsStack[k];
		if(element.prefix){
			prefixSb.cat(element.prefix);
		}
	}
	
	var that = this;
	prefixSb.buffer.each(function(element){
		that.buffer.push(element);
	});
	
	for(var i = 0, length = arguments.length; i < length; i++){
		if(arguments[i] instanceof Function){
			this.cat(arguments[i]());
		}else if (arguments[i] instanceof Array){
			this.cat.apply(this, arguments[i]);
		}else{			
			this.buffer.push(arguments[i]);
		}
	}
	
	var suffixSb = new StringBuilder();
	for(var j = this.operationsStack.length - 1; j >= 0; j--)
	{
		if(lastOperation && lastOperation.suspend){
			break;
		}
		element = this.operationsStack[j];
		if(element.suffix){
			suffixSb.cat(element.suffix);
		}
	}
	suffixSb.buffer.each(function(element){
		that.buffer.push(element);
	});
	
	return this;
};

StringBuilder.prototype.rep = function(){
	if(!arguments.length || arguments.length === 1){
		return this;
	}	
	var args = [];
	for(var i = 0, length = arguments.length - 1; i < length; i++){
		args.push(arguments[i]);
	}
	var times = arguments[arguments.length - 1];
	for(var j = 0; j < times; j++){
		this.cat.apply(this, args);
	}
	return this;
};

StringBuilder.prototype.catIf = function(){
	if(!arguments.length || arguments.length === 1){
		return this;
	}	
	var args = [];
	for(var i = 0, length = arguments.length - 1; i < length; i++){
		args.push(arguments[i]);
	}
	if(arguments[arguments.length - 1] === true){
		this.cat.apply(this, args);
	}
	return this;
};

StringBuilder.prototype.string = function(){
	return this.buffer.join('');	
};

StringBuilder.prototype.wrap = function(prefixArg, suffixArg){
	this.operationsStack.push({
		prefix: prefixArg,
		suffix: suffixArg
	});
	
	return this;
};

StringBuilder.prototype.end = function(deep){
	if(deep){
		deep = deep < this.operationsStack.length ?
			deep : this.operationsStack.length;
		for(var i = 0; i < deep; i++){
			this.operationsStack.pop();
		}
	}else{
		this.operationsStack.pop();
	}
	return this;
};

StringBuilder.prototype.prefix = function(){
	if(!arguments.length || arguments.length === 0){
		return this;
	}	
	
	var args = [];
	for(var i = 0, length = arguments.length; i < length; i++){
		args.push(arguments[i]);
	}
	
	this.operationsStack.push({
		prefix: args
	});
	
	return this;
};

StringBuilder.prototype.suffix = function(){
	if(!arguments.length || arguments.length === 0){
		return this;
	}	
	
	var args = [];
	for(var i = 0, length = arguments.length; i < length; i++){
		args.push(arguments[i]);
	}
	
	this.operationsStack.push({
		suffix: args
	});
	
	return this;
};

StringBuilder.prototype.each = function(array, callback){
	for(var i = 0, length = array.length; i < length; i++){
		callback.call(this, array[i], i, array);
	}
	
	return this;
};

StringBuilder.prototype.suspend = function(){
	this.operationsStack.push({
		suspend: true
	});
	
	return this;
};

StringBuilder.prototype.when = function(expression, thenArgs, otherwiseArgs){
	expression = expression instanceof Function ? expression() : expression;
	if(expression === true){
		this.cat(thenArgs);
	}else{
		this.cat(otherwiseArgs);
	}
	
	return this;	
};