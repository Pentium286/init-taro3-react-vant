export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pages/mine/index',
    'pages/home/index',
    'pages/user/index',
    'pages/index/index',
    'pages/cart/index',
    'pages/camera/index',
    'pages/test/icon/index',
    'pages/test/api/index',
    'pages/test/example/index',
  ],
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/main/index',
        text: '首页',
        iconPath: 'assets/images/tabs/index@2x.png',
        selectedIconPath: 'assets/images/tabs/indexActive@2x.png'
      },
      {
        pagePath: 'pages/home/index',
        text: '主页',
        iconPath: 'assets/images/tabs/index@3x.png',
        selectedIconPath: 'assets/images/tabs/indexActive@3x.png',
      },
      {
        pagePath: 'pages/index/index',
        text: '',
        iconPath: 'assets/images/tabs/tabCode.png',
        selectedIconPath: 'assets/images/tabs/tabCode.png'
      },
      {
        pagePath: 'pages/user/index',
        text: '用户',
        iconPath: 'assets/images/tabs/user@3x.png',
        selectedIconPath: 'assets/images/tabs/userActive@3x.png'
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
    {
      "root": "packageC",
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
    "van-row": "@c/vant-weapp/row/index",
    "van-col": "@c/vant-weapp/col/index",
    "van-tab": "@c/vant-weapp/tab/index",
    "van-tabs": "@c/vant-weapp/tabs/index",
    "van-tabbar": "@c/vant-weapp/tabbar/index",
    "van-tabbar-item": "@c/vant-weapp/tabbar-item/index",
  },
  lazyCodeLoading: "requiredComponents",
});
