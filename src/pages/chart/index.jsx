import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { Component } from 'react';
import './index.less';

import { View, Canvas } from '@tarojs/components';
import uCharts from '@qiun/ucharts';

let uChartsInstance = {};

export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      cWidth: 750,
      cHeight: 500,
      pixelRatio: 1,
    };
  }

  componentDidMount() {
    const sysInfo = Taro.getSystemInfoSync();
    let pixelRatio = 1;
    //这里的第一个 750 对应 css .charts 的 width
    let cWidth = 750 / 750 * sysInfo.windowWidth;
    //这里的 500 对应 css .charts 的 height
    let cHeight = 500 / 750 * sysInfo.windowWidth;
    //注意：[支付宝小程序]如果需要在高 DPR（devicePixelRatio）下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩小，例如：
    // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
    //   pixelRatio = sysInfo.pixelRatio;
    //   cWidth = cWidth * pixelRatio;
    //   cHeight = cHeight * pixelRatio;
    // }
    this.setState({ cWidth, cHeight, pixelRatio }, () => this.getServerData());
  }

  getServerData = () => {
    //模拟从服务器获取数据时的延时
    setTimeout(() => {
      //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
      let res = {
        categories: ["维度1", "维度2", "维度3", "维度4", "维度5", "维度6"],
        series: [
          {
            name: "成交量1",
            data: [90, 110, 165, 195, 187, 172]
          },
          {
            name: "成交量2",
            data: [190, 210, 105, 35, 27, 102]
          }
        ]
      };
      this.drawCharts('mFLGkPtaXqpdxQamQthASCwCyjPhLnsl', res);
    }, 500);
  };

  drawCharts = (id, data) => {
    const { cWidth, cHeight, pixelRatio } = this.state;
    let ctx = Taro.createCanvasContext(id);
    uChartsInstance[id] = new uCharts({
      type: "radar",
      context: ctx,
      width: cWidth,
      height: cHeight,
      categories: data.categories,
      series: data.series,
      pixelRatio: pixelRatio,
      animation: true,
      background: "#FFFFFF",
      color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
      padding: [5, 5, 5, 5],
      dataLabel: false,
      enableScroll: false,
      legend: {
        show: true,
        position: "right",
        lineHeight: 25
      },
      extra: {
        radar: {
          gridType: "radar",
          gridColor: "#CCCCCC",
          gridCount: 3,
          opacity: 0.2,
          max: 200,
          labelShow: true,
          border: true
        }
      }
    });
  };

  tap = (e) => {
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  };

  render() {
    //注意：[支付宝小程序]如果需要在高 DPR（devicePixelRatio）下取得更细腻的显示，需要先将 canvas 用属性设置放大，用样式缩小，例如：
    // const { cWidth, cHeight, pixelRatio } = this.state;
    // let canvasProps = {};
    // if (Taro.getEnv() === Taro.ENV_TYPE.ALIPAY){
    //   canvasProps = { width: cWidth, height: cHeight };
    // }
    return (
      <View>
        <Canvas
          // {...canvasProps}
          canvas-id="mFLGkPtaXqpdxQamQthASCwCyjPhLnsl"
          id="mFLGkPtaXqpdxQamQthASCwCyjPhLnsl"
          class="charts"
          onTouchEnd={this.tap} />
      </View>
    );
  };
};