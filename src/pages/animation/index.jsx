import Taro, { useDidHide, useDidShow, useLoad, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(false);

  const handleTop = () => {
    if (!top) {
      setTop(true);
      setBottom(true);
    } else {
      setTop(false);
      setBottom(false);
    }
  };

  const handleBottom = () => {
    if (!bottom) {
      setTop(true);
      setBottom(true);
    } else {
      setTop(false);
      setBottom(false);
    }
  };

  const handleBtn = () => {
    console.log("handleBtn");
  };

  return (
    <div className='animationPage'>
      <div className='animationBox'>
        <div className='animation1Box'>
          <div className={`animation1 ${top ? "scale-down-ver-top" : "scale-up-ver-top"}`} onClick={handleTop}></div>
          <h2 className='title'>家用智能头皮仪</h2>
          <div className='icon'>箭头</div>
          <div className='text'>已连接</div>
          <div className='img'>我是图片</div>
          <van-button className="btn" type="primary" round onClick={handleBtn}>开始护理</van-button>
        </div>
        <div className={`animation2 ${bottom ? "scale-up-ver-bottom" : "scale-down-ver-bottom"}`} onClick={handleBottom}></div>
      </div>
    </div>
  );
};

export default Index;