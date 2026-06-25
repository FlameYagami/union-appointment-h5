// 根据字典类型查询字典数据信息
import {
  http
} from '@/utils/http';

export function apiSysDictDataListDict(query) {
  return http({
    url: '/wx-staff/sys-dict-data/list-dict',
    method: 'GET',
    params: query
  });
}
