export default {
  dealData() {

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