angular.module("app").controller('AccountDetails', function ($http, $scope, $state, $stateParams, getMsg, popupBox) {
    let vm = this
    //第二部分
    //获取所有的角色ID
    vm.getAllRoleIdList = function () {
        let data = {
            size: 65535
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/", data).then(res => {
            vm.getAllRoleNameList(res.data.data.ids)
        })

    }
    //获取所有的角色名称
    vm.getAllRoleNameList = function (allRoleIdList) {
        let data = {
            ids: allRoleIdList
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/role", data).then(res => {
            // console.log(res)
            vm.getRoleNameArr(res.data.data.roleList)

        })
    }
    //创建角色名称下拉框数组
    vm.getRoleNameArr = function (allRoleNameList) {
        vm.roleNameArr = [{
            id: "",
            name: "请选择"
        }]
        allRoleNameList.forEach(function (item, index) {
            vm.roleNameArr.push({
                id: item.id,
                name: item.name
            })

        })
        vm.roleId = vm.roleNameArr[0].id
    }

    //编辑帐号获取数据
    vm.getAccountInfo = function () {
        if ($stateParams.AccountId != null) {
            let data = {}
            getMsg.ajax('get', "/carrots-admin-ajax/a/u/manager/" + String($stateParams.AccountId), data).then(res => {
                // console.log(res)
                vm.test = res.data.data.manager
                vm.accountName = res.data.data.manager.name
                vm.createAt = res.data.data.manager.createAt
            })
        }
    }

    vm.getAllRoleIdList()
    vm.getAccountInfo()
    //保存
    vm.saveAccount = function () {
        // ajax异常处理
        //采用angular自带ajax写法
        //编辑公司
        if ($stateParams.AccountId != undefined) {
            let text = "确定要保存该账户信息？"
            callback = function () {
                let data = {
                    id: $stateParams.AccountId,
                    name: vm.accountName,
                    nick: "",
                    roleID: vm.roleId,
                    status: "using",
                    createBy: 2,
                    updateBy: 2,
                    updateAt: new Date().getTime(),
                    createAt: vm.createAt,
                    pwd: vm.pwd,
                    newPwd: vm.pwd
                }
                $http({
                    method: 'put',
                    url: "/carrots-admin-ajax/a/u/manager/" + String($stateParams.AccountId),
                    params: data,
                }).then(res => {
                    goback = function () {
                        $state.go("backstage.AccountList", {

                        }, {
                            reload: true
                        })
                    }
                    popupBox("操作成功", goback)
                })
            }
            popupBox.confirm(text, callback)
        }
        //新增公司 
        else {
            let text = "确定要保存该账户信息？"
            callback = function () {
                let data = {
                    name: vm.accountName,
                    mobile: vm.accountPhone,
                    pwd: vm.pwd,
                    newPwd: vm.newPwd,
                    roleID: vm.roleId,
                }
                $http({
                    method: 'post',
                    url: "/carrots-admin-ajax/a/u/manager",
                    params: data,
                }).then(res => {
                    goback = function () {
                        $state.go("backstage.AccountList", {

                        }, {
                            reload: true
                        })
                    }
                    popupBox.alert("操作成功", goback)
                })
            }
            popupBox.confirm(text, callback)
        }
    }
    //取消
    vm.cancel = function () {
        $state.go("backstage.AccountList", {}, {
            reload: true
        })
    }
})