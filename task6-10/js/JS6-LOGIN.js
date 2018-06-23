var app = angular.module('myapp', ['ngMessages']);
app.controller('biubiubiu', function ($scope, $http) {
    $scope.formData = {}; 
    $scope.click = function () {
        $http({
            method: 'POST',
            url: '/carrots-admin-ajax/a/login',
            data: $scope.formData,
            headers: {
                'Content-Type': undefined
            }
        }).then(function successCallback(response) {
            window.location.href = "JS6-BACKSTAGE.html";
        }, function errorCallback(response) {
            // 请求失败执行代码
        });
    }
});

