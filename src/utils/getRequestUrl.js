const getRequestUrl = (url) => {
  let BASE_URL = '';
  if (process.env.NODE_ENV === 'development') {
    //开发环境 - 根据请求不同返回不同的BASE_URL
    BASE_URL = "http://10.20.30.37:8001/payee-service/api/v1";
  } else {
    // 生产环境
    BASE_URL = "http://10.20.30.37:8001/payee-service/api/v1";
  }
  return BASE_URL;
};

export default getRequestUrl;