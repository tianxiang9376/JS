angular.module("app").controller('Revision', function ($scope, $http, popupBox, $state, $location, AccessBtn) {
    let vm = this
    //按钮操作权限判断
    let BtnCheck = AccessBtn.check()
    vm.createBtn = BtnCheck.create
    vm.updateBtn = BtnCheck.update
    vm.deleteBtn = BtnCheck.delete
    //修改密码
    vm.changePwd = function () {
        text = "确认要修改当前帐号密码？"
        let data = {
            oldPwd: vm.oldPwd,
            newPwd: vm.newPwd,
            newPwdAgain: vm.newPwdAgain
        }
        callback = function () {
            $http({
                method: "put",
                url: "/carrots-admin-ajax/a/u/pwd",
                params: data
            }).then(res => {
                goback = function () {
                    $state.go($state.current, {}, {
                        reload: true
                    })
                }
                popupBox.alert("操作成功", goback)
            })
        }
        popupBox.confirm(text, callback)
    }


})