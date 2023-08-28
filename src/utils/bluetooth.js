// 字符串转byte
export const stringToBytes = (str) => {
  let strArray = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    strArray[i] = str.charCodeAt(i);
  }
  const array = new Uint8Array(strArray.length);
  strArray.forEach((item, index) => array[index] = item);
  return array.buffer;
};

// ArrayBuffer转16进制字符串示例
export const ab2hext = (buffer) => {
  let hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    (bit) => {
      return ('00' + bit.toString(16)).slice(-2);
    }
  );
  return hexArr.join("");
};

// 16进制转字符串
export const hexToString = (str) => {
  let trimedStr = str.trim();
  let rawStr = trimedStr.substr(0, 2).toLowerCase() === "0x" ? trimedStr.substr(2) : trimedStr;
  let len = rawStr.length;
  if (len % 2 !== 0) {
    // alert("Illegal Format ASCII Code!");
    return "";
  }
  let curCharCode;
  let resultStr = [];
  for (let i = 0; i < len; i = i + 2) {
    curCharCode = parseInt(rawStr.substr(i, 2), 16); // ASCII Code Value
    resultStr.push(String.fromCharCode(curCharCode));
  }
  return resultStr.join("");
};

// 微信 app 版本比较
export const versionCompare = (ver1, ver2) => {
  let version1pre = parseFloat(ver1);
  let version2pre = parseFloat(ver2);
  let version1next = parseInt(ver1.replace(version1pre + ".", ""));
  let version2next = parseInt(ver2.replace(version2pre + ".", ""));
  if (version1pre > version2pre)
    return true;
  else if (version1pre < version2pre)
    return false;
  else {
    if (version1next > version2next)
      return true;
    else
      return false;
  }
};