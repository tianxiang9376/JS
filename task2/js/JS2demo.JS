
function setrole() {
    var n = parseInt(document.getElementById("player").value); //获取input的值,从字符串中提取整数
    var commoner;
    var killer;
    var people = new Array(n);
    var str="";
    if (n > 18 || n < 4) { //判断input的值，当人数大于18或者小于4时，弹窗提示
        alert("请输入正确的玩家数量");

    }
    //我对游戏配比的理解是，杀手占总人数的四分之一，平民占四分之三
    else {
        killer = Math.round(n / 4);
        commoner = n - killer;
        //给玩家分配角色
        for (var i = 0; i < people.length; i++) {
            if (i < killer) {
                people[i] = '<li><span class="bot1"></span>' + '杀手' + '</li>'; //三分之一的角色分配为杀手
            } else {
                people[i] = '<li><span class="bot2"></span>' + '平民' + '</li>';
            }
        }
    }
    for (var i = people.length; i--;) { //数组乱序,打乱身份的分配
        var j = Math.floor(Math.random() * (i + 1));
        var temp = people[i];
        people[i] = people[j];
        people[j] = temp;
    }
    for (var i = 0; i < people.length; i++) {
        str += people[i];
    }
    document.getElementById('role').innerHTML = str;
}
