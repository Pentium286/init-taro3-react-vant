import Taro from '@tarojs/taro';
export default {
  // 返回上一页
  goBackPage() {
    let pages = Taro.getCurrentPages(); // 当前页面
    let beforePage = pages[pages.length - 2]; // 前一个页面
    Taro.navigateBack({
      delta: 1,
    });
  },
  // 深拷贝
  deepClone(obj) {
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
  },
  // 数字超过3位逗号分隔
  formatNumComma(num, type) {
    if (num) {
      let num1 = num.toFixed(2);
      let arr = num1.split('.');
      return `${parseInt(arr[0]).toLocaleString()}${type == 'price' ? `.${arr[1]}` : ''}`;
    } else {
      return 0;
    }
  },
  // 数字超过4位数展示1k
  formatNumConvert(num) {
    if (num >= 1000) {
      num = Math.floor(num / 100) / 10 + 'k';
    }
    return num;
  },
  // 乘法
  accMul(arg1, arg2) {
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
  },
  // 加法
  accAdd(arg1, arg2) {
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
  },
  // 减法
  accSubtr(arg1, arg2) {
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
  },
  // 除法
  accDiv(arg1, arg2) {
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
  },
  evaluation(map, mapVal) {
    for (let key in map) {
      map[key] = mapVal[key] ? mapVal[key] : '';
    }
    return map;
  },
  dateFormat(fmt, value) {
    if (!fmt) {
      return value;
    }
    let date = new Date(value);
    let ret;
    const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "M+": (date.getMonth() + 1).toString(),     // 月
      "D+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "m+": date.getMinutes().toString(),         // 分
      "s+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
      }
    }
    return fmt;
  },
  // 防抖
  debounce(func, wait) {
    let timeout;
    return function () {
      let context = this;
      let args = arguments;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  },
  getQueryString(name, url) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let newUrl = "";
    if (url) {
      newUrl = url.split("?")[1];
    } else {
      newUrl = window.location.search.substr(1);
    }
    var r = newUrl.match(reg);
    if (r != null) return unescape(r[2]); return null;
  }
};