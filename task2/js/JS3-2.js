var data = sessionStorage.people;//从上一个页面传递过来的玩家数量与玩家身份数组
var player = JSON.parse(data);

// 在这里用对象解决原来的字符串数组
// 定义数组容纳角色，在这里把角色信息提取出来，方便后面的使用
var identity = [];
for (i = 0; i < player.length; i++) {
    var sub = player[i];
    sub = (sub.substring(sub.length - 7, sub.length - 5));
    identity[i] = sub;
}


// 对象创建器，a是角色，b是状态死活
function $sta(a, d) {
    this.role = a;
    this.state = d;
}
//游戏开始时，记录所有角色的状态都是存活,alive dead缩写ad
var ad = [];
for (i = 0; i < identity.length; i++) {
    if (identity[i] == "平民") {
        ad[i] = new $sta("平民", "alive");

    } else {
        ad[i] = new $sta("杀手", "alive");
    }
}
//把角色的存活状态转换为字符串放入浏览器缓存
var state = JSON.stringify(ad);
sessionStorage.ab = state;
//把所有玩家的序号和角色显示出来
for (a = 0; a < ad.length; a++) {
    $(".middle").append('<div class="middle-click"><div class="middle-square"><p class="middle-role">'+ad[a].role+'</p><p class="middle-number">'+(a+1)+'号</p></div><ul class="middle-iconlist"><li><span class="middle-icon1"></span></li></ul></div>');
}