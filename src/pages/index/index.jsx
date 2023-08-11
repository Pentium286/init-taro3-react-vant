import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useMemo } from 'react';
import './index.less';

const Index = () => {
  const page = useMemo(() => Taro.getCurrentInstance().page, []);

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => {
    const tabbar = Taro.getTabBar(page);
    tabbar?.setState({
      active: 2,
    });
  });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  return (
    <>
      <div className='index'>
        <h1>中间功能页面</h1>
      </div>
    </>
  );
};

export default Index;