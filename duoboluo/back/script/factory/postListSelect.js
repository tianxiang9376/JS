//自定义服务，封装了职位列表页的下拉框选择项
app.factory("postListSelect", function () {
    return {
        //职位类别
        category: [{
            id: "",
            name: "全部"
        }, {
            id: "0",
            name: "产品"
        }, {
            id: "1",
            name: "运营"
        }, {
            id: "2",
            name: "技术"
        }, {
            id: "3",
            name: "设计"
        }, {
            id: "4",
            name: "测试"
        }],
        //职位子类
        subCategory: [{
            id: "",
            name: "全部"
        }, {
            id: "0",
            name: "产品经理"
        }, {
            id: "1",
            name: "JAVA"
        }, {
            id: "2",
            name: "IOS"
        }, {
            id: "3",
            name: "Android"
        }, {
            id: "4",
            name: "Web前端"
        }, {
            id: "5",
            name: "运维"
        }, {
            id: "6",
            name: "UI设计"
        }, {
            id: "7",
            name: "功能测试"
        }],
        //学历要求
        education: [{
            id: "",
            name: "不限"
        }, {
            id: "0",
            name: "大专"
        }, {
            id: "1",
            name: "本科"
        }, {
            id: "2",
            name: "硕士"
        }, {
            id: "3",
            name: "博士"
        }],
        //工作经验
        experience: [{
            id: "",
            name: "不限"
        }, {
            id: "0",
            name: "应届"
        }, {
            id: "1",
            name: "1~2年"
        }, {
            id: "2",
            name: "3~5年"
        }, {
            id: "3",
            name: "6~9年"
        }, {
            id: "4",
            name: "十年以上"
        }],
        //薪资
        compensation: [{
            id: "",
            name: "不限"
        }, {
            id: "0",
            name: "8k"
        }, {
            id: "1",
            name: "8~15k"
        }, {
            id: "2",
            name: "16~25k"
        }, {
            id: "3",
            name: "26k以上"
        }],
        //状态
        status: [{
            id: "",
            name: "全部"
        }, {
            id: "0",
            name: "上架"
        }, {
            id: "1",
            name: "下架"
        }],
        //推荐
        recommend: [{
            id: "",
            name: "请选择"
        }, {
            id: "0",
            name: "普通"
        }, {
            id: "1",
            name: "推荐"
        }]
    }
})