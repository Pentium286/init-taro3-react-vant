import Taro, { useDidHide, useDidShow, useLoad, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { stringToBytes, ab2hext, hexToString } from "../../utils/bluetooth";
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
    const log = textLog + "设备名=" + devname + "\n设备ID=" + devid + "\n服务ID=" + devserviceid + "\n";

    setTextLog(log);
    setDeviceId(devid);
    setName(devname);
    setServiceId(devserviceid);

    // 获取特征值
    handleGetBLEDeviceCharacteristics();
  });

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => {
    if (Taro.setKeepScreenOn) {
      Taro.setKeepScreenOn({
        keepScreenOn: true,
        success: (res) => {
          // console.log("保持屏幕常亮");
        },
      });
    }
  });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  // 清空 log 日志
  const startClear = () => { };

  // 点击设置最大 MTU
  const setMTUClick = () => {
    setMaxMTU();
  };

  // 返回蓝牙是否正处于链接状态
  const handleOnBLEConnectionStateChange = () => { };

  // 断开与低功耗蓝牙设备的连接
  const handleCloseBLEConnection = () => { };

  // 获取蓝牙设备某个服务中的所有 characteristic（特征值）
  const handleGetBLEDeviceCharacteristics = () => { };

  // 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
  // 注意：必须设备的特征值支持notify或者indicate才可以成功调用，具体参照 characteristic 的 properties 属性
  const handleNotifyBLECharacteristicValueChange = () => { };

  // 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification
  const handleOnBLECharacteristicValueChange = () => { };

  const orderInput = () => { };

  // 发送指令
  const sentOrder = () => { };

  // 向低功耗蓝牙设备特征值中写入二进制数据。
  // 注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
  const handleWriteBLECharacteristicValue = () => { };

  // 设置最大MTU
  // 设置蓝牙最大传输单元。需在 wx.createBLEConnection调用成功后调用，mtu 设置范围 (22,512)。安卓5.1以上有效
  const setMaxMTU = () => { };

  return (
    <>
      <div className='bluetoothPage'>
        <div className='bluetoothDetail'>
          <span>当前连接的蓝牙设备是：</span>
          <span>设备名：{name}</span>
          <span>设备ID：{deviceId}</span>
          <span>serviceId：{serviceId}</span>
        </div>
        <div className='card'>
          <div>展示log日志（可滚动查看）：</div>
          <ScrollView scrollY className='list'>
            <text>{textLog}</text>
          </ScrollView>
        </div>
        {/* 底部按钮 */}
        <div className='functionButtonDiv'>
          <div className='functionInput'>
            <input className="input" type="text" cursor-spacing="20" onInput={orderInput} placeholder="请输入指令" value={accountInputStr} />
          </div>
          <div className='functionButtonDiv2'>
            <van-button type="warning" className="functionButtonLeft" onClick={startClear}>清空log日志</van-button>
            <van-button type="primary" className="functionButtonMiddle" onClick={setMTUClick}>最大MTU</van-button>
            <van-button type="danger" className="functionButtonRight" onClick={handleCloseBLEConnection}>断开连接</van-button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;