// 点击次数
var time = 1;//点击次数
// 上面是数字
var num = 1;//玩家号码
//var data = sessionStorage.role;//demo
var data = sessionStorage.people;//从上一个页面传递过来的玩家数量与玩家身份数组
var player = JSON.parse(data);

// 全局通用
$('.middle-num').text(num);//显示玩家号码
// 点击事件
$("#watch").click(function () {
    // 点击次数奇数次
    if (time % 2 == 1) {
        $("#middle-show").hide();//隐藏翻牌图片
        $("#middle-showrole").show();//显示身份图片

        var sub = player[num];//把当前玩家身份存入变量sub
        num++;
        if (num > player.length) {
            $('#watch').text("法官查看");
        } else {
            sub = (sub.substring(sub.length - 7, sub.length - 5));
            //因为从上一个页面传过来的数组的单个元素，是‘'<li><span class="bot2"></span>' + '平民' + '</li>'’这样的格式，但是在这个页面中只需要显示其中两个汉字，所以，要用substring得到指定下标之间的字符,提取玩家身份
            // console.log(sub);
            $('#middle-who').text(sub);//显示玩家身份
            $('#watch').text("隐藏身份并传递给 " + (num) + " 号");
        }
    }
    // 点击次数偶数次
    else {
        if ($('#watch').text() == "法官查看") {
            window.location.href = 'JS2-3.html';
        } else {
            $("#middle-showrole").hide();
            $("#middle-show").show();
            if (num > player.length) {
                window.location.href = 'JS2-3.html';
            } else {
                $('#watch').text("查看 " + (num) + "号身份");
                $('.middle-round').text(num);
            }
        }
    }
    time++;
})
