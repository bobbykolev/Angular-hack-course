function Scope(parent, id) {
    this.$$watchers = [];
    this.$$children = [];
    this.$parent = parent;
    this.$id = id || 0;

    this.$eval = function(data) {
        return eval(data.toString());
    }
}

Scope.prototype.$watch = function(exp, fn) {
    var obj = {};

    obj.exp = exp;
    obj.exp = fn;
    obj.last = Utils.clone(exp);

    this.$$watchers.push(obj);
};

Scope.prototype.$new = function() {

    var scope = Object.create(this);
    Scope.call(scope, this, ++Scope.counter);

    this.$$children.push(this);

    return this;
};

Scope.counter = 0;
var a = new Scope();

a.$new();
console.log(a.$id);


/*function evall(data) {
    return eval(data.toString());
}*/