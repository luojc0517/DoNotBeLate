var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var params = require('params');
var app = getApp();

Page({
  data: {
    startLoc: {
      name: "请选择开始位置",
      address: "深圳市南山区",
      latitude: 0,
      longitude: 0
    },
    endLoc: {
      name: "请选择开始位置",
      address: "深圳市南山区",
      latitude: 0,
      longitude: 0
    },
    date: '2016-09-01',
    startTime: '10:01',
    endTime: '12:01'
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
    var minDiff = endMin - startMin;
    minDiff = minDiff > 0 ? minDiff : 0;
    console.log("minDiff:" + minDiff);

    var disDiff = util.calcDistance(
      this.data.startLoc.latitude,
      this.data.startLoc.longitude,
      this.data.endLoc.latitude,
      this.data.endLoc.longitude
    );

    console.log("distance diff:" + disDiff);

    wx.setStorage({
      key: "directDis",
      data: disDiff
    });

    wx.setStorage({
      key: "lateInMin",
      data: minDiff
    });
    wx.navigateTo({
      url: '../result/result',
    });
  }
})

