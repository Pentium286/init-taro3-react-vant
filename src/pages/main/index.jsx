import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState, useMemo } from 'react';
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
      active: 0,
    });
  });

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

  const handleBluetooth = () => {
    Taro.navigateTo({
      url: "/pages/bluetooth/index"
    });
  };

  const handleBluetoothNew = () => {
    Taro.navigateTo({
      url: "/pages/bluetoothPageNew/index"
    });
  };

  const handleBluetoothSplit = () => {
    Taro.navigateTo({
      url: "/pages/bluetoothSplit/index",
    });
  };

  const handleAnimis = () => {
    Taro.navigateTo({
      url: "/pages/animation/index",
    });
  };

  const eventStream = () => {
    Taro.navigateTo({
      url: "/pages/eventStream/index",
    });
  };

  const handleChart = () => {
    Taro.navigateTo({
      url: "/pages/chart/index",
    });
  };

  const handleNavigationBar = () => {
    Taro.navigateTo({
      url: "/pages/navigationBar/index",
    });
  };

  return (
    <>
      <div class="main">
        <h1>首页</h1>
        <div className='scroll'>
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
          <div className='demo-block'>
            <van-button type="primary" block onClick={handleBluetooth}>蓝牙</van-button>
          </div>
          <div className='demo-block'>
            <van-button type="primary" block onClick={handleBluetoothNew}>蓝牙新的</van-button>
          </div>
          <div className='demo-block'>
            <van-button type="primary" block onClick={handleBluetoothSplit}>蓝牙模块拆分</van-button>
          </div>
          <div className='demo-block'>
            <van-button type="primary" block onClick={handleAnimis}>动画效果</van-button>
          </div>
          <div className='demo-block'>
            <van-button type="primary" block onClick={eventStream}>text/event-stream</van-button>
          </div>
          <div className='demo-block'>
            <van-button type="primary" block onClick={handleChart}>图表</van-button>
          </div>
          <div className='demo-block'>
            <van-button type="primary" block onClick={handleNavigationBar}>自定义 navigationBar</van-button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;