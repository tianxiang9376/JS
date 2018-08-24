var score = 0
var n1 = 0
var male
var n3 = 0
var n4 = 0
var n5 = 0
var n6 = 0

Page({
  data: {

    education: ['初中及以下', '高中', '大专', '本科', '硕士', '博士'],
    objectArray: [{
        id: 0,
        name: '初中及以下'
      },
      {
        id: 1,
        name: '高中'
      },
      {
        id: 2,
        name: '大专'
      },
      {
        id: 3,
        name: '本科'
      },
      {
        id: 4,
        name: '硕士'
      },
      {
        id: 5,
        name: '博士'
      }
    ],
    index1: 0,
    sexual: ['男', '女'],
    objectArray: [{
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      },

    ],
    index2: 0,
    age: ['18岁以下', '18到24岁', '25到30岁', '30岁以上'],
    objectArray: [{
        id: 0,
        name: '18岁以下'
      },
      {
        id: 1,
        name: '18到24岁'
      },
      {
        id: 2,
        name: '25到30岁'
      },
      {
        id: 3,
        name: '30岁以上'
      },

    ],
    index3: 0,



    base: ['零基础', '绘画基础', '网络相关', '原型设计'],
    objectArray: [{
        id: 0,
        name: '零基础'
      },
      {
        id: 1,
        name: '绘画基础'
      },
      {
        id: 2,
        name: '网络相关'
      },
      {
        id: 3,
        name: '原型设计'
      },

    ],
    index4: 0,
    pro: ['无专业', '文科', '理工科', '计算机相关'],
    objectArray: [{
        id: 0,
        name: '无专业'
      },
      {
        id: 1,
        name: '文科'
      },
      {
        id: 2,
        name: '理工科'
      },
      {
        id: 3,
        name: '计算机相关'
      },

    ],
    index5: 0,

    logic: ['渣渣', '一般', '大神'],
    objectArray: [{
        id: 0,
        name: '渣渣'
      },
      {
        id: 1,
        name: '一般'
      },
      {
        id: 2,
        name: '大神'
      },


    ],
    index6: 0,
  },
  bindPickerChange1: function(e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
    n1 = parseInt(e.detail.value)
  },
  bindPickerChange2: function(e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
    if (e.detail.value == 0) {
      male = '男'
    } else {
      male = '女'
    }
  },
  bindPickerChange3: function(e) {
    console.log('picker3发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
    n3 = parseInt(e.detail.value)
  },
  bindPickerChange4: function(e) {
    console.log('picker4发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
    n4 = parseInt(e.detail.value)
  },
  bindPickerChange5: function(e) {
    console.log('picker5发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
    n5 = parseInt(e.detail.value)
  },
  bindPickerChange6: function(e) {
    console.log('picker6发送选择改变，携带值为', e.detail.value)
    this.setData({
      index6: e.detail.value
    })
    n6 = parseInt(e.detail.value)
  },

  check: function(e) {

    score = n1 + n3 + n4 + n5 + n6

    wx.setStorage({
      key: 'male',
      data: male
    })
    wx.setStorage({
      key: 'score',
      data: score
    })
    wx.navigateTo({
      url: "../introduce/introduce",
    })
  },
})