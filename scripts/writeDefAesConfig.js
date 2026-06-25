import { writeFile } from 'fs/promises';

import moment from 'moment';

import CharIndexMapper from '../src/lib/chartMapper.js';

/** AES 密钥 每次新建项目都要与后台同步 */
const AES_KEY = 'JgWusXvC5fbofEac';
/** AES 初始化向量 每次新建项目都要与后台同步*/
const AES_IV = 'E5qyLpVMwTF2nzw4';
/** 输出文件路径 */
const OUT_PATH = 'src/auth.config.js';

const SEED = Date.now().toString();

export const writeDefAesConfig = async () => {
  const m = new CharIndexMapper(undefined, SEED);

  const ivIndexes = m.getIndexes(AES_IV);
  const keyIndexes = m.getIndexes(AES_KEY);

  const str = `/**
 * AES加密配置文件
 * 本文件由【writeDefAesConfig.js】脚本生成，不要手动修改
 * 生成时间: ${moment().format('YYYY-MM-DD HH:mm:ss')}
 */
import _C0x1a2b from '@/lib/chartMapper.js';

const _c0x1a2b = (() => {
  const _c0x1a2b = new _C0x1a2b(undefined, '${SEED}');
  _c0x1a2b._c0x1a2t = _c0x1a2b.getText;
  return _c0x1a2b;
})();

/**
 * AES 密钥下标数组
 * @type {number[]}
 */
const aa = [${keyIndexes.join(', ')}];

/**
 * AES 初始化向量下标数组
 * @type {number[]}
 */
const bb = [${ivIndexes.join(', ')}];

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
`;

  try {
    await writeFile(OUT_PATH, str, { flag: 'w' });
    console.log(`写入 【${OUT_PATH}】 成功`);
  } catch (error) {
    console.error(`写入 【${OUT_PATH}】 失败:`, error);
    process.exit(1);
  }
};
