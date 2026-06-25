/**
 * 缓存的 Key 全局配置
 */
export const CacheKey = {
  /**
   * token Key
   */
  TokenKey: 'TOKEN',
  /**
   * carnet Key
   */
  CarnetKey: 'CARNET',
  /**
   * 请求重复提交key
   */
  ReqDuplicateSubmitKey: 'REQ_DUPLICATE_SUBMIT',
  /**
   * 是否启用加密 Key
   */
  CryptoEnabledKey: 'CRYPTO_ENABLED',
  /**
   * 记住密码
   */
  RememberPassword: 'REMEMBER_PASSWORD'
};

/**
 * 退出登录时不需要清除的缓存的Key
 */
export const notClearCacheKeyOnLogout = [`RememberPassword`];

const keyPrefix = import.meta.env.VITE_APP_KEY_PREFIX;
// 给有初始Key 的key 赋值
Object.keys(CacheKey).forEach((key) => {
  CacheKey[key] = `${keyPrefix}-${CacheKey[key]}`;
});

/**
 * 修改缓存的Key 值
 * @param key {'TokenKey' | 'CarnetKey'}
 * @param callback {String | Function}
 */
export function setCacheKey(key, callback) {
  if (typeof callback === 'function') {
    CacheKey[key] = callback(CacheKey[key]);
    return;
  }
  CacheKey[key] = callback;
}

export function clearCache() {
  for (const k in CacheKey) {
    if (notClearCacheKeyOnLogout.includes(k)) continue;
    uni.removeStorageSync(CacheKey[k]);
  }
}
// 癌种评估表单版本 癌种（1：肺癌，2：结直肠癌）：版本
export const CancerTypeEvaluateVersionKey = {
  1: 2,
  2: 1
};
