import Taro from '@tarojs/taro';
import { useState } from 'react';
import './index.less';

const switchTab = "switchTab";
const list = [
  {
    pagePath: '/pages/main/index',
    text: '首页',
    iconPath: '../assets/images/tabs/index@2x.png',
    selectedIconPath: '../assets/images/tabs/indexActive@2x.png',
  },
  {
    pagePath: '/pages/home/index',
    text: '主页',
    iconPath: '../assets/images/tabs/index@3x.png',
    selectedIconPath: '../assets/images/tabs/indexActive@3x.png',
  },
  {
    pagePath: '/pages/index/index',
    text: '',
    iconPath: '../assets/images/tabs/tabCode.png',
    selectedIconPath: '../assets/images/tabs/tabCode.png',
  },
  {
    pagePath: '/pages/user/index',
    text: '用户',
    iconPath: '../assets/images/tabs/user@3x.png',
    selectedIconPath: '../assets/images/tabs/userActive@3x.png'
  },
  {
    pagePath: '/pages/mine/index',
    text: '我的',
    iconPath: '../assets/images/tabs/user@2x.png',
    selectedIconPath: '../assets/images/tabs/userActive@2x.png',
  },
];

const CustomTabbar = () => {
  const [active, setActive] = useState("/pages/main/index");

  const onChange = (event) => {
    setActive(event.detail);
  };

  return (
    <van-tabbar active={active} onChange={onChange}>
      {
        list.map((item, index) => {
          return (
            <van-tabbar-item
              url={item.pagePath}
              link-type={switchTab}
              name={item.pagePath}
            >
              <img
                className={`normal_${index}`}
                slot="icon"
                src={item.iconPath}
                mode="aspectFit"
              />
              <p className='tabbarText'>{item.text}</p>
            </van-tabbar-item>
          );
        })
      }
    </van-tabbar>
  );
};

export default CustomTabbar;