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
  if (disDiff <= 5) {
    tolance = 0;
  } else if (5 < disDiff <= 10) {
    tolance = 5;
  } else if (10 < disDiff <= 15) {
    tolance = 10;
  } else if (15 < disDiff <= 20) {
    tolance = 15;
  } else {
    tolance = 20;
  }
  if (type_factor == "food") {
    factor = 4;
  }
  else if (type_factor == "sports") {
    factor = 3;
  }
  else if (type_factor == "relax") {
    factor = 2;
  }
  else if (type_factor == "oblige") {
    factor = 5;
  }

  var money = factor * (timeDiff - tolance) / 5;
  // money = money.toFixed(2);
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
