<template>
  <view class="infoCainter">
    <view class="infoList">
      <view class="infoItem">
        <view class="label">姓名</view>
        <view class="value">{{ infoData.name }}</view>
      </view>
      <view class="infoItem">
        <view class="label">性别</view>
        <view class="value">{{ infoData.sex }}</view>
      </view>
      <view class="infoItem">
        <view class="label">证件号</view>
        <view class="value">{{ infoData.name }}</view>
      </view>
      <view class="infoItem">
        <view class="label">年龄</view>
        <view class="value">{{ infoData.age }}</view>
      </view>
      <view class="infoItem">
        <view class="label">联系电话</view>
        <view class="value">{{ infoData.phone }}</view>
      </view>
      <view class="infoItem">
        <view class="label">居住地址</view>
        <view class="value">{{ infoData.address }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  infoData: {
    type: Object,
    default: () => ({})
  }
});
</script>

<style lang="scss" scoped>
.infoCainter {
  width: 100%;
  background: #fff;
  border-radius: 20rpx;
  padding: 20rpx;
  box-shadow: 0rpx 0rpx 18rpx rgba(0, 0, 0, 0.158);
  .infoList {
    width: 100%;
    font-size: 22rpx;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 40rpx;
    row-gap: 20rpx;
    .infoItem {
      display: flex;
      align-items: center;
      .label {
        width: 100rpx;
      }
      .value {
        background-color: #f2f2f2;
        color: #aaaaaa;
        text-align: center;
        border-radius: 10rpx;
        width: 200rpx;
        padding: 10rpx;
      }
    }
  }
}
</style>
