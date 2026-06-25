import {
  http
} from '@/utils/http';


// 首页数据统计
export function apiHomeCount(data) {
  return http({
    url: '/wx-staff/home/count',
    method: 'GET',
    params: data
  });
}
