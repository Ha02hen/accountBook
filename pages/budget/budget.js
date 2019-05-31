// pages/budget/budget.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  },
  formSubmit: function (e) {
    console.log('form提交被触发', e.detail.value.budget)

    console.log("data.location:" + this.data.address)
    this.setData({
      buttonloading: true
    })
    var budget = e.detail.value.budget

    if (budget == 0) {
      wx.showToast({
        title: '预算不能为空',
        icon: 'none'
      })
    }

    this.setData({
      budget: budget
    });
    console.log('form提交被触发', budget)
    console.log(this.data.budget)
    wx.navigateBack({
      
      url: '../about/about?budget={{budget}}'
    })
  },
  //表单重置
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    // this.setData({
    //   hasLocation: false
    // })

    this.setData({
      budget: 0
    })
  }
})