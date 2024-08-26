export default defineAppConfig({
  pages: [
    'pages/main/index',
    'pages/mine/index',
    'pages/home/index',
    'pages/user/index',
    'pages/index/index',
    'pages/cart/index',
    'pages/camera/index',
    'pages/bluetooth/index',
    'pages/bluetoothPage/index',
    'pages/bluetoothPageNew/index',
    'pages/bluetoothSplit/index',
    'pages/animation/index',
    'pages/test/icon/index',
    'pages/test/api/index',
    'pages/test/example/index',
    'pages/eventStream/index',
    'pages/chart/index',
    'pages/navigationBar/index',
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
        iconPath: 'assets/images/tabs/tabbar_home.png',
        selectedIconPath: 'assets/images/tabs/tabbar_home_on.png',
      },
      {
        pagePath: 'pages/home/index',
        text: '主页',
        iconPath: 'assets/images/tabs/tabbar_cate.png',
        selectedIconPath: 'assets/images/tabs/tabbar_cate_on.png',
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
        iconPath: 'assets/images/tabs/tabbar_cart.png',
        selectedIconPath: 'assets/images/tabs/tabbar_cart_on.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/images/tabs/tabbar_my.png',
        selectedIconPath: 'assets/images/tabs/tabbar_my_on.png',
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
    'van-button': '@vant/button/index',
    "van-icon": '@vant/icon/index',
    "van-goods-action": "@vant/goods-action/index",
    "van-goods-action-icon": "@vant/goods-action-icon/index",
    "van-goods-action-button": "@vant/goods-action-button/index",
    "van-row": "@vant/row/index",
    "van-col": "@vant/col/index",
    "van-tab": "@vant/tab/index",
    "van-tabs": "@vant/tabs/index",
    "van-tabbar": "@vant/tabbar/index",
    "van-tabbar-item": "@vant/tabbar-item/index",
    "van-datetime-picker": "@vant/datetime-picker/index",
    "van-field": "@vant/field/index",
    "van-cell": "@vant/cell/index",
    "van-cell-group": "@vant/cell-group/index",
    "van-nav-bar": "@vant/nav-bar/index",
  },
  lazyCodeLoading: "requiredComponents",
});
