"use strict"
//原生JS写一个AJAX
//当网页加载之后再加载下列JS
window.onload = function () {
    //监听登陆按钮，当登陆按钮执行点击操作时，运行JS
    document.getElementById("bottom-login").addEventListener("click", function () {
        //在点击按钮后再执行下面两个操作，记得加上value,血泪教训
        //获取用户名
        var user = document.getElementById("username").value;
        //获取密码
        var pwd = document.getElementById("password").value;
        //创建一个FormData对象
        var userinfo = new FormData();
        //把用户名和密码放入FormData对象中
        userinfo.append("name", user);
        userinfo.append("pwd", pwd);
        //根据浏览器版本创建XMLHttpRequest对象
        if (window.XMLHttpRequest) {
            //IE7及以上版本
            var XHR = new XMLHttpRequest();
        }
        //IE7以下版本
        else {
            var XHR = ActiveXObject("Microsoft.XMLHTTP");
        }
        //服务器地址与请求方式
        XHR.open('POST', "/carrots-admin-ajax/a/login", true);
        //发送数据
        XHR.send(userinfo);
        //根据服务器的响应状态执行不同的功能
        XHR.onreadystatechange = function () {
            //如果服务器正常响应并且返回了数据
            if (XHR.readyState == 4 && XHR.status == 200) {
                var text = JSON.parse(XHR.responseText);
                if (text.message == "success") {
                    console.log("success");
                    window.location.href = "http://dev.admin.carrots.ptteng.com/";
                } else {
                    document.getElementsByClassName("info")[0].innerHTML = text.message;
                }
            } else {
                console.error("error" + XHR.status);
            }
        }
    })
}