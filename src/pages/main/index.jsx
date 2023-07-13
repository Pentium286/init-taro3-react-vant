import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
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

  // icon
  const linkToIcon = () => {
    Taro.navigateTo({
      url: "/pages/test/icon/index"
    });
  };

  // 接口
  const linkToApi = () => {
    Taro.navigateTo({
      url: "/pages/test/api/index"
    });
  };

  const handleCart = () => {
    Taro.navigateTo({
      url: "/pages/cart/index"
    });
  };

  const handleExample = () => {
    Taro.navigateTo({
      url: "/pages/test/example/index"
    });
  };

  const handleCamera = () => {
    Taro.navigateTo({
      url: "/pages/camera/index"
    });
  };

  return (
    <>
      <div class="main">
        <h1>首页</h1>
        <div className='demo-block'>
          <van-button type="primary" block onClick={linkToIcon}>icon的使用</van-button>
        </div>
        <div className='demo-block'>
          <van-button type="primary" block onClick={linkToApi}>接口使用说明</van-button>
        </div>
        <div className='demo-block'>
          <van-button type="primary" block onClick={handleCart}>购物车页面</van-button>
        </div>
        <div className='demo-block'>
          <van-button type="primary" block onClick={handleExample}>例子</van-button>
        </div>
        <div className='demo-block'>
          <van-button type="primary" block onClick={handleCamera}>相机</van-button>
        </div>
      </div>
    </>
  );
};

export default Index;