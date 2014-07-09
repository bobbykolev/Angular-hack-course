var todo = angular.module('todo', []);

todo.controller('TodoCtrl', function($scope) {
    $scope.todos = [{
        title: 'test',
        completed: true
    }];

    $scope.add = function() {
        $scope.todos.push({
            title: $scope.todoTitle,
            completed: false
        });
    };

    $scope.remove = function(item) {
        for (var i = 0; i < $scope.todos.length; i++) {
            if ($scope.todos[i].$$hashKey == item.$$hashKey) {
                $scope.todos.splice(i, 1);
                return;
            }
        }
    };
});