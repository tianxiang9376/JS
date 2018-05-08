"use strict"
//游戏天数
var playerstate = JSON.parse(sessionStorage.getItem("playerstate"));//获取角色存活状态
var day = JSON.parse(sessionStorage.getItem("day"));//从浏览器缓存中获取游戏天数
if (day == undefined) {//如果浏览器缓冲中没有游戏天数
    day = 0;//初始化游戏天数
}
var dead = JSON.parse(sessionStorage.getItem("dead"));//从浏览器缓存中获取死亡名单
if (dead == undefined) {//如果浏览器缓存中没有死亡名单
    dead = [];//初始化死亡名单
}
if (dead.length>=day*2) {//在游戏中，每天会死两个人，如果死亡人数大于等于天数*2，游戏天数增加
    day++;
    sessionStorage.setItem("day", day);//把游戏天数缓存到浏览器缓存中
}


//根据天数 创建middle
for (var w = 0; w < day; w++) {
    if (w > 0) {
        $(".middle").first().clone().prependTo($("main"));//根据游戏天数设置天数的方框
    }
}

// 给之前的middle加上背景
for (var y = 0; y < (day - 1) * 4; y++) {
    $(".middle-step-word").eq(y).addClass("backgroundcolor");
    $(".triangle").eq(y).addClass("lost");
    // 隐藏之前的天数
    $(".middle-step").eq(y).hide();
}
//下面这个函数的位置要放在这里，如果先执行了这个函数再执行复制middle函数，会中奖
for (var c = 0; c < dead.length; c++) {
    //死亡角色序号
    var p = dead[c];
    if ((c + 1) % 2 === 0) {
        $(".info").eq(c).append('<div class="killed">'+p + "号被投票投死,他的身份是" + playerstate[p - 1].role+"</div>");
    } else {
        $(".info").eq(c).append('<div class="killed">'+p + "号被杀死,他的身份是" + playerstate[p - 1].role+"</div>");
    }
}
//改变天数
for (var p = 0; p <= day; p++) {
    $(".middle-day").eq(p).html("第" + (p + 1) + "天");
}

// 当天的显示
$(".middle-step").eq(day - 1).show();

// 点击切换导航条
$(".middle-day").click(function () {
    $(this).siblings().toggle();
})

$(".footer-end").click(function () {//游戏结束，清除缓存，回到页面一
    sessionStorage.clear();
    window.location.href = 'JS2-1.htm';
})
//法官日志
$(".footer-record").click(function () {
    window.location.href = 'JS3-2.htm';
})

$(document).ready(function () { //在html加载完毕之后，加载下面的JS代码
    var game = new StateMachine({ //创建一个有限状态机控制游戏流程，分为四个步骤，对应四个游戏环节
        //初始状态
        init: 'none',
        transitions: [ //事件
            {
                name: 'step1',
                from: 'none',
                to: '1'
            },
            {
                name: 'step2',
                from: '1',
                to: '2'
            },
            {
                name: 'step3',
                from: '2',
                to: '3'
            },
            {
                name: 'step4',
                from: '3',
                to: '4'
            },
            {
                name: 'reset',
                from: '4',
                to: 'none'
            } // 为什么要返回到初始状态？
        ],
        methods: { //方法，但是点击事件要重新写
            onStep1: function () {
                $('.middle-step-word').eq(day * 4 - 4).addClass('backgroundcolor');
                $('.triangle').eq(day * 4 - 4).addClass('lost');
            },
            onStep2: function () {
                $('.middle-step-word').eq(day * 4 - 3).addClass('backgroundcolor');
                $('.triangle').eq(day * 4 - 3).addClass('lost');
            },
            onStep3: function () {
                $('.middle-step-word').eq(day * 4 - 2).addClass('backgroundcolor');
                $('.triangle').eq(day * 4 - 2).addClass('lost');
            },
            onStep4: function () {
                $('.middle-step-word').eq(day * 4 - 1).addClass('backgroundcolor');
                $('.triangle').eq(day * 4 - 1).addClass('lost');
            },
            onAfterStep4: function () {
                sessionStorage.removeItem("gamestep"); //清除浏览器缓存中的游戏步骤
                window.location.reload();
                // 页面自动刷新js
            }
        }
    })
    //有限状态机设置完成//
    var i = $(".middle-step-word").index($(this)); // 添加点击事件，当点击某一步执行的操作，调用上面的方法
    $(".middle-step-word").eq(day * 4 - 4).click(function () {
        game.step1(); //调用methods的方法
        alert("进入杀人环节！");
        window.sessionStorage.setItem('gamestep', "1");
        window.location.href = "JS4-2.htm";
    })
    $(".middle-step-word").eq(day * 4 - 3).click(function () {
        game.step2();
        window.sessionStorage.setItem('gamestep', "2");
        alert("亡灵发表遗言！");
    })
    $(".middle-step-word").eq(day * 4 - 2).click(function () {
        game.step3();
        window.sessionStorage.setItem('gamestep', "3");
        alert("玩家依次发言！")
    })
    $(".middle-step-word").eq(day * 4 - 1).click(function () {
        game.step4();
        window.sessionStorage.setItem('gamestep', "4");
        alert("进入投票环节！");
        window.location.href = "JS4-2.htm";
    })
    // 判断流程状态，存储状态并在跳转页面之后返回另一个值实现    
    var gamestep = window.sessionStorage.getItem("gamestep"); //获取杀手杀人页面中的游戏步骤
    if (gamestep == "1") {
        game.step1();
    } else if (gamestep == "2") {
        game.step1();
        game.step2();
    } else if (gamestep == "3") {
        game.step1();
        game.step2();
        game.step3();
    } else if (gamestep == "4") {
        game.step1();
        game.step2();
        game.step3();
        game.step4();
    } else {
        game.reset();
    }
})
