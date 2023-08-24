import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { Camera } from "@tarojs/components";
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => {
    console.log("useReady");

    // 监听扫描到新设备事件
    Taro.onBluetoothDeviceFound((res) => {
      console.log("onBluetoothDeviceFound: ", res);
      res.devices.forEach((device) => {
        // 这里可以做一些过滤
        console.log('这里可以做一些过滤: ', device);
      });
      // 找到要搜索的设备后，及时停止扫描
      Taro.stopBluetoothDevicesDiscovery();
    });

    // 初始化蓝牙模块
    Taro.openBluetoothAdapter({
      mode: 'central',
      success: (res) => {
        console.log("开始搜索附近的蓝牙外围设备: ", res);
        // 开始搜索附近的蓝牙外围设备
        Taro.startBluetoothDevicesDiscovery({
          allowDuplicatesKey: false,
        });
      },
      fail: (res) => {
        if (res.errCode !== 10001) return;
        Taro.onBluetoothAdapterStateChange((res) => {
          if (!res.available) return;
          // 开始搜寻附近的蓝牙外围设备
          Taro.startBluetoothDevicesDiscovery({
            allowDuplicatesKey: false,
          });
        });
      }
    });
  });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  return (
    <>
      <div className='bluetooth'>
        11
      </div>
    </>
  );
};

export default Index;