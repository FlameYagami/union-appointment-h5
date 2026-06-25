import { CustomRequestOptions } from '@/interceptors/request';
import errorCode from '@/interceptors/errorCode';
import { useUserStore } from '@/store';
import { handleDecryptData } from '@/utils/auth/crypto';
import { initial, kernel } from '@/utils/auth/auth';
import { getCurPageRoute } from '@/utils/page';

const loginPageWhitelist = ['pages/login/index', '/pages/org-scan-query/index'];
let isSHowlogOut = false;

export const http = <T>(options: CustomRequestOptions) => {
  uni.showLoading({
    title: '加载中...',
    mask: true
  });
  return new Promise<IResData<T>>((resolve, reject) => {
    uni.request({
      ...options,
      header: {
        platform: '2',
        ...options.header
      },
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(response: UniApp.RequestSuccessCallbackResult) {
        uni.stopPullDownRefresh();
        uni.hideLoading();
        /* 未设置状态码则默认成功状态 */
        const code = response.data.code || 200;

        // 获取错误信息
        const msg = errorCode[code] || response.data.msg || errorCode.default;
        const encrypt = response.data.encrypt;
        if (encrypt === '1') {
          const decryptData = handleDecryptData(response.data.data, kernel(), initial());
          response.data.data = JSON.parse(decryptData);
        }

        if (code == 401) {
          const currentRoute = getCurPageRoute();
          if (
            !isSHowlogOut &&
            !loginPageWhitelist.includes(currentRoute) &&
            useUserStore().isLogined
          ) {
            isSHowlogOut = true;
            uni.showModal({
              title: '提示',
              content: '登录状态已过期，请重新登录',
              showCancel: false,
              confirmText: '重新登录',
              success: (res) => {
                /* 退出登录 */
                isSHowlogOut = false;
                if (res.confirm) useUserStore().sysLogout();
              }
            });
            reject(new Error('无效的会话，或者会话已过期，请重新登录'));
          } else {
            reject(response.data);
          }
        } else if (code === 500) {
          if (uni.$toast) {
            uni.$toast(msg);
          } else {
            uni.showToast({ title: msg, icon: 'error' });
          }
          console.error(msg);
          reject(new Error(msg));
        } else if (code === 601) {
          if (uni.$toast) {
            uni.$toast(msg);
          } else {
            uni.showToast({ title: msg, icon: 'error' });
          }
          console.warn(msg);
          reject(new Error(msg));
        } else if (code !== 1) {
          if (code != 400007) {
            if (uni.$toast) {
              uni.$toast(msg);
            } else {
              uni.showToast({ title: msg, icon: 'error' });
            }
          }
          reject(response.data);
        } else {
          resolve(response.data);
        }
      },
      fail(err) {
        console.log(err);
        uni.stopPullDownRefresh();
        uni.hideLoading();
        let { message = ''} = err;
        if (message === 'Network Error') {
          message = '后端接口连接异常';
        } else if (message.includes('timeout')) {
          message = '系统接口请求超时';
        } else if (message.includes('Request failed with status code')) {
          message = '系统接口' + message.substring(message.length - 3) + '异常';
        }
        if (uni.$toast) {
          uni.$toast(message);
        } else {
          uni.showToast({ icon: 'error', title: message });
        }
        reject(err);
      }
    });
  });
};

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(url: string, query?: Record<string, any>) => {
  return http<T>({
    url,
    query,
    method: 'GET'
  });
};

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  query?: Record<string, any>
) => {
  return http<T>({
    url,
    query,
    data,
    method: 'POST'
  });
};

http.get = httpGet;
http.post = httpPost;
