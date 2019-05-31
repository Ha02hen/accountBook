// about.js

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    input: 0,
    output: 0,
    budget: 0,
    balance: 0, 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      input:app.globalData.input,
      output: app.globalData.output,
      budget:app.globalData.budget,
      balance: app.globalData.balance
    })
    console.log("budget",this.data.budget)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    // this.setData({
    //   input: app.globalData.input,
    //   output: app.globalData.output,
    //   budget: options.budget,
    //   balance: app.globalData.balance
    // })
    // console.log("budget", this.data.budget)
    // app.globalData.budget = this.data.budget
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
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
    
  }
})