TodoApp.provider('storage', function() {
    var keyName;

    this.setKey = function(key) {
        keyName = key;
    };

    this.$get = function() {
        var data = JSON.parse(localStorage.getItem(keyName)) || {};

        return {
            put: function(key, value) {
                data[key] = value;

                localStorage.setItem(keyName, JSON.stringify(data));
            },
            get: function() {
                return data[key];
            }
        }
    };
});