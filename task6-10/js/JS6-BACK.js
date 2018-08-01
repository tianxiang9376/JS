// 左侧jQuery手风琴
myApp.controller("backstage", function ($http) {
    $(".list_dt").on("click", function () {
        $('.list_dd').stop();
        $(this).siblings("dt").removeAttr("id");
        if ($(this).attr("id") == "open") {
            $(this).removeAttr("id").siblings("dd").slideUp();
        } else {
            $(this).attr("id", "open").next().slideDown().siblings("dd").slideUp();
        }
    });
})