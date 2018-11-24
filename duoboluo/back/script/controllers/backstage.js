angular.module("app").controller('BackCtrl', function ($scope, $location, $http, $state, getMsg) {
    let vm = this
    let logined = JSON.parse(sessionStorage.getItem('logined'));
    // console.log(logined)
    //设置账户名称和角色名称
    vm.role = logined.data.role.name
    vm.accountName = logined.data.manager.name
    //获取角色菜单列表id
    vm.getRoleListId = function () {
        let roleId = logined.data.role.id
        let data = {}
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/role/" + String(roleId), data).then(res => {
            // console.log(res)
            //定义模块请求参数
            let roleListId = []
          
            for (key in res.data.data.role.permissionsSet) {
                roleListId.push(Number(key))
            }
            let AccessList = res.data.data.role.permissionsSet 
            sessionStorage.setItem("AccessList",JSON.stringify(AccessList))
            // console.log(roleListId)
            vm.getModuleList(roleListId)
        })
    }
    //获取角色权限对应的模块数据
    vm.getModuleList = function (roleListId) {
        let data = {
            ids: roleListId
        }
        getMsg.ajax('get', "/carrots-admin-ajax/a/u/multi/module", data).then(res => {
            // console.log(res)
            let moduleList = res.data.data.moduleList
            vm.getAsiderList(moduleList)
        })
    }
    //对模块数据进行处理，获取侧边栏菜单渲染数据
    vm.getAsiderList = function (moduleList) {
        // console.log(moduleList)
        //创建侧边栏菜单数组
        let menus = []
        //对模块数据进行遍历
        moduleList.forEach(item1 => {
            //如果当前模块没有parentID，这个模块是父模块
            if (item1.parentID == "") {
                //侧边栏菜单数组添加父模块
                menus.push({
                    title: item1.name,
                    open: false,
                    sref: "",
                    lists: [],
                    id: item1.id
                })
            }
            //如果当前模块有parentID，这个模块是子模块
            else if (item1.parentID != "") {
                // 遍历侧边栏菜单数组的父模块
                menus.forEach(item2 => {
                    //如果当前模块的父模块ID与侧边栏数组的父模块ID相同
                    if (item1.parentID == item2.id) {
                        //侧边栏菜单数组的父模块添加子模块
                        item2.lists.push({
                            content: item1.name,
                            url: item1.url,
                            id:item1.id
                        })
                    }
                })
            }
        });
        // console.log(menus)
        vm.menus = menus
        sessionStorage.setItem("AsideList",JSON.stringify(menus))
        vm.getSession()
    }
    vm.getRoleListId()


    // //菜单
    // vm.menus = [{
    //         title: '信息管理',
    //         lists: [{
    //                 content: '公司列表',
    //                 url: 'backstage.CompanyList'
    //             },
    //             {
    //                 content: '职位列表',
    //                 url: 'backstage.PostList'
    //             },
    //         ],
    //         open: false,
    //         sref: ''
    //     },
    //     {
    //         title: '内容管理',
    //         lists: [{
    //             content: 'Article列表',
    //             url: 'backstage.ArticleList'
    //         }, ],
    //         open: false,
    //         sref: ''
    //     },
    //     {
    //         title: '后台管理',
    //         lists: [{
    //                 content: '账号列表',
    //                 url: 'backstage.AccountList'
    //             },
    //             {
    //                 content: '角色列表',
    //                 url: 'backstage.RoleList'
    //             },
    //             {
    //                 content: '修改密码',
    //                 url: 'backstage.Revision'
    //             },
    //             {
    //                 content: '模块列表',
    //                 url: 'backstage.ModuleList'
    //             },
    //         ],
    //         open: false,
    //         sref: ''
    //     },
    // ]
    //验证是否登录，未登录禁止访问

    if (logined.code !== 0) {
        alert('账号未登录');
        $state.go('login');
    }
    //注销登录
    vm.logout = function () {
        $http({
            method: 'post',
            url: '/carrots-admin-ajax/a/logout',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function (res) {
            // console.log(res)
            if (res.data.code === 0) {
                $state.go('login');
                sessionStorage.clear();
            }
        })
    }

    // 子菜单状态保存
    // let currentUrl = $location.path(); //获取当前路由
    // currentUrl = currentUrl.replace(/\//g, '.'); //正则替换掉斜杠
    // currentUrl = currentUrl.slice(1) //删除最前面的斜杠
    // $scope.currentUrl = currentUrl;
    //风琴菜单状态保存

    vm.navtitle = function (index) {
        // console.log(index);
        // console.log(!vm.menus[index].open);
        sessionStorage.setItem("session", index)
        sessionStorage.setItem("index0", !vm.menus[index].open)
    }
    //侧边栏高亮
    vm.navList = function (x, y) {
        // console.log(x, y)
        for (let r = 0; r < vm.menus.length; r++) {
            for (let i = 0; i < vm.menus[r].lists.length; i++) {
                vm.menus[r].lists[i].isOrgancheck = false;
            }
        }
        vm.menus[x].lists[y].isOrgancheck = true;
        sessionStorage.setItem("sessionx", x)
        sessionStorage.setItem("sessiony", y)
    }
    //获取状态保存数据并进行样式设置
    vm.getSession = function () {
        if (window.sessionStorage.getItem("session") !== null) {
            var session = parseInt(window.sessionStorage.getItem("session"))
            var index0 = window.sessionStorage.getItem("index0")
            // console.log(index0);
            // console.log(session);
            vm.menus[session].open = index0
        }
        var sessionx = window.sessionStorage.getItem("sessionx")
        var sessiony = window.sessionStorage.getItem("sessiony")
        if (sessionx !== null && sessiony !== null) {
            vm.menus[sessionx].lists[sessiony].isOrgancheck = true;
        }
    }

})