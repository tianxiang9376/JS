myApp.controller("login", function ($scope, $http, $state) {
    //控制器名称login,来自于JS6-APP.JS
    
    $scope.login = function () {
        $http({
            method: "POST",
            url: '/carrots-admin-ajax/a/login',
            params: {
                name: $scope.user,
                pwd: $scope.pwd
            },
            //请求表头，根据发送给服务器的数据的类型有不同的格式
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            } 
        }).then(function (xhr) {
            if (xhr.data.code === 0) {
                //本地储存登陆信息
                sessionStorage.setItem('login',1)
                $state.go("backstage");
            } else {
                $scope.login_info = xhr.data.message;
            }
        })
    }
})

