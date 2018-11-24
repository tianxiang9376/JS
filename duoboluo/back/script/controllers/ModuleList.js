angular.module("app").controller('ModuleList', function ($stateParams, $state, $scope, getMsg,AccessBtn,popupBox) {
    let vm = this
    //获取模块ID,页码，行数
    vm.getModuleId = function () {
        let data = {
            page: $stateParams.page,
            size: $stateParams.size
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/module/", data).then(res => {
            //设置页码和函数
            vm.bigTotalItems = res.data.data.total
            vm.size = res.data.data.size
            vm.goSize = res.data.data.size
            vm.currentPage = res.data.data.page
            vm.goPage = res.data.data.page
            vm.getModuleList(res.data.data.ids)

        })
    }
    //获取模块信息
    vm.getModuleList = function (moduleId) {
        let data = {
            ids: moduleId
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/module", data).then(res => {
            vm.moduleList = res.data.data.moduleList
            // console.log(res)
            vm.getNameIdList(vm.moduleList)
        })
    }
    //获取更新人和创建人的id列表
    vm.getNameIdList = function (moduleList) {
        let createList = []
        let updateList = []
        moduleList.forEach(item => {
            createList.push(item.createBy)
            updateList.push(item.updateBy)
        });
        vm.getNameList(createList, updateList)
    }
    //获取更新人名称列表和创建人名称列表
    vm.getNameList = function (createList, updateList) {
        let data2 = {
            ids: createList
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/manager", data2).then(res => {
            vm.createList = res.data.data.managerList
            // vm.test = res
            let data3 = {
                ids: updateList
            }
            getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/manager", data3).then(res => {
                vm.updateList = res.data.data.managerList
                // vm.test = res
                vm.getmoduleShowList(vm.moduleList, vm.createList, vm.updateList)
            })
        })
    }
    //创建渲染列表数组
    vm.getmoduleShowList = function (moduleList, createList, updateList) {
        createList.forEach(function (item, index) {
            moduleList[index].createName = item.name
        });
        updateList.forEach(function (item, index) {
            moduleList[index].updateName = item.name
        });
        vm.moduleShowList = moduleList
    }
    //页面加载时开始执行函数
    vm.getModuleId()

    //按钮操作权限判断
    let BtnCheck = AccessBtn.check()
    //新增按钮
    vm.createBtn = BtnCheck.create
    //编辑按钮
    vm.updateBtn = BtnCheck.update
    //删除按钮
    vm.deleteBtn = BtnCheck.delete

    //翻页
    vm.pageChange = function () {
        $state.go("backstage.ModuleList", {
            page: vm.currentPage
        }, {
            reload: true
        });
    }
    //跳转到第几页,展示多少行
    vm.sizeGo = function () {
        //容错处理
        if (vm.goPage == "") {
            vm.goPage = 1
        }
        if (vm.goSize == "") {
            vm.goSize = 10
        }
        $state.go("backstage.ModuleList", {
            size: vm.goSize,
            page: vm.goPage
        }, {
            reload: true
        })
    }

    //新增模块(编辑模块)
    vm.editModule = function (moduleId) {
        $state.go("backstage.ModuleDetails", {
            ModuleId: moduleId
        }, {
            reload: true
        })
    }

    //删除
    vm.delModule = function (moduleId) {
        // console.log(moduleId)
        let text = "确定要删除该模块？"
        callback = function(){
            let data = {}
                    getMsg.ajax('delete', "/carrots-admin-ajax/a/u/module/" + String(moduleId), data).then(res => {
                        // console.log(res)
                        goback=function(){
                            $state.go("backstage.ModuleList", {

                            }, {
                                reload: true
                            })
                        }
                        popupBox.alert("操作成功",goback)
                 
                    })
        }
        popupBox.confirm(text,callback)
     
    }
})