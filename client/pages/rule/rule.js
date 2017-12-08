// pages/rule/rule.js


var ruletext = "1. 群聚分吃饭-运动-休闲-必到4种；上限为50RMB。"
var initData = '1. 群聚分吃饭-运动-休闲-必到4种；\n2. 按照距离极限（35km），不同的距离差下设置不同的迟到弹性时间：\n5km - 0min\n10km - 5min\n15km - 10min\n20km - 15min\n20km + - 20min\n3. 按照极限距（35km），每种群聚类型下的极限弹性时间为：\n必到 - 0min\n吃饭 - 15min\n运动 - 30min\n休闲 - 40min\n4. 计算方式：距离群聚地点位置：X km；可允许迟到时间Y min；实际到达所用时间：b min群聚内容系数：a （必到 - 5 吃饭 - 4 运动 - 3 休闲 - 2）；则红包金额 Z= a(b - Y) / 5；上限为50RMB。'


Page({

  /**
   * 页面的初始数据
   */
  data: {

    textrule: initData
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  
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
  
  }
})