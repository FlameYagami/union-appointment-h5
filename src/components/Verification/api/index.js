import { CAPTCHA_GET_RES } from '@/components/Verification/api/captcha-get-res';
import { http } from '@/utils/http';

/**
 * 获取验证图片  以及token
 * @param data
 */
export function apiGetCaptcha(data) {
  // return Promise.resolve(CAPTCHA_GET_RES);
  return http({
    url: '/captcha/get',
    header: {
      isToken: false
    },
    method: 'POST',
    data: data
  });
}

/**
 * 验证
 * @param data
 */
export function apiCaptchaCheck(data) {
  // return Promise.resolve({ code: 1, data: null, msg: '请求成功' });
  return http({
    url: '/captcha/check',
    header: {
      isToken: false
    },
    method: 'POST',
    data: data
  });
}
