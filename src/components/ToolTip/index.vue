<template>
  <view :class="{ tool_tip: true, show_tool_tip: show }">
    <!-- <view class="tip_one">
      <view class="title">{{ title }}</view>
      <wd-tooltip placement="top" useContentSlot v-model="show">
        <template #content>
          <div style="padding: 10rpx">
            {{ content }}
          </div>
        </template>
        <wd-icon color="#b3b3b3" style="margin-left: 5rpx" name="help-circle" size="18px"></wd-icon>
      </wd-tooltip>
    </view> -->
    <view class="tip_two" ref="tipTwoRef">
      <view class="icon_text">
        <view class="title">{{ title }}</view>
        <wd-icon
          ref="iconRef"
          color="#b3b3b3"
          style="margin-left: 6rpx"
          name="help-circle"
          size="18px"
          @click="handleShowTip"
        ></wd-icon>
      </view>
      <view class="tip_row" v-show="show" ref="tipRowRef">
        <view class="arrow" ref="arrowRef"></view>
        {{ content }}
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue';
const props = defineProps({
  // 提示文本
  content: {
    type: String,
    default: ''
  },
  // lable标题
  title: {
    type: String,
    default: ''
  },
  activeTab: {
    type: String,
    default: ''
  },
  currnetTab: {
    type: String,
    default: ''
  }
});
watch(
  () => props.activeTab,
  (newVal) => {
    if (props.currnetTab == props.activeTab) {
      setTimeout(() => {
        positionTipRow();
      }, 0);
    }
  }
);
// 控制显示隐藏
const show = ref(false);
const iconRef = ref(null);
const tipRowRef = ref(null);
const arrowRef = ref(null);

onMounted(() => {
  nextTick(() => {
    // if (props.content.length >= 30) {
    show.value = true;
    positionTipRow();
    // }
  });
});

// 点击显示隐藏
const handleShowTip = () => {
  show.value = !show.value;
  if (show.value) {
    positionTipRow();
  }
};

const positionTipRow = () => {
  if (!iconRef.value || !tipRowRef.value || !arrowRef.value) return;

  const iconEl = iconRef.value.$el || iconRef.value;
  const tipRowEl = tipRowRef.value.$el || tipRowRef.value;
  const arrowEl = arrowRef.value.$el || arrowRef.value;

  if (typeof iconEl.getBoundingClientRect !== 'function') return;

  const iconRect = iconEl.getBoundingClientRect();
  // const tipRowRect = tipRowEl.getBoundingClientRect();

  // 计算图标中心点的水平位置
  // const iconCenterX = iconRect.left + iconRect.width / 2;

  // 计算箭头相对于提示框左侧的位置
  // let arrowLeft = iconCenterX - tipRowRect.left;

  // 边界处理，确保箭头在提示框上边框内
  // let arrowLeft = Math.max(12, Math.min(iconRect.left - 36, tipRowRect.width - 12));
  let arrowLeft = iconRect.left - 36;
  arrowEl.style.left = `${arrowLeft}px`;
};
</script>

<style lang="scss" scoped>
.tool_tip {
  .tip_one {
    display: flex;
  }
  .tip_two {
    position: relative;
  }
  .title_row {
    display: flex;
    align-items: center;
  }
  .icon_text {
    display: flex;
    align-items: flex-start;
    .title {
    }
    .wd-icon {
    }
  }
  .tip_row {
    font-size: 24rpx;
    border: 2rpx solid #ff7800;
    border-radius: 5rpx;
    padding: 5rpx 15rpx;
    background-color: #fff1e6;
    margin-top: 20rpx;
    color: #dd6800;
    position: relative;
    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: -12rpx;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   width: 0;
    //   height: 0;
    //   border-left: 12rpx solid transparent;
    //   border-right: 12rpx solid transparent;
    //   border-bottom: 12rpx solid #ff7800;
    // }
    .arrow {
      position: absolute;
      left: 50%;
      top: 0;
      transform: translate(-50%, -100%);
      width: 0;
      height: 0;
      border: 12rpx solid transparent;
      border-bottom-color: #ff7800;
    }
  }
}

.view[show='true'] .tip_row {
  animation: fadeIn 0.2s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
