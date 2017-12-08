var util = require('../../utils/util.js')

var sel_type = "null";


Page({
  data: {
    lateInMin: 0,
    directDis: 0,
    pageItems: []

  },
  onLoad: function (meeting_type) {
  
    var that = this;
    sel_type = meeting_type.type;
    console.log(sel_type);

    wx.getStorage({
      key: "resItems",
      success: function (res) {
        console.log(res.data);
        that.setData({
          pageItems: res.data
        });
      }
    });

    wx.getStorage({
      key: 'luckMoney',
      success: function (res) {
        console.log(res.data);
        that.setData({
          totalFine: '¥'+res.data
        });
      }
    });
  },

  tryAgain :function(){
    wx.redirectTo({
      url: '../index/index' ,
    });
  },

  checkrule: function () {
    wx.navigateTo({
      url: '../rule/rule',
    });
  }

})

