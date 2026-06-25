<template>
  <view class="card_list_container">
    <view class="card_list">
      <!-- <view
        :class="{
          card_item: true
        }"
        v-for="(item, index) in cancer_type"
        :key="item"
        @click="goToPage(item)"
      > -->
      <view
        :class="{
          card_item: true,
          disabled: !checkAllCancerPlanResultList[cancerField[item.value]] && pageType == '评估'
        }"
        v-for="(item, index) in cancer_type"
        :key="item"
        @click="goToPage(item)"
      >
        <image :src="cancerImgList[item.value]" mode="scaleToFill" />
        {{ item.label + pageType }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import { useDict } from '@/utils/dict';
import cancerIcon1 from '@/static/images/cancerIcon1.png';
import cancerIcon2 from '@/static/images/cancerIcon2.png';
import cancerIcon3 from '@/static/images/cancerIcon3.png';
import cancerIcon4 from '@/static/images/cancerIcon4.png';
import cancerIcon5 from '@/static/images/cancerIcon5.png';
import { apiCheckAllCancerPlan } from '@/service/evaluate/evaluate';
const { cancer_type } = useDict('cancer_type');
const props = defineProps({
  // 页面类型 评估/预约/报告
  pageType: {
    type: String,
    default: ''
  }
});

// 癌种图片
const cancerImgList = ref({
  1: cancerIcon1,
  2: cancerIcon2,
  3: cancerIcon3,
  4: cancerIcon4,
  5: cancerIcon5
});

// 页面操作类型
const pageMode = ref('');

// 所有癌症计划开启列表
const checkAllCancerPlanResultList = ref([]);

// 癌种对应相关字段
const cancerField = ref({
  1: 'openLung',
  2: 'openColorectal'
});

// 要跳转的页面数组
const pageUrlObj = ref({
  1: {
    add: {
      评估: '/pages-sub/assessment/InformedForm/index'
    },
    list: {
      评估: '/pages-sub/assessment/assessmentList/index',
      预约: '/pages-sub/reservation/reservationList/index',
      报告: '/pages-sub/report/reportList/index',
      随访: '/pages-sub/follow/followList/index'
    }
  },
  2: {
    add: {
      评估: '/pages-sub/assessment/InformedForm/index'
    },
    list: {
      评估: '/pages-sub/assessment/assessmentList/index',
      预约: '/pages-sub/reservation/reservationList/index',
      报告: '/pages-sub/report/colorectal/reportList/index',
      随访: '/pages-sub/follow/followList/index'
    }
  }
});

// 跳转页面
const goToPage = (item) => {
  if (
    checkAllCancerPlanResultList.value[cancerField.value[item.value]] ||
    props.pageType != '评估'
  ) {
    uni.redirectTo({
      url:
        pageUrlObj.value[item.value][pageMode.value][props.pageType] + `?cancerType=${item.value}`
    });
  } else {
    uni.showToast({
      title: '暂未开放',
      icon: 'none'
    });
  }
  // uni.redirectTo({
  //   url: pageUrlObj.value[item.value][pageMode.value][props.pageType] + `?cancerType=${item.value}`
  // });
};

onLoad((options) => {
  pageMode.value = options.mode;
  // 所有癌症计划开启校验
  apiCheckAllCancerPlan({
    planType: 1
  }).then((res) => {
    // if (res.data.checkResult == 0) {
    //   uni.showToast({
    //     title: '暂未开放',
    //     icon: 'none'
    //   });
    // }
    checkAllCancerPlanResultList.value = res.data || [];
  });
});
</script>

<style lang="scss" scoped>
.card_list_container {
  .card_list {
    width: 100%;
    .card_item {
      width: 100%;
      background-color: #fff;
      border-radius: 20rpx;
      // box-shadow: 0rpx 0rpx 18rpx rgba(0, 0, 0, 0.158);
      display: flex;
      // justify-content: center;
      align-items: center;
      font-size: 36rpx;
      padding: 25rpx 25rpx;
      margin-top: 50rpx;
      color: #333;
      font-size: 36rpx;
      image {
        width: 90rpx;
        height: 90rpx;
        margin-right: 35rpx;
      }
    }
    .disabled {
      color: #d7d7d7;
    }
  }
}
</style>
