"use strict"
//读取角色状态名单,缓存了js42给第四步用

var playerstate = JSON.parse(window.sessionStorage.getItem('playerstate'));
//列出角色状态名单
for (a = 0; a < playerstate.length; a++) {
    $(".middle").append('<div class="middle-click"><div class="middle-square"><p class="middle-role">' + playerstate[a].role + '</p><p class="middle-number">' + (a + 1) + '号</p></div><ul class="middle-iconlist"><li><span class="middle-icon1"></span></li></ul></div>');
    if (playerstate[a].state == "dead") {//如果某个角色已经死亡，更换背景色
        $(".middle-role").eq(a).addClass("backgray");
    }
}

//读取死亡名单
if (sessionStorage.getItem('dead') == undefined) { //如果死亡名单不存在
    var dead = []; //初始化死亡名单
} else { //如果死亡名单存在，从浏览器缓存中读取
    var dead = JSON.parse(sessionStorage.getItem('dead'));
}
//获取游戏步骤的参数
var step = window.sessionStorage.getItem('gamestep');

//杀手杀人步骤1
if (step == "1") {
 
    $(".head-middle").find("p").text("杀手开始杀人");//修改标题
    $(".middle-click").click(function (e) {//点击事件
        for (var m = 0; m < playerstate.length; m++) {//在这个游戏步骤中，如果选中了某个角色编号，其他编号的背景色自动刷新为未被选中
            if (playerstate[m].state !== "dead") {
                $(".middle-role").eq(m).removeClass("backgray");
            }
        }
        var q = $(".middle-click").index($(this));
        if (playerstate[q].role == "平民" && playerstate[q].state !== "dead") {//如果选择的是平民并且没有死
            $(".middle-role").eq(q).addClass("backgray");//修改背景色
            sessionStorage.setItem("dienight", q + 1);//添加杀手杀死的角色的编号到浏览器缓存中
        }
        else if (playerstate[q].role == "平民" && playerstate[q].state !== "alive") {
           alert("你想杀鬼？");
        }
        else{
            alert("自己人！杀平民啊！");
        }
    })
}
//投票步骤4
if(step == '4'){
    $(".head-top-vote").text("全员投票");
    $(".middle-click").click(function (e) {
        for (var m = 0; m < playerstate.length; m++) {//在这个游戏步骤中，如果选中了某个角色编号，其他编号的背景色自动刷新为未被选中
            if (playerstate[m].state !== "dead") {
                $(".middle-role").eq(m).removeClass("backgray");
            }
        }
        var q = $(".middle-click").index($(this));
        if (playerstate[q].state !== "dead") {
            $(".middle-role").eq(q).addClass("backgray");
            sessionStorage.setItem("dieday", q + 1);
        } else {
            alert("你又想杀鬼吗？");
        }
    })
}

$(".bottom").click(function () {
    var dienight = window.sessionStorage.getItem("dienight");//从浏览器缓存获取杀手杀死的角色编号
    dead.push(parseInt(dienight));//统计死亡名单
    playerstate[dienight - 1].state = "dead";//修改角色存储存活状态
    if (sessionStorage.getItem('dieday') !== null) {//记录投票杀死的角色编号
        var dieday = window.sessionStorage.getItem("dieday");
        dead.push(parseInt(dieday));//统计死亡名单
        playerstate[dieday - 1].state = "dead";//修改角色存储存活状态
    }
    // es6一句去重
    dead = Array.from(new Set(dead));//Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
    //缓存死亡名单
    window.sessionStorage.setItem('dead', JSON.stringify(dead));
    // 缓存游戏角色状态名单
    window.sessionStorage.setItem('playerstate', JSON.stringify(playerstate));
    window.location.href = 'JS4-1.htm';
    //判断游戏胜利条件，放置在最末尾运行
    
    var ka = 0, //杀手人数
        ca = 0; //平民人数
    for (var f = 0; f < playerstate.length; f++) {
        if (playerstate[f].role === '杀手' && playerstate[f].state === 'alive') {
            ka++;
        } else if (playerstate[f].role === '平民' && playerstate[f].state === 'alive') {
            ca++;
        }
    }
    sessionStorage.setItem('kalive', ka);
    sessionStorage.setItem('calive', ca);
    if (ka >= ca || ka === 0) {
        var win = (ka === 0) ? '平民胜利' : '杀手胜利';
        sessionStorage.setItem("win", win);
        window.location.href = 'JS4-3.htm';
    }
})