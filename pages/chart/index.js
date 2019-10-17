// index.js
var _wxcharts = require('../../utils/wxcharts.js');
var app = getApp();
var pieChartCon = null;
var pieChartPro = null;
Page({
  data: {
    picker: ["支出", "收入"],
    TabCur: 0,
    scrollLeft: 0,
    change: 0,
    currtab: 0,
    swipertab: [{ name: '支出', index: 0 }, { name: '收入', index: 1 }],

    tempAccountDataA: 0,
    tempAccountDataB: 0,
    tempAccountDataC: 0,
    tempAccountDataD: 0,
    tempAccountDataE: 0,
    tempAccountData1: 0,
    tempAccountData2: 0,
    tempAccountData3: 0,
    tempAccountData4: 0,
    tempAccountData5: 0
  },
  onLoad: function (e) {
    var windowWidth = 320;
    console.log('onLoad')

    // 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.caculateCostATotal(tempAccountData)
    this.caculateCostBTotal(tempAccountData)
    this.caculateCostCTotal(tempAccountData)
    this.caculateCostDTotal(tempAccountData)
    this.caculateCostETotal(tempAccountData)
    this.caculateIncome1Total(tempAccountData)
    this.caculateIncome2Total(tempAccountData)
    this.caculateIncome3Total(tempAccountData)
    this.caculateIncome4Total(tempAccountData)
    this.caculateIncome5Total(tempAccountData)
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    this.getDeviceInfo()
    this.graphShow()
  },

  caculateCostATotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if(data[x].item == 0 && data[x].type=="true")
      {
        tempTotal += parseFloat(data[x].cost);
      }
    }
    this.setData({
      tempAccountDataA: parseFloat(tempTotal)
    })
    // console.log("A:" + parseFloat(tempTotal))
  },
  caculateCostBTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 1 && data[x].type == "true") {
        tempTotal += parseFloat(data[x].cost);
      }
    }
    this.setData({
      tempAccountDataB: parseFloat(tempTotal)
    })
    // console.log("B:" + parseInt(tempTotal))

  },
  caculateCostCTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 2 && data[x].type == "true") {
        tempTotal += parseFloat(data[x].cost);
      }
    }
    this.setData({
      tempAccountDataC: parseFloat(tempTotal)
    })
    // console.log("C:" + parseInt(tempTotal))

  },
  caculateCostDTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 3 && data[x].type == "true") {
        tempTotal += parseFloat(data[x].cost);
      }
    }
    this.setData({
      tempAccountDataD: parseFloat(tempTotal)
    })
    // console.log("D:" + parseInt(tempTotal))

  },
  caculateCostETotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 4 && data[x].type == "true") {
        tempTotal += parseFloat(data[x].cost);
      }
    }
    this.setData({
      tempAccountDataE: parseFloat(tempTotal)
    })
    // console.log("E:"+parseInt(tempTotal))
  },

  //收入计算方法
  caculateIncome1Total: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 0 && data[x].type == "false") {
        tempTotal += parseFloat(data[x].income);
      }
    }
    this.setData({
      tempAccountData1: parseFloat(tempTotal)
    })
    // console.log("A:" + parseFloat(tempTotal))
  },
  caculateIncome2Total: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 1 && data[x].type == "false") {
        tempTotal += parseFloat(data[x].income);
      }
    }
    this.setData({
      tempAccountData2: parseFloat(tempTotal)
    })
    // console.log("B:" + parseInt(tempTotal))

  },
  caculateIncome3Total: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 2 && data[x].type == "false") {
        tempTotal += parseFloat(data[x].income);
      }
    }
    this.setData({
      tempAccountData3: parseFloat(tempTotal)
    })
    // console.log("C:" + parseInt(tempTotal))

  },
  caculateIncome4Total: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 3 && data[x].type == "false") {
        tempTotal += parseFloat(data[x].income);
      }
    }
    this.setData({
      tempAccountData4: parseFloat(tempTotal)
    })
    // console.log("D:" + parseInt(tempTotal))

  },
  caculateIncome5Total: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].item == 4 && data[x].type == "false") {
        tempTotal += parseFloat(data[x].income);
      }
    }
    this.setData({
      tempAccountData5: parseFloat(tempTotal)
    })
    // console.log("E:" + parseInt(tempTotal))
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  
  PickerChange(e) {
    // console.log(e);
    this.setData({
      index: e.detail.value
    })
    // console.log(this.data.index)
  },
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },

  /**
   * @Explain：选项卡切换
   */
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.graphShow()
  },

  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
  graphShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.pie1Show()
        break
      case 1:
        that.pie2Show()
        break
    }
  },

  pie1Show: function(){
    //支出饼图
    let pie = ({
      animation: true,
      canvasId: 'pieCanvasCon',
      type: 'pie',
      series: [{
        name: '餐饮',
        data: this.data.tempAccountDataA,
      }, {
        name: '购物',
        data: this.data.tempAccountDataB,
      }, {
        name: '日用',
        data: this.data.tempAccountDataC,
      }, {
        name: '交通',
        data: this.data.tempAccountDataD,
      }, {
        name: '蔬菜',
        data: this.data.tempAccountDataE,
      }],
      width: 320,
      height: 300,
      dataLabel: true,
    });
    new _wxcharts(pie)
  },
  pie2Show:function(){
    //收入饼图
    let pie = ({
      animation: true,
      canvasId: 'pieCanvasPro',
      type: 'pie',
      series: [{
        name: '工资',
        data: this.data.tempAccountData1,
      }, {
        name: '兼职',
        data: this.data.tempAccountData2,
      }, {
        name: '理财',
        data: this.data.tempAccountData3,
      }, {
        name: '礼金',
        data: this.data.tempAccountData4,
      }, {
        name: '其他',
        data: this.data.tempAccountData5,
      }],
      width: 320,
      height: 300,
      dataLabel: true,
    });
    new _wxcharts(pie)
  }

});