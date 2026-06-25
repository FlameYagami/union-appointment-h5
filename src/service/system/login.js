import {
  http
} from '@/utils/http';

export function apiGetPubConfig() {
  return http({
    url: '/wx-staff/pub-config',
    method: 'GET',
    header: {
      isToken: false
    }
  });
}

export function apiCheckRole() {
  return http({
    url: '/wx-staff/check-role',
    method: 'GET'
  });
}

/**
 * 登录方法
 * @param data
 */
export function apiSysLogin(data) {
  return http({
    url: '/wx-staff/login',
    headers: {
      isToken: false
    },
    method: 'POST',
    data
  });
}

// 获取用户权限信息
export function apiGetSysPermission() {
  return http({
    url: '/sys-permission/permission',
    method: 'GET'
  });
}

// 退出方法
export function apiLogout() {
  return http({
    url: '/logout',
    method: 'POST'
  });
}

// 获取用户详细信息
export function apiUserDetailInfo(data) {
  return http({
    url: '/user-info/sys',
    method: 'GET',
    params: data
  });
}
// 切换用户
export function apiChangeUserRole(data) {
  return http({
    url: '/sys-permission/role/change',
    method: 'POST',
    data
  });
}
