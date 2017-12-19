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
  disDiff /= 1000;
  var factor = 0;
  var allow = 0;
  var fine = 0;

  //计算基于活动类型的迟到系数
  if (type_factor == "food") {//聚餐
    factor = 15 / 35;
  } else if (type_factor == "sports") {//运动
    factor = 30 / 35;
  } else if (type_factor == "relax") {//休闲
    factor = 40 / 35;
  } else if (type_factor == "oblige") {//必到
    factor = 0 / 35;
  }

  //根据活动类型规定允许迟到时间
  allow = disDiff * factor;

  console.log("距离|" + disDiff + ",迟到时间|" + timeDiff);
  console.log("迟到系数|" + factor + ",允许迟到时间|" + allow);
  console.log("迟到时间|" + timeDiff + ",允许迟到时间|" + allow);

  if (timeDiff > allow) {
    //根据具体超出时间长短发红包
    fine = (50 / 50 * (timeDiff - allow)).toFixed(0);
    fine = fine > 50 ? 50 : fine;
    console.log("迟到时间|" + timeDiff + ",罚款|" + fine);
  } else {
    //迟到时间在允许时间以内，此时不需要发红包
    fine = 0;
  }

  //TODO if user is my IVY, her fine will be zero.
  return fine;
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
