var backcolor = document.getElementsByClassName('box');
/*把所有class名为“box”的元素放入一个数组变量中*/
var colors = ['red', 'plum', 'blue', 'green', 'cyan', 'black', '#ccc', 'gray', 'brown']; //储存颜色的数组
var set //给计时器定义一个变量

function end() { //停止按钮
    for (i = 0; i < backcolor.length; i++) { //循环遍历清除颜色
        backcolor[i].style.background = "orange";
    }
    clearInterval(set); //停止定时器
}

function start() { //点击开始
    clearInterval(set); //在启动计时器前先停止计时器
    set = setInterval(function() { //使用定时器
        changecolor(); //调用函数
    }, 500) //设置间隔时间
}

function change() {//随机颜色1，不查重
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ',' + g + ',' + b + ")";
}

function changecolor() {
    for (i = 0; i < backcolor.length; i++) { //循环遍历清除颜色
        backcolor[i].style.background = "orange";
    }
    var back = new Array(3);
    var color = new Array(3);
    //定义两个包含三个数据的数组，back是盒子，color是颜色
    for (var i = 0; i < back.length; i++) { //创建选择盒子的数组
        var a = parseInt(Math.random() * 9); //取0-9之间的随机整数
        console.log(a); //将"内容"输出在控制台中，方便以后的调试，是一个使用频率极高的功能。
        if (i == 0) {
            //第一个取到的值放入数组中，在这个循环中这段代码只会执行一次
            back[i] = a; //back[0]取值完毕
        } else {
            for (var j = 0; j < i; j++) {
                /*这段代码只有在i不等于0时才会执行，用于判断back[i]与back[j]（j是小于i的所有下标）的值是否相同*/
                if (a == back[j]) { //如果这一次取值与之前某一次取值相同
                    i-- //重新取值
                } else { //取值与之前不同
                    back[i] = a;
                }
            }
        }
    }
    for (var i = 0; i < color.length; i++) { //随机颜色2,查重，但是颜色数量有限
        var b = parseInt(Math.random() * 9);
        console.log(b);
        if (i == 0) {
            color[i] = b;
        } else {
            for (var j = 0; j < i; j++) {
                if (b == color[j]) {
                    i--
                } else {
                    color[i] = b;
                }
            }
        }
    }
    var color2 = new Array(3);//随机颜色3，查重，可以用了
    var d = new Array(3);//查重数组，在三组RGB中，只要R,G,B其中一组数字不同，颜色就不会完全相同，取巧的办法
    for (var i = 0; i < color2.length; i++) {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        d[i] = r;
        if (i == 0) {
            color2[i] = "rgb(" + r + "," + g + "," + b + ")";
        } else {
            for (var j = 0; j < i; j++) {
                if (d[j] == d[i]) {
                    i--
                } else {
                    color2[i] = "rgb(" + r + "," + g + "," + b + ")";
                }
            }
        }
    }
    for (var i = 0; i < back.length; i++) {
         //backcolor[back[i]].style.backgroundColor = change();//随即颜色1
        //backcolor[back[i]].style.backgroundColor = colors[color[i]];//随机颜色2
        backcolor[back[i]].style.backgroundColor = color2[i];//随机颜色3

        ////将随机的颜色给随机的地址
    }
}

