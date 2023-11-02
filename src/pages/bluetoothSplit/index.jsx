import Taro from '@tarojs/taro';
import { useState } from 'react';
import './index.less';

const Index = () => {
  const [blueDeviceList, setBlueDeviceList] = useState([]); // 搜索到的蓝牙设备列表
  const [deviceId, setDeviceId] = useState(""); // 蓝牙设备id
  const [serviceId, setServiceId] = useState(""); // 服务UUID
  const [characteristicId, setCharacteristicId] = useState(""); // 特征值

  // 【1】初始化蓝牙
  const openBluetoothAdapter = () => {
    Taro.openBluetoothAdapter({
      success(res) {
        console.log("初始化蓝牙成功");
        console.log(res);
      },
      fail(err) {
        console.log("初始化蓝牙失败");
        console.error(err);
      },
    });
  };

  // 【2】开始搜索附近设备
  const startBluetoothDevicesDiscovery = () => {
    Taro.startBluetoothDevicesDiscovery({
      success(res) {
        console.log("开始搜索");
        // 开启监听回调
        Taro.onBluetoothDeviceFound(found);
      },
      fail(err) {
        console.log("搜索失败");
        console.error(err);
      },
    });
  };

  // 【3】找到新设备就出发该方法
  const found = (res) => {
    // 实现 useState 数组 push
    setBlueDeviceList(prevArray => {
      return [...prevArray, res.devices[0]];
    });
  };

  // 【4】连接设备
  const createBLEConnection = (data) => {
    console.log("连接设备: ", data);
    setDeviceId(data.deviceId);

    Taro.createBLEConnection({
      deviceId: data.deviceId,
      success(res) {
        console.log("连接成功");
        console.log(res);
      },
      fail(err) {
        console.log("连接失败");
        console.error(err);
      },
    });
    // 停止搜索
    stopBluetoothDevicesDiscovery();
  };

  // 【5】停止搜索
  const stopBluetoothDevicesDiscovery = () => {
    Taro.stopBluetoothDevicesDiscovery({
      success(res) {
        console.log("停止成功");
        console.log(res);
      },
      fail(err) {
        console.log("停止失败");
        console.error(err);
      },
    });
  };

  // 【6】获取服务
  const getBLEDeviceServices = () => {
    Taro.getBLEDeviceServices({
      deviceId: deviceId, // 设备ID，在上一步【4】里获取
      success(res) {
        console.log("获取服务");
        console.log(res);
        setServiceId(res.services[0].uuid); // TODO:会有多个，目前获取第一个
      },
      fail(err) {
        console.error(err);
      },
    });
  };

  // 【7】获取特征值
  const getBLEDeviceCharacteristics = () => {
    Taro.getBLEDeviceCharacteristics({
      deviceId: deviceId, // 设备ID，在【4】里获取到
      // 正常情况下，硬件佬会提前把蓝牙设备的指定服务还有特征值告诉你。
      // 你的设备可能不止一条特征值，需要监听那条特征值这需要你和硬件佬协商的（通常也是硬件佬直接和你说要监听哪条）。
      serviceId: serviceId, // 服务UUID，在【6】里能获取到
      success(res) {
        // 你的设备可能不止一条特征值，需要监听那条特征值这需要你和硬件佬协商的（通常也是硬件佬直接和你说要监听哪条）。
        console.log("获取特征值");
        console.log(res);
        setCharacteristicId(res.characteristics[0].uuid); // TODO:会有多个，目前获取第一个
      },
      fail(err) {
        console.error(err);
      },
    });
  };

  // 【8】开启消息监听
  const notifyBLECharacteristicValueChange = () => {
    Taro.notifyBLECharacteristicValueChange({
      deviceId: deviceId, // 设备ID，在【4】里获取到
      serviceId: serviceId, // 服务UUID，在【6】里能获取到
      characteristicId: characteristicId, // 特征值，【7】里能获取到
      state: true,
      success(res) {
        console.log("开启消息监听");
        console.log(res);
        // 接收消息的方法
        // onBLECharacteristicValueChange();
      },
      fail() { },
    });
  };

  // ArrayBuffer转16进制字符串示例
  const ab2hex = (buffer) => {
    const hexArr = Array.prototype.map.call(
      new Uint8Array(buffer),
      function (bit) {
        return ('00' + bit.toString(16)).slice(-2);
      }
    );
    return hexArr.join('');
  };

  // 将16进制的内容转成我们看得懂的字符串内容
  const hexCharCodeToStr = (hexCharCodeStr) => {
    var trimedStr = hexCharCodeStr.trim();
    var rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
    var len = rawStr.length;
    if (len % 2 !== 0) {
      alert("存在非法字符!");
      return "";
    }
    var curCharCode;
    var resultStr = [];
    for (var i = 0; i < len; i = i + 2) {
      curCharCode = parseInt(rawStr.substr(i, 2), 16);
      resultStr.push(String.fromCharCode(curCharCode));
    }
    return resultStr.join("");
  };

  // 【9】监听消息变化
  const onBLECharacteristicValueChange = () => {
    Taro.onBLECharacteristicValueChange((res) => {
      // 结果
      console.log("监听消息变化");
      console.log(res);

      // 结果里有个 value 值，该值为 ArrayBuffer 类型，所以在控制台无法用肉眼观察到，必须将该值转换为16进制
      let resHex = ab2hex(res.value);
      console.log(resHex);

      // 最后将16进制转换为ascii码，就能看到对应的结果
      let result = hexCharCodeToStr(resHex);
      console.log(result);
    });
  };

  return (
    <div className='bluetoothPageSplit'>
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
        <van-button type="primary" block onClick={openBluetoothAdapter}>初始化蓝牙</van-button>
      </div>
      <div className='demo-block'>
        <van-button type="primary" block onClick={startBluetoothDevicesDiscovery}>搜索附近蓝牙设备</van-button>
      </div>
      <div className='demo-block'>
        <van-button type="primary" block onClick={getBLEDeviceServices}>获取蓝牙服务</van-button>
      </div>
      <div className='demo-block'>
        <van-button type="primary" block onClick={getBLEDeviceCharacteristics}>获取特征值</van-button>
      </div>
      <div className='demo-block'>
        <van-button type="primary" block onClick={notifyBLECharacteristicValueChange}>开启消息监听</van-button>
      </div>
    </div>
  );
};

export default Index;