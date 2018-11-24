myApp.directive('myPage', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        scope: {
            title: "=pageTitle"
        },
        template: [
            '<div class="panel panel-info">',
            '<div class="panel-heading" ng-click="toggle();">',
            '<h3 class="panel-title" >{{title}}</h3>',
            '</div>',
            '<div class="panel-body" ng-show="showMe" ng-transclude></div>',
            '</div>'
        ].join(""),
        link: function (scope, element, attrs) {
            scope.showMe = false;
            scope.$parent.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                scope.$parent.goToExpander(scope);
            }
        }
    };
});
myApp.controller("demo",['$scope', '$http', function ($scope, $http) {
    $scope.expanders = [{
        title: 'nihao',
        text: 'nihao'
    }, {
        title: '???',
        text: '???'
    }, {
        title: 'butaihao',
        text: '行政部'
    }];
    var expanders = []; //记录所有菜单
    $scope.addExpander = function (expander) {
        expanders.push(expander);
    };
    $scope.goToExpander = function (selectedExpander) {
        expanders.forEach(function (item, index) { //隐藏非当前选项卡,实现切换功能
            if (item != selectedExpander) {
                item.showMe = false;
            }
        })
    };
}]);