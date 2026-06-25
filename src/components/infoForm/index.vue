<template>
  <view class="info_form_list_container">
    <view class="info_form_list">
      <view class="title">{{ title }}</view>
      <!-- <view
        :class="{
          info_form_item: true,
          isNewLine: true
        }"
        v-for="item in showData"
        :key="item"
      > -->
      <view :class="{
        info_form_item: true,
        isNewLine: item.value?.length > 10 && !isWhiteLine(item.label) && isNewLine,
        lineHeight: item.value?.length > 10 && !isNewLine
      }" v-for="item in showData" :key="item">
        <view class="label">{{ item.label }}</view>
        <view :class="{
          value: true,
          unitValue: item.unit,
          isBorder: isBorder
        }">
          {{ item.value }}
          <view class="unit" v-show="item.unit">{{ item.unit }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useDict } from '@/utils/dict';

const props = defineProps({
  // 渲染的字段map（只渲染数据源中有的字段）
  // 数据结构  {
  //   field: '字段',
  //   label: '字段label',
  //   unit: ''
  // }
  labelMap: {
    type: Object,
    default: {}
  },
  // 数据源
  dataSource: {
    type: Object,
    default: {}
  },
  // 所用到的字典
  // 数据结构
  // {
  //   field: 'gender',
  //   dictName: 'gender'
  // }
  dictMap: {
    type: Array,
    default: []
  },
  title: {
    type: String,
    default: '默认标题'
  },
  isBorder: {
    type: Boolean,
    default: false
  },
  isNewLine: {
    type: Boolean,
    default: false
  },
  whiteLineList: {
    type: Array,
    default: []
  }
});
// 最终展示的数据
const showData = ref([]);

// 需要请求的字典数据
const dictArr = ref([]);
props.dictMap.forEach((item) => {
  dictArr.value.push(item.dictName);
});

// 请求到的字典数据
const dictObj = ref([]);

watch(
  () => props.dataSource,
  (newVal) => {
    initData();
  }
);

onMounted(() => {
  initData();
});

// 初始化数据
const initData = async () => {
  if (dictArr.value.length == 0) {
    showData.value = combine(props.labelMap, props.dataSource);
    return;
  }

  const asyncKeys = [];
  dictArr.value.forEach((item) => {
    asyncKeys.push(item);
  });

  dictObj.value = await useDict(...dictArr.value);

  const checkCompletion = () => {
    return asyncKeys.every((key) => {
      return dictObj.value[key] && dictObj.value[key].length > 0;
    });
  };

  const waitForCompletion = () => {
    return new Promise((resolve) => {
      const intervalId = setInterval(() => {
        if (checkCompletion()) {
          clearInterval(intervalId);
          resolve();
        }
      }, 100);
    });
  };

  try {
    await waitForCompletion();
    showData.value = combine(props.labelMap, props.dataSource);
  } catch (error) {
    console.error('发生错误:', error);
  }
};

// 处理展示数据
const combine = (labelMap, dataSource) => {
  const showData = [];
  for (const { field, label, unit } of labelMap) {
    if (
      dataSource.hasOwnProperty(field) &&
      dataSource[field] != null &&
      dataSource[field] != '' &&
      dataSource[field] != undefined
    ) {
      let value = dataSource[field];
      const dictItem = props.dictMap.find((item) => item.field == field);
      if (dictItem) {
        const dictArray = dictObj.value[dictItem.dictName];
        if (dictArray) {
          if (dictItem.isMulti) {
            let newArr = value.split(',').map((item) => {
              const match = dictArray.find((item2) => item2.value == String(item));
              if (match) {
                return match.label;
              } else {
                return item;
              }
            });
            value = newArr.join(',');
          } else {
            const match = dictArray.find((item) => item.value == String(value));
            if (match) {
              value = match.label;
            }
          }
        }
      }
      showData.push({
        label: label,
        field: field,
        value: value,
        unit: unit
      });
    }
  }
  return showData;
};
// 判断是否白名单中的label
const isWhiteLine = (label) => {
  return props.whiteLineList.some((item) => item.label == label);
};
</script>

<style lang="scss" scoped>
.info_form_list_container {
  margin-bottom: 20rpx;

  .info_form_list {
    border-radius: 10rpx;
    box-shadow: 0 0 18px 0 rgba(178, 178, 178, 0.2392156863);
    padding: 20rpx;

    .title {
      font-size: 34rpx;
      border-bottom: 2rpx solid #e4e7edb1;
      margin-bottom: 20rpx;
      padding-bottom: 20rpx;
      font-weight: 500;
    }

    .info_form_item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 20rpx;

      .label {
        color: #60626698;
        font-size: 28rpx;
      }

      .value {
        color: #242424;
        margin: 0 20rpx;
        max-width: 60%;
        max-height: 500rpx;
        overflow: scroll;
        border-radius: 8rpx;
        font-size: 32rpx;
        text-align: right;
      }

      .unitValue {
        display: flex;
        align-items: center;
      }

      .unit {
        font-weight: 500;
        color: #000000a2;
        font-size: 24rpx;
        margin-left: 10rpx;
      }

      .isBorder {
        border: 2rpx solid #e4e7ed;
        box-shadow: inset 0 0 20rpx 2px rgba(0, 0, 0, 0.063);
        padding: 6rpx 10rpx;
      }
    }

    .lineHeight {
      line-height: 70rpx;
    }

    .isNewLine {
      display: block;

      .label {
        font-size: 26rpx;
      }

      .value {
        margin: 20rpx auto;
        max-width: 100%;
        max-height: 500rpx;
        border: none;
        text-align: left;
      }
    }
  }
}
</style>
