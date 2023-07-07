import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import WxValidate from "../../utils/WxValidate";
import moment from "moment";
import './index.less';

const Index = () => {
  const [msg, setMsg] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [wxValidate, setWxValidate] = useState('');

  // 可以使用所有的 React Hooks
  useEffect(() => {
    initValidate();
  });

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
    Taro.redirectTo({
      url: "/packageB/pages/redPacketRain/index"
    });
  };

  const handleRain = () => {
    Taro.redirectTo({
      url: "/packageC/pages/redPacketRain/index",
    });
  };

  const initValidate = () => {
    setTimeout(() => {
      const rules = {
        username: {
          required: true,
        },
        password: {
          required: true,
        },
      };
      const messages = {
        username: {
          required: "请填写账号",
        },
        password: {
          required: "请输入密码",
        },
      };
      setWxValidate(new WxValidate(rules, messages));
    }, 500);
  };

  const handleLogin = async () => {
    let params = {
      username: "11",
      password: "11",
    };

    // let res = await this.$api.loginApi(params);
  };

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

  return (
    <>
      <div class="main">
        <text>{msg}</text>
        <van-button type="primary" onClick={linkToIcon}>icon的使用</van-button>
        <van-button type="primary" onClick={linkToApi}>接口使用说明</van-button>
        <div class="btn_list">
          <van-button class="btn_box" type="default">默认按钮</van-button>
          <van-button class="btn_box" type="primary">主要按钮</van-button>
          <van-button class="btn_box" type="info">信息按钮</van-button>
          <van-button class="btn_box" type="warning">警告按钮</van-button>
          <van-button class="btn_box" type="danger">危险按钮</van-button>
          <van-button class="btn_box" type="primary" onClick={handleClick}>红包雨canvas</van-button>
          <van-button class="btn_box" type="primary" onClick={handleRain}>红包雨dom</van-button>
        </div>
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
        <van-row>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
        </van-row>
      </div>
    </>
  );
};

export default Index;