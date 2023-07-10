import { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect } from 'react';
import './index.less';

const Index = () => {
  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => { });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  const handleClick = () => {
    console.log("handleClick");
  };

  return (
    <>
      <div className='index'>
        <van-icon name="close" />
        <van-icon name="chat" dot />
        <van-icon name="chat" info="9" />
        <van-icon name="chat" info="99+" />
      </div>
    </>
  );
};

export default Index;