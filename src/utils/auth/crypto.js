import {
  CacheKey
} from '@/config/cache-key.config';
import CryptoJS from 'crypto-js';
import {
  def_initial,
  def_kernel
} from './auth';

/**
 * AES加密
 * @param content
 * @param {string?} keyStr
 * @param {string?} ivStr
 * @returns {string}
 */
export function handleEncryptData(content, keyStr, ivStr) {
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

/**
 * AES解密
 * @param content
 * @param {string?} keyStr
 * @param {string?} ivStr
 * @returns {string}
 */
export function handleDecryptData(content, keyStr, ivStr) {
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

/**
 * base64加密
 * @param content
 * @returns {string}
 */
export function encodeBase64(content) {
  const wordArray = CryptoJS.enc.Utf8.parse(content);
  return CryptoJS.enc.Base64.stringify(wordArray);
}

/**
 * base64解密
 * @param content
 * @returns {string}
 */
export function decodeBase64(content) {
  const wordArray = CryptoJS.enc.Base64.parse(content);
  return wordArray.toString(CryptoJS.enc.Utf8);
}

/**
 * 哈希加密
 * @param content
 * @returns {*}
 */
export function hashEncryptData(content) {
  if (content === '') return '';
  return CryptoJS.SHA256(content).toString(CryptoJS.enc.Hex);
}

/**
 * 获取是否需要加密
 * @returns {*|string}
 */
export function getCryptoEnabled() {
  return uni.getStorageSync(CacheKey.CryptoEnabledKey) || '0';
}

/**
 * 设置是否需要加密
 * @returns {*|string}
 */
export function setCryptoEnabled(content) {
  return uni.setStorageSync(CacheKey.CryptoEnabledKey, content);
}
