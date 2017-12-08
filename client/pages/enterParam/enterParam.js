var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var params = require('params');
var app = getApp();
var sel_type = "null";

Page({
  data: {
    startLoc: {
      name: "选择地点",
      latitude: 0,
      longitude: 0
    },
    endLoc: {
      name: "选择地点",
      latitude: 0,
      longitude: 0
    },
    startDate: '2017-12-01',
    endDate: '2017-12-01',
    startTime: '10:01',
    endTime: '12:01'
  },

  onLoad: function (meeting_type) {
    sel_type = meeting_type.type;
    console.log(sel_type);

  },

  chooseStart: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          startLoc: res
        });
      },
    });
  },
  chooseEnd: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          endLoc: res
        });
      },
    });
  },
  bindStartLocIndexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startLocIndex: e.detail.value
    });
  },
  bindEndLocIndexChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endLocIndex: e.detail.value
    });
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value
    });
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value
    });
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    });
  },
  bindEndTimeChange: function (e) {
    this.setData({
      endTime: e.detail.value
    });
  },
  doCalc: function () {
    console.log("start:" + this.data.startTime);
    console.log("end:" + this.data.endTime);


    var startVec = (/^(\d+)\:(\d+)$/g).exec(this.data.startTime);
    var endVec = (/^(\d+)\:(\d+)$/g).exec(this.data.endTime);
    var startMin = parseInt(startVec[1]) * 60 + parseInt(startVec[2]);
    var endMin = parseInt(endVec[1]) * 60 + parseInt(endVec[2]);
    console.log("start:" + startMin);
    console.log("end:" + endMin);
    var minDiff = endMin - startMin; //时间差
    minDiff = minDiff > 0 ? minDiff : 0;
    console.log("minDiff:" + minDiff);

    var disDiff = util.calcDistance(
      this.data.startLoc.latitude,
      this.data.startLoc.longitude,
      this.data.endLoc.latitude,
      this.data.endLoc.longitude
    );


    var luck_money = util.calLuckyMoney(
      sel_type,
      minDiff,
      disDiff
    );
    console.log("money is" + luck_money);



    console.log("distance diff in /m:" + disDiff);
    disDiff = (disDiff / 1000).toFixed(1);
    console.log("distance diff in /km:" + disDiff);

    util.setCache("luckMoney", luck_money);

    var resItems = [{
      title: "出发地点",
      text: this.data.startLoc.name
    }, {
      title: "活动地点",
      text: this.data.endLoc.name
    }, {
      title: "活动时间",
      text: this.data.startDate + "  " + this.data.startTime
    }, {
      title: "到达时间",
      text: this.data.endDate + "  " + this.data.endTime
    }, {
      title: "距离间隔",
      text: disDiff + " km"
    }, {
      title: "时间间隔",
      text: minDiff + " min"
    }];
    util.setCache("resItems", resItems);

    if (this.data.startLoc.name == "选择地点" || this.data.startLoc.name == "") {
      util.showSuccess("请选择出发地点");
    } else if (this.data.endLoc.name == "选择地点" || this.data.endLoc.name == "") {
      util.showSuccess("请选择活动地点");
    } else {
      wx.navigateTo({
        url: '../result/result?type=' + sel_type,
      });
    }
  }
})

