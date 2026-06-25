/* eslint-disable no-param-reassign */
import { handleEncryptData, getCryptoEnabled } from '@/utils/auth/crypto';
import { md5 } from 'js-md5';
import qs from 'qs';
import { platform } from '@/utils/platform';
import { getEnvBaseUrl } from '@/utils';
import { initial, kernel, getToken } from '@/utils/auth/auth';
import { CacheKey } from '@/config/cache-key.config';

export type CustomRequestOptions = UniApp.RequestOptions & {
  query?: Record<string, any> /** 出错时是否隐藏错误提示 */;
  hideErrorToast?: boolean /** 是否阻止重复提交 */;
  preventRepeatSubmit?: boolean /** 是否需要token */;
  isToken: boolean;
} & IUniUploadFileOptions; // 添加uni.uploadFile参数类型

const requestCommonConfig = {
  /* 超时 */
  timeout: 60000
};
/* 不需要拼接/api的白名单 */
const apiPrefixWhiteList = ['/package.json'];
const encryptWhiteList = [
  /* 登录接口 */
  '/wx-staff/login',
  /* 滑动验证获取 */
  '/captcha/get',
  /* 滑动验证校验 */
  '/captcha/check',
  '/wx-staff/user/password/forget',
  '/wx-staff/sms/password/forget'
];
/* 需要加密的请求方式 */
const CryptoEnabledConfigMethods = [
  'post',
  'put',
  'patch',
  'delete',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
];

// 请求基准地址
const baseUrl = getEnvBaseUrl();

/* 重复提交间隔时间(ms)，小于此时间视为重复提交 */
const requestRepeatSubmitInterval = 1000;

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: CustomRequestOptions) {
    // 接口请求支持通过 query 参数配置 queryString
    if (options.params) {
      const queryStr = qs.stringify(options.params);
      options.url += options.url.includes('?') ? `&${queryStr}` : `?${queryStr}`;
    }
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseUrl + options.url;

      // 检查是否需要移除/api前缀
      // for (const pattern of apiPrefixWhiteList) {
      //   if (options.url.includes(pattern)) {
      //     options.url = options.url.replace('/api', '');
      //     // options.url = tUrl;
      //     break;
      //   }
      // }
    }
    // 1. 请求超时
    options.timeout = requestCommonConfig.timeout; // 10s
    // 2. （可选）添加小程序端请求头标识
    options.header = {
      /* 可选，与 uniapp 定义的平台一致，告诉后台来源 */
      platform,
      ...options.header,
      'Content-Type': 'application/json;charset=utf-8'
    };
    // 3. 添加 token 请求头标识
    const isToken = (options.header || {}).isToken !== false;
    if (isToken && getToken()) {
      /* 让每个请求携带自定义token 请根据实际情况自行修改 */
      options.header.Authorization = 'Bearer ' + getToken();
    }

    if (CryptoEnabledConfigMethods.includes(options.method)) {
      const _url = options.url.split('/api')?.[1];
      /* 请求加密 */
      if (getCryptoEnabled() === '1' && !encryptWhiteList.includes(_url)) {
        options.data =
          typeof options.data === 'object'
            ? handleEncryptData(JSON.stringify(options.data), kernel(), initial())
            : handleEncryptData(options.data, kernel(), initial());

        options.header.sign = md5(getToken() + options.data + kernel());
      } else if (typeof options.data === 'object') {
        options.data = JSON.stringify(options.data);
      }

      /* 是否阻止数据重复提交 true-需要、false-不需要 */
      const isPreventRepeatSubmit = options.preventRepeatSubmit !== false;
      if (isPreventRepeatSubmit) {
        const requestObj = {
          /* 请求地址 */
          url: options.url /* 请求数据 */,
          data: options.data /* 请求时间 */,
          time: new Date().getTime()
        };
        const sessionObj = uni.getStorageSync(CacheKey.ReqDuplicateSubmitKey) || {};
        if (
          sessionObj.data === requestObj.data &&
          sessionObj.url === requestObj.url &&
          !sessionObj.url.includes('list-dict?dictCode') &&
          requestObj.time - sessionObj.time < requestRepeatSubmitInterval
        ) {
          uni.stopPullDownRefresh();
          uni.hideLoading();
          const message = '数据正在处理，请勿重复提交';
          console.error(`[${sessionObj.url}]: ` + message);
          uni.showToast({
            icon: 'none',
            title: message
          });
          return false;
        } else {
          uni.setStorageSync(CacheKey.ReqDuplicateSubmitKey, requestObj);
        }
      }
    }
  }
};

export const requestInterceptor = {
  install() {
    // 拦截 request 请求
    uni.addInterceptor('request', httpInterceptor);
    // 拦截 uploadFile 文件上传
    uni.addInterceptor('uploadFile', httpInterceptor);
  }
};
