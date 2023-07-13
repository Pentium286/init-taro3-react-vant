import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { Camera } from "@tarojs/components";
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [src, setSrc] = useState("");
  const [devicePosition, setDevicePosition] = useState("front");

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

  const takePhoto = () => {
    // Taro.chooseMedia();
    const ctx = wx.createCameraContext();
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        setSrc(res.tempImagePath);
      }
    });
  };

  const error = (e) => {
    console.log(e);
  };

  // 摄像头切换
  const handleCameraCut = () => {
    if (devicePosition === "front") {
      setDevicePosition("back");
    } else {
      setDevicePosition("front");
    }
  };

  return (
    <>
      <div className='camera'>
        <h1>相机</h1>
        <Camera devicePosition={devicePosition} flash="off" onError={error} style="width: 100%; height: 300px;"></Camera>
        <van-button type="primary" block onClick={takePhoto}>拍照</van-button>
        <van-button type="primary" block onClick={handleCameraCut}>摄像头切换</van-button>
        <view>预览</view>
        <image mode="widthFix" src={src}></image>
      </div>
    </>
  );
};

export default Index;