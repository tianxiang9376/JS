app.factory("compDetailsSelect", function () {
    return {
        //公司行业 
        industry: [{
            id: "",
            name: "请选择"
        }, {
            id: 0,
            name: "移动互联网"
        }, {
            id: 1,
            name: "电子商务"
        }, {
            id: 2,
            name: "企业服务"
        }, {
            id: 3,
            name: "O2O"
        }, {
            id: 4,
            name: "教育"
        }, {
            id: 5,
            name: "金融"
        }, {
            id: 6,
            name: "游戏"
        }],
        //融资规模

        financing: [{
            id: "",
            name: "请选择"
        }, {
            id: 1,
            name: "天使轮"
        }, {
            id: 2,
            name: "A轮"
        }, {
            id: 3,
            name: "B轮"
        }, {
            id: 4,
            name: "C轮"
        }, {
            id: 5,
            name: "D轮及以上"
        }, {
            id: 6,
            name: "上市公司"
        }],
        //认证状态
        approvedStatus: [{
            id: 0,
            name: "未认证"
        }, {
            id: 1,
            name: "已认证"
        }]

    }
})