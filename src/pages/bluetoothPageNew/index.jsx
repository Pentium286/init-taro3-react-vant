import Taro, { useDidHide, useDidShow, useLoad, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [chs, setChs] = useState({});
  const [bluetooth, setBluetooth] = useState([]);

  // 可以使用所有的 React Hooks
  useEffect(() => {
    if (Object.keys(chs).length > 0) {
      setBluetooth(prev => [
        ...prev,
        chs,
      ]);
    }
    console.log("bluetooth: ", bluetooth);
  }, [chs]);

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => { });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  const handleCallback = (e) => {
    // console.log("handleCallback: ", e.target.chs);
    setChs(e.target.chs);
  };

  return (
    <div className='bluetoothPage'>
      <bluetooth-weapp onFinish={handleCallback} />
      {
        bluetooth.map((item) => {
          return (
            <>
              <p>特性UUID：{item.uuid}</p>
              <p>特性值：{item.value}</p>
            </>
          );
        })
      }
    </div>
  );
};

export default Index;