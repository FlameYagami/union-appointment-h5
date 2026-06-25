<template>
  <view class="inform_container">
    <view class="title">江西省重点人群健康风险评估知情同意书</view>
    <view class="content">
      <!-- 根据癌种类型渲染不同内容组件 -->
      <LungConsent v-if="cancerType == '1'" />
      <ColorectalConsent v-else-if="cancerType == '2'" />
    </view>
    <view class="btn_box">
      <wd-button size="large" type="info" @click="goBack">返回</wd-button>
      <wd-button size="large" @click="handleAgree">我已阅读并同意</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import LungConsent from './contents/LungConsent.vue';
import ColorectalConsent from './contents/ColorectalConsent.vue';
const props = defineProps({
  // 页面类型
  pageType: {
    type: String,
    default: ''
  }
});

// 参数信息
const personData = ref({});
// 癌种类型
const cancerType = ref('');
// 是否补录
const isSupplement = ref('');
onLoad((options) => {
  personData.value = JSON.parse(options.personData || '{}');
  cancerType.value = options.cancerType || '';
  isSupplement.value = options.isSupplement || 0;
});

// 不同癌种对应的不同路径
const addUrl = ref({
  1: '/pages-sub/assessment/assessmentAdd/index',
  2: '/pages-sub/assessment/colorectalCancer/assessmentAdd/index'
});

const goBack = () => {
  uni.navigateBack({
    delta: 1
  });
};

// 同意
const handleAgree = () => {
  if (Object.keys(personData.value).length > 0) {
    uni.redirectTo({
      url:
        addUrl.value[cancerType.value] +
        `?personData=${JSON.stringify(personData.value)}` +
        `&cancerType=${cancerType.value}` +
        `&isSupplement=${isSupplement.value}`
    });
  } else {
    uni.redirectTo({
      url: addUrl.value[cancerType.value] + `?cancerType=${cancerType.value}`
    });
  }
};
</script>

<style lang="scss" scoped>
.inform_container {
  .title {
    margin: 30rpx 0 60rpx 0;
    font-size: 36rpx;
    font-weight: 900;
    text-align: center;
  }
  .content {
    /* 使用 :deep() 让父样式作用到子组件内的 p/b */
    :deep(p) {
      line-height: 60rpx;
      color: #808285;
      text-indent: 2em;
    }
    :deep(b) {
      color: #606266;
    }
  }
  .btn_box {
    display: flex;
    justify-content: space-around;
    margin: 30rpx 0;
    .wd-button {
      border-radius: 5rpx;
    }
  }
}
</style>
