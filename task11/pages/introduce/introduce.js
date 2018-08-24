var pronum
var info
Page({
  data: {
    one: '',
    selected1: true,
    selected2: false,
    selected3: false,
    enter: '\n'
  },
  selected1: function(e) {
    this.setData({
      selected2: false,
      selected3: false,
      selected1: true
    })
  },
  selected2: function(e) {
    this.setData({
      selected1: false,
      selected3: false,
      selected2: true
    })
  },
  selected3: function(e) {
    this.setData({
      selected1: false,
      selected2: false,
      selected3: true
    })
  },
  onLoad: function() {
    var that = this;
    wx.getStorage({
      key: 'pronum',
      success: function(res) {
        pronum = res.data;
        console.log(pronum)
      },
    })
    wx.request({
      url: 'http://www.jnshu.com/a/occupation/list', //查看后台network试出来的
      method: 'GET', //字母大写
      data: '',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        //从服务器获取到职业推荐的数据，这是一个数组，注意
        info = res.data.data.occupations;
        that.setData({
          //第一页的数据展示
          Oneinfo1: info[pronum[0]].name,
          Oneinfo2: info[pronum[0]].threshold + '星',
          Oneinfo3: info[pronum[0]].difficult + '星',
          Oneinfo4: info[pronum[0]].cycle,
          Oneinfo5: info[pronum[0]].company + '家',
          Oneinfo6: info[pronum[0]].basis,
          Oneinfo7: JSON.parse(info[pronum[0]].salary),

          //第二页的数据展示
          Twoinfo1: info[pronum[1]].name,
          Twoinfo2: info[pronum[1]].threshold + '星',
          Twoinfo3: info[pronum[1]].difficult + '星',
          Twoinfo4: info[pronum[1]].cycle,
          Twoinfo5: info[pronum[1]].company + '家',
          Twoinfo6: info[pronum[1]].basis,
          Twoinfo7: JSON.parse(info[pronum[1]].salary),

          //第三页的数据展示
          Threeinfo1: info[pronum[2]].name,
          Threeinfo2: info[pronum[2]].threshold + '星',
          Threeinfo3: info[pronum[2]].difficult + '星',
          Threeinfo4: info[pronum[2]].cycle,
          Threeinfo5: info[pronum[2]].company + '家',
          Threeinfo6: info[pronum[2]].basis,
          Threeinfo7: JSON.parse(info[pronum[2]].salary),
        })
      }
    })

  }
})