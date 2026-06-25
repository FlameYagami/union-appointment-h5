import { CacheKey } from '@/config/cache-key.config';
import { handleDecryptData, handleEncryptData } from '@/utils/auth/crypto';
import RETRY from '@/auth.config.js';

const authUtils = (() => {
  return {
    def_kernel: () => RETRY.KERNEL_STR(),
    def_initial: () => RETRY.INITIAL_STR(),
    kernel: () => authUtils.getCarnet()?.split?.('|')?.[0] || '',
    initial: () => authUtils.getCarnet()?.split?.('|')?.[1] || '',
    getToken: () => {
      const token = uni.getStorageSync(CacheKey.TokenKey);
      if (!token) return '';
      return handleDecryptData(token, authUtils.def_kernel(), authUtils.def_initial());
    },
    setToken: (token) => {
      const encryptToken = handleEncryptData(token, authUtils.def_kernel(), authUtils.def_initial());
      return uni.setStorageSync(CacheKey.TokenKey, encryptToken);
    },
    removeToken: () => uni.removeStorageSync(CacheKey.TokenKey),
    getCarnet: () => {
      const carnet = uni.getStorageSync(CacheKey.CarnetKey);
      if (!carnet) return '';
      return handleDecryptData(carnet, authUtils.def_kernel(), authUtils.def_initial());
    },
    setCarnet: (carnet) => {
      const encryptCarnet = handleEncryptData(carnet, authUtils.def_kernel(), authUtils.def_initial());
      return uni.setStorageSync(CacheKey.CarnetKey, encryptCarnet);
    },
    removeCarnet: () => uni.removeStorageSync(CacheKey.CarnetKey)
  };
})();

export const {
  def_kernel,
  def_initial,
  kernel,
  initial,
  getToken,
  setToken,
  removeToken,
  getCarnet,
  setCarnet,
  removeCarnet
} = authUtils;

export default authUtils;
