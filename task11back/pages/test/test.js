var info = []
var score
var male
Page({
  data: {},
  getdata: function() {
    var that = this; //在wx.request中，默认的this是调用request本身，而不是request获取到的数据，重新定义this,可以规避这个问题
    wx.getStorage({
      key: 'score',
      success: function(res) {
        console.log('分数为', res.data),
          score = res.data
        that.setData({
          demodata:res.data
        })
      }
    })
    wx.getStorage({
      key:'male',
      success:function(res){
        console.log('性别为',res.data),
        male = res.data
        if(male == undefined){
          male = '男'
          that.setData({
            numdata: '男'
          })
        }else{
          that.setData({
            numdata: res.data
          })
        }
        
      }
    })
    wx.request({
      url: 'http://www.jnshu.com/a/occupation/list', //查看后台network试出来的
      method: 'GET', //字母大写
      data: '',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data)
        info = res.data.data.occupations//获取返回数据中12种职业的数组
      }
    })
  },

  getintroduce: function() {//判断分数，进行职业推荐
   while(score<5) {
      this.setData({
        info1: info[0].name,
        info2: info[0].threshold + '星',
        info3: info[0].difficult + '星',
        info4: info[0].cycle,
        info5: info[0].company + '家',
        info6: info[0].basis,
        info7: info[0].salary

      })
    }
    while(score>5&&score<10){
      if(male == '男'){
      this.setData({
        info1: info[2].name,
        info2: info[2].threshold + '星',
        info3: info[2].difficult + '星',
        info4: info[2].cycle,
        info5: info[2].company + '家',
        info6: info[2].basis,
        info7: info[2].salary

      })
      }else{
        this.setData({
          info1: info[4].name,
          info2: info[4].threshold + '星',
          info3: info[4].difficult + '星',
          info4: info[4].cycle,
          info5: info[4].company + '家',
          info6: info[4].basis,
          info7: info[4].salary

        })
      }
    }
    while(score>10){
      this.setData({
        info1: info[6].name,
        info2: info[6].threshold + '星',
        info3: info[6].difficult + '星',
        info4: info[6].cycle,
        info5: info[6].company + '家',
        info6: info[6].basis,
        info7: info[6].salary

      })
    }
  }

})