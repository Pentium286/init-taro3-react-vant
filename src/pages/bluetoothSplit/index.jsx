import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [blueDeviceList, setBlueDeviceList] = useState([]); // 搜索到的蓝牙设备列表
  const [deviceId, setDeviceId] = useState(""); // 蓝牙设备id

  // 初始化蓝牙
  const openBluetoothAdapter = () => {
    Taro.openBluetoothAdapter({
      success(res) {
        console.log("初始化蓝牙成功");
        console.log(res);
      },
      fail(err) {
        console.log("初始化蓝牙失败");
        console.log(err);
      },
    });
  };

  // 开始搜索附近设备
  const startBluetoothDevicesDiscovery = () => {
    Taro.startBluetoothDevicesDiscovery({
      success(res) {
        console.log("开始搜索");
        // 开启监听回调
        Taro.onBluetoothDeviceFound(found);
      },
      fail(err) {
        console.log("搜索失败");
        console.log(err);
      },
    });
  };

  // 找到新设备就出发该方法
  const found = (res) => {
    // 实现 useState 数组 push
    setBlueDeviceList(prevArray => {
      return [...prevArray, res.devices[0]];
    });
  };

  // 连接设备
  const createBLEConnection = (data) => {
    console.log("createBLEConnection: ", data);
    setDeviceId(data.deviceId);

    Taro.createBLEConnection({
      deviceId: data.deviceId,
      success(res) {
        console.log("连接成功");
        console.log(res);
        // 停止搜索
      },
      fail(err) {
        console.log("连接失败");
        console.log(err);
      },
    });
    stopBluetoothDevicesDiscovery();
  };

  const stopBluetoothDevicesDiscovery = () => {
    Taro.stopBluetoothDevicesDiscovery({
      success(res) {
        console.log("停止成功");
        console.log(res);
      },
      fail(err) {
        console.log("停止失败");
        console.log(err);
      },
    });
  };

  return (
    <div className='bluetoothPageSplit'>
      <div className='demo-block'>
        <van-button type="primary" block onClick={openBluetoothAdapter}>初始化蓝牙</van-button>
      </div>
      <scroll-view className="scrollview" scrollY>
        {
          blueDeviceList.map((item) => {
            return (
              <p className='text' onClick={() => createBLEConnection(item)}>
                {item.deviceId} - {item.name}
              </p>
            );
          })
        }
      </scroll-view>
      <div className='demo-block'>
        <van-button type="primary" block onClick={startBluetoothDevicesDiscovery}>搜索附近蓝牙设备</van-button>
      </div>
    </div>
  );
};

export default Index;