var myApp = angular.module("myApp", ['ui.router', 'ngAnimate', 'ngSanitize', 'ngMessages', 'ui.bootstrap', 'ngFileUpload']);
// var myApp = angular.module("myApp", [&apos;ui.router&apos;]);
// 这里叫做App模块，这将告诉HTML页面这是一个AngularJS作用的页面，它的内容由AngularJS引擎来解释。&apos引号作用'',区分
// 路由
myApp.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    // 清除感叹号
    $locationProvider.hashPrefix('');
    //更改url格式配置为html5，去掉#号,这个没用
    $locationProvider.html5Mode({
        enable: true,
        requireBase: false
    });
    // 默认导入页面
    $urlRouterProvider.otherwise("login");
    $stateProvider
        .state("login", {
            url: "/login",
            templateUrl: "JS6-LOGIN.html",
            controller: "login"
        })
        .state("backstage", {
            url: "/backstage?",
            templateUrl: "JS6-BACK.html",
            controller: "backstage"
        })
        .state("backstage.list", {
            //Article列表页+++
            //params设定路由传参的参数,网址栏不会有参数
            params: {
                "status": "",
                "type": "",
                "page":"",
                "startAt":undefined,
                "endAt":undefined,
                "author":"",
                "title":"",
                "size":""
            },
            url: '/list',
            templateUrl: "JS6-LIST.html",
            controller: "list"
        })
        .state("backstage.add", {
            //列表编辑页面
            //在url地址中用?XXX&xxx的方法添加需要路由传参的参数，网址栏会带有参数
            url: '/add?id',
            templateUrl: "JS6-ADD.html",
            controller: "add"
        })
        
    // .state("backstage.demo", {
    //     url: "/demo",
    //     templateUrl: "demo.html",
    //     controller: "demo"
    // })
});