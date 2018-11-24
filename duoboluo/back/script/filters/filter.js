//公司行业
app.filter("industry", function () {
        return function (type) {
            switch (type) {
                case 0:
                    return '移动互联网';
                case 1:
                    return '电子商务';
                case 2:
                    return '企业服务';
                case 3:
                    return 'O2O';
                case 4:
                    return '教育';
                case 5:
                    return '金融';
                case 6:
                    return '游戏';
            }
        }
    })

    // 融资规模
    .filter('financing', function () {
        return function (type) {
            switch (type) {
                case 0:
                    return '无须融资';
                case 1:
                    return '天使轮';
                case 2:
                    return 'A轮';
                case 3:
                    return 'B轮';
                case 4:
                    return 'C轮';
                case 5:
                    return 'D轮及以上';
                case 6:
                    return '上市公司';
            }
        }
    })

    // 认真状态
    .filter('approvedStatus', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return '未认证';
                case 1:
                    return '已认证';
            }
        }
    })
    //冻结状态
    .filter('freezedStatus', function () {
        return function (status) {
            switch (status) {
                case 0:
                    return '正常';
                case 1:
                    return '冻结';
            }
        }
    })