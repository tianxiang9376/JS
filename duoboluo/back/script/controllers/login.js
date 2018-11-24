//登录页
angular.module("app").controller('LoginCtrl', function ($scope, $http, $state) {
    let vm = this
    vm.loginClick = function () {
        $http({
            method: 'POST',
            url: '/carrots-admin-ajax/a/login/',
            params: {
                name: vm.name,
                pwd: vm.pwd
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(function (xhr) {
            // console.log(xhr.data.data.role.id)
            sessionStorage.setItem('logined', JSON.stringify(xhr.data))
            if (xhr.data.code === 0) {
                vm.showValidation = false;
                $state.go('backstage.welcome');
            } else {
                vm.showValidation = true;
                vm.info = xhr.data.message;
            }
        })
    }
})