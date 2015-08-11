'use strict';

function StringBuilder(){
	this.buffer = [];
	this.prefix = false;
}

StringBuilder.prototype.cat = function(){
	for(var i = 0, length = arguments.length; i < length; i++){
		if(arguments[i] instanceof Function){
			this.cat(arguments[i]());
		}else if (arguments[i] instanceof Array){
			this.cat.apply(this, arguments[i]);
		}else{
			if(this.prefix === false){
				this.buffer.push(arguments[i]);
			}else{
				this.buffer.unshift(arguments[i]);
			}
		}
	}
	
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

StringBuilder.prototype.wrap = function(prefix, suffix){
	this.prefix = true;
	this.cat(prefix);
	this.prefix = false;
	this.cat(suffix);
	return this;
};

