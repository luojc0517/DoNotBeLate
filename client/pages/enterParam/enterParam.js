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
    endTime: '12:01',
    cardItems: [
      {
        title: "到达",
        locTitle: "活动地点",
        locName: "选择地点",
        locFunc: "chooseEnd",
        timeTitle: "活动时间",
        date: "2017-12-01",
        dateFunc: "bindEndDateChange",
        time: "09:00",
        timeFunc: "bindEndTimeChange"
      },
      {
        title: "出发",
        locTitle: "出发地点",
        locName: "选择地点",
        locFunc: "chooseStart",
        timeTitle: "实到时间",
        date: "2017-12-01",
        dateFunc: "bindStartDateChange",
        time: "09:00",
        timeFunc: "bindStartTimeChange"
      }
    ]
  },

  onLoad: function (meeting_type) {
    sel_type = meeting_type.type;
    console.log(sel_type);

  },

  chooseStart: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("chooseStart:" + res.name);
        that.data.cardItems[1].locName = res.name;
        that.setData({
          startLoc: res,
          cardItems: that.data.cardItems
        });
      },
    });
  },
  chooseEnd: function () {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log("chooseEnd:" + res.name);
        that.data.cardItems[0].locName = res.name;
        that.setData({
          endLoc: res,
          cardItems: that.data.cardItems
        });
      },
    });
  },
  bindStartDateChange: function (e) {
    var that = this;
    that.data.cardItems[1].date = e.detail.value;
    this.setData({
      startDate: e.detail.value,
      cardItems: that.data.cardItems
    });
  },
  bindEndDateChange: function (e) {
    var that = this;
    that.data.cardItems[0].date = e.detail.value;
    this.setData({
      endDate: e.detail.value,
      cardItems: that.data.cardItems
    });
  },
  bindStartTimeChange: function (e) {
    var that = this;
    that.data.cardItems[1].time = e.detail.value;
    this.setData({
      startTime: e.detail.value,
      cardItems: that.data.cardItems
    });
  },
  bindEndTimeChange: function (e) {
    var that = this;
    that.data.cardItems[0].time = e.detail.value;
    this.setData({
      endTime: e.detail.value,
      cardItems: that.data.cardItems
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
    console.log("check loc choose");
    if (this.data.startLoc.name == "选择地点" || this.data.startLoc.name == "") {
      util.showSuccess("请选择出发地点");
    } else if (this.data.endLoc.name == "选择地点" || this.data.endLoc.name == "") {
      util.showSuccess("请选择活动地点");
    } else {
      console.log("go to result page");
      wx.navigateTo({
        url: '../result/result',
      });
    }
  }
})

