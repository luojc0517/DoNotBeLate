var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var params = require('params');
var app = getApp();

Page({
  data: {
    array: ['南山区', '龙岗区', '福田区', '宝安区', '龙华区'],
    startLocIndex: 0,
    endLocIndex: 0,
    date: '2016-09-01',
    startTime: '10:01',
    endTime: '12:01'
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
    wx.setStorage({
      key: "lateInMin",
      data: minDiff
    });
    wx.navigateTo({
      url: '../result/result',
    });
  }
})

