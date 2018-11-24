angular.module("app").controller('RoleDetails', function ($scope, $http, getMsg, $state, $stateParams, popupBox) {
    let vm = this
    //获取编辑角色id
    vm.getRoleId = function () {
        if ($stateParams.RoleId != undefined) {
            let roleId = $stateParams.RoleId
            let data = {}
            getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/" + String(roleId), data).then(res => {
                // console.log(res)
                vm.roleName = res.data.data.role.name
                //获取对象名称
                // vm.test= res.data.data.role.permissionsSet
                // for(key in vm.test){
                //     console.log(key)
                // }
            })
        }
        vm.getmoduleList()
    }
    //获取多菠萝复盘模块列表
    vm.getmoduleList = function () {
        let data = {
            //多菠萝复盘模块id
            ids: [408, 409, 410, 411, 412, 413, 414, 415, 416, 417]
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/module", data).then(res => {
            // console.log(res)
            vm.getModuleShowList(res.data.data.moduleList)
        })
    }
    //创建渲染列表数据
    vm.getModuleShowList = function (moduleList) {
        //权限选项设置
        moduleList.forEach(function (item, index) {
            //根据返回的模块列表中，是否有父模块参数，判断当前模块是不是子模块
            if (item.parentID != "") {
                // 子模块插入权限判断和按钮禁用数据
                moduleList[index]["sort"] = ""
                moduleList[index]["create"] = ""
                moduleList[index]["update"] = ""
                moduleList[index]["delete"] = ""
                moduleList[index]["all"] = ""
                moduleList[index]["use"] = false
            } else {
                // 父模块插入按钮禁用数据
                moduleList[index]["check"] = false
            }

        });
        vm.moduleShowList = moduleList
        // console.log(moduleList)

    }
    //页面加载执行函数
    vm.getRoleId()
    //模块名称按钮
    vm.changeModule = function (index) {
        //判断当前选中的子模块是否能够展示，一个页面逻辑的判断
        //当前模块不展示，则不可以给当前模块添加操作权限
        //所有的操作权限清空
        if (vm.moduleShowList[index].sort == 'sort') {
            vm.moduleShowList[index].create = "create"
            vm.moduleShowList[index].update = "update"
            vm.moduleShowList[index].delete = "delete"
            vm.moduleShowList[index].all = true
        } else if (vm.moduleShowList[index].sort == undefined) {
            vm.moduleShowList[index].create = ""
            vm.moduleShowList[index].update = ""
            vm.moduleShowList[index].delete = ""
            vm.moduleShowList[index].all = false
        }

    }
    //第一个全选按钮
    vm.changeAccess = function (index) {
        if (vm.moduleShowList[index].all == true) {
            vm.moduleShowList[index].create = "create"
            vm.moduleShowList[index].update = "update"
            vm.moduleShowList[index].delete = "delete"
        } else if (vm.moduleShowList[index].all == false) {
            vm.moduleShowList[index].create = ""
            vm.moduleShowList[index].update = ""
            vm.moduleShowList[index].delete = ""
        }
    }

    //父模块禁用子模块按钮设置
    vm.changeChoose = function (moduleId, index) {
        if (vm.moduleShowList[index].check == true) {
            vm.moduleShowList.forEach(function (item) {
                //对属于当前父模块的子模块的按钮的操作
                if (item.parentID == moduleId) {
                    item.use = true
                    item.all = true
                    item.sort = "sort"
                    item.create = "create"
                    item.update = "update"
                    item.delete = "delete"

                }
            });
        } else {
            vm.moduleShowList.forEach(function (item) {
                if (item.parentID == moduleId) {
                    item.use = false
                    item.all = false
                    item.create = ""
                    item.update = ""
                    item.delete = ""
                    item.sort = ""
                }
            });

        }


    }
    //关闭第一个全选按钮
    vm.closeAll = function (index) {
        if (vm.moduleShowList[index].delete == "" || vm.moduleShowList[index].create == "" || vm.moduleShowList[index].sort == "" || vm.moduleShowList[index].update == "") {
            vm.moduleShowList[index].all = false
        }

    }
    //全选/全不选按钮
    vm.getAllAccess = function () {
        if (vm.AllAccess == true) {
            vm.moduleShowList.forEach(item => {
                if (item.parentID != "") {
                    item.all = true
                    item.sort = "sort"
                    item.create = "create"
                    item.update = "update"
                    item.delete = "delete"
                    item.use = true
                } else {
                    item.check = true
                }

            })
        } else if (vm.AllAccess == false) {
            vm.moduleShowList.forEach(item => {
                if (item.parentID != "") {
                    item.all = false
                    item.sort = ""
                    item.create = ""
                    item.update = ""
                    item.delete = ""
                    item.use = false
                } else {
                    item.check = false
                }

            })
        }

    }

    //保存
    vm.saveAccess = function () {
        let access = {}
        vm.moduleShowList.forEach(function (item, index) {
            if (item.parentID != "") {
                //判断当前模块是否展示
                //如果是，再判断是否需要添加操作权限
                if (item.sort == "sort") {
                    access[item.id] = []
                    access[item.id].push("sort")
                    //添加新增权限
                    if (item.create = "create") {
                        access[item.id].push("create")
                    }
                    //添加编辑权限
                    if (item.update == "update") {
                        access[item.id].push('update')
                    }
                    //添加删除权限
                    if (item.delete == "delete") {
                        access[item.id].push('delete')
                    }
                }
            }
            //判断侧边菜单栏是否可以渲染父模块
            else if (item.parentID == "" && item.check == true) {
                access[item.id] = []
            }
        })
        // console.log(access)
        //初始化ajax请求参数
        let url = null
        let method = null
        let data = {}
        //编辑角色
        if ($stateParams.RoleId != undefined) {
            url = "/carrots-admin-ajax/a/u/role/"+String($stateParams.RoleId)
            method = "put"
            data = {
                id: $stateParams.RoleId,
                name: vm.roleName,
                permissionsSet: access
            }
        }
        //新增角色
        else {
            url = "/carrots-admin-ajax/a/u/role"
            method = "post"
            data = {
                name: vm.roleName,
                permissionsSet: access
            }
        }
        callback = function () {
            $http({
                method: method,
                url: url,
                data: data,
            }).then(res => {
                goback = function () {
                    $state.go("backstage.RoleList", {

                    }, {
                        reload: true
                    })
                }
                popupBox.alert("操作成功", goback)
            })
        }
        popupBox.confirm("是否要保存当前角色？",callback)

    }

    //取消
    vm.cancel = function () {
        $state.go("backstage.RoleList", {}, {
            reload: true
        })
    }

})