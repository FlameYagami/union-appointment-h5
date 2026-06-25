// 加密  export function
import { def_initial, def_kernel } from '@/utils/auth/auth';
import CryptoJS from 'crypto-js';

export function encrypt(content, keyStr, ivStr) {
  keyStr = keyStr || def_kernel();
  ivStr = ivStr || def_initial();
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  const sourceContent = CryptoJS.enc.Utf8.parse(content);
  const encrypted = CryptoJS.AES.encrypt(sourceContent, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}

// 解密
export function decrypt(content, keyStr, ivStr) {
  if (!content) return;
  keyStr = keyStr || def_kernel();
  ivStr = ivStr || def_initial();
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  const hexContent = CryptoJS.enc.Hex.parse(content);
  const base64Content = CryptoJS.enc.Base64.stringify(hexContent);
  const decrypt = CryptoJS.AES.decrypt(base64Content, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

// 获取当前时间
export function formatLongDate(date) {
  let myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();
  let myHour = date.getHours();
  let myMin = date.getMinutes();
  let mySec = date.getSeconds();

  if (mymonth < 10) {
    mymonth = '0' + mymonth;
  }
  if (myweekday < 10) {
    myweekday = '0' + myweekday;
  }
  if (myHour < 10) {
    myHour = '0' + myHour;
  }
  if (myMin < 10) {
    myMin = '0' + myMin;
  }
  if (mySec < 10) {
    mySec = '0' + mySec;
  }
  return myyear + '' + mymonth + '' + myweekday + '' + myHour + '' + myMin + '' + mySec;
}
