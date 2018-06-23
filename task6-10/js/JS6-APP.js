"use strict"
var nav = angular.module("myApp", ["ui.router"]);

nav.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/asidenav");

    $stateProvider
        .state("asidenav", {
            url: "/asidenav",
            templateUrl: "asidenav.html"
        })
        .state("asidenav.list", {
            url: "/list",
            templateUrl: "list.html"
        })
});

nav.controller('biubiubiu', function ($scope, $http) {
    $http({
        method: 'GET',
        url: '/carrots-admin-ajax/a/article/search',
        headers: {
            'Content-Type': undefined
        }
    }).then(function successCallback(response) {
        $scope.form = response.data.data.articleList;
    }, function errorCallback(response) {
        $scope.wrong = "wrong!";
    });
});

nav.filter("typeName", function () {
    return function (type) {
        var typeName = "";
        if (type == "0") {
            typeName = "首页banner";
        }
        if (type == "1") {
            typeName = "找职位banner";
        }
        if (type == "2") {
            typeName = "找精英banner";
        }
        if (type == "3") {
            typeName = "行业大图";
        }
        return typeName;
    }
})

nav.filter("statusName", function () {
    return function (status) {
        var statusName = "";
       
        if (status == "1") {
            statusName = "草稿";
        }
        if (status == "2") {
            statusName = "上线";
        }
        return statusName;
    }
})


window.onload = function () {
    $(".nav2").slideToggle();
    $(".nav-click").click(function () {
        $(".nav2").hide();
        $(this).next(".nav2").slideToggle();
    })
}