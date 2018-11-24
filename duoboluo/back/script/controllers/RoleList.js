angular.module("app").controller('RoleList', function ($scope, getMsg, $state, $stateParams, AccessBtn, popupBox) {
    let vm = this

    //按钮操作权限判断
    let BtnCheck = AccessBtn.check()
    //新增按钮
    vm.createBtn = BtnCheck.create
    //编辑按钮
    vm.updateBtn = BtnCheck.update
    //删除按钮
    vm.deleteBtn = BtnCheck.delete
    //获取角色ID
    vm.getAllRoleIdList = function () {
        let data = {}
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/", data).then(res => {
            vm.getAllRoleNameList(res.data.data.ids)
        })

    }
    //获取角色名称
    vm.getAllRoleNameList = function (allRoleIdList) {
        let data = {
            ids: allRoleIdList
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/role", data).then(res => {
            // console.log(res.data.data.roleList)
            vm.roleList = res.data.data.roleList
        })
    }
    //页面加载执行函数
    vm.getAllRoleIdList()

    //新增角色（编辑角色）
    vm.editRole = function (roleId) {
        $state.go('backstage.RoleDetails', {
            RoleId: roleId
        }, {
            reload: true
        })
    }
    //删除
    vm.delRole = function (roleId) {
        let text = "确定要删除该角色？"
        let data = {}
        callback = function () {
            getMsg.ajax('delete', "/carrots-admin-ajax/a/u/role/" + roleId, data).then(res => {
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