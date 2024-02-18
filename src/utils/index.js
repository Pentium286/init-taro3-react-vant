import Taro from '@tarojs/taro';

export function showToast(title, icon = 'none', time = 3000, callBack) {
  Taro.showToast({
    title,
    icon,
    duration: time,
    success: callBack && callBack()
  });
}

export function gotoLogin() {
  Taro.navigateTo({
    url: '/pages/login/index'
  });
}

// 手机号隐藏
export function hideMobile(data) {
  let reg = /(\d{3})\d*(\d{4})/;
  return data ? data.replace(reg, '$1****$2') : '';
}

/**
 * 深拷贝
 * @param {String} objName
 * @returns {String}
 */
export function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 判断obj子元素是否为对象,是则递归调用
        if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]);
        } else {
          // 不是对象直接复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

// 倒计时时间格式化
export function dateFormat(time, type, currentTime) {
  if (time) {
    if (/-/.test(time)) {
      time = time.replace(/-/g, '/');
    }
    let result = "";
    let nowTime = new Date(time);
    let y = nowTime.getFullYear();
    let month = nowTime.getMonth() + 1;
    let date = nowTime.getDate();
    let m = fill_zero_prefix(month);
    let d = fill_zero_prefix(date);
    let h = fill_zero_prefix(nowTime.getHours());
    let mm = fill_zero_prefix(nowTime.getMinutes());
    let s = fill_zero_prefix(nowTime.getSeconds());
    switch (type) {
      case "current":
        // 今年及以前
        let newCurr = new Date(currentTime);
        if (y === newCurr.getFullYear()) {
          result = `${month}月${date}日 ${h}:${mm}:${s}`;
        } else {
          result = `${y}年${month}月${date}日 ${h}:${mm}:${s}`;
        }
        break;
      case "dates":
        result = `${y}年${month}月${date}日`;
        break;
      case 'crossline':
        result = `${y}-${m}-${d} ${h}:${mm}:${s}`;
        break;
      default:
        result = `${y}.${month}.${date}`;
        break;
    }
    return result;
  } else {
    return "";
  }
}

/* 位数补0 */
export function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num;
}

//乘法 
export function accMul(arg1, arg2) {
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  let m = 0;
  let s1 = String(arg1);
  let s2 = String(arg2);
  try {
    m += s1.split(".")[1].length;
  } catch (e) { }
  try {
    m += s2.split(".")[1].length;
  } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

//加法 
export function accAdd(arg1, arg2) {
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  let r1 = 0, r2 = 0, m = 0;
  try {
    r1 = String(arg1).split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = String(arg2).split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

//减法 
export function accSubtr(arg1, arg2) {
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  let r1 = 0, r2 = 0, m = 0, n = 0;
  try {
    r1 = String(arg1).split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = String(arg2).split(".")[1].length;
  } catch (e) {

    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

// 除法
export function accDiv(arg1, arg2) {
  arg1 = arg1 || 0;
  arg2 = arg2 || 0;
  let t1 = 0;
  let t2 = 0;
  let r1 = 0;
  let r2 = 0;
  try {
    t1 = String(arg1).split(".")[1].length;
  } catch (e) { }
  try {
    t2 = String(arg2).split(".")[1].length;
  } catch (e) { }

  r1 = Number(String(arg1).replace(".", ""));
  r2 = Number(String(arg2).replace(".", ""));

  return accMul((r1 / r2), Math.pow(10, t2 - t1));
}

/**
 * 获取n位随机数
 * @param {String} n
 * @returns {String}
 */
export function getRandom(n) {
  return Math.random().toString().slice(-n);
}

// 更新计时器显示
export function getMinute(value, type) {
  let secondTime = parseInt(value || 0);  // 秒
  let minuteTime = 0;   // 分
  let hourTime = 0;    // 时
  let result = 0;
  if (secondTime >= 60) {
    // 秒数大于60,将秒数转换成整数
    minuteTime = parseInt(secondTime / 60);
    secondTime = parseInt(secondTime % 60);
    if (minuteTime >= 60) {
      hourTime = parseInt(minuteTime / 60);
      minuteTime = parseInt(minuteTime % 60);
    }
  }

  if (hourTime > 0) {
    result = `${hourTime}时${minuteTime}分${secondTime}秒`;
  } else {
    result = minuteTime > 0 ? `${minuteTime}分${secondTime}秒` : `${secondTime}秒`;
  }
  return result;
}

// 判断对象是否相等
export function isObjectEqual(obj1, obj2) {
  if (obj1 == null || obj2 == null) {
    return false;
  }
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  if (obj1Keys.length !== obj2Keys.length) {
    return false;
  }

  for (let key of obj1Keys) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

// 格式化日对象
export function getNowDate() {
  var date = new Date();
  var sign2 = ":";
  var year = date.getFullYear(); // 年
  var month = date.getMonth() + 1; // 月
  var day = date.getDate(); // 日
  var hour = date.getHours(); // 时
  var minutes = date.getMinutes(); // 分
  var seconds = date.getSeconds(); //秒
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  if (hour >= 0 && hour <= 9) {
    hour = "0" + hour;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = "0" + minutes;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = "0" + seconds;
  }
  return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
}

/**
 * 解析URL
 * url:String
 * 获取scene参数
 */
export function urlIntercept(scene) {
  let urlObj = {};
  if (scene) {
    let url = urlParse("?" + unescape(scene));
    urlObj = {
      ...url
    };
  }
  return urlObj;
}

/**
 * 解析URL
 * url:String
 */
export function urlParse(URL) {
  console.log(URL, "----urlParse");
  let url = URL; // 得到url问号后面拼接的参数  ?id=12345&a=b
  let obj = {}; // 创建一个Object
  if (isEmpty(URL)) {
    url = location.href;
  }
  let reg = /[?&][^?&]+=[^?&]+/g; // 正则匹配 ?&开始 =拼接  非?&结束  的参数
  let arr = url.match(reg); // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
  // arr数组形式 ['?id=12345','&a=b']
  if (arr) {
    arr.forEach(item => {
      /**
       * tempArr数组    ['id','12345']和['a','b']
       * 第一个是key，第二个是value
       * */
      let tempArr = item.substring(1).split("=");
      let key = decodeURIComponent(tempArr[0]);
      let val = decodeURIComponent(tempArr[1]);
      obj[key] = val;
    });
  }
  return obj;
}


export function isEmpty(o) {
  if (o == null || o == undefined)
    return true;
  switch (typeof o) {
    case "boolean":
      return false;
    case "object":
      for (let t in o)
        return false;
      return true;
    // case "array":
    case "string":
      return o.length <= 0;
    case "number":
      return o.toString().length <= 0;
    case "function":
      return false;
  }
  return true;
}

// 判断网络状态
export function getNetworkType() {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType;
        //   console.log("networkType: ", networkType);
        if (networkType === "none") {
          showToast("无网络");
          return resolve(false);
        } else {
          return resolve(true);
        }
      }
    });
  });
}