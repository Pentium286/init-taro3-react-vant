import request from '@u/request';

const api = {
  // 测试接口
  createGzhAuthLink() {
    return request({
      url: '/aiwo-wechat-third-platform/wxPlatform/createGzhAuthLink',
      method: 'GET',
    });
  },
};

export default api;