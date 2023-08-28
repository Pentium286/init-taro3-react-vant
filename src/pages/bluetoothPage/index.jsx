import Taro, { useDidHide, useDidShow, useLoad, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { ScrollView } from '@tarojs/components';
import { stringToBytes, ab2hext, hexToString } from "../../utils/bluetooth";
import './index.less';

const Index = () => {
  const [textLog, setTextLog] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [name, setName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [readCharacteristicId, setReadCharacteristicId] = useState("");
  const [writeCharacteristicId, setWriteCharacteristicId] = useState("");
  const [notifyCharacteristicId, setNotifyCharacteristicId] = useState("");
  const [connected, setConnected] = useState(true);
  const [canWrite, setCanWrite] = useState(false);
  const [orderInputStr, setOrderInputStr] = useState("");

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
    getBLEDeviceCharacteristics();
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

  // 返回蓝牙是否正处于链接状态
  const onBLEConnectionStateChange = (onFailCallback) => {
    Taro.onBLEConnectionStateChange((res) => {
      // 该方法回调中可以用于处理连接意外断开等异常情况
      console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`);
      return res.connected;
    });
  };

  // 断开与低功耗蓝牙设备的连接
  const closeBLEConnection = () => {
    Taro.closeBLEConnection({
      deviceId: deviceId,
    });
    setConnected(false);
    Taro.showToast({
      title: "连接已断开",
      icon: "success",
    });
    setTimeout(() => {
      Taro.navigateBack();
    }, 2000);
  };

  // 获取蓝牙设备某个服务中的所有 characteristic（特征值）
  const getBLEDeviceCharacteristics = () => {
    Taro.getBLEDeviceCharacteristics({
      deviceId: deviceId,
      serviceId: serviceId,
      success: (res) => {
        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i];
          // 该特征值是否支持 read 操作
          if (item.properties.read) {
            let log = textLog + "该特征值支持 read 操作:" + item.uuid + "\n";
            setTextLog(log);
            setReadCharacteristicId(item.uuid);
          }
          // 该特征值是否支持 write 操作
          if (item.properties.write) {
            var log = textLog + "该特征值支持 write 操作:" + item.uuid + "\n";
            setTextLog(log);
            setWriteCharacteristicId(item.uuid);
            setCanWrite(true);
          }
          // 该特征值是否支持 notify或indicate 操作
          if (item.properties.notify || item.properties.indicate) {
            var log = textLog + "该特征值支持 notify 操作:" + item.uuid + "\n";
            setTextLog(log);
            setNotifyCharacteristicId(item.uuid);
            notifyBLECharacteristicValueChange();
          }
        }
      },
    });
    // 监听特征值变化
    // onBLECharacteristicValueChange();
  };

  // 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
  // 注意：必须设备的特征值支持 notify 或者 indicate 才可以成功调用，具体参照 characteristic 的 properties 属性
  const notifyBLECharacteristicValueChange = () => {
    Taro.notifyBLECharacteristicValueChange({
      state: true, // 启用 notify 功能
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: notifyCharacteristicId,
      success: (res) => {
        let log = textLog + "notify启动成功" + res.errMsg + "\n";
        setTextLog(log);
        onBLECharacteristicValueChange(); // 监听特征值变化
      },
      fail: (res) => {
        Taro.showToast({
          title: "notify启动失败",
          mask: true,
        });
        setTimeout(() => {
          Taro.hideToast();
        }, 2000);
      },
    });
  };

  // 监听低功耗蓝牙设备的特征值变化。必须先启用 notify 接口才能接收到设备推送的 notification
  const onBLECharacteristicValueChange = () => {
    Taro.onBLECharacteristicValueChange((res) => {
      let resValue = ab2hext(res.value); // 16进制字符串
      let resValueStr = hexToString(resValue);
      let log = textLog + "成功获取：" + resValueStr + "\n";
      setTextLog(log);
    });
  };

  const orderInput = (e) => {
    setOrderInputStr(e.detail.value);
  };

  // 发送指令
  const sentOrder = () => {
    let orderStr = orderInputStr; // 指令
    let order = stringToBytes(orderStr);
    writeBLECharacteristicValue(order);
  };

  // 向低功耗蓝牙设备特征值中写入二进制数据。
  // 注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
  const writeBLECharacteristicValue = (order) => {
    let byteLength = order.byteLength;
    let log = textLog + "当前执行指令的字节长度:" + byteLength + "\n";
    setTextLog(log);
    Taro.writeBLECharacteristicValue({
      deviceId: deviceId,
      serviceId: serviceId,
      characteristicId: writeCharacteristicId,
      // 这里的 value 是 ArrayBuffer 类型
      value: order.slice(0, 20),
      success: (res) => {
        if (byteLength > 20) {
          setTimeout(function () {
            // writeBLECharacteristicValue(order.slice(20, byteLength));
          }, 150);
        }
        let log = textLog + "写入成功：" + res.errMsg + "\n";
        setTextLog(log);
      },
      fail: (res) => {
        let log = textLog + "写入失败" + res.errMsg + "\n";
        setTextLog(log);
      },
    });
  };

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
            <input className="input" type="text" cursor-spacing="20" onChange={orderInput} placeholder="请输入指令" value={orderInputStr} />
            <van-button type="info" onClick={sentOrder}>发送</van-button>
          </div>
          <div className='functionButtonDiv2'>
            <van-button type="warning" className="functionButtonLeft" onClick={startClear}>清空log日志</van-button>
            <van-button type="danger" className="functionButtonRight" onClick={closeBLEConnection}>断开连接</van-button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;