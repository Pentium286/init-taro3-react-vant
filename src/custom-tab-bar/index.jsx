import Taro from '@tarojs/taro';
import { Component } from 'react';
import './index.less';

export default class CustomTabbar extends Component {
  state = {
    active: 0,
    list: [
      {
        pagePath: '/pages/main/index',
        text: '首页',
        iconPath: '../assets/images/tabs/tabbar_home.png',
        selectedIconPath: '../assets/images/tabs/tabbar_home_on.png',
      },
      {
        pagePath: '/pages/home/index',
        text: '主页',
        iconPath: '../assets/images/tabs/tabbar_cate.png',
        selectedIconPath: '../assets/images/tabs/tabbar_cate_on.png',
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
        iconPath: '../assets/images/tabs/tabbar_cart.png',
        selectedIconPath: '../assets/images/tabs/tabbar_cart_on.png'
      },
      {
        pagePath: '/pages/mine/index',
        text: '我的',
        iconPath: '../assets/images/tabs/tabbar_my.png',
        selectedIconPath: '../assets/images/tabs/tabbar_my_on.png',
      },
    ],
  };

  onChange = (event) => {
    const { list } = this.state;
    Taro.switchTab({
      url: list[event.detail].pagePath,
    });
  };

  render() {
    const { active, list } = this.state;

    return (
      <van-tabbar active={active} onChange={this.onChange}>
        {
          list.map((item, index) => {
            return (
              <van-tabbar-item>
                <img
                  className={`normal_${index}`}
                  slot="icon"
                  src={active === index ? item.selectedIconPath : item.iconPath}
                  mode="aspectFit"
                />
                <p className='tabbarText'>{item.text}</p>
              </van-tabbar-item>
            );
          })
        }
      </van-tabbar>
    );
  }
}