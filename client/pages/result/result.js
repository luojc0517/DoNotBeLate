Page({
  data: {
    lateInMin:0,
    directDis:0
  },
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'lateInMin',
      success: function (res) {
        console.log(res.data);
        that.setData({
          lateInMin: res.data
        });
      }
    });

    wx.getStorage({
      key: 'directDis',
      success: function(res) {
        console.log(res.data);
        that.setData({
          directDis: res.data
        });
      },
    })
  }
})
