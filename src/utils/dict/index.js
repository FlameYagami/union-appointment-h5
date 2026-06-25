import {
  apiSysDictDataListDict
} from '@/service/system/dict';
import useDictStore from '@/store/modules/dict';

/**
 * 获取字典数据
 * 参数中有对象则视为枚举
 * 示例:
 * useDict(
 *   'data_status',
 *   {
 *     DATA_STATUS,
 *     DATA_STATUS: {
 *       meta: DATA_STATUS,
 *       colorList: ['primary' | 'success' | 'warning' | 'danger' | 'info']
 *     }
 *   }
 * )
 */
export function useDict(...args) {
  const data = ref({});
  const loading = ref(true);
  const loadingPromises = [];

  // 返回一个包含字典数据、加载状态和完成回调的对象
  const result = (() => {
    args.forEach((item) => {
      if (typeof item === 'string') {
        data.value[item] = [];
        const cacheDict = useDictStore().getDict(item);
        if (cacheDict) {
          data.value[item] = cacheDict;
        } else {
          const promise = apiSysDictDataListDict({
            dictCode: item
          }).then((resp) => {
            data.value[item] = resp.data.map((p) => ({
              label: p.dictLabel,
              value: p.dictValue,
              colorType: p.colorType,
              dictCss: p.dictCss
            }));
            useDictStore().setDict(item, data.value[item]);
            return data.value[item];
          });
          loadingPromises.push(promise);
        }
      } else if (Object.prototype.toString.call(item) === '[object Object]') {
        const result = metaToDict(item);
        Object.keys(result).forEach((k) => {
          data.value[k] = result[k];
        });
      }
    });

    // 当所有异步请求完成后，将 loading 状态设置为 false
    if (loadingPromises.length > 0) {
      Promise.all(loadingPromises).then(() => {
        loading.value = false;
      }).catch(err => {
        console.error('加载字典数据出错:', err);
        loading.value = false;
      });
    } else {
      loading.value = false;
    }

    const dictRefs = toRefs(data.value);
    
    // 添加 onReady 方法，用于在字典加载完成后执行回调
    const onReady = (callback) => {
      if (!loading.value) {
        // 如果已经加载完成，直接执行回调
        callback(dictRefs);
      } else {
        // 否则等待所有请求完成后执行回调
        Promise.all(loadingPromises).then(() => {
          callback(dictRefs);
        });
      }
      return dictRefs;
    };

    return {
      ...dictRefs,
      loading,
      onReady
    };
  })();

  return result;
}

export const useDictAsync = (...args) => {
  const data = ref({});

  return (async () => {
    try {
      for (const item of args) {
        if (typeof item === 'string') {
          data.value[item] = [];
          const cacheDict = useDictStore().getDict(item);
          if (cacheDict) {
            data.value[item] = cacheDict;
          } else {
            await apiSysDictDataListDict({
              dictCode: item
            }).then((resp) => {
              data.value[item] = resp.data.map((p) => ({
                label: p.dictLabel,
                value: p.dictValue,
                colorType: p.colorType,
                dictCss: p.dictCss
              }));
              useDictStore().setDict(item, data.value[item]);
            });
          }
        } else if (Object.prototype.toString.call(item) === '[object Object]') {
          const result = metaToDict(item);
          Object.keys(result).forEach((k) => {
            data.value[k] = result[k];
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
    return toRefs(data.value);
  })();
};

export const getDictLabelByValue = (dict, dictValue) => {
  if (!dict || !dictValue) return null;
  return dict.find((item) => item.value === dictValue)?.label || null;
};

export const getDictValueByLabel = (dict, dictLabel) => {
  if (!dict || !dictLabel) return null;
  return dict.find((item) => item.label === dictLabel)?.value || null;
};

/**
 * 枚举转字典
 * @param meta
 * @returns {{}}
 */
function metaToDict(meta) {
  const obj = {};
  Object.keys(meta).forEach((k) => {
    let m = meta[k];
    let colorTypeList = [];
    if (m.meta) {
      colorTypeList = m.colorList || [];
      m = m.meta;
    }

    obj[k.toLocaleLowerCase()] = m.list.map((item, index) => {
      return {
        label: item.intro,
        value: item.code,
        colorType: colorTypeList[index]
      };
    });
  });
  return obj;
}

export default {
  install(app) {
    app.provide('useDict', useDict);
  }
};
