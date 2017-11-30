//app.js
var qcloud = require('./vendor/wafer2-client-sdk/index')
var config = require('./config')

App({
  onLaunch: function () {
    console.log('onLaunch');
    qcloud.setLoginUrl(config.service.loginUrl);
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})