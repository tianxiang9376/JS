
//读取角色状态名单
var playerstate = JSON.parse(window.sessionStorage.getItem('playerstate'));
//列出角色状态名单
for (a = 0; a < playerstate.length; a++) {
    $(".middle").append('<div class="middle-click"><div class="middle-square"><p class="middle-role">' + playerstate[a].role + '</p><p class="middle-number">' + (a + 1) + '号</p></div><ul class="middle-iconlist"><li><span class="middle-icon1"></span></li></ul></div>');
    if (playerstate[a].state == "dead") {//如果某个角色已经死亡，更换背景色
        $(".middle-role").eq(a).addClass("backred");
        $(".middle-number").eq(a).addClass("backred");
    }
}

$(".bottom").click(function () {
    window.location.href = 'JS4-1.htm';
})