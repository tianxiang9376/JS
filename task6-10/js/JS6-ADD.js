myApp.controller("add", function ($scope, $http, $state, $stateParams, Upload) {

    $scope.types = [{
        id: "",
        typename: '请选择'
    }, {
        id: 0,
        typename: '首页banner'
    }, {
        id: 1,
        typename: '找职位banner'
    }, {
        id: 2,
        typename: '找精英banner'
    }, {
        id: 3,
        typename: '行业大图'
    }];

    $scope.type = $scope.types[0].id;

    $scope.industries = [{
            id: "",
            industryname: '请选择'
        },
        {
            id: 0,
            industryname: '移动互联网'
        },
        {
            id: 1,
            industryname: '电子商务'
        },
        {
            id: 2,
            industryname: '企业服务'
        },
        {
            id: 3,
            industryname: 'O2O'
        },
        {
            id: 4,
            industryname: '游戏'
        }
    ]
    $scope.industry = $scope.industries[0].id;
    // 编辑页面
    if ($stateParams.id) {
        $scope.listTitle = "编辑Article";
        // 渲染数据
        $http({
            method: 'get',
            url: '/carrots-admin-ajax/a/article/' + $stateParams.id,
        }).then(function (result) {
            var singleList = result.data.data.article;
            $scope.title = singleList.title;
            $scope.type = singleList.type;
            $scope.htmltext = singleList.content;
            $scope.link = singleList.url;
            $scope.img_view = singleList.img;
            $scope.createAt = singleList.createAt;
            $scope.industry = singleList.industry;
            //把content的内容插入富文本编辑器中去
            var hltxt = $scope.htmltext;
            editor.txt.text(hltxt);
            $scope.list = result.data.data.article;
        })
        // 立即上线
        $scope.online = function () {
            //把富文本编辑器中的文本提取出来
            var edtxt = editor.txt.text();
            $http({
                method: 'put',
                url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    status: 2,
                    img: $scope.img_view,
                    //上传的content等于富文本编辑器中的内容
                    content: edtxt,
                    url: $scope.link,
                    createAt: $scope.createAt,
                    industry: $scope.industry
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log("上传成功");
                if (resp.data.code === 0) {
                    $state.go('backstage.list');
                }
            })

        }
        // 存为草稿
        $scope.save = function () {
            //把富文本编辑器中的文本提取出来
            var edtxt = editor.txt.text();
            $http({
                method: 'put',
                url: '/carrots-admin-ajax/a/u/article/' + $stateParams.id,
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    status: 1,
                    img: $scope.img_view,
                    content: edtxt,
                    url: $scope.link,
                    createAt: $scope.createAt,
                    industry: $scope.industry
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log(resp);
                if (resp.data.code === 0) {
                    $state.go('backstage.list');
                }
            })
        }
        //在编辑时，如果选择了本地图片，删除从服务器获取的图片
        //一个按钮禁用的判断
        //这个监听只在编辑页面起作用
        $scope.$watch("myFiles", function (newVal, oldVal) {
            if (newVal = !undefined) {
                $scope.img_view = undefined;
            }
        });

    }

    // 新增页面
    else {
        $scope.listTitle = "新增Article";
        // 立即上线
        $scope.online = function () {
            //把富文本编辑器中的文本提取出来
            var edtxt = editor.txt.text();
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article/',
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    status: 2,
                    img: $scope.img_view,
                    content: edtxt,
                    url: $scope.link,
                    industry: $scope.industry
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log(resp);
                if (resp.data.code === 0) {
                    $state.go('backstage.list');
                }
            })
        }
        // 存为草稿
        $scope.save = function () {
            //把富文本编辑器中的文本提取出来
            var edtxt = editor.txt.text();
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article/',
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    status: 1,
                    img: $scope.img_view,
                    content: edtxt,
                    url: $scope.link,
                    industry: $scope.industry
                },
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log(resp);
                if (resp.data.code === 0) {
                    $state.go('backstage.list');
                }
            })
        }
    }
    $scope.imgStatus = function(){
        $scope.ok = "图片未上传!"
        $scope.upImgStatus = false;
    }
    
    //使用了第三方插件ng-file-upload上传图片
    $scope.imgUpload = function (file) {
        file.upload = Upload.upload({
            url: '/carrots-admin-ajax/a/u/img/task',
            data: {
                //把选中的图片命名为file上传
                file: $scope.myFiles 
            },
        });
        // 请求成功，获取返回的url，展示图片
        file.upload.then(function (rsp) {
            // console.log(rsp);
            //返回的图片url
            $scope.img_view = rsp.data.data.url;
            $scope.ok = "上传成功！";
            $scope.upImgStatus = true;
            if ($scope.myFiles) {
                $scope.getshow = false;
            } else {
                $scope.getshow = true;
            }
        }, function (rsp) {

        }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            // console.log("图片上传成功！");
        });
    };

    // 删除，清空页面内所有参数
    $scope.imgDelete = function (file) {
        editor.txt.clear();
        $scope.myFiles = "";
        $scope.src = "";
        $scope.img_view = undefined;
        $scope.title = "";
        $scope.link = "";
        $scope.ok = "";
        $scope.type = $scope.types[0].id;
        $scope.industry = $scope.industries[0].id;
    };

    //取消，清空页面内所有参数,回到上一个页面
    $scope.cancel = function () {
        editor.txt.clear();
        $scope.myFiles = "";
        $scope.src = "";
        $scope.img_view = undefined;
        $scope.title = "";
        $scope.link = "";
        $scope.ok = "";
        $scope.type = $scope.types[0].id;
        $scope.industry = $scope.industries[0].id;
        $state.go('backstage.list');
    }
    // 检查是否有服务器返回的图片url，一个按钮禁用的判断
    $scope.$watch("img_view", function (newVal, oldVal) {
        if (newVal === undefined) {
            $scope.imgcheck = true;
        } else {
            $scope.imgcheck = false;
        }

    });


});