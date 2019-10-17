var util = require('../../utils/util.js')

var app=getApp()
Page({
  data: {
    switch: ["支出", "收入"],
    TabCur: 0,
    scrollLeft: 0,

    pickerCon: app.globalData.pickerCon,
    pickerPro: app.globalData.pickerPro,
    accountData: app.globalData.accountData,
    time: '12:01',
    date: '2018-12-25',
    imgList: [],
    modalName: null,
    textareaAValue: '',
    inidata:1,

    buttonloading: false,
    address: ''
    // selectA:['餐饮','购物','日用','交通','蔬菜']
},

  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var time = util.formatTime(new Date())
    this.setData({
      date : time[0],
      time : time[1],
    })

  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
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
      sourceType: ['album','camera'], //从相册选择
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
    if (e.detail.value == true)
    {
      wx.chooseLocation({
        success: function(res) {
          // console.log(res)
          that.setData({
            address:res.address
          })
        },
      })
    }
  },
  
  //表单提交，把数据放入本地缓存
  formSubmit: function (e) {
    // console.log('form提交被触发', e.detail.value)
    
    
    this.setData({
      buttonloading:true
    })
    var cost = e.detail.value.cost
    var item = e.detail.value.item
    var date = e.detail.value.date
    var remarks = e.detail.value.remarks
    var time = e.detail.value.time
    var income = e.detail.value.income
    var desc = e.detail.value.desc
    var type = e.detail.value.type
    var switchchange = e.detail.value.switch1Change
    var location = this.data.address
    var imgList = this.data.imgList

    

    if(cost > 0)
    {
      type = "true"
    }else if(income > 0){
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
    if (type=="true") {
      if (cost.toString().length <= 0)
      {
        wx.showToast({
          title: '支出金额不能为零',
          icon: 'none'
        })
        this.setData({
          buttonloading: false
        });
        return false;
      }
      
    }else if(type=="false"){
      if (income.toString().length <= 0)
      {
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
    if(date == "")
    {
      wx.showToast({
        title: '请设置日期',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }
    if(time == "")
    {
      wx.showToast({
        title: '请设置时间',
        icon: 'none'
      })
      this.setData({
        buttonloading: false
      });
      return false;
    }

    //新增记录
    var tempAccountData = wx.getStorageSync("accountData") || [];
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
      url:'../index/index'
    })
  },
  switchChange: function (e) {
    // console.log('switch 发生 change 事件，携带值为', e.detail.value)
  },
  //表单重置
  formReset: function (e) {
    // console.log('form发生了reset事件，携带数据为：', e.detail.value)
    // this.setData({
    //   hasLocation: false
    // })
    
    this.setData({
      cost : -1,
      item : '',
      remarks : '',
      income : -1,
      desc : '',
      type : '',
      location : '',
    })
  }
})