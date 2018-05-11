 clicktime = 1; //点击次数
num = 1;//玩家号码
var data = sessionStorage.people; //从上一个页面传递过来的玩家数量与玩家身份数组
var player = JSON.parse(data);
document.getElementById('middle-num').innerHTML = num;
watch.onclick = function() {
    var show = document.getElementById('middle-show');
    var showrole = document.getElementById('middle-showrole');
    if (clicktime % 2 == 1) {
        show.style.display = "none";
        showrole.style.display = "block";
        var sub = player[num];
        num++;
        if (num > player.length) {
            document.getElementById('watch').innerHTML = "法官查看";
        } else {
            sub = (sub.substring(sub.length - 7, sub.length - 5));
            document.getElementById('middle-who').innerHTML = sub;
            document.getElementById('watch').innerHTML = "隐藏身份并传递给 " + (num) + " 号";
        }
    } else {
        if (document.getElementById('watch').innerHTML == "法官查看") {
            window.location.href = "./JS2-3.htm"
        } else {
            show.style.display = "block";
            showrole.style.display = "none";
            if (num > player.length) {
                window.location.href = './JS2-3.htm';
            }else{
            	 document.getElementById('watch').innerHTML = "查看 " + (num) + "号身份";
            	 document.getElementById('middle-round').innerHTML = num;
            }

        }
    }
    clicktime++
}
