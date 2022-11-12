import getRequestUrl from "./getRequestUrl.js";
import Taro from '@tarojs/taro';

const requestApi = {
  wxRequest(url, methods, params) {
    let cookie = Taro.getStorageSync('cookie');//取出Cookie
    let header = { 'Content-Type': 'application/x-www-form-urlencoded' };
    if (cookie) {
      header.Cookie = cookie;
    }
    let baseUrl = getRequestUrl();
    console.log('接口的参数', params, baseUrl + url);
    return new Promise((resolve, reject) => {
      Taro.request({
        url: baseUrl + url,
        data: params,
        header,
        method: methods,
        success: function (res) {
          console.log('接口返回的res', res.data, baseUrl + url);
          const { code, msg } = res.data;
          if (code === 200) {
          } else {
            Taro.showToast({ title: msg, icon: 'none' });
          }
          resolve(res.data);
        },
        fail: function (error) {
          Taro.showToast({ title: '接口请求失败', icon: 'none' });
        }
      });
    });
  },
  get(url, params) {
    return this.wxRequest(url, 'GET', params);
  },
  post(url, params) {
    return this.wxRequest(url, 'POST', params);
  }
};
export default requestApi;