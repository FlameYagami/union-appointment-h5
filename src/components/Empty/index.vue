<template>
  <view class="empty_container">
    <view style="text-align: center; font-size: 30rpx; color: #cecece; margin: 50rpx 0">
      <image src="@/static/images/empty.png" mode="widthFix" style="width: 230rpx" />
      <view style="margin-top: 30rpx">暂无数据</view>
    </view>
  </view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.empty_container {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
