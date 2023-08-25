import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady, useUnload } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [textLog, setTextLog] = useState("");
  const [isopen, setIsopen] = useState(false); // 蓝牙适配器是否已打开
  const [devices, setDevices] = useState([]);
  const [connected, setConnected] = useState(connected);
  const [chs, setChs] = useState([]);
  const [name, setName] = useState("");
  const [devId, setDevId] = useState("");
  const [canWrite, setCanWrite] = useState(false);

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => { });

  useUnload(() => {
    handleCloseBluetoothAdapter(); //关闭蓝牙模块，使其进入未初始化状态。
  });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  const handleMax = (n1, n2) => {
    return Math.max(n1, n2);
  };

  const handleLen = (arr) => {
    arr = arr || [];
    return arr.length;
  };

  const inArray = (arr, key, val) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) {
        return i;
      }
    }
    return -1;
  };

  const handleStartClear = () => {
    setTextLog("");
  };

  // 流程：
  // 1、先初始化蓝牙适配器
  // 2、获取本机蓝牙适配器的状态
  // 3、开始搜索、当停止搜索以后在开始搜索，就会触发蓝牙配置状态变化的事件
  // 4、搜索完成以后获取所有已经发现的蓝牙设备，就可以将 devices 中的设备 Array 取出来
  // 5、然后就可以得到所有已经连接的设备了
  const handleStartScan = () => {
    Taro._discoveryStarted = false;
    if (isopen) {
      handleGetBluetoothAdapterState();
    } else {
      handleOpenBluetoothAdapter();
    }
  };

  // 初始化小程序蓝牙模块
  const handleOpenBluetoothAdapter = () => {
    Taro.openBluetoothAdapter({
      mode: 'central',
      success: (res) => {
        setTextLog(textLog + "打开蓝牙适配器成功！\n");
        setIsopen(true);
        handleGetBluetoothAdapterState();
      },
      fail: (res) => {
        setTextLog(textLog + "蓝牙开关未开启 \n");
        setIsopen(true);
        Taro.showModal("蓝牙开关未开启");
      },

    });
    // 监听蓝牙适配器状态变化事件
    Taro.onBluetoothAdapterStateChange((res) => {
      let isDvailable = res.available; // 蓝牙适配器是否可用
      if (isDvailable) {
        handleGetBluetoothAdapterState();
      } else {
        handleStopBluetoothDevicesDiscovery(); // 停止搜索
        setDevices([]);
        Taro.showModal("蓝牙开关未开启");
      }
    });
  };

  // 关闭蓝牙模块，使其进入未初始化状态
  const handleCloseBluetoothAdapter = () => {
    Taro.closeBluetoothAdapter();
    Taro._discoveryStarted = false;
  };

  // 获取本机蓝牙适配器状态
  const handleGetBluetoothAdapterState = () => {
    Taro.getBluetoothAdapterState({
      success: (res) => {
        let isDiscov = res.discovering; // 是否正在搜索设备
        let isDvailable = res.available; // 蓝牙适配器是否可用
        if (isDvailable) {
          setTextLog(textLog + "本机蓝牙适配器状态：可用 \n");
          if (!isDiscov) {
            handleStartBluetoothDevicesDiscovery();
          } else {
            setTextLog(textLog + "已在搜索设备 \n");
          }
        }
      },
    });
  };

  // 开始扫描附近的蓝牙外围设备
  // 注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索
  const handleStartBluetoothDevicesDiscovery = () => {
    if (Taro._discoveryStarted) {
      return;
    }
    Taro._discoveryStarted = true;
    Taro.showLoading("正在扫描...");
    setTextLog(textLog + "正在扫描... \n");
    setTimeout(() => {
      Taro.hideLoading(); // 隐藏 loading
    }, 3000);
    Taro.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: true, // 是否允许重复上报同一设备, 如果允许重复上报，则 onDeviceFound 方法会多次上报同一设备，但是 RSSI(信号) 值会有不同
      success: (res) => {
        setTextLog(textLog + "扫描附近的蓝牙外围设备成功，准备监听寻找新设备：" + res + " \n");
        handleOnBluetoothDeviceFound(); // 监听寻找到新设备的事件
      }
    });
  };

  // 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索
  const handleStopBluetoothDevicesDiscovery = () => {
    setTextLog(textLog + "停止搜索附近的蓝牙外围设备 \n");
    Taro.stopBluetoothDevicesDiscovery();
  };

  // 监听寻找到新设备的事件
  const handleOnBluetoothDeviceFound = () => {
    let arr = [];
    Taro.onBluetoothDeviceFound((res) => {
      res.devices.forEach((item) => {
        if (!item.name && !item.localName) {
          return;
        }
        const idx = inArray(devices, 'deviceId', item.deviceId);
        let data = {};
        if (idx === -1) {
          //这里可以写连接此设备的蓝牙设备的条件
          arr.push(item);
          // data[`devices[${foundDevices.length}]`] = item;
        } else {
          // data[`devices[${idx}]`] = item;
        }
      });
      setDevices([...devices, ...arr]);
    });
  };

  // 连接低功耗蓝牙设备
  const handleCreateBLEConnection = (item) => {
    const devId = item.deviceId; // 设备 UUID
    const name = item.name; // 设备名称
    setTextLog(textLog + "正在连接，请稍后... \n");
    Taro.showLoading("连接中...");
    Taro.createBLEConnection({
      deviceId: devId,
      success: (res) => {
        Taro.hideLoading(); // 隐藏 loading
        setTextLog(textLog + "配对成功，获取服务... \n");
        setConnected(true);
        setName(name);
        setDevId(devId);
        handleGetBLEDeviceServices(devId);
      },
      fail: (res) => {
        Taro.hideLoading(); // 隐藏 loading
        setTextLog(textLog + "连接失败，错误码：" + res.errCode + " \n");
        if (res.errCode === 10012) {
          Taro.showModal("连接超时，请重试！");
        } else if (res.errCode === 10013) {
          Taro.showModal("连接失败，蓝牙地址无效！");
        } else {
          Taro.showModal("连接失败，请重试！"); // + err.errCode10003原因多种：蓝牙设备未开启或异常导致无法连接;蓝牙设备被占用或者上次蓝牙连接未断开导致无法连接
        }
        handleCloseBLEConnection();
      },
    });
    handleStopBluetoothDevicesDiscovery(); // 停止搜索
  };

  // 断开与低功耗蓝牙设备的连接
  const handleCloseBLEConnection = () => {
    Taro.closeBLEConnection({
      deviceId: devId,
    });
    setConnected(false);
    setChs([]);
    setCanWrite(false);
  };

  // 获取蓝牙设备所有 service (服务)
  const handleGetBLEDeviceServices = (devId) => {
    Taro.getBLEDeviceServices({
      deviceId: devId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          // 该服务是否为主服务
          if (res.services[i].isPrimary) {
            setTextLog(textLog + "该服务是为主服务：" + res.services[i].uuid + " \n");
            Taro.navigateTo({
              url: "/pages/bluetoothPage/index?name=" + encodeURIComponent(name) + '&deviceId=' + encodeURIComponent(devId) + '&serviceId=' + encodeURIComponent(res.services[i].uuid),
            });
          }
        }
      },
    });
  };

  return (
    <>
      <div className='bluetooth'>
        <div className='log'>
          <div>展示log日志(可滑动查看)：</div>
          <ScrollView scrollY className='scrollList'>
            <div dangerouslySetInnerHTML={{ __html: textLog }}></div>
          </ScrollView>
        </div>
        <div className='scanView'>
          <van-button type="warning" onClick={handleStartClear}>清空log日志</van-button>
          <van-button type="primary" onClick={handleStartScan}>扫描蓝牙设备</van-button>
        </div>
        <div className='devicesSummary'>已发现 {devices.length} 个外围设备：</div>
        <ScrollView className='deviceList' scrollY scrollWithAnimation>
          {
            devices.map((item, index) => (
              <div key={index} onClick={() => handleCreateBLEConnection(item)} className='deviceItem'>
                <div className='a'>{item.name}</div>
                <div>信号强度: {item.RSSI}dBm ({handleMax(0, item.RSSI + 100)}%)</div>
                <div className='c'>UUID: {item.deviceId}</div>
                {/* 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段 */}
                <div>Service数量: {handleLen(item.advertisServiceUUIDs)}</div>
              </div>
            ))
          }
        </ScrollView>
      </div>
    </>
  );
};

export default Index;