const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 缓存数据
 */
const setCache = (sKey, value) => {
  wx.setStorage({
    key: sKey,
    data: value
  });
}

//计算红包金额
const calLuckyMoney = (type_factor, timeDiff, disDiff) => {
  var tolance = 0;
  var factor = 0;

  var dis_factor=disDiff;

  if (disDiff>35) dis_factor=35;
  tolance = dis_factor/5;
  tolance = tolance.toFixed(1);
  tolance = tolance*5;

  if (type_factor == "food") {
    factor = 4;
    if(tolance>15) tolance =15;
  } else if (type_factor == "sports") {
    factor = 3;
    if (tolance > 30) tolance = 30;
  } else if (type_factor == "relax") {
    factor = 2;
    if (tolance > 40) tolance = 40;
  } else if (type_factor == "oblige") {
    factor = 5;
    tolance = 0;
  }

  var money = factor * (timeDiff - tolance) / 5;
   money = money.toFixed(2);
  if (money > 50) money = 50;
  if (money < 0) money = 0;

  //TODO if use is my IVY, her money will be zero.
  return money;
}


// 根据经纬度计算距离
const calcDistance = (lat1, lng1, lat2, lng2) => {
  var dis = 0;
  var radLat1 = lat1 * Math.PI / 180;
  var radLat2 = lat2 * Math.PI / 180;
  var deltaLat = radLat1 - radLat2;
  var deltaLng = (lng1 - lng2) * Math.PI / 180;
  var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
  return dis * 6378137;
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, calcDistance, calLuckyMoney, setCache }
