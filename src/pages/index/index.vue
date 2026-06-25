<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5">
{
  style: {
    navigationBarTitleText: '首页',
    navigationStyle: 'custom'
  }
}
</route>
<template>
  <view class="home_container">
    <!-- 背景颜色块 -->
    <view class="back_ground_row"></view>

    <view class="footer_btn_box">
      <view class="exit_login">
        <wd-button size="large" type="success" @click="refeshPage">刷新缓存</wd-button>
      </view>
      <view class="exit_login2">
        <wd-button size="large" @click="exitLogin">退出登录</wd-button>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store';

// 刷新缓存
const refeshPage = () => {
  location.reload();
};

// 退出登录
const exitLogin = async () => {
  uni.showModal({
    title: '提示',
    content: '确定退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        useUserStore().sysLogout();
      }
    }
  });
};
</script>

<style lang="scss" scoped>
page {
  background: #f7f8fa;
}

.home_container {
  width: 100%;
  padding: 29rpx;
  padding-bottom: 50rpx;
  // height: 100vh;
  background-image: url('@/static/images/indexBackGround.jpg');
  background-repeat: no-repeat;
  /* 图片不重复 */
  background-size: 100% auto;

  /* 保持图片长宽比例，使图片完全包含在元素内 */
  .back_ground_row {
    position: absolute;
    top: 0;
    left: 0;
    // background: linear-gradient(to bottom, #dae6fc, #fff);
    z-index: -1;
    width: 100%;
    height: 550rpx;
  }

  .footer_btn_box {
    display: flex;
    gap: 40rpx;
    align-items: center;
    justify-content: center;
    padding-top: 40rpx;
  }
}
</style>
