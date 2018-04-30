
$(document).ready(function () {//在文档加载之后激活函数
    var game = new StateMachine({//创建一个有限状态机控制游戏流程，分为四个步骤，对应四个游戏环节
        //初始状态
        init:'none',
        transitions: [//事件
            {name: 'step1',from: 'none',to: '1'},
            {name: 'step2',from: '1',to: '2'},
            {name: 'step3',from: '2',to: '3'},
            {name: 'step4',from: '3',to: '4'},
            {name: 'reset',from: '4',to: 'none'}// 为什么要返回到初始状态？
        ],
        methods:{//方法，但是点击事件要重新写
            onStep1:function(){
                $('.middle-step.word').eq(day*4-4).addClass('otherbackground');
                $('.triangle').eq(day*4-4).addClass('lost');
            },
            onStep2:function(){
                $('.middle-step.word').eq(day*4-3).addClass('otherbackground');
                $('.triangle').eq(day*4-3).addClass('lost');
            },
            onStep3:function(){
                $('.middle-step.word').eq(day*4-2).addClass('otherbackground');
                $('.triangle').eq(day*4-2).addClass('lost');
            },
            onStep4:function(){
                $('.middle-step.word').eq(day*4-1).addClass('otherbackground');
                $('.triangle').eq(day*4-1).addClass('lost');
            },
            onAfterStep4: function () {
                sessionStorage.removeItem("gameother");
                sessionStorage.removeItem("game");
                //清除浏览器缓存
                window.location.reload();
                // 页面自动刷新js
            }
        }







//游戏结束，清除缓存，回到页面一
$(".footer-end").click(function () {
    sessionStorage.clear();
    window.location.href = 'JS2-1.htm';
})
//法官日志
$(".footer-record").click(function() {
    window.location.href='JS3-2.htm';
}
