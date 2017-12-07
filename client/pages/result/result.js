Page({
  data: {
    lateInMin: 0,
    directDis: 0,
    totalFine: "¥12.78",
    pageItems: [{
      title: "出发地点",
      text: "高新园3道XXX大厦"
    }, {
      title: "活动地点",
      text: "万象天地"
    }, {
      title: "活动时间",
      text: "2017-12-05  12:20"
    }, {
      title: "到达时间",
      text: "2017-12-05  13:04"
    }, {
      title: "距离间隔",
      text: "3.2 km"
    }, {
      title: "时间间隔",
      text: "24 min"
    }]

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
      success: function (res) {
        console.log(res.data);
        that.setData({
          directDis: res.data
        });
      },
    })
  }
})
