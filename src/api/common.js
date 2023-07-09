// 通用
import Taro from '@tarojs/taro';
import { showToast } from '@u/message';
import request from '@u/request';
import { Base64 } from 'js-base64';
import crypto from 'crypto-js';

// 更新版本
export function updateVersion() {
  if (!Taro.canIUse('getUpdateManager')) {
    return;
  }
  const update = Taro.getUpdateManager();
  update.onCheckForUpdate(res => {
    if (res.hasUpdate) {
      Taro.showLoading({
        title: '更新下载中...',
      });
    }
  });
  update.onUpdateReady(() => {
    Taro.hideLoading();
    Taro.showModal({
      title: '更新提示',
      content: '新版本已经准备好，请重启应用',
      showCancel: false,
      success(res) {
        update.applyUpdate();
      }
    });
  });
  update.onUpdateFailed((res) => {
    Taro.hideLoading();
    showToast('下载失败');
  });
}

// 上传图片
export async function uploadImg(tempFilePaths) {
  const formData = await getFormDataParams(tempFilePaths);
  return new Promise((resolve) => {
    return Taro.uploadFile({
      url: "https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com",
      filePath: tempFilePaths,
      header: { "Content-Type": "multipart/form-data" },
      name: 'file',
      formData,
      success: (res) => {
        if (res.statusCode == '204') {
          resolve(formData);
          // const path = `${data.baseUrl}/${formData.key}`
        } else {
          showToast('上传图片失败');
        }
      },
      fail: (err) => {
      }
    });
  });

}

// 获取上传图片到oss参数
const getFormDataParams = async (filePath) => {
  const date = new Date().getTime();
  const length = filePath.split('/').length;
  let fileName = filePath.split('/')[length - 1];
  const info = await request({
    url: '/aiwo-plat-oss/sts/getStsToken',
    isLoading: false,
  });
  const policy = await getPolicy();
  const signature = computeSignature(info.accessKeySecret, policy);
  const formData = {
    key: `aiwo-platform/compass-source/image/${date}_${fileName}`,
    policy,
    OSSAccessKeyId: info.accessKeyId,
    signature,
    'x-oss-security-token': info.securityToken
  };
  return formData;
};

// 获取policy
const getPolicy = () => {
  const date = new Date();
  date.setHours(date.getHours() + 1);
  const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
      // 限制上传大小。
      ["content-length-range", 0, 50 * 1024 * 1024],
    ]
  };
  //  policy必须为base64的string
  return Base64.encode(JSON.stringify(policyText));
};

// 签名
const computeSignature = (accessKeySecret, canonicalString) => {
  return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
};

//主函数，默认限制大小4mb,drawWidth是绘画区域的大小
//初始值传入为画布自身的边长（我们这是一个正方形的画布）
export const getLessLimitSizeImage = (canvasId, imagePath, limitSize = 2, drawWidth, callback) => {
  //判断图片尺寸是否满足要求
  imageSizeIsLessLimitSize(imagePath, limitSize,
    (lessRes) => {
      //满足要求走callback，将压缩后的文件路径返回
      callback(imagePath);
    },
    (moreRes) => {
      //不满足要求需要压缩的时候
      Taro.getImageInfo({
        src: imagePath,
        success: (imageInfo) => {
          let maxSide = Math.max(imageInfo.width, imageInfo.height);
          let windowW = drawWidth;
          let scale = 1;
          /*
          这里的目的是当绘画区域缩小的比图片自身尺寸还要小的时候
          取图片长宽的最大值，然后和当前绘画区域计算出需要放缩的比例
          然后再画经过放缩后的尺寸，保证画出的一定是一个完整的图片。由于每次递归绘画区域都会缩小，
          所以不用担心scale永远都是1绘画尺寸永远不变的情况，只要不满足压缩后体积的要求
          就会缩小绘画区域，早晚会有绘画区域小于图片尺寸的情况发生
          */
          if (maxSide > windowW) {
            scale = windowW / maxSide;
          }
          //trunc是去掉小数
          let imageW = Math.trunc(imageInfo.width * scale);
          let imageH = Math.trunc(imageInfo.height * scale);
          console.log('调用压缩', imageW, imageH);
          //图片在规定绘画区域上画并获取新的图片的path
          getCanvasImage(canvasId, imagePath, imageW, imageH,
            (pressImgPath) => {
              /*
              再去检查是否满足要求，始终缩小绘画区域，让图片适配绘画区域
              这里乘以0.95是必须的，如果不缩小绘画区域，会出现尺寸比绘画区域小，
              而体积比要求压缩体积大的情况出现，就会无穷递归下去，因为scale的值永远是1
              但0.95不是固定的，你可以根据需要自己改，0到1之间，越小则绘画区域缩小的越快
              但不建议取得太小，绘画区域缩小的太快，压出来的将总是很糊的
              */
              getLessLimitSizeImage(canvasId, pressImgPath, limitSize, drawWidth * 0.95, callback);
            });
        }
      });
    }
  );
};

// 压缩图片
//判断图片大小是否满足需求,limitSize的单位是kb
const imageSizeIsLessLimitSize = (imagePath, limitSize, lessCallback, moreCallback) => {
  //获取文件信息
  Taro.getFileInfo({
    filePath: imagePath,
    success: (res) => {
      console.log("压缩前图片大小", res.size / 1024, 'kb');
      //如果图片太大了走moreCallback
      if (res.size > 1024 * 1024 * limitSize) {
        moreCallback();
      } else {
        //图片满足要求了走lessCallback
        lessCallback();
      }
    }
  });
};

//将图片画在画布上并获取画好之后的图片的路径
const getCanvasImage = (canvasId, imagePath, imageW, imageH, getImgSuccess) => {
  //创建画布内容
  const ctx = Taro.createCanvasContext(canvasId);
  //图片画上去，imageW和imageH是画上去的尺寸，图像和画布间隔都是0
  ctx.drawImage(imagePath, 0, 0, imageW, imageH);
  //这里一定要加定时器，给足够的时间去画（所以每次递归最少要耗时200ms，多次递归很耗时！）
  ctx.draw(false, setTimeout(function () {
    Taro.canvasToTempFilePath({
      canvasId: canvasId,
      x: 0,
      y: 0,
      width: imageW,
      height: imageH,
      quality: 1, //最高质量，只通过尺寸放缩去压缩，画的时候都按最高质量来画
      success: (res) => {
        getImgSuccess(res.tempFilePath);
      }
    });
  }, 200));
};

// 获取二维码参数
export function getWxCode(scene) {
  const id = decodeURIComponent(scene).replace(/wxacodeId=/, '');
  return request({
    url: '/aiwo-aiot-service/shareWxCode/getShareWxCode',
    method: "GET",
    cookies: null,
    data: { id }
  });
}

// 微信获取设置页面 type : open:打开设置页面,get:获取
export function openSetting(type, successCall, errCallBack) {
  Taro[type == 'open' ? 'openSetting' : 'getSetting']({
    success: openSettingRes => {
      console.log({ openSettingRes });
      successCall && successCall(openSettingRes);
    },
    fail: openSettingErr => {
      console.log({ openSettingErr });
      errCallBack && errCallBack(openSettingErr);
    }
  });
}

// 授权
export function authorize(scope, successCall, errCallBack) {
  Taro.authorize({
    scope,
    success(result) {
      successCall && successCall(result);
    },
    fail(err) {
      errCallBack && errCallBack(err);
    }
  });
}