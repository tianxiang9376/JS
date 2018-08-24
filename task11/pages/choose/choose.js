/*页面内的全局变量,赋值初始化权重，选择不同的选项把权重分数分别赋值给对应的变量，最后再统一计算排序*/
var account1 = [-1000,
  10, -50, -50, -100, -50,
  30,
  50,
  50, -1000, -1000,
  30,
];
var account2 = [-1000,
  50,
  50,
  50,
  50,
  50,
  50,
  30,
  30, -1000, -1000,
  30,
];
var account3 = [-1000,
  5,
  0,
  0, -50,
  15,
  20,
  30,
  50, -1000, -1000,
  20,
];
var account4 = [-1000,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0, -1000, -1000,
  0,

];
var account5 = [-1000,
  30,
  0,
  0,
  0,
  0,
  30,
  50,
  50, -1000, -1000,
  30,
];
var account6 = [-1000,
  40,
  10,
  10,
  10,
  10,
  20,
  50,
  50, -1000, -1000,
  20,
];
Page({
  data: {
    //测试代码 GG: '',
    education: [{
        name: '初中以下',
        score: [-1000, //css
          10, //js
          -50, //android
          -50, //ios
          -100, //java
          -50, //op
          30, //pm
          50, //ui
          50, //qa
          -1000, //求职辅导
          -1000, //python
          30, //运营
        ]

      },
      {
        name: '高中',
        score: [-1000, //css
          20, //js
          0, //android
          0, //ios
          -50, //java
          10, //op
          30, //pm
          50, //ui
          50, //qa
          -1000, //求职辅导
          -1000, //python
          30, //运营
        ]
      },
      {
        name: '大专',
        score: [-1000,
          30,
          30,
          30,
          30,
          30,
          30,
          30,
          50, -1000, -1000,
          30,
        ]
      },
      {
        name: '本科',
        score: [-1000,
          30,
          40,
          40,
          40,
          40,
          40,
          40,
          30, -1000, -1000,
          40,
        ]
      },
      {
        name: '硕士',
        score: [-1000,
          30,
          50,
          40,
          50,
          30,
          50,
          30, -30, -1000, -1000,
          50,
        ]
      }, {
        name: '博士',
        score: [-1000,
          30,
          50,
          40,
          50,
          30,
          50,
          30, -30, -1000, -1000,
          50,
        ]
      }
    ],
    index1: 0,
    sexual: [{
        name: '男',
        score: [-1000,
          50,
          50,
          50,
          50,
          50,
          50,
          30,
          30, -1000, -1000,
          30,
        ]
      },
      {
        name: '女',
        score: [-1000,
          50,
          30,
          30,
          10, -30,
          50,
          50,
          50, -1000, -1000,
          50,
        ]
      }
    ],
    index2: 0,
    age: [{
        name: '18岁以下',
        score: [-1000,
          5,
          0,
          0, -50,
          15,
          20,
          30,
          50, -1000, -1000,
          20,
        ],
      },
      {
        name: '18到24岁',
        score: [-1000,
          20,
          20,
          20,
          20,
          20,
          20,
          20,
          20, -1000, -1000,
          20,
        ]
      },
      {
        name: '25到30岁',
        score: [-1000,
          20,
          20,
          20,
          20,
          20,
          20,
          20,
          20, -1000, -1000,
          20,
        ]
      }, {
        name: '30岁以上',
        score: [-1000, -30, -30, -30, -30, -30,
          50,
          0,
          0, -1000, -1000,
          50,
        ]
      },
    ],
    index3: 0,
    base: [{
      name: '零基础',
      score: [-1000,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0, -1000, -1000,
        0,

      ]
    }, {
      name: '绘画基础',
      score: [-1000,
        0,
        0,
        0,
        0,
        0,
        0,
        50,
        0, -1000, -1000,
        30,
      ]
    }, {
      name: '网络相关',
      score: [-1000,
        10,
        10,
        10,
        10,
        50,
        0,
        0,
        10, -1000, -1000,
        0,
      ]
    }, {
      name: '原型设计',
      score: [-1000,
        0,
        0,
        0,
        0,
        0,
        50,
        30,
        10, -1000, -1000,
        30,
      ]
    }],
    index4: 0,
    pro: [{
        name: '无专业',
        score: [-1000,
          30,
          0,
          0,
          0,
          0,
          30,
          50,
          50, -1000, -1000,
          30,
        ]
      },
      {
        name: '文科',
        score: [-1000,
          10,
          10,
          10,
          10,
          10,
          50,
          50,
          30, -1000, -1000,
          50,
        ]
      },
      {
        name: '理工科',
        score: [-1000,
          30,
          35,
          35,
          40,
          30,
          30,
          30,
          30,
          30, -1000, -1000,
        ]
      },
      {
        name: '计算机相关',
        score: [-1000,
          35,
          35,
          35,
          50,
          40,
          40,
          40,
          30, -1000, -1000,
          40,
        ]
      }
    ],
    index5: 0,
    logic: [{
        name: '渣渣',
        score: [-1000,
          40,
          10,
          10,
          10,
          10,
          20,
          50,
          50, -1000, -1000,
          20,
        ]
      },
      {
        name: '一般',
        score: [-1000,
          30,
          30,
          30,
          30,
          30,
          30,
          30,
          30, -1000, -1000,
          30,
        ]
      },
      {
        name: '大神',
        score: [-1000,
          40,
          40,
          40,
          50,
          40,
          30,
          0,
          0, -1000, -1000,
          30,
        ]
      }
    ],
    index6: 0,
  },
  bindPickerChange1: function(e) {
    console.log('picker1发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
      /*
      测试代码
      GG:this.data.education[e.detail.value].score[e.detail.value] */
    })
    account1 = this.data.education[e.detail.value].score
  },
  bindPickerChange2: function(e) {
    console.log('picker2发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
    })
    account2 = this.data.sexual[e.detail.value].score
  },
  bindPickerChange3: function(e) {
    console.log('picker3发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
    account3 = this.data.age[e.detail.value].score
  },
  bindPickerChange4: function(e) {
    console.log('picker4发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
    account4 = this.data.base[e.detail.value].score
  },
  bindPickerChange5: function(e) {
    console.log('picker5发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
    account5 = this.data.pro[e.detail.value].score
  },
  bindPickerChange6: function(e) {
    console.log('picker6发送选择改变，携带值为', e.detail.value)
    this.setData({
      index6: e.detail.value
    })
    account6 = this.data.logic[e.detail.value].score
  },

  check: function(e) {
    //新建数组weight,计算权重分数，同一个元素中含有两个对象，num职业序号，score权重分数
    let weight = [];
    for (var i = 0; i < 12; i++) {
      weight[i] = {
        num: i,
        score: account1[i]+account2[i]+account3[i]+account4[i]+account5[i]+account6[i]
      }
    }
    //sort方法根据数组中对象的score属性值进行排序
   weight.sort(function (a, b) {
      return b.score - a.score;
    })
    console.log(weight);
    //新建一个数组，把重新排序好的权重数组中的前三个元素的职业序号放入
   var pronum =[];
  for(var i = 0;i<3;i++){
    pronum[i]=weight[i].num;
  }
  console.log(pronum)
   //本地缓存传参
    wx.setStorage({
      key: 'pronum',
      data: pronum
    })
    //页面跳转
     wx.navigateTo({
       url: "../introduce/introduce",
     })
  },
})