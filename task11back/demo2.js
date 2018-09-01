Page({
  data: {

    education: [{
      name: '初中以下',
      num:'1'
    },
    {
      name: '高中',//太长了就选两个做例子吧
      num:'2'
    }]
  },
  bindPickerChange1: function (e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
    })
  },
          })