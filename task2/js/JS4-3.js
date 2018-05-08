"use strict"
//先在html中引用JS，OK？
var kalive = JSON.parse(sessionStorage.getItem("kalive")); //获取杀手存活人数
var calive = JSON.parse(sessionStorage.getItem("calive")); //获取平民存活人数
var day = JSON.parse(sessionStorage.getItem("day")); //从浏览器缓存中获取游戏天数
var dead = JSON.parse(sessionStorage.getItem("dead")); //取死亡名单
if (dead == undefined) { //从浏览器获取死亡名单
    dead = [];
}
var playerstate = JSON.parse(sessionStorage.getItem("playerstate"));
//显示杀手与平民的存活人数
$(".killalive").text(kalive);
$(".commoneralive").text(calive);
//判断哪一方胜利
if (kalive === 0) {
    
    $(".win1").text("平民胜利");
    $(".win2").text("平民");
} else {
    $(".win1").text("杀手胜利");
    $(".win2").text("杀手");
}




//创建天数的方框
for (var w = 0; w < day; w++) {
    $(".gameday").eq(w).text(w + 1);
    if (w > 0) {
        $(".middle-gameflow").first().clone().prependTo($(".middle-day")); //根据游戏天数设置天数的方框
    }
}

for (var c = 0; c < dead.length; c++) {
    //死人号数
    var p = dead[c];
    if ((c + 1) % 2 === 0) {
        // console.log(ab);
        // console.log(ab[p]);
        $(".infos").eq(c).text("晚上：" + p + "号被投票投死，" + "他的身份是" + playerstate[p - 1].role);
    } else {
        $(".infos").eq(c).text("白天：" + p + "号被杀手杀死，" + "他的身份是" + playerstate[p - 1].role);
    }
}


$(".bottom-colorright").click(function () {
    sessionStorage.clear();
    window.location.href = 'JS2-1.htm';
})