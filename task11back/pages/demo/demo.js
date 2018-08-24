Page({
  data: {
    selected1: true,
    selected2: false,
    selected3: false
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
  
})