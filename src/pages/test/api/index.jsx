import { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import api from './service';
import './index.less';

const Index = () => {
  // 可以使用所有的 React Hooks
  const [link, setLink] = useState("");

  useEffect(() => { });

  // 对应 onReady
  useReady(() => {
    handleCreateGzhAuthLink();
  });

  // 对应 onShow
  useDidShow(() => { });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  const handleCreateGzhAuthLink = async () => {
    let res = await api.createGzhAuthLink();
    setLink(res);
  };

  const handleClick = () => {
    console.log("handleClick");
  };

  return (
    <>
      <div className='index'>
        <h1>Hello world!!!</h1>
        <h2>{link}</h2>
      </div>
    </>
  );
};

export default Index;