function Scope(parent, id) {
	this.$$watchers = [];
	this.$$children = [];
	this.$parent = parent;
	this.$id = id || 0;

	this.counter = 0;

	this.$eval = function(data) {
		switch(typeof data) {
			case 'function': 
				fn();
				break;

			default: 
			return data;
				break;
		}
	}
}

Scope.prototype.$watch = function(exp, fn) {
	var obj = {};

	obj.exp = exp;
	obj.exp = fn;
	obj.last = Utils.clone(exp);

	this.watchers.push(obj);
} 