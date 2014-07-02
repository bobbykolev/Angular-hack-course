var Provider = {
	DIRECTIVES_SUFFIX: 'Directive',
	CONTROLLERS_SUFFIX: 'Controller',

	_providers: {},
	_cache: {
		//rootScope: new Scope()
	},
	get: function(name, locals){
		if(typeof this._cache[name] != 'undefined') {
			console.log('1',this._cache[name])
			return this._cache[name];
		} else {
			this._cache[name] = this.invoke(this._providers[name], locals);
			console.log('2',this._cache[name]);
			return this._cache[name];
		}		
	},
	annotate: function(fn){
		console.log(fn);
		var FN_ARGS = /\((.*?)\)/,
		match = fn.toString().match(FN_ARGS),
		args;
		if (match && match[1]) {
			args = match[1].split(',').map(function (arg) {
				return arg.trim();
			});
		}
		return args || [];
	},
	invoke: function(fn, locals){
		console.log('invoke',fn);
		locals = locals || {};
		var args = this.annotate(fn),
		arr = [];
		for (var i = 0; i < args.length; i++) {
			var temp = this.get(args[i], locals);
			arr.push( locals[args[i]] || temp);
		}
		return fn.apply(null, arr);
	},
	_register: function (name, fn){
		console.log('reg',fn);
		this._providers[name] = fn;
	},
	directive: function (name, fn){
		this._register(name + this.DIRECTIVES_SUFFIX, fn);
	},
	controller: function (name, fn){
		this._register(name + this.CONTROLLERS_SUFFIX, fn);
	},
	service: function (name, fn){
		this._register(name, fn);
	}
};


Provider.service('Bar', function Bar(){
	return {
		getValue: function () {
			return 42
		}
	}
});

Provider.service('Foo', function Foo(Bar){console.log(Bar.getValue());});

Provider.get('Foo');
