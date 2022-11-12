import Taro from '@tarojs/taro';

export const navigateTo = (url) => {
  Taro.navigateTo({
    url
  });
};

export const reLaunch = (url) => {
  Taro.reLaunch({
    url
  });
};

export const redirectTo = (url) => {
  Taro.redirectTo({
    url
  });
};

export const switchTab = function (url) {
  Taro.switchTab({
    url
  });
};