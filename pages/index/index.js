//index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: true,
    switchList: app.globalData.switchList,
    // budget: app.globalData.budget,
    // balance: app.globalData.balance,
    accountCostTotal: 0,
    accountIncomeTotal: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')

    // 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    console.log(tempAccountData)
    this.caculateCostTotal(tempAccountData);
    this.caculateIncomeTotal(tempAccountData);
    // this.caculateBalance(this.data.balance);
    this.setData({
      accountData: tempAccountData
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow')

    // 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    console.log(tempAccountData)
    this.caculateCostTotal(tempAccountData);
    this.caculateIncomeTotal(tempAccountData);
    this.caculateBalance(this.data.balance);
    // this.setTimeSort(tempAccountData)
    this.setData({
      accountData: tempAccountData
    });
    console.log(this.data.accountData)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('onHide')
    console.log(this.data.accountCostTotal)
    console.log(this.data.accountIncomeTotal)
    app.globalData.output = this.data.accountCostTotal,
    app.globalData.input = this.data.accountIncomeTotal
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  btnClick: function () {
    wx.navigateTo({
      url: '../add/index'
    })
  },
  //删除行
  deleteRow: function (e) {
    var index = e.target.dataset.indexKey;
    var tempAccountData = wx.getStorageSync("accountData") || [];
    tempAccountData.splice(index, 1);
    wx.setStorageSync("accountData", tempAccountData);
    this.caculateCostTotal(tempAccountData);
    this.caculateIncomeTotal(tempAccountData);
    this.caculateBalance(this.data.balance);
    this.setData({
      accountData: tempAccountData,
    });
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 计算支出总额
  caculateCostTotal: function (data) {
    var tempTotal = 0;
    for (var x in data) {
      if (data[x].type == "true") { tempTotal += parseFloat(data[x].cost);}
    }
    this.setData({
      accountCostTotal: tempTotal
    });
    // if (parseFloat(this.data.accountCostTotal) >= 0) { app.globalData.output = this.data.accountCostTotal }
  },
  //计算收入总额
  caculateIncomeTotal: function (data) {
    var tempTotal = 0;
    console.log(data);
    for (var x in data) {
      if (data[x].type == "false") { tempTotal += parseFloat(data[x].income);}
    }
    console.log(tempTotal)
    this.setData({
      accountIncomeTotal: parseFloat(tempTotal)
    })
    // if (parseFloat(this.data.accountIncomeTotal) >= 0) { app.globalData.input = this.data.accountIncomeTotal }
  },
  //按照时间进行排序
  setTimeSort: function (tempAccountData) {
    tempAccountData.sort(function (x, y) {
      console.log("set-"+x.date)
      return x.date>y.date?0:1;
    });
    console.log("time:"+tempAccountData)
  },
  //跳转详情页
  jumpItem: function(e)
  {
    console.log("jumpItem:"+e);
  },
  caculateBalance: function(x)
  {
    if (parseFloat(this.data.accountIncomeTotal)>=0) { x = x + parseFloat(this.data.accountIncomeTotal)}
    if (parseFloat(this.data.accountCostTotal) >= 0) { x = x - parseFloat(this.data.accountCostTotal)}
    console.log(x)
    app.globalData.balance = x
    console.log(app.globalData)
  }
})
