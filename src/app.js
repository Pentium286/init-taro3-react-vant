import Taro, { useLaunch, useDidHide, useDidShow } from '@tarojs/taro';
import { useEffect } from 'react';
import { updateVersion } from './api/common.js';
import './app.less';

function App({ children }) {

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onShow
  useDidShow(() => {
    if (Taro.getEnv() == 'WEAPP') {
      updateVersion();
    }
  });

  // 对应 onHide
  useDidHide(() => { });

  useLaunch(() => { });

  // children 是将要会渲染的页面
  return children;
}

export default App;
