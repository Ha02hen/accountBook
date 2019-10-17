// index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Id: null,
    pickerCon : app.globalData.pickerCon,
    pickerPro : app.globalData.pickerPro,
    modalName : null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Id: options.id,
      accountData:[],
      accountType: "",
      imgList: []
    })

    console.log('onLoad')

    // 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.setData({
      accountData: tempAccountData[this.data.Id],
      imgList: tempAccountData[this.data.Id].imgList
    });
    // console.log(this.data.accountData.type)
    if(this.data.accountData.type == "true"){
      this.setData({
        accountType: this.data.pickerCon[this.data.accountData.item]
      })
    }else{
      this.setData({
        accountType: this.data.pickerPro[this.data.accountData.item]
      })
    }
    // console.log(this.data.accountData)
    // console.log(this.data.accountType)
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
  //删除数据
  deleteRow: function (e) {
    var index = e.target.dataset.indexKey;
    var tempAccountData = wx.getStorageSync("accountData") || [];
    tempAccountData.splice(index, 1);
    wx.setStorageSync("accountData", tempAccountData);
    this.setData({
      accountData: tempAccountData,
    });
    wx.navigateBack({
      url:'../index/index'
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    // console.log(this.data.modelName)
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
    // console.log(e.currentTarget.dataset.value)
    if (e.currentTarget.dataset.value == "1"){
      this.deleteRow(e)
    }
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  // edit: function(e) {
  //   wx.navigateTo({
  //     url: '../edit/edit?Id={{Id}}'
  //   })
  // },
  btnClick: function()
  {
    // console.log("Id",this.data.Id)
    wx.navigateTo({
      url: "../edit/edit?id="+this.data.Id,
    })
  }
})