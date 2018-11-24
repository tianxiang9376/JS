var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate', 'ngFileUpload','oc.lazyLoad']);
app.config(function ($stateProvider, $urlRouterProvider,$urlRouterProvider) {
    //懒加载封装
    let lazyLoad = function(address) {
        return ['$ocLazyLoad',function($ocLazyLoad){
            return $ocLazyLoad.load(address)
        }]
    }
    $urlRouterProvider.when("", "/login")

    $stateProvider
        //登录页面
        .state('login', {
            url: '/login',
            templateUrl: '../../view/login.html',
            controller: 'LoginCtrl',
            controllerAs:"vm",
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/login.js", "../../style/login.min.css"])
            }
        })
        //后台主页
        .state('backstage', {
            url: '/backstage',
            templateUrl: '../../view/backstage.html',
            controller: 'BackCtrl',
            controllerAs:"vm",
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/backstage.js"])
            }
        })
        //欢迎页
        .state('backstage.welcome', {
            url: '/welcome',
            templateUrl: '../../view/welcome.html',
            controller: 'LoginCtrl',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/login.js", "../../style/login.min.css"])
            }
        })
        //Article列表
        .state('backstage.ArticleList', {
            url: '/ArticleList?page&size&title&author&startAt&endAt&status&type',
            templateUrl: '../../view/ArticleList.html',
            controller: 'ArticleList',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/ArticleList.js", "../../style/ArticeList.min.css"])
            }
        })
        //Article新增/编辑
        .state('backstage.ArticleDetails', {
            url: '/ArticleDetails?id',
            templateUrl: '../../view/ArticleDetails.html',
            controller: 'ArticleDetails',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/ArticleDetails.js", "../../style/ArticleDetails.min.css"])
            }
        })
        //公司列表
        .state('backstage.CompanyList', {
            url: '/CompanyList?name&industry&province&city&county&financing&approvedStatus&freezedStatus&size&page', 
            templateUrl: '../../view/CompanyList.html',
            controller: 'CompanyList',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/CompanyList.js", "../../style/CompanyList.min.css"])
            }
        })
        //职位列表
        .state('backstage.PostList', {
            url: '/PostList?CompanyId', 
            templateUrl: '../../view/PostList.html',
            controller: 'PostList',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/PostList.js", "../../style/PostList.min.css"])
            },
        })
        //帐号管理列表
        .state('backstage.AccountList', {
            url: '/AccountList?size&page', 
            templateUrl: '../../view/AccountList.html',
            controller: 'AccountList',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/AccountList.js", "../../style/AccountList.min.css"])
            }
        })
        //角色管理列表
        .state('backstage.RoleList', {
            url: '/RoleList', 
            templateUrl: '../../view/RoleList.html',
            controller: 'RoleList',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/RoleList.js", "../../style/RoleList.min.css"])
            }
        })
        //修改密码
        .state('backstage.revision', {
            url: '/revision', 
            templateUrl: '../../view/revision.html',
            controller: 'Revision',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/Revision.js", "../../style/Revision.min.css"])
            }
        })
        //模块管理列表
        .state('backstage.ModuleList', {
            url: '/ModuleList?page&size', 
            templateUrl: '../../view/ModuleList.html',
            controller: 'ModuleList',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/ModuleList.js", "../../style/ModuleList.min.css"])
            }
        })
        //帐号管理新增/编辑
        .state('backstage.AccountDetails', {
            url: '/AccountDetails?AccountId', 
            templateUrl: '../../view/AccountDetails.html',
            controller: 'AccountDetails',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/AccountDetails.js", "../../style/AccountDetails.min.css"])
            }
        })
        //公司新增/编辑
        .state('backstage.CompanyDetails', {
            url: '/CompanyDetails?CompanyId', 
            templateUrl: '../../view/CompanyDetails.html',
            controller: 'CompanyDetails as vm',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/CompanyDetails.js", "../../style/CompanyDetails.min.css"])
            }
        })
        //模块新增/编辑
        .state('backstage.ModuleDetails', {
            url: '/ModuleDetails?ModuleId', 
            templateUrl: '../../view/ModuleDetails.html',
            controller: 'ModuleDetails',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/ModuleDetails.js", "../../style/ModuleDetails.min.css"])
            }
        })
        .state('backstage.PostDetails', {
            url: '/PostDetails', 
            templateUrl: '../../view/PostDetails.html',
            controller: 'PostDetails',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/PostDetails.js", "../../style/PostDetails.min.css"])
            }
        })
        //角色新增，编辑
        .state('backstage.RoleDetails', {
            url: '/RoleDetails?RoleId', 
            templateUrl: '../../view/RoleDetails.html',
            controller: 'RoleDetails',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/RoleDetails.js", "../../style/RoleDetails.min.css"])
            }
        })
        .state('backstage.demo', {
            url: '/demo', 
            templateUrl: '../../view/demo.html',
            controller: 'demo',
            controllerAs:'vm',
            resolve: {
                loadMyCtrl: lazyLoad(["../../script/controllers/demo.js", "../../style/demo.min.css"])
            }
        })
})