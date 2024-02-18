import Taro from '@tarojs/taro';
import { showToast } from '@u/index.js';
let base = process.env.BASE_URL;
export default function request(options) {
  let { url, method = "POST", data, header, cookies = true, isLoading = true, isShowError = true, ...otherData } = options;
  if (isLoading) {
    Taro.showLoading({
      title: '加载中',
    });
  }
  let headers = header || {
    'content-type': method == 'GET' ? 'application/x-www-form-urlencoded' : 'application/json',
  };
  if (cookies) {
    headers.Cookie = Taro.getStorageSync('cookies');
  }
  return new Promise((resolve, reject) => {
    let router = Taro.getCurrentInstance().router;
    return Taro.request({
      url: `${base}${url}`,
      method,
      data,
      header: headers,
      success: (res) => {
        if (res.cookies && res.cookies.length > 0) {
          let cookiesAll = res.cookies[0].split(';');
          Taro.setStorageSync('cookies', cookiesAll[0]);
        }
        if (res.statusCode == 200) {
          console.log('api-sucess', res);
          if (res.data.success) {
            if (options?.resultFlag == 'all') {
              resolve(res);
            } else {
              resolve(res.data.data);
            }

          } else {
            if (isShowError) {
              showToast(res.data.message);
            }
            reject(res.data.message);
          }
        } else {
          switch (res.statusCode) {
            case 401:
              showToast('用户未登录');
              if (router.path != '/pages/login/index') {
                Taro.navigateTo({
                  url: '/pages/login/index'
                });
              }
              Taro.clearStorageSync();
              return;
              break;
            case 403:
              showToast('服务器拒绝请求');
              break;
            case 404:
              showToast('未找到请求的网页');
              break;
            case 500:
              showToast('服务器内部异常');
              break;
            default:
              showToast('请求失败,请重试');
              break;
          }
          reject(res.data.message);
        }
      },
      fail: (err) => {
        if (isShowError) {
          showToast(err.errMsg);
        }
        reject(err);
      },
      complete: () => {
        if (isLoading) {
          Taro.hideLoading();
        }
      }
    });
  });

}
