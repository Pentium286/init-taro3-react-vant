import Taro from '@tarojs/taro';

export const showToast = (title, icon = 'none', duration = 1500) => {
  Taro.showToast({
    title,
    icon,
    duration
  });
};