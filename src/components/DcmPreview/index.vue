<template>
  <div
    :class="{ dcm_preview_wrapper: true, dcm_preview_wrapper_big: isBig }"
    ref="dicomViewerRef"
  ></div>
</template>

<script setup>
import { loadDicomImage } from '@/utils/file-preview/dicom';

defineOptions({ name: 'DcmPreview' });
const props = defineProps({
  fileUrl: { type: String, required: true },
  isBig: { type: Boolean, default: false }
});

const dicomViewerRef = ref(null);

watchEffect(() => {
  loadDicomImage(props.fileUrl, dicomViewerRef.value);
});
</script>

<style lang="scss" scoped>
.dcm_preview_wrapper {
  width: 200rpx;
  height: 200rpx;
  canvas {
    width: 100%;
  }
}
.dcm_preview_wrapper_big {
  width: 85vw;
  height: 50vh;
}
</style>
