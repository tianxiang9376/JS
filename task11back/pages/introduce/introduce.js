// introduce.js
var score
var male
var info
Page({
  data: {
    selected1: true,
    selected2: false,
    selected3: false,
    enter: '\n'
  },
  selected1: function (e) {
    this.setData({
      selected2: false,
      selected3: false,
      selected1: true
    })
  },
  selected2: function (e) {
    this.setData({
      selected1: false,
      selected3: false,
      selected2: true
    })
  },
  selected3: function (e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: true
    })
  },
  onLoad: function () {
    var that = this; //在wx.request中，默认的this是调用request本身，而不是request获取到的数据，重新定义this,可以规避这个问题
    wx.getStorage({
      key: 'score',
      success: function (res) {
        console.log('分数为', res.data),
          score = res.data
      }
    }),
      wx.getStorage({
        key: 'male',
        success: function (res) {
          male = res.data;
          if (male == undefined) {
            male = '男'
          }
          console.log(male)
        }
      }),
      wx.request({
        url: 'http://www.jnshu.com/a/occupation/list', //查看后台network试出来的
        method: 'GET', //字母大写
        data: '',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res.data);
          info = res.data.data.occupations;
          if (score <= 5) {
            that.setData({
              //第一页的数据展示
              Oneinfo1: info[0].name,
              Oneinfo2: info[0].threshold + '星',
              Oneinfo3: info[0].difficult + '星',
              Oneinfo4: info[0].cycle,
              Oneinfo5: info[0].company + '家',
              Oneinfo6: info[0].basis,
              Oneinfo7: JSON.parse(info[0].salary),

              //第二页的数据展示
              Twoinfo1: info[1].name,
              Twoinfo2: info[1].threshold + '星',
              Twoinfo3: info[1].difficult + '星',
              Twoinfo4: info[1].cycle,
              Twoinfo5: info[1].company + '家',
              Twoinfo6: info[1].basis,
              Twoinfo7: JSON.parse(info[1].salary),

              //第三页的数据展示
              Threeinfo1: info[8].name,
              Threeinfo2: info[8].threshold + '星',
              Threeinfo3: info[8].difficult + '星',
              Threeinfo4: info[8].cycle,
              Threeinfo5: info[8].company + '家',
              Threeinfo6: info[8].basis,
              Threeinfo7: JSON.parse(info[8].salary),
            })
          } else if (score > 5 && score <= 10) {
            if (male == '男') {
              that.setData({
                //第一页的数据展示
                Oneinfo1: info[2].name,
                Oneinfo2: info[2].threshold + '星',
                Oneinfo3: info[2].difficult + '星',
                Oneinfo4: info[2].cycle,
                Oneinfo5: info[2].company + '家',
                Oneinfo6: info[2].basis,
                Oneinfo7: JSON.parse(info[2].salary),

                //第二页的数据展示
                Twoinfo1: info[3].name,
                Twoinfo2: info[3].threshold + '星',
                Twoinfo3: info[3].difficult + '星',
                Twoinfo4: info[3].cycle,
                Twoinfo5: info[3].company + '家',
                Twoinfo6: info[3].basis,
                Twoinfo7: JSON.parse(info[3].salary),

                //第三页的数据展示
                Threeinfo1: info[10].name,
                Threeinfo2: info[10].threshold + '星',
                Threeinfo3: info[10].difficult + '星',
                Threeinfo4: info[10].cycle,
                Threeinfo5: info[10].company + '家',
                Threeinfo6: info[10].basis,
                Threeinfo7: JSON.parse(info[10].salary),
              })
            } else {
              that.setData({
                //第一页的数据展示
                Oneinfo1: info[1].name,
                Oneinfo2: info[1].threshold + '星',
                Oneinfo3: info[1].difficult + '星',
                Oneinfo4: info[1].cycle,
                Oneinfo5: info[1].company + '家',
                Oneinfo6: info[1].basis,
                Oneinfo7: JSON.parse(info[1].salary),

                //第二页的数据展示
                Twoinfo1: info[6].name,
                Twoinfo2: info[6].threshold + '星',
                Twoinfo3: info[6].difficult + '星',
                Twoinfo4: info[6].cycle,
                Twoinfo5: info[6].company + '家',
                Twoinfo6: info[6].basis,
                Twoinfo7: JSON.parse(info[6].salary),

                //第三页的数据展示
                Threeinfo1: info[7].name,
                Threeinfo2: info[7].threshold + '星',
                Threeinfo3: info[7].difficult + '星',
                Threeinfo4: info[7].cycle,
                Threeinfo5: info[7].company + '家',
                Threeinfo6: info[7].basis,
                Threeinfo7: JSON.parse(info[7].salary),
              })
            }
          } else if (score > 10) {
            that.setData({
              //第一页的数据展示
              Oneinfo1: info[4].name,
              Oneinfo2: info[4].threshold + '星',
              Oneinfo3: info[4].difficult + '星',
              Oneinfo4: info[4].cycle,
              Oneinfo5: info[4].company + '家',
              Oneinfo6: info[4].basis,
              Oneinfo7: JSON.parse(info[4].salary),

              //第二页的数据展示
              Twoinfo1: info[6].name,
              Twoinfo2: info[6].threshold + '星',
              Twoinfo3: info[6].difficult + '星',
              Twoinfo4: info[6].cycle,
              Twoinfo5: info[6].company + '家',
              Twoinfo6: info[6].basis,
              Twoinfo7: JSON.parse(info[6].salary),

              //第三页的数据展示
              Threeinfo1: info[11].name,
              Threeinfo2: info[11].threshold + '星',
              Threeinfo3: info[11].difficult + '星',
              Threeinfo4: info[11].cycle,
              Threeinfo5: info[11].company + '家',
              Threeinfo6: info[11].basis,
              Threeinfo7: JSON.parse(info[11].salary),
            })

          }
        }
      })
  }
})