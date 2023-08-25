import Taro, { useDidHide, useDidShow, useLoad, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [textLog, setTextLog] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const [serviceId, setServiceId] = useState("");

  useLoad((options) => {
    const devid = decodeURIComponent(options.deviceId);
    const devname = decodeURIComponent(options.name);
    const devserviceid = decodeURIComponent(options.serviceId);
    const log = textLog + "设备名=" + devname + "\n设备UUID=" + devid + "\n服务UUID=" + devserviceid + "\n";
    setTextLog(log);
    setDeviceId(devid);
    setName(devname);
    setServiceId(devserviceid);
  });

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

  return (
    <>
      <div className='bluetoothPage'>
        <div className='bluetoothDetail'>
          <span>当前连接的蓝牙设备是：</span>
          <span>设备名：{name}</span>
          <span>设备ID：{deviceId}</span>
          <span>serviceId：{serviceId}</span>
        </div>
      </div>
    </>
  );
};

export default Index;