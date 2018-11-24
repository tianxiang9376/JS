app.factory("AccessBtn", function ($location) {
    var obj = {};
    obj.check = function () {
        let AsideList = JSON.parse(sessionStorage.getItem("AsideList"))
        // console.log(AsideList)
        let AccessList = JSON.parse(sessionStorage.getItem("AccessList"))
        // console.log(AccessList)

        //获取路由Url
        let url = $location.url()
        //对Url字符串进行修改，方便与AsideList中子模块的url进行匹配
        url = url.substr(1); //去除第一个/号
        url = url.replace("/", '.'); //替换第二个/号为.号
        let childId = ""
        //遍历AsideList中的子模块
        //如果当前子模块中的url与路由url匹配
        //抽取当前子模块的childId
        AsideList.forEach(item1 => {
            item1.lists.forEach(item2 => {
                if (item2.url == url) {
                    childId = item2.id
                }
            })
        });
        // console.log(childId)
        //如果角色权限表中有当前子模块的Id
        //获取当前角色对当前子模块的操作权限
        let BtnCheck = {}
        for (key in AccessList) {
            if (key == childId) {
                //判断权限表中是否存在某个权限，给BtnCheck对象添加属性
                if (AccessList[key].indexOf('create') != -1) {
                    BtnCheck.create = false
                } else {
                    BtnCheck.create = true
                }
                if (AccessList[key].indexOf('update') != -1) {
                    BtnCheck.update = false
                } else {
                    BtnCheck.update = true
                }
                if (AccessList[key].indexOf('delete') != -1) {
                    BtnCheck.delete = false
                } else {
                    BtnCheck.delete = true
                }
            }


        }
        // 返回BtnCheck
        return BtnCheck
    }

    return obj
})