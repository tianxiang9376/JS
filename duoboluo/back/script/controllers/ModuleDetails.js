angular.module("app").controller('ModuleDetails', function ($http, $scope, getMsg, $state, $stateParams, popupBox) {
    let vm = this
    //编辑模块获取模块信息
    vm.getModuleInfo = function () {
        if ($stateParams.ModuleId != undefined) {
            let data = {}
            getMsg.ajax('get', "/carrots-admin-ajax/a/u/module/" + String($stateParams.ModuleId), data).then(res => {
                vm.moduleName = res.data.data.module.name
                vm.menuId = res.data.data.module.menuID
                vm.url = res.data.data.module.url
                vm.parentId = res.data.data.module.parentID
                vm.moduleType = res.data.data.module.type
                vm.createAt = res.data.data.module.createAt
                vm.createBy = res.data.data.module.createBy
                vm.icon = res.data.data.module.icon
            })
        }
    }
    vm.getModuleInfo()
    //保存
    vm.saveModule = function () {
        //定义ajax的method，url,data，弹窗提示的text
        let method = ""
        let url = ""
        let data = {}
        let text = ""
        //编辑模块
        if ($stateParams.ModuleId != undefined) {
            method = "put"
            url = "/carrots-admin-ajax/a/u/module/" + String($stateParams.ModuleId)
            data = {
                id: $stateParams.ModuleId,
                icon: vm.icon,
                parentID: vm.parentId,
                name: vm.moduleName,
                menuID: vm.menuId,
                url: vm.url,
                type: vm.moduleType,
                level: 0,
                createBy: vm.createBy,
                updateBy: 2,
                updateAt: new Date().getTime(),
                createAt: vm.createAt,
            }
            text = "是否要修改该模块信息？"

        }
        //新增模块 
        else {
            method = "post"
            url = "/carrots-admin-ajax/a/u/module"
            data = {
                name: vm.moduleName,
                menuID: vm.menuId,
                url: vm.url,
                parentID: vm.parentId,
                level: 0,
                type: vm.moduleType
            }
            text = "是否要添加新模块？"
        }
        callback = function () {
            $http({
                method: method,
                url: url,
                params: data
            }).then(res => {
                goback = function () {
                    $state.go("backstage.ModuleList", {}, {
                        reload: true
                    })
                }
                popupBox.alert("操作成功", goback)
            })
        }
        popupBox.confirm(text, callback)

    }
    //取消
    vm.cancel = function () {
        $state.go("backstage.ModuleList", {}, {
            reload: true
        })
    }
})