import { encrypt, formatLongDate } from '@/utils/encrypt';
import { http } from '@/utils/http';

/**
 * 忘记密码发送验证码(数据加密)
 * @param data
 */
export const apiWxWorkerSmsPasswordForget = (data) => {
  const encryptData = encrypt(JSON.stringify(data) + '#@#@#' + formatLongDate(new Date()));
  return http({
    url: '/wx-staff/sms/password/forget',
    method: 'POST',
    data: { data: encryptData }
  });
};

/**
 * 忘记密码变更(数据加密)
 * @param data
 */
export const apiWxWorkerUserPasswordForget = (data) => {
  const encryptData = encrypt(JSON.stringify(data) + '#@#@#' + formatLongDate(new Date()));
  return http({
    url: '/wx-staff/user/password/forget',
    method: 'POST',
    data: { data: encryptData }
  });
};
