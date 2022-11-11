import { useDidHide, useDidShow } from '@tarojs/taro';
import { useEffect } from 'react';
import './app.less';

const App = (props) => {
  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onShow
  useDidShow(() => { });

  // 对应 onHide
  useDidHide(() => { });

  return (
    <>
      {props.children}
    </>
  );
};

export default App;