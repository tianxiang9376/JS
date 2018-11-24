angular.module("app").controller('AccountList', function ($stateParams, $state, $scope, getMsg, popupBox, AccessBtn) {
    let vm = this
    // 回调地狱写法
    // getMsg.ajax('get', "/carrots-admin-ajax/a/u/manager/", data1).then(res => {
    //     // 将账号id设置为请求参数，获取账号具体信息
    //     let data2 = {
    //         ids: res.data.data.ids
    //     }
    //     getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/manager", data2).then(res => {
    //         let accountList = res.data.data.managerList
    //         // 获取账号列表中的角色ID
    //         let roleId = []
    //         accountList.forEach(item => {
    //             roleId.push(item.roleID)
    //         });
    //         //将账号信息中的roleID设置为请求参数，获取账号对应的角色名称
    //         let data3 = {
    //             ids: roleId
    //         }
    //         getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/role", data3).then(res => {
    //             //将角色名称存入账号列表数组
    //             res.data.data.roleList.forEach(function (item, index) {
    //                 accountList[index].roleName = item.name
    //             });
    //             //定义渲染在页面的账号列表数据
    //             vm.accountShowList = accountList
    //         })
    //     })
    // })
    // let data4 = {
    //     size: 65535
    // }
    // getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/", data4).then(res => {
    //     // console.log(res)
    //     vm.test = res.data.data.ids
    //     let data5 = {
    //         ids: res.data.data.ids
    //     }
    //     getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/role", data5).then(res => {
    //         console.log(res)
    //     })
    // })

    //整体思路
    //链式调用，多重ajax嵌套请求
    //每一个函数都会调用下一个函数

    //第一部分
    //1、获取账户ID并且设置页码请求参数
    vm.getAccountId = function () {
        //获取页码
        let data = {
            size: $stateParams.size,
            page: $stateParams.page
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/manager/", data).then(res => {
            //调用获取账户列表数据
            vm.getAccountList(res.data.data.ids)
            // vm.test = res.data.data
            //判断能否点击下一页
            vm.next = res.data.data.next
            // 判断能否点击上一页
            vm.page = res.data.data.page

        })

    }
    //2、获取账户列表数据
    vm.getAccountList = function (accountId) {
        let data = {
            ids: accountId
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/manager", data).then(res => {
            //调用获取账户列表中的角色ID列表
            vm.getRoleIdList(res.data.data.managerList)
            //定义账户列表
            vm.accountList = res.data.data.managerList
            // vm.test = res
        })

    }
    //3、获取账户列表数据中的角色ID列表，创建人ID列表，更新人ID列表
    vm.getRoleIdList = function (accountList) {
        let roleIdList = []
        let createList = []
        let updateList = []
        accountList.forEach(item => {
            roleIdList.push(item.roleID)
            createList.push(item.createBy)
            updateList.push(item.updateBy)
        });
        // console.log(createList)
        vm.getNameList(roleIdList, createList, updateList)
    }

    //4、获取角色名称列表,创建人名称列表，更新人名称列表
    vm.getNameList = function (roleIdList, createList, updateList) {
        let data1 = {
            ids: roleIdList
        }
        //三重ajax嵌套请求，回调地狱
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/role", data1).then(res => {
            vm.rolelist = res.data.data.roleList
            // vm.test = res
            let data2 = {
                ids: createList
            }
            getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/manager", data2).then(res => {
                vm.createList = res.data.data.managerList
                // vm.test = res
                // console.log(vm.createList)
                let data3 = {
                    ids: updateList
                }
                getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/manager", data3).then(res => {
                    vm.updateList = res.data.data.managerList
                    // vm.test = res
                    // console.log(vm.updateList)
                    vm.getAccountShowList(vm.accountList, vm.rolelist, vm.createList, vm.updateList)
                })
            })

        })
    }
    //5、创建账户渲染列表数据
    vm.getAccountShowList = function (accountList, roleNameList, createList, updateList) {
        //在帐号信息数组中，插入角色名称，创建人名称，更新人名称
        roleNameList.forEach(function (item, index) {
            accountList[index].roleName = item.name
        });
        createList.forEach(function (item, index) {
            accountList[index].createName = item.name
        });
        updateList.forEach(function (item, index) {
            accountList[index].updateName = item.name
        });
        // console.log(accountList)
        vm.accountShowList = accountList
    }

    //第二部分
    //1、获取所有的角色ID
    vm.getAllRoleIdList = function () {
        let data = {
            size: 65535
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/", data).then(res => {
            vm.getAllRoleNameList(res.data.data.ids)
        })

    }
    //2、获取所有的角色名称
    vm.getAllRoleNameList = function (allRoleIdList) {
        let data = {
            ids: allRoleIdList
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/role", data).then(res => {
            // console.log(res)
            vm.getRoleNameArr(res.data.data.roleList)

        })
    }
    //3、创建角色名称下拉框数组
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

    //把第一部分和第二部分都放入一个页面加载函数中
    //在页面加载时调用这个函数
    vm.Start = function () {
        //设置页码和行数,异常处理
        if ($stateParams.page == null) {
            vm.goPage = 1
        } else {
            vm.goPage = $stateParams.page
        }
        if ($stateParams.size == null) {
            vm.goSize = 10
        } else {
            vm.goSize = $stateParams.size
        }
        // 调用函数
        vm.getAccountId()
        vm.getAllRoleIdList()
    }
    //执行页面加载函数
    vm.Start()

    //搜索
    vm.searchRole = function () {

        if (vm.roleId != "") {
            //根据角色id获取账户id
            let data = {}
            getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/" + String(vm.roleId) + "/manager", data).then(res => {
                // console.log(res)
                vm.getAccountList(res.data.data.ids)
            })
        } else if (vm.roleId == "") {
            vm.getAccountId()
        }
    }

    //删除
    vm.delAccount = function (accountId) {
        let text = "确定要删除该帐号？"
        callback = function () {
            let data = {}
            getMsg.ajax('delete', "/carrots-admin-ajax/a/u/manager/" + String(accountId), data).then(res => {
                // console.log(res)
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

    //编辑
    vm.editAccount = function (accountId) {
        $state.go("backstage.AccountDetails", {
            AccountId: accountId
        }, {
            reload: true
        })

    }

    //新增账户
    vm.addAccount = function () {
        $state.go("backstage.AccountDetails", {}, {
            reload: true
        });
    }

    //上一页
    vm.previousText = function () {
        if (vm.page >= 2) {
            vm.goPage = vm.page - 1
            $state.go("backstage.AccountList", {
                size: vm.goSize,
                page: vm.goPage
            }, {
                reload: true
            })
        }
    }
    //下一页
    vm.nextText = function () {
        if (vm.next == true) {
            vm.goPage = vm.page + 1
            $state.go("backstage.AccountList", {
                size: vm.goSize,
                page: vm.goPage
            }, {
                reload: true
            })
        }
    }
    //跳转到第几页,展示多少行
    vm.sizeGo = function () {
        $state.go("backstage.AccountList", {
            size: vm.goSize,
            page: vm.goPage
        }, {
            reload: true
        })
    }
    //按钮操作权限判断
    let BtnCheck = AccessBtn.check()
    //新增按钮
    vm.createBtn = BtnCheck.create
    //编辑按钮
    vm.updateBtn = BtnCheck.update
    //删除按钮
    vm.deleteBtn = BtnCheck.delete
})