var rangenum = document.getElementById('range');
var playernum = document.getElementById('player');

function change(){//绑定滑动条与人数
    playernum.value = rangenum.value;
}


function add(){//按钮增加人数
    if (playernum.value<18) {
        playernum.value++;
        rangenum.value = playernum.value;
    }
    else{
        alert("人数达到上限");
    }
}

function less(){//按钮减少人数
    if (playernum.value>4) {
        playernum.value--;
        rangenum.value = playernum.value;
    }
    else{
        alert("人数不足，请增加人数");
    }
}
// 限制必须先设置好人数才能进入页面三
document.getElementsByClassName("bottom-btn")[0].addEventListener("click", function()
{
    if(playernum.value!=document.getElementsByTagName("li").length){
      alert("玩家人数还没设置好");
    }
    else{
      window.location.href = './JS3-1.htm';
    }
});

function setrole() {
    var n = parseInt(document.getElementById("player").value); //获取玩家人数,从字符串中提取整数
    var commoner;
    var killer;
    var people = new Array(n);
    var role = new Array(n);//为下一个页面传送数据准备的数组
    var str="";
    if (n > 18 || n < 4) { //判断n的值，当人数大于18或者小于4时，弹窗提示
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
                role[i]='杀手';
            } else {
                people[i] = '<li><span class="bot2"></span>' + '平民' + '</li>';
                role[i]='平民';
            }
        }
    }
    for (var i = people.length; i--;) { //数组乱序,打乱身份的分配
        var j = Math.floor(Math.random() * (i + 1));
        var temp = people[i];
        people[i] = people[j];
        people[j] = temp;
        var b = role[i];
        role[i] = role[j];
        role[j] = b;
    }
    for (var i = 0; i < people.length; i++) {
        str += people[i];
    }
    document.getElementById('role').innerHTML = str;

   //var data = JSON.stringify(role);
   var data = JSON.stringify(people);
  // console.log(obj);
  // 存入
  //sessionStorage.role = data;  // 用sessionStorage实现页面之间的数据传输
  sessionStorage.people = data;
}
