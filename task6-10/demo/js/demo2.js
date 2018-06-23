var myApp = angular.module("myApp", ["ui.router"]);

myApp.config(function ($stateProvider, $urlRouterProvider) {

     $urlRouterProvider.when("", "/demo2-tab");

     $stateProvider
        .state("demo2-tab", {
            url: "/demo2-tab",
            templateUrl: "demo2-tab.html"
        })
       /* .state("PageTab.Page1", {
            url:"/Page1",
            templateUrl: "Page1.html"
        })
        .state("PageTab.Page2", {
            url:"/Page2",
            templateUrl: "Page2.html"
        })
        .state("PageTab.Page3", {
            url:"/Page3",
            templateUrl: "Page3.html"
        });*/
});