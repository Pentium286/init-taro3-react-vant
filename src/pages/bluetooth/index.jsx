import Taro, { useDidHide, useDidShow, useLoad, usePullDownRefresh, useReady, useUnload } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [textLog, setTextLog] = useState("");
  const [isopen, setIsopen] = useState(false); // 蓝牙适配器是否已打开
  const [devices, setDevices] = useState([]);
  const [connected, setConnected] = useState(false);
  const [chs, setChs] = useState([]);
  const [devId, setDevId] = useState("");
  const [name, setName] = useState("");
  const [canWrite, setCanWrite] = useState(false);

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => { });

  // 对应 onHide
  useDidHide(() => { });

  useUnload(() => {
    console.log("生命周期函数--监听页面卸载");
    closeBluetoothAdapter(); //关闭蓝牙模块，使其进入未初始化状态。
  });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  useLoad(() => {
    const app = Taro.getSystemInfoSync();
    let log = "获取微信版本号:" + app.version + "\n" +
      "获取客户端系统:" + app.platform + "\n" +
      "系统版本:" + app.system + "\n";
    setTextLog(log);
  });

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

  const startClear = () => {
    setTextLog("");
  };

  // 流程：
  // 1、先初始化蓝牙适配器
  // 2、获取本机蓝牙适配器的状态
  // 3、开始搜索、当停止搜索以后在开始搜索，就会触发蓝牙配置状态变化的事件
  // 4、搜索完成以后获取所有已经发现的蓝牙设备，就可以将 devices 中的设备 Array 取出来
  // 5、然后就可以得到所有已经连接的设备了
  const startScan = () => {
    Taro._discoveryStarted = false;
    if (isopen) {
      getBluetoothAdapterState();
    } else {
      openBluetoothAdapter();
    }
  };

  // 初始化小程序蓝牙模块
  const openBluetoothAdapter = () => {
    Taro.openBluetoothAdapter({
      success: (res) => {
        let log = textLog + "打开蓝牙适配器成功！\n";
        setTextLog(log);
        getBluetoothAdapterState();
      },
      fail: (res) => {
        Taro.showModal("蓝牙开关未开启");
        let log = textLog + "蓝牙开关未开启 \n";
        setTextLog(log);
        setIsopen(true);
      },

    });
    // 监听蓝牙适配器状态变化事件
    Taro.onBluetoothAdapterStateChange((res) => {
      let isDvailable = res.available; // 蓝牙适配器是否可用
      if (isDvailable) {
        getBluetoothAdapterState();
      } else {
        stopBluetoothDevicesDiscovery(); // 停止搜索
        setDevices([]);
        Taro.showModal("蓝牙开关未开启");
      }
    });
  };

  // 关闭蓝牙模块，使其进入未初始化状态
  const closeBluetoothAdapter = () => {
    Taro.closeBluetoothAdapter();
    Taro._discoveryStarted = false;
  };

  // 获取本机蓝牙适配器状态
  const getBluetoothAdapterState = () => {
    Taro.getBluetoothAdapterState({
      success: (res) => {
        let isDiscov = res.discovering; // 是否正在搜索设备
        let isDvailable = res.available; // 蓝牙适配器是否可用
        if (isDvailable) {
          let log = textLog + "本机蓝牙适配器状态：可用 \n";
          setTextLog(log);
          if (!isDiscov) {
            startBluetoothDevicesDiscovery();
          } else {
            let log = textLog + "已在搜索设备 \n";
            setTextLog(log);
          }
        }
      },
    });
  };

  // 开始扫描附近的蓝牙外围设备
  // 注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索
  const startBluetoothDevicesDiscovery = () => {
    if (Taro._discoveryStarted) {
      return;
    }

    Taro._discoveryStarted = true;
    Taro.showLoading("正在扫描...");

    let log = textLog + "正在扫描... \n";
    setTextLog(log);

    setTimeout(() => {
      Taro.hideLoading(); // 隐藏 loading
    }, 3000);

    // 考虑到蓝牙功能可以间接进行定位，安卓 6.0 及以上版本，无定位权限或定位开关未打开时，无法进行设备搜索。这种情况下，安卓 8.0.16 前，接口调用成功但无法扫描设备；8.0.16 及以上版本，会返回错误。
    Taro.startBluetoothDevicesDiscovery({
      services: [],
      allowDuplicatesKey: true, // 是否允许重复上报同一设备, 如果允许重复上报，则 onDeviceFound 方法会多次上报同一设备，但是 RSSI(信号) 值会有不同
      success: (res) => {
        let log = textLog + "扫描附近的蓝牙外围设备成功，准备监听寻找新设备：" + res + " \n";
        setTextLog(log);
        onBluetoothDeviceFound(); // 监听寻找到新设备的事件
      }
    });
  };

  // 停止搜寻附近的蓝牙外围设备。若已经找到需要的蓝牙设备并不需要继续搜索时，建议调用该接口停止蓝牙搜索
  const stopBluetoothDevicesDiscovery = () => {
    let log = textLog + "停止搜索附近的蓝牙外围设备 \n";
    setTextLog(log);
    Taro.stopBluetoothDevicesDiscovery();
  };

  // 监听寻找到新设备的事件
  const onBluetoothDeviceFound = () => {
    Taro.onBluetoothDeviceFound((res) => {
      res.devices.forEach((device) => {
        // 过滤无用蓝牙设备
        if (!device.name && !device.localName && device.name === "" && device.localName === "") {
          return;
        }

        const foundDevices = devices;
        const idx = inArray(foundDevices, 'deviceId', device.deviceId);
        let arr = [];
        // let obj = {};
        if (idx === -1) {
          arr.splice(`${foundDevices.length}`, 0, device);
          // obj[`devices[${foundDevices.length}]`] = device;
        } else {
          arr.splice(`${idx}`, 0, device);
          // obj[`devices[${idx}]`] = device;
        }
        console.log("devices: ", devices);
        // console.log("obj: ", obj);
        // console.log("onBluetoothDeviceFound: ", [...arr]);
        setDevices([...arr]);
      });
    });
  };

  // 连接低功耗蓝牙设备
  const createBLEConnection = (e) => {
    const devId = item.deviceId; // 设备 UUID
    const name = item.name; // 设备名称
    let log = textLog + "正在连接，请稍后... \n";
    setTextLog(log);
    Taro.showLoading("连接中...");
    Taro.createBLEConnection({
      deviceId: devId,
      success: (res) => {
        Taro.hideLoading(); // 隐藏 loading
        let log = textLog + "配对成功，获取服务... \n";
        setTextLog(log);
        setConnected(true);
        setName(name);
        setDevId(devId);
        getBLEDeviceServices(devId);
      },
      fail: (res) => {
        Taro.hideLoading(); // 隐藏 loading
        let log = textLog + "连接失败，错误码：" + res.errCode + " \n";
        setTextLog(log);
        if (res.errCode === 10012) {
          Taro.showModal("连接超时，请重试！");
        } else if (res.errCode === 10013) {
          Taro.showModal("连接失败，蓝牙地址无效！");
        } else {
          Taro.showModal("连接失败，请重试！"); // + err.errCode10003原因多种：蓝牙设备未开启或异常导致无法连接;蓝牙设备被占用或者上次蓝牙连接未断开导致无法连接
        }
        closeBLEConnection();
      },
    });
    stopBluetoothDevicesDiscovery(); // 停止搜索
  };

  // 断开与低功耗蓝牙设备的连接
  const closeBLEConnection = () => {
    Taro.closeBLEConnection({
      deviceId: devId,
    });
    setConnected(false);
    setChs([]);
    setCanWrite(false);
  };

  // 获取蓝牙设备所有 service (服务)
  const getBLEDeviceServices = (devId) => {
    Taro.getBLEDeviceServices({
      deviceId: devId,
      success: (res) => {
        for (let i = 0; i < res.services.length; i++) {
          // 该服务是否为主服务
          if (res.services[i].isPrimary) {
            let log = textLog + "该服务是为主服务UUID：" + res.services[i].uuid + " \n";
            setTextLog(log);
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
            <text>{textLog}</text>
          </ScrollView>
        </div>
        <div className='scanView'>
          <van-button type="warning" onClick={startClear}>清空log日志</van-button>
          <van-button type="primary" onClick={startScan}>扫描蓝牙设备</van-button>
        </div>
        <div className='devicesSummary'>已发现 {devices.length} 个外围设备：</div>
        <ScrollView className='deviceList' scrollY scrollWithAnimation>
          {
            devices.map((item, index) => {
              return (
                <div key={index} onClick={() => createBLEConnection(item)} className='deviceItem'>
                  <div className='a'>{item.name}</div>
                  <div>信号强度: {item.RSSI}dBm ({handleMax(0, item.RSSI + 100)}%)</div>
                  <div className='c'>deviceId: {item.deviceId}</div>
                  {/* 当前蓝牙设备的广播数据段中的 ServiceUUIDs 数据段 */}
                  <div>Service数量: {handleLen(item.advertisServiceUUIDs)}</div>
                </div>
              );
            })
          }
        </ScrollView>
      </div>
    </>
  );
};

export default Index;