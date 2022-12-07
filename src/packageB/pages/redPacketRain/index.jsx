import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [createSpeed, setCreateSpeed] = useState(5); // 速度
  const [time, setTime] = useState(1); // 游戏时间
  const [readyTime, setReadyTime] = useState(1); // 准备时间
  const [min, setMin] = useState(0); // 金币最小是0
  const [max, setMax] = useState(10); // 金币最大是10

  // 可以使用所有的 React Hooks
  useEffect(() => {
    setVisible(true);
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

  const success = (e) => {
    console.log("success", e.target.f);
    Taro.redirectTo({
      url: "/pages/main/index"
    });
  };

  return (
    <>
      <div className='index'>
        <h1>红包雨</h1>
        <jbs-red-packet-rain
          visible={visible}
          createSpeed={createSpeed}
          time={time}
          readyTime={readyTime}
          min={min}
          max={max}
          onFinish={success}
        />
      </div>
    </>
  );
};

export default Index;