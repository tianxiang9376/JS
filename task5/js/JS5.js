"use strict"
window.onload = function () {
        //网页加载之后，执行下列代码
        var username = document.getElementById("username");
        var password = document.getElementById("password");
        //定义变量保存获取到的用户名和密码
        document.getElementById("bottom-login").addEventListener("click", function () {
                    //监听登陆按钮是否有点击行为，如果有执行下列操作
                    // 利用FormData对象,我们可以通过JavaScript用一些键值对来模拟一系列表单控件,我们还可以使用XMLHttpRequest的send()方法来异步的提交这个"表单"
                    var formData = new FormData();
                    formData.append('name', username);
                    formData.append('pwd', password);

                    function createXHR() {
                        //创建兼容各浏览器的XMLHttpRequest对象
                        if (XMLHttpRequest) {
                            //IE7及更高版本
                            return new XMLHttpRequest();
                        } else {
                            //IE7以下版本
                            return new ActiveXObject('Microsoft.XMLHTTP')
                        }
                    }
                }
                var xhr = creatXHR(); xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var text = JSON.parse(xhr.responseText);
                        if (text.message == "success") {
                            console.log("success");
                            window.location.href = "http://dev.admin.carrots.ptteng.com/";
                        } else {
                            document.getElementsByClassName("info")[0].innerHTML = text.message;
                        }
                    } else {
                        console.error("error" + xhr.status);
                    }
                    xhr.open('POST', "/carrots-admin-ajax/a/login", true);
                    xhr.send(formData);
                }