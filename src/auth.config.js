/**
 * AES加密配置文件
 * 本文件由【writeDefAesConfig.js】脚本生成，不要手动修改
 * 生成时间: 2026-06-25 16:22:58
 */
import _C0x1a2b from '@/lib/chartMapper.js';

const _c0x1a2b = (() => {
  const _c0x1a2b = new _C0x1a2b(undefined, '1782375778377');
  _c0x1a2b._c0x1a2t = _c0x1a2b.getText;
  return _c0x1a2b;
})();

/**
 * AES 密钥下标数组
 * @type {number[]}
 */
const aa = [17, 24, 45, 9, 32, 34, 5, 42, 39, 58, 37, 50, 58, 30, 7, 61];

/**
 * AES 初始化向量下标数组
 * @type {number[]}
 */
const bb = [30, 39, 38, 8, 22, 46, 36, 53, 26, 3, 18, 60, 43, 48, 26, 12];

/**
 * AES 密钥
 * @type {function(): string}
 */
const KERNEL_STR = (() => {
  const _0x1a2b = _c0x1a2b._c0x1a2t(aa);
  return () => _0x1a2b;
})();

/**
 * AES 初始化向量
 * @type {function(): string}
 */
const INITIAL_STR = (() => {
  const _0x1a2b = _c0x1a2b._c0x1a2t(bb);
  return () => _0x1a2b;
})();

export default {
  KERNEL_STR,
  INITIAL_STR
};
