//过滤器  释义服务器返回的字段（type类型）
app.filter('typeFilter', function () {
    return function (text) {
        switch (text) {
            case 0:
                return '首页banner';
                break;
            case 1:
                return '找职业banner';
                break;
            case 2:
                return '找精英banner';
                break;
            case 3:
                return '行业大图';
                break;
        }
    }
})
//过滤器  释义服务器返回的字段（status类型）
app.filter('statusFilter', function () {
    return function (text) {
        switch (text) {
            case 1:
                return '草稿';
                break;
            case 2:
                return '上线';
                break;
        }
    }
})
//列表页控制器
angular.module("app").controller('ArticleList', function ($scope, $http, $state, $stateParams) {
    //状态选择
    $scope.a_data = [{
                id: "1",
                name: "草稿"
            },
            {
                id: "2",
                name: "上线"
            }
        ],
        //类型选择
        $scope.b_data = [{
                id: "0",
                name: "首页banner"
            },
            {
                id: "1",
                name: "找职位banner"
            },
            {
                id: "2",
                name: "找精英banner"
            },
            {
                id: "3",
                name: "行业大图"
            }
        ]
    //请求数据
    $http({
        method: 'get',
        url: '/carrots-admin-ajax/a/article/search',
        //params属性将输入框的值以键值对的形式传给服务器
        params: {
            title: $stateParams.title,
            author: $stateParams.author,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt,
            type: $stateParams.type,
            status: $stateParams.status,
            page: $stateParams.page,
            size: $stateParams.size,
        },
        responseType: "json",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    }).then(function (xhr) {
        console.log(xhr)
        $scope.tabs = xhr.data.data.articleList
        $scope.bigTotalItems = xhr.data.data.total
        $scope.size = xhr.data.data.size

        $scope.bigCurrentPage = $stateParams.page
        $scope.page = $stateParams.page

        $scope.title = $stateParams.title
        $scope.author = $stateParams.author
        $scope.startAt = parseInt($stateParams.startAt)
        $scope.endAt = parseInt($stateParams.endAt)
        $scope.status = $stateParams.status
        $scope.type = $stateParams.type
        $scope.maxSize = 5
    })
    console.log(parseInt($stateParams.startAt))
    $scope.pageChange = function () {
        $state.go('backstage.ArticleList', {
            page: $scope.bigCurrentPage
        }, {
            reload: true
        })
    }

    //分页输入框 指定页数搜索&显示条数
    $scope.sizeGo = function () {
        $state.go('backstage.ArticleList', {
            size: $scope.size,
            page: $scope.page
        }, {
            reload: true
        })
    }

    //点击搜索
    $scope.search = function () {
        //日期改为时间戳
        var timestamp1, date1, timestamp2, date2;
        if ($scope.startAt) {
            date1 = new Date($scope.startAt);
            timestamp1 = date1.valueOf();
        }
        if ($scope.endAt) {
            date2 = new Date($scope.endAt);
            if (timestamp1 !== date2.valueOf()) {
                timestamp2 = date2.valueOf();
            } else {
                timestamp2 = date1.valueOf() + 86399000;
            }
        }
        //传参
        $state.go('backstage.ArticleList', {
            title: $scope.title,
            author: $scope.author,
            status: $scope.status,
            type: $scope.type,
            startAt: timestamp1,
            endAt: timestamp2
        }, {
            reload: true
        })
    }
    //点击清除
    $scope.empty = function () {
        $state.go('backstage.ArticleList', {
            title: undefined,
            author: undefined,
            status: undefined,
            type: undefined,
            startAt: undefined,
            endAt: undefined,
            //默认回到页码1
            page: 1
        }, {
            reload: true
        })
    }
    //点击新增
    $scope.added = function () {
        $state.go('backstage.ArticleDetails')
    }
    //上下线文字渲染
    $scope.btnStatus = function () {
        if (this.tab.status === 1) {
            return "上线";
        } else {
            return "下线";
        }
    }
    //点击上下线 
    $scope.online = function () {
        var id = this.tab.id;
        var state = this.tab.status;
        bootbox.confirm({
            size: "small",
            title: '<p class="text-info">温馨提示</p>',
            backtrop: true,
            closebutton: false,
            message: (this.tab.status == 1) ? '<p class="online-text">上线后此图片将展示在轮播图banner中</p><br><h4 class="text-danger">确定上线吗？</h4>' : '<p class="offline-text">下线后此图片将不会展示在轮播图banner中</p><br><h4 class="text-danger">确定下线吗？</h4>',
            buttons: {
                cancel: {
                    label: '取消',
                    className: 'btn btn-danger'
                },
                confirm: {
                    label: '确认',
                    className: 'btn btn-success'
                }
            },
            callback: function (result) {
                if (result) {
                    var stateChange = function () {

                        if (state == 1) {
                            state = 2;
                        } else if (state == 2) {
                            state = 1;
                        }
                        return state;
                    }
                    $http({
                        method: 'put',
                        url: '/carrots-admin-ajax/a/u/article/status',
                        params: {
                            id: id,
                            status: stateChange()
                        },
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function () {
                        $state.go($state.current, {}, {
                            reload: true
                        })
                    })
                }
            }
        })
    }
    //点击编辑
    $scope.edit = function (id) {
        var id = this.tab.id;
        $state.go('backstage.ArticleDetails', {
            "id": id
        })
    }

    //点击删除
    $scope.delete = function () {
        var id = this.tab.id;
        bootbox.confirm({
            size: "small",
            title: '<p class="text-info">温馨提示</p>',
            backtrop: true,
            closebutton: false,
            message: '<p class="delete">删除后此图片将在本地下架</p><br><h4 class="text-danger">确定执行此操作吗？</h4>',
            buttons: {
                cancel: {
                    label: '取消',
                    className: 'btn btn-danger'
                },
                confirm: {
                    label: '确认',
                    className: 'btn btn-success'
                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'delete',
                        url: '/carrots-admin-ajax/a/u/article/' + id
                    }).then(function (xhr) {
                        console.log(xhr)
                        $state.go($state.current, {}, {
                            reload: true
                        })
                    })
                }
            }

        });
    }

    //时间选择器
    $scope.today = function () {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt1 = null;
        $scope.dt2 = null;
    };

    $scope.inlineOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: true
    };

    $scope.dateOptions = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };

    // Disable weekend selection
    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        // return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.toggleMin = function () {
        $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
        $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };

    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.setDate = function (year, month, day) {
        $scope.dt1 = new Date(year, month, day);
        $scope.dt2 = new Date(year, month, day);
    };

    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [{
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
    ];

    function getDayClass(data) {
        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
})