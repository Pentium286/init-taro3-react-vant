import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [blueDeviceList, setBlueDeviceList] = useState([]);

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

  const found = (res) => {
    // 实现 useState 数组 push
    setBlueDeviceList(prevArray => {
      return [...prevArray, res.devices[0]];
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
              <>{item.deviceId} - {item.name}</>
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