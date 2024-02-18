import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import WxValidate from "@u/WxValidate";
import moment from "moment";
import './index.less';

const Index = () => {
  const [msg, setMsg] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [wxValidate, setWxValidate] = useState('');

  const [active, setActive] = useState(1);

  const [currentDate, setCurrentDate] = useState(new Date().getTime());
  const minDate = new Date(2015, 10, 1).getTime();
  const maxDate = new Date(2019, 10, 1).getTime();

  const [value, setValue] = useState("");

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

  const onChange = (event) => {
    Taro.showToast({
      title: `切换到标签${1 + event.detail.name}`,
      icon: 'none',
    });
  };

  const onInput = (event) => {
    console.log(event.detail);
  };

  const handleChange = (event) => {
    console.log(event.detail);
  };

  return (
    <>
      <div class="example">
        <div className="demo_block">{msg}</div>
        <div class="btn_list">
          <van-button class="btn_box" type="default">默认按钮</van-button>
          <van-button class="btn_box" type="primary">主要按钮</van-button>
          <van-button class="btn_box" type="info">信息按钮</van-button>
          <van-button class="btn_box" type="warning">警告按钮</van-button>
          <van-button class="btn_box" type="danger">危险按钮</van-button>
        </div>
        <div className='demo_block'>
          <van-button class="btn_box" type="primary" onClick={handleClick}>红包雨canvas 原生组件</van-button>
        </div>
        <div className='demo_block'>
          <van-button class="btn_box" type="primary" onClick={handleRain}>红包雨dom 原生组件</van-button>
        </div>
        <van-row>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
          <van-col span="8">span: 8</van-col>
        </van-row>
        <van-tabs active={active} onChange={onChange}>
          <van-tab title="标签 1">
            <van-cell-group>
              <van-field
                value={value}
                placeholder="请输入用户名"
                border={false}
                onChange={handleChange}
              />
            </van-cell-group>
          </van-tab>
          <van-tab title="标签 2">内容 2</van-tab>
          <van-tab title="标签 3">内容 3</van-tab>
          <van-tab title="标签 4">内容 4</van-tab>
        </van-tabs>
        <div className='demo_block'>
          <van-datetime-picker
            type="date"
            value={currentDate}
            minDate={minDate}
            maxDate={maxDate}
            onInput={onInput}
          />
        </div>
      </div>
    </>
  );
};

export default Index;