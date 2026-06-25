<template>
  <view class="searchPickerContainer">
    <view @click="handleSelect">
      {{ value || '点击选择' }}
    </view>
  </view>
  <wd-popup
    v-model="show"
    custom-style="border-radius:32rpx;height: 50%;width:100%;"
    position="bottom"
  >
    <view class="picker_view">
      <view class="head_tool">
        <view class="cancel">取消</view>
        <view class="sure">完成</view>
      </view>
      <view class="search_row">
        <wd-search v-model="searchValue" @change="searchChange" hide-cancel />
      </view>
      <wd-picker-view
        :columns="showColumns"
        size="large"
        required
        v-model="value"
        safe-area-inset-bottom="true"
      />
      <picker-view
        :value="pickerviewValue"
        indicator-style="height: 100rpx;"
        style="width: 100%; height: 300px"
      >
        <picker-view-column>
          <view v-for="item in showColumns">{{ item.label }}</view>
        </picker-view-column>
      </picker-view>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  keyWord: {
    type: String,
    default: ''
  }
});

watch(
  () => props.columns,
  (newVal, oldVal) => {
    // showColumns.value = JSON.parse(JSON.stringify(props.columns));
    showColumns.value = props.columns;
  }
);

// 展示的columns
const showColumns = ref([]);

// 搜索关键字
const searchValue = ref('');

// picker绑定的值
const value = ref('');

// pickerview绑定的值
const pickerviewValue = ref([]);

// 显示picker
const show = ref(false);

// 点击选择
const handleSelect = () => {
  show.value = true;
};

// 搜索值改变时
const searchChange = (val) => {
  if (!val.value || val.value == '') {
    showColumns.value = props.columns;
  } else {
    showColumns.value = props.columns.filter((item) => {
      return item.label.includes(val.value);
    });
  }
};
</script>

<style lang="scss" scoped>
.searchPickerContainer {
  width: 100%;
  text-align: left;
}
.picker_view {
  .head_tool {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 40rpx;
    font-size: 32rpx;
    .cancel {
    }
    .sure {
      color: #4d80f0;
    }
  }
  .search_row {
    text-align: left;
    input {
      font-size: 28rpx !important;
    }
  }
}
</style>
