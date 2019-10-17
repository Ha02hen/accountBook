// edit.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch: ["支出", "收入"],
    TabCur: 0,
    scrollLeft: 0,

    pickerCon: app.globalData.pickerCon,
    pickerPro: app.globalData.pickerPro,
    accountData: app.globalData.accountData,

    time: '',
    date: '',
    modalName: null,
    textareaAValue: '',

    cost: '',
    income: '',
    item: '',
    desc: '',
    switchchage: '',
    buttonloading: false,
    address: '',
    Id: null,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Id: options.id,
      accountData: [],
      accountType: "",
      itemType:"",
      imgList: []
    })

    console.log('onLoad')
    // console.log("Id",this.data.Id)

    // 获取记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
    this.setData({
      accountData: tempAccountData[this.data.Id],
      imgList: tempAccountData[this.data.Id].imgList,
      address: tempAccountData[this.data.Id].location
    });
    if (this.data.accountData.type == "true") {
      this.setData({
        accountType: this.data.pickerCon[this.data.accountData.item],
        itemType:this.data.accountData.type,
        date:this.data.accountData.date,
        time:this.data.accountData.time
      })
    } else {
      this.setData({
        accountType: this.data.pickerPro[this.data.accountData.item],
        itemType: this.data.accountData.type,
        date: this.data.accountData.date,
        time: this.data.accountData.time
      })
    }
    // console.log(this.data.accountData)
    // console.log(this.data.itemType)
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
    // console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
    // console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
    // console.log('picker发送选择改变，携带值为', e.detail.value)
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
          // console.log(this.data.imgList)
        } else {
          // console.log(res.tempFilePaths)
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      content: '确定要删除这段记录吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
        // console.log(this.data.imgList)
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
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
  ChooseCheckbox(e) {
    let items = this.data.checkbox;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      if (items[i].value == values) {
        items[i].checked = !items[i].checked;
        break
      }
    }
    this.setData({
      checkbox: items
    })
    // console.log(checkbox)
  },
  switch1Change: function (e) {
    // console.log('switch1 发生 change 事件，携带值为', e.detail.value)
    var that = this
    if (e.detail.value == true) {
      wx.chooseLocation({
        success: function (res) {
          // console.log(res)
          that.setData({
            address: res.address
          })
        },
      })
    }
  },

  //表单提交，把数据放入本地缓存
  formSubmit: function (e) {
    // console.log('form提交被触发', e.detail.value)

    this.setData({
      buttonloading: true
    })
    // console.log("cost:" + e.detail.value.cost + ",item:" + e.detail.value.item + ",date:" + e.detail.value.date + ",remarks:" + e.detail.value.remarks + ",time:" + e.detail.value.time + ",income:" + e.detail.income + ",desc:" + e.detail.value.desc + ",type:" + e.detail.value.type + ",switchchange:" + e.detail.value.switch1Chang + ",location:" + this.data.address)
    var location = this.data.address
    var imgList = this.data.imgList
    var Id = this.data.Id
    var tempAccountData = wx.getStorageSync("accountData") || [];
    var cost = tempAccountData[Id].cost
    if (e.detail.value.cost != ""){cost = e.detail.value.cost}
    var item = tempAccountData[Id].item
    if (e.detail.value.item != null) { item = e.detail.value.item}
    var date = tempAccountData[Id].date
    if (e.detail.value.date != '') { date = e.detail.value.date}
    var remarks = tempAccountData[Id].remarks
    // if (e.detail.value.remarks != '') { remarks = e.detail.value.remarks}
    var time = tempAccountData[Id].time
    if (e.detail.value.time != '') { time = e.detail.value.time}
    var income = tempAccountData[Id].income
    if (e.detail.value.income != "") { income = e.detail.value.income}
    var desc = tempAccountData[Id].desc
    if (e.detail.value.desc != '') { desc = e.detail.value.desc}
    var type = tempAccountData[Id].type
    // if (e.detail.value.type != '') { type = e.detail.value.type}
    var switchchange = tempAccountData[Id].switch1Change
    // if (e.detail.value.switch1Change != undefined) { switchchange = e.detail.value.switch1Change}
    

    if (cost > 0) {
      type = "true"
    } else if (income > 0) {
      type = "false"
    }
    // console.log("data.type:" + type)
    // console.log("cost-type",typeof(cost),"income-type",typeof(income))

    if (item == null || item < 0) {
      wx.showToast({
        title: '请选择类别',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }
    if (desc.toString().length <= 0) {
      wx.showToast({
        title: '描述不能为空',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }
    if (type == "true") {
      if (cost.toString().length <= 0) {
        wx.showToast({
          title: '支出金额不能为零',
          icon: 'none'
        })
        this.setData({
          buttonloading: false
        });
        return false;
      }

    } else if (type == "false") {
      if (income.toString().length <= 0) {
        wx.showToast({
          title: '收入金额不能为零',
          icon: 'none'
        })

        this.setData({
          buttonloading: false
        });
        return false;
      }
    }
    if (type == "") {
      wx.showToast({
        title: '请设置金额',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }
    if (date == "") {
      wx.showToast({
        title: '请设置日期',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }
    if (time == "") {
      wx.showToast({
        title: '请设置时间',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }

    // console.log("cost:" + cost + ",item:" + item + ",date:" + date + ",remarks:" + remarks + ",time:" + time + ",income:" + income + ",desc:" + desc + ",type:" + desc + ",switchchange:" + switchchange+",location:" + location)

    // console.log(location)

    //新增记录
    
    tempAccountData.splice(Id, 1);
    tempAccountData.unshift({ desc: desc, type: type, item: item, date: date, remarks: remarks, time: time, income: income, cost: cost, location: location, imgList: imgList });
    // console.log(tempAccountData)
    wx.setStorageSync("accountData", tempAccountData);
    // console.log(tempAccountData)
    this.setData({
      accountData: tempAccountData,
      buttonloading: false
    });
    // console.log('form提交被触发', tempAccountData)
    wx.navigateBack({
      delta: 2
    })
  },
  switchChange: function (e) {
    // console.log('switch 发生 change 事件，携带值为', e.detail.value)
  }
})