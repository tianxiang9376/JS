// // 左侧jQuery手风琴
// myApp.controller("backstage", function () {
//     //当页面重新加载时
//     $(function () {
//         //如果本地缓存有索引值，按照索引值把对应的list_dt展开
//         if (localStorage.getItem('xiabiao')) {
//             $('.list_dd').stop();
//             $(".list_dt").eq(localStorage.getItem('xiabiao')).attr("id", "open").next().slideDown().siblings("dd").slideUp();
//         }
//     })
//     $(".list_dt").on("click", function () {
//         $('.list_dd').stop();
//         $(this).siblings("dt").removeAttr("id");
//         if ($(this).attr("id") == "open") {
//             $(this).removeAttr("id").siblings("dd").slideUp();
//             //如果下拉菜单关闭了，就把本地缓存的索引值清除
//             localStorage.removeItem('xiabiao');
//         } else {
//             $(this).attr("id", "open").next().slideDown().siblings("dd").slideUp();
//             //获取一级菜单的索引值
//             var i = $(this).index(); 
//             //HTML页面获取的list_dt的索引值有问题，取巧用了一个算法来解决
//             var x = i/2;
//             //把索引值存储到本地缓存
//             localStorage.setItem('xiabiao', x);
//         }
//     });
// })



myApp.controller("backstage", function ($scope, $state, $stateParams) {

    $scope.asiderlist = [{

            name: "信息管理",
            title: [{
                    secondname: "公司列表",
                    router: 'backstage',
                    style: false
                },
                {
                    secondname: "职位列表",
                    router: 'backstage',
                    style: false
                }
            ],
            show: false
        },
        {

            name: "Article管理",
            title: [{
                    secondname: "Article列表",
                    router: '.list',
                    style: false
                },
                {
                    secondname: "文章管理",
                    router: 'backstage',
                    style: false
                },
                {
                    secondname: "页面管理",
                    router: 'backstage',
                    style: false
                },
            ],
            show: false
        },
        {

            name: "用户管理",
            title: [{
                secondname: "用户列表",
                router: 'backstage',
                style: false
            }, ],
            show: false
        },
        {

            name: "内容管理",
            title: [{
                secondname: "视频管理",
                router: 'backstage',
                style: false
            }, ],
            show: false
        },
    ];

    //路由传参获取菜单状态
    // if ($stateParams.one) {
    //     $scope.asiderlist[$stateParams.one].show = true;
    //     if ($stateParams.two) {
    //         $scope.asiderlist[$stateParams.one].title[$stateParams.two].style = true;
    //     }
    // }

    //侧边一级菜单点击事件
    $scope.changelist = function (oneindex) {
        // 其他一级菜单样式重置
        $scope.asiderlist.forEach(function (value, index) {
            if (index != oneindex) {
                value.show = false;
            }
        })
        //其他一级菜单样式重置,原生写法
        // for(i=0;i<$scope.asiderlist.length;i++){
        //     if(i != oneindex){
        //         $scope.asiderlist[i].show = false;
        //     }
        // }

        //一级菜单样式改变
        $scope.asiderlist[oneindex].show = !$scope.asiderlist[oneindex].show;
        let onelistcheck = $scope.asiderlist[oneindex].show;
        if (onelistcheck == true) {
            sessionStorage.setItem("list1", oneindex)
        } else {
            sessionStorage.removeItem("list1")
        }
    };
    //二级菜单点击事件
    $scope.changeclass = function (oneindex, twoindex) {
        // 其他二级菜单样式重置
        $scope.asiderlist.forEach(function (value, index) {
            if (index != oneindex) {
                value.title.forEach(function (value) {
                    value.style = false;
                })
            } else {
                value.title.forEach(function (value, index) {
                    if (index != twoindex) {
                        value.style = false;
                    }
                })
            }
        })
        //二级菜单样式改变
        $scope.asiderlist[oneindex].title[twoindex].style = !$scope.asiderlist[oneindex].title[twoindex].style;
        let twolistcheck = $scope.asiderlist[oneindex].title[twoindex].style;
        if (twolistcheck == true) {
            sessionStorage.setItem("list2", twoindex)
        } else {
            sessionStorage.removeItem("list2")
        }
    }

    // 从本地储存获取菜单的状态保存
    sessionStorage.getItem("list1")
    var list1 = sessionStorage.getItem("list1")
    sessionStorage.getItem("list2")
    var list2 = sessionStorage.getItem("list2")

    if (list1 != undefined) {
        $scope.asiderlist[list1].show = true;
        if(list2 != undefined){
            $scope.asiderlist[list1].title[list2].style = true;
        }
    }
    //点击退出，清空登陆信息
    $scope.signout = function () {
        sessionStorage.clear();
        $state.go("login");
    }
    //检查是否有登陆信息
    if (sessionStorage.getItem('login') == undefined) {
        bootbox.alert("未登录");
        $state.go("login")
    }

});