const getRequestUrl = (url) => {
  let BASE_URL = '';
  let env = process.env.NODE_ENV;
  if (env === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    BASE_URL = "https://ml-test.aiwobeauty.com/api";
  } else if (env === 'test') {
    //预发环境
    BASE_URL = "https://ml-pre.aiwobeauty.com/api";
  } else {
    // 生产环境
    BASE_URL = "https://ml.aiwobeauty.com/api";
  }
  return BASE_URL;
};
export default getRequestUrl;