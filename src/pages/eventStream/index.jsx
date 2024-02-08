import Taro, { useDidHide, useDidShow, usePullDownRefresh, useReady } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import './index.less';

const Index = () => {
  const [textStr, setTextStr] = useState("");

  // 可以使用所有的 React Hooks
  useEffect(() => { });

  // 对应 onReady
  useReady(() => { });

  // 对应 onShow
  useDidShow(() => { });

  // 对应 onHide
  useDidHide(() => { });

  // Taro 对所有小程序页面生命周期都实现了对应的自定义 React Hooks 进行支持
  // 详情可查阅：【Hooks】
  usePullDownRefresh(() => { });

  const getMessage = async () => {
    // 接口请求
    let params = {
      history: [],
      prompt: "枸杞",
    };

    let readedStr = '';
    const requestTask = wx.request({
      url: 'https://ml-test.aiwobeauty.com/api/aiwo-product-manual/chatGPTQA/huatuo_stream',
      responseType: "arraybuffer",
      method: 'POST',
      enableChunked: true,
      header: {
        'content-type': 'application/json'
      },
      data: params,
      success: (res) => {
        console.log("request success", res);
      },
      fail: (err) => {
        console.log("request fail", err);
      },
      complete: (res) => {
        console.log("request complete", res);
      }
    });
    requestTask.onHeadersReceived(function (res) {
      console.log("onHeadersReceived: ", res);
    });
    requestTask.onChunkReceived(function (res) {
      let decoder = new TextDecoder('utf-8');
      let str = decoder.decode(new Uint8Array(res.data));
      // console.log(str);
      readedStr += str || "";
      // console.log(readedStr);
      setTextStr(readedStr);

      // let en = String.fromCharCode.apply(null, new Uint8Array(res.data));
      // let de = decodeURIComponent(escape(en));
      // console.log(de);

      // console.log("onChunkReceived", str);

      // const data16 = that.buf2hex(res.data);	// ArrayBuffer转16进制
      // const requestData = that.hexToStr(data16); // 16进制转字符串
      // console.log(requestData);
      // that.res += requestData;
    });

  };

  return (
    <>
      <div className='eventStream'>
        {textStr}
      </div>
      <button onClick={getMessage}>触发</button>
    </>
  );
};

export default Index;