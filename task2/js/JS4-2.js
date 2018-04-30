var data = sessionStorage.people;//从上一个页面传递过来的玩家数量与玩家身份数组
var player = JSON.parse(data);

// 在这里用对象解决原来的字符串数组
// 定义数组容纳身份
var identity = [];
for (i = 0; i < player.length; i++) {
    var sub = player[i];
    sub = (sub.substring(sub.length - 7, sub.length - 5));
    identity[i] = sub;
}
for (a = 0; a < identity.length; a++) {
    $(".middle").append('<div class="middle-click"><div class="middle-square"><p class="middle-role">'+identity[a]+'</p><p class="middle-number">'+(a+1)+'号</p></div><ul class="middle-iconlist"><li><span class="middle-icon1"></span></li></ul></div>');
}

