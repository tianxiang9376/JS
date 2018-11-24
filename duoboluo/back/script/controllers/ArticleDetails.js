angular.module("app").controller('ArticleDetails', function ($scope, Upload, $http, $state, $stateParams) {
    //wangEditor富文本编辑器
    var E = window.wangEditor
    var editor = new E('#editor')
    editor.customConfig.zIndex = 0
    editor.create()
    //类型选择
    $scope.type_data = [{
            id: 0,
            name: "首页banner"
        },
        {
            id: 1,
            name: "找职位banner"
        },
        {
            id: 2,
            name: "找精英banner"
        },
        {
            id: 3,
            name: "行业大图"
        }
    ];
    //行业选择
    $scope.industry_data = [{
            id: null,
            name: "请选择"
        },
        {
            id: 0,
            name: "移动互联网"
        },
        {
            id: 1,
            name: "电子商务"
        },
        {
            id: 2,
            name: "企业服务"
        },
        {
            id: 3,
            name: "O2O"
        },
        {
            id: 4,
            name: "教育"
        },
        {
            id: 5,
            name: "金融"
        },
        {
            id: 6,
            name: "游戏"
        }
    ];
    $scope.imgClear = function () {
        $scope.img_view = undefined;
    }
    //图片上传插件
    $scope.imgUpload = function (file) {
        file.upload = Upload.upload({
            url: '/carrots-admin-ajax/a/u/img/task/',
            data: {
                file: $scope.myFiles
            },
        });
        //请求成功后的操作
        file.upload.then(function (rsp) {
                $scope.img_view = rsp.data.data.url;
                $scope.ok = "上传成功";
            },
            function (xuanxue) {},
            function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                // console.log("图片上传成功！");
            });
    }
    //删除操作
    $scope.imgDelete = function () {
        $scope.myFiles = "";
        $scope.img_view = "";
    }

    if ($stateParams.id) {
        //编辑页
        $scope.titleBar = "编辑Article";
        $scope.editSub = true;
        $scope.img_view = true;
        //数据渲染
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/" + $stateParams.id,
            responseType: "json"
        }).then(function (resp) {
            // console.log(resp);
            $scope.title = resp.data.data.article.title;
            $scope.type = resp.data.data.article.type;
            $scope.status = resp.data.data.article.status;
            $scope.link = resp.data.data.article.url;
            $scope.createAt = resp.data.data.article.createAt;
            $scope.myFiles = resp.data.data.article.img;
            $scope.industry = resp.data.data.article.industry;
            editor.txt.text(resp.data.data.article.content)
        });
        //编辑页提交按钮
        $scope.update = function () {
            $http({
                method: "put",
                url: "/carrots-admin-ajax/a/u/article/" + $stateParams.id,
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    status: $scope.status,
                    url: $scope.link,
                    createAt: $scope.createAt,
                    img: $scope.myFiles,
                    industry: $scope.industry,
                    content: editor.txt.text()
                },
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log(resp);
                if (resp.data.code === 0) {
                    $state.go('backstage.ArticleList');
                }
            })
        }
    } else {
        //新增页
        $scope.titleBar = "新增Article";
        $scope.onlineSub = true;
        $scope.draftSub = true;
        //立即上线
        $scope.online = function () {
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
                    url: $scope.link
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log(resp)
                if (resp.data.code === 0) {
                    $state.go('backstage.ArticleList')
                }
            })
        }
        //存为草稿
        $scope.draft = function () {
            var edtxt = editor.txt.text()
            $http({
                method: 'post',
                url: '/carrots-admin-ajax/a/u/article/',
                params: {
                    title: $scope.title,
                    type: $scope.type,
                    status: 1,
                    img: $scope.img_view,
                    content: edtxt,
                    url: $scope.link
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            }).then(function (resp) {
                // console.log(resp)
                if (resp.data.code === 0) {
                    $state.go('backstage.ArticleList')
                }
            })
        }
    }
    //取消按钮
    $scope.cancel = function () {
        $state.go('backstage.ArticleList')
    }
    //表单验证
    $scope.titleStatus = false;
    $scope.urlStatus = false;
})