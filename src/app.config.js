export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pages/mine/index',
    'pages/index/index',
    'pages/test/icon/index',
    'pages/test/api/index',
  ],
  tabBar: {
    color: '#999999',
    selectedColor: '#333',
    list: [
      {
        pagePath: 'pages/main/index',
        text: '首页',
        iconPath: 'assets/images/tabs/index@2x.png',
        selectedIconPath: 'assets/images/tabs/indexActive@2x.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/images/tabs/user@2x.png',
        selectedIconPath: 'assets/images/tabs/userActive@2x.png'
      },
    ]
  },
  subpackages: [
    {
      "root": "packageA",
      "pages": [
        'pages/mine/test/index',
      ]
    },
    {
      "root": "packageB",
      "pages": [
        'pages/redPacketRain/index',
      ]
    },
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents: {
    'van-button': '@c/vant-weapp/button/index',
    "van-icon": '@c/vant-weapp/icon/index',
    "van-goods-action": "@c/vant-weapp/goods-action/index",
    "van-goods-action-icon": "@c/vant-weapp/goods-action-icon/index",
    "van-goods-action-button": "@c/vant-weapp/goods-action-button/index",
    "jbs-red-packet-rain": "@c/jbs-weapp/red-packet-rain/index",
  },
});
