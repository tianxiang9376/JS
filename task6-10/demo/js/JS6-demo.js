var app = angular.module('myapp', []);
app.controller('biubiubiu', function ($scope, $http) {
        $http({
            method: 'GET',
            url: '/carrots-admin-ajax/a/article/search',
            headers: {
                'Content-Type': undefined
            }
        }).then(function successCallback(response) {
            $scope.list = response;
        }, function errorCallback(response) {
            
        });
});


