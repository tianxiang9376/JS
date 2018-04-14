function deal() {
    var n = parseInt(document.getElementById("num").value); //获取input的值,从字符串中提取整数
    var commoner;
    var killer;
    var people = new Array(n);
    if (n > 18 || n < 4) { //判断input的值，当人数大于18或者小于4时，弹窗提示
        alert("请输入正确的玩家数量");
    }
    //我对游戏配比的理解是，杀手占总人数的四分之一，平民占四分之三
    else {
        killer = Math.round(n / 4);
        commoner = n - killer;
        //给玩家分配角色
        document.getElementById("killer").innerHTML = killer;
        document.getElementById("commoner").innerHTML = commoner;
        for (var i = 0; i < people.length; i++) {
            if (i < killer) {
                people[i] = "杀手"; //三分之一的角色分配为杀手
            } else {
                people[i] = "平民";
            }
            //测试demo
            //document.write(i+1+"号玩家身份为"+people[i] + "</br>");
        }
    }

    for (var i = people.length; i--;) { //数组乱序,打乱身份的分配
        var j = Math.floor(Math.random() * (i + 1));
        var temp = people[i];
        people[i] = people[j];
        people[j] = temp;
    }
    //测试demo
    /*for (var i = 0; i < people.length; i++) {
        document.write(i+1+"号玩家身份为"+people[i] + "</br>");
    }*/

}

function change() {
    var value = document.getElementById('range').value;
    document.getElementById("num").value = value;
}
