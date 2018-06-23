var app = angular.module('myapp', []);
app.controller('biubiubiu', function ($scope, $http) {
    $scope.click = function () {
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/article/search',
            headers: {
                'Content-Type': undefined
            }
        }).then(function successCallback(response) {
       
            $scope.list = response.data.data.articleList;
        }, function errorCallback(response) {
            $scope.wrong = "wrong!";
        });
    }
});

