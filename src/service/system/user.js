import { http } from '@/utils/http';

/**
 * 简易用户信息详情查询
 */
export function apiUserSimple() {
  return http({
    url: '/wx-staff/user/simple',
    method: 'GET'
  });
}

/**
 * 用户密码变更(首次登录或重置密码)
 */
export const apiWxWorkerUserPasswordAlter = (data) => {
  return http({
    url: '/wx-staff/user/password/alter',
    method: 'POST',
    data: data
  });
};

/**
 * 查询配置值
 */
export const apiSysConfigValue = (data) => {
  return http({
    url: '/sys-config/value',
    method: 'GET',
    params: data
  });
};
