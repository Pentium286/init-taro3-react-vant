import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
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

  const linkToRedPacketRain = () => {
    Taro.navigateTo({
      url: "/packageB/pages/redPacketRain/index"
    });
  };

  return (
    <>
      <div className='cart'>
        <h1>购物车</h1>
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="cart-o" text="购物车" info="5" />
          <van-goods-action-icon icon="shop-o" text="店铺" />
          <van-goods-action-button
            color="#be99ff"
            text="加入购物车"
            type="warning"
          />
          <van-goods-action-button color="#7232dd" text="立即购买" />
        </van-goods-action>
      </div>
    </>
  );
};

export default Index;