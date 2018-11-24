myApp.controller("list", function ($scope, $http, $state, $stateParams, ListStyle,$filter) {
    //日历选择器
    $scope.dat = new Date();
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];

    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    $scope.popup2 = {
        opened: false
    };
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };




    //服务器请求列表
    $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search',
        params: {
            //接收路由传参的数据，发送给服务器
            //传参是一个点，需要在路由中设置传参的参数，否则GG
            page: $stateParams.page,
            type: $stateParams.type,
            status: $stateParams.status,
            author: $stateParams.author,
            title: $stateParams.title,
            startAt: $stateParams.startAt,
            endAt: $stateParams.endAt,
            size: $stateParams.size
        }
    }).then(function (response) {
        //获取服务器列表
        $scope.list = response.data.data.articleList;
        //获取服务器返回的当前页面的列表条目
        $scope.size = response.data.data.size;
        //本来想用于处理时间倒序的，但是发现时间倒序是服务器返回的数据问题
        // let datelist =response.data.data.articleList; 
        // for (var i = 0; i < datelist.length; i++) {
        //     //外层循环一次，就拿arr[i] 和 内层循环arr.legend次的 arr[j] 做对比
        //     for (var j = i; j < datelist.length; j++) {
        //         if (datelist[i].updateAt < datelist[j].updateAt) {
        //             //如果arr[j]大就把此时的值赋值给最大值变量max
        //             max = datelist[j];
        //             datelist[j] = datelist[i];
        //             datelist[i] = max;
        //         }
        //     }
        // }
        //服务器列表总数
        $scope.bigTotalItems = response.data.data.total;
        //通过路由传参返回的页码列表 
        $scope.currentPage = $stateParams.page;
        $scope.perpage = response.data.data.size;
        //容错处理，在重新加载页面时，通过路由传参参数设定当前页面的搜索选项
        
        if ($stateParams.type = !undefined) {
            $scope.type = $stateParams.type;
        }
        if ($stateParams.status = !undefined) {
            $scope.status = $stateParams.status;
        }

        if ($stateParams.title === undefined) {
            $scope.title = "";
        } else {
            $scope.title = $stateParams.title;
        }
        if ($stateParams.author === undefined) {
            $scope.author = "";
        } else {
            $scope.author = $stateParams.author;
        }
        
        if ($stateParams.startAt === undefined) {
            $scope.startday = undefined;
        } else {
            let starttime = parseInt($stateParams.startAt);
            // 将从url中获取到的时间戳转换为标准时间
            // 让插件可以识别时间格式，启用禁用时间选择
            $scope.startday =new Date(starttime)
        }
        if ($stateParams.endAt === undefined) {
            $scope.endday = undefined;
        } else {
            let endtime = parseInt($stateParams.endAt);
            $scope.endday = new Date(endtime);

        }
    });

    //搜索框的类型
    //从ListStyle获取到下拉框，填充到网页的下拉框选项中
    $scope.TypeName = ListStyle.select;
    $scope.type = ListStyle.select[0].id;
    $scope.StatusName = ListStyle.status;
    //关联下拉框的选项和实际需要发送给服务器的数据选项   
    $scope.status = ListStyle.status[0].id;
    // 上下线按钮文字显示
    $scope.btnStatus = function () {
        if (this.x.status === 1) {
            return "上线";
        } else {
            return "下线";
        }
    }

    // 上下线状态改变
    $scope.updown = function (id) {
        var id = this.x.id;
        // 草稿改变
        if (this.x.status === 1) {
            //使用这个弹窗需要引用bootbox.js和bootstrap.js,不然报错
            bootbox.confirm({
                message: "确定要上线？",
                buttons: {
                    confirm: {
                        label: '确认',

                    },
                    cancel: {
                        label: '取消',

                    }
                },
                callback: function (result) {
                    if (result) {
                        // console.log('This was logged in the callback: ' + result);
                        $http({
                            method: 'put',
                            url: '/carrots-admin-ajax/a/u/article/status',
                            params: {
                                id: id,
                                status: 2
                            }
                        }).then(function () {
                            $state.go($state.current, {}, {
                                reload: true
                            })
                        })
                    }
                }
            });
        }

        // 上线改变 
        else {
            bootbox.confirm({
                message: "确定要转为草稿？",
                closeButton: false,
                buttons: {
                    confirm: {
                        label: '确认',

                    },
                    cancel: {
                        label: '取消',

                    }
                },
                callback: function (result) {
                    if (result) {
                        $http({
                            method: 'put',
                            url: '/carrots-admin-ajax/a/u/article/status',
                            params: {
                                id: id,
                                status: 1
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
    }


    // 编辑，通过id
    $scope.edit = function (id) {
        var id = this.x.id;
        $state.go("backstage.add", {
            id: id
        });
    }

    // 删除，同上
    $scope.delete = function (id) {
        var id = this.x.id;
        bootbox.confirm({
            message: "确定要删除？",
            closeButton: false,
            buttons: {
                confirm: {
                    label: '确认',

                },
                cancel: {
                    label: '取消',

                }
            },
            callback: function (result) {
                if (result) {
                    $http({
                        method: 'delete',
                        // 请求参数这样写成这样
                        url: '/carrots-admin-ajax/a/u/article/' + id,
                    }).then(function () {
                        $state.go($state.current, {}, {
                            reload: true
                        })
                    })
                }
            }
        })
    }

    //页数显示为3
    $scope.maxSize = 3;
    //页面跳转
    $scope.page = function () {
        //如果列表行数不是大于零的正整数，弹窗
        if (!(/(^[1-9]\d*$)/.test($scope.size))) {
            bootbox.alert("请输入大于0的整数行数");
        } else {
            $state.go("backstage.list", {
                page: $scope.currentPage, //页面跳转到服务器返回的页码列表
                size: $scope.size
            }, {
                reload: true
            });
        }
    }
    //跳转到第几页和每页展示几行
    $scope.letgo = function () {
        //创建一个中间变量判断页码是否为大于0的正整数，正则表达式判断
        let pagecheck = (/(^[1-9]\d*$)/.test($scope.gotopage))
        //如果页码不是未定义或者不为空或者不是大于零的正整数，弹窗
        if ($scope.gotopage != undefined && $scope.gotopage != "" && pagecheck === false) {
            bootbox.alert("请输入大于0的整数页码");
            //如果列表行数不是大于零的正整数，弹窗
        } else if (!(/(^[1-9]\d*$)/.test($scope.size))) {
            bootbox.alert("请输入大于0的整数行数");
        } else {
            $state.go("backstage.list", {
                page: $scope.gotopage, //页面跳转到服务器返回的页码列表
                size: $scope.size

            }, {
                reload: true
            });
        }

    }


    //搜索，传参
    $scope.search = function () {
        var time1, time2;
        //时间戳转换
        if ($scope.startday) {
            var date1 = new Date($scope.startday);
            time1 = date1.valueOf();
        }
        if ($scope.endday) {
            var date2 = new Date($scope.endday);
            //如果开始时间等于结束时间，结束时间的时间戳加1天
            if (time1 !== date2.valueOf()) {
                time2 = date2.valueOf();
            } else {
                time2 = date1.valueOf() + 86399000;
            }
        }
            
            $state.go("backstage.list", {
                status: $scope.status,
                type: $scope.type,
                author: $scope.author,
                title: $scope.title,
                startAt: time1,
                endAt: time2
            }, {
                reload: true
            });
        
    }
    //点击清空，清除所有参数
    $scope.clear = function () {
        $state.go("backstage.list", {
            type: "",
            status: "",
            //时间不能设置为""和null这种格式，服务器会判断数据为NaN(不是数字)，会报错
            startAt: undefined,
            endAt: undefined,
            author: "",
            title: ""
        }, {
            reload: true
        })
    }

})