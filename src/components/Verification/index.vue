<script setup>
import { apiCaptchaCheck, apiGetCaptcha } from '@/components/Verification/api';
import { useSlideBlockMove } from '@/components/Verification/hooks/use-slide-block-move';
import { VERIFY_STATUS } from '@/components/Verification/enums';
import { def_initial, def_kernel } from '@/utils/auth/auth';
import { handleDecryptData, handleEncryptData, encodeBase64 } from '@/utils/auth/crypto';

defineOptions({ name: 'Verification' });
const emit = defineEmits(['success']);

const verifyStatus = ref(undefined);
const tipContent = ref(undefined);
const backgroundImageBase64 = ref('');
const slideBlockImageBase64 = ref('');
const backgroundImageSrc = computed(() => 'data:image/png;base64,' + backgroundImageBase64.value);
const slideBlockImageSrc = computed(() => 'data:image/png;base64,' + slideBlockImageBase64.value);
const verificationMaskRef = shallowRef(null);
const verificationImagePanelRef = shallowRef(null);
const verificationImageSlideRef = shallowRef(null);
const verificationSlidePanelRef = shallowRef(null);
const verificationSlideBlockRef = shallowRef(null);

const verifyConfig = {
  maxMoveDistance: 0,
  imageWidth: 0,
  maxMoveDistanceImage: 0
};
let checkId, aesKey, aesIv;

const { handleMoveStart, blockLeftDistance, moveTake } = useSlideBlockMove({
  verificationMaskRef,
  verifyConfig,
  handleCheck,
  verifyStatus
});

const isInitial = computed(() => VERIFY_STATUS.INITIAL.match(verifyStatus.value));
const isMoving = computed(() => VERIFY_STATUS.MOVING.match(verifyStatus.value));
const isSuccess = computed(() => VERIFY_STATUS.SUCCESS.match(verifyStatus.value));
const isFailed = computed(() => VERIFY_STATUS.FAILED.match(verifyStatus.value));
const imageLeftDistance = computed(() => {
  return (
    (blockLeftDistance.value / verifyConfig.maxMoveDistance) * verifyConfig.maxMoveDistanceImage
  );
});

const getConfig = () => {
  const slidePanelRect = verificationSlidePanelRef.value.$el.getBoundingClientRect();
  const slideBlockRect = verificationSlideBlockRef.value.$el.getBoundingClientRect();
  const imageSlideRect = verificationImageSlideRef.value.$el.getBoundingClientRect();
  const imagePanelRect = verificationImagePanelRef.value.$el.getBoundingClientRect();

  verifyConfig.imageWidth = Math.floor(imagePanelRect.width);
  verifyConfig.maxMoveDistance = Math.floor(slidePanelRect.width - slideBlockRect.width);
  verifyConfig.maxMoveDistanceImage = Math.floor(imagePanelRect.width - imageSlideRect.width);
};

const getCaptcha = async () => {
  const { data } = await apiGetCaptcha();
  backgroundImageBase64.value = data.backgroundImage;
  slideBlockImageBase64.value = data.slideBlockImage;
  checkId = data.checkId;

  const secretKeyDecrypt = handleDecryptData(data.secretKey, def_kernel(), def_initial());
  if (!secretKeyDecrypt) return;

  const secretKeyArr = secretKeyDecrypt.split('|');
  if (secretKeyArr.length !== 2) return;

  aesKey = secretKeyArr[0];
  aesIv = secretKeyArr[1];
};

async function handleCheck() {
  try {
    const moveXDistance = (imageLeftDistance.value * 310) / verifyConfig.imageWidth;
    const pointJson = [
      JSON.stringify({
        x: moveXDistance,
        y: 5.0
      }),
      aesKey,
      aesIv
    ];
    const data = {
      pointJson: handleEncryptData(...pointJson),
      checkId
    };
    await apiCaptchaCheck(data);
    verifyStatus.value = VERIFY_STATUS.SUCCESS.code;
    tipContent.value = `${moveTake.value}秒验证成功`;
    const verification = [
      `${checkId}---${JSON.stringify({ x: moveXDistance, y: 5.0 })}`,
      aesKey,
      aesIv
    ];
    const verificationEncrypt = handleEncryptData(...verification);
    const captchaVerification = encodeBase64(verificationEncrypt);
    setTimeout(() => {
      emit('success', { captchaVerification });
      close();
    }, 1000);
  } catch (e) {
    console.error(e);
    verifyStatus.value = VERIFY_STATUS.FAILED.code;
    tipContent.value = '验证失败';
    setTimeout(() => {
      reset();
    }, 1000);
  }
}

const reset = async () => {
  verifyStatus.value = VERIFY_STATUS.INITIAL.code;
  blockLeftDistance.value = 0;
  tipContent.value = '';
  await getCaptcha();
  setTimeout(() => {
    getConfig();
  }, 500);
};

const visible = ref(false);

const show = async () => {
  visible.value = true;
  await nextTick();
  await reset();
};

const close = () => {
  visible.value = false;
};

defineExpose({
  show,
  close
});
</script>

<template>
  <view ref="verificationMaskRef" class="verification-mask" v-if="visible">
    <view
      :class="{ 'is-moving': isMoving, 'is-failed': isFailed, 'is-success': isSuccess }"
      class="verification"
    >
      <view class="verification-header">
        <text class="verification-title">请完成安全验证</text>
        <wd-icon class="verification-close" name="close" @click="close"></wd-icon>
      </view>
      <view class="verification-body">
        <view ref="verificationImagePanelRef" class="verification-image-panel">
          <image :src="backgroundImageSrc" class="verification-image-bg" mode="widthFix"></image>
          <image
            ref="verificationImageSlideRef"
            :src="slideBlockImageSrc"
            class="verification-image-slide"
            :style="{ left: imageLeftDistance + 'px' }"
            mode="heightFix"
          ></image>
          <wd-icon class="verification-refresh" name="refresh" @click="reset"></wd-icon>
          <view v-if="tipContent" class="verification-tip-panel">
            <text>{{ tipContent }}</text>
          </view>
        </view>
        <view ref="verificationSlidePanelRef" class="verification-slide-panel">
          <view v-if="isInitial" class="verification-slide__tip">向右滑动完成验证</view>
          <view
            class="verification-slide__block-before"
            :style="{ width: blockLeftDistance + 'px' }"
          ></view>
          <view
            ref="verificationSlideBlockRef"
            class="verification-slide__block"
            @touchstart="handleMoveStart"
          >
            <wd-icon v-if="VERIFY_STATUS.SUCCESS.match(verifyStatus)" name="check"></wd-icon>
            <wd-icon v-else-if="VERIFY_STATUS.FAILED.match(verifyStatus)" name="close"></wd-icon>
            <wd-icon v-else name="a-chevron-rightdouble"></wd-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
@mixin test-bg($color) {
  background-color: mix(#fff, $color, 90%);
  background-clip: content-box;
  box-shadow: 0 0 1px 0 $color inset;
}

.verification-mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: mix(transparent, #000, 80%);

  $verify-gap: 20rpx;
  $verify-color: #666;
  $slide-block-size: 80rpx;
  $block-before-color: $uni-color-success;
  --tip-bg-color: #{mix(transparent, $uni-color-success, 70%)};

  .verification {
    margin: 50% 40rpx 0;
    background-color: #fff;

    .verification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $verify-gap;
      border-bottom: 1rpx solid $uni-border-color;
      color: $verify-color;

      .verification-title {
        font-size: $uni-font-size-lg;
      }

      .verification-close {
        font-size: $uni-font-size-base;
      }
    }

    .verification-body {
      //@include test-bg(green);
      padding: $verify-gap;
      overflow: hidden;

      .verification-image-panel {
        width: 100%;
        position: relative;

        .verification-image-bg {
          width: 100%;
        }

        .verification-image-slide {
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: transparent;
          z-index: 1;
        }

        .verification-refresh {
          position: absolute;
          top: 16rpx;
          right: 16rpx;
          background-color: mix(transparent, #999, 40%);
          color: #fff;
          font-size: 14px;
          padding: 8rpx;
          border-radius: 50%;
        }

        .verification-tip-panel {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 4px $verify-gap;
          background-color: var(--tip-bg-color);
          color: #fff;
          font-size: $uni-font-size-sm;
        }
      }

      .verification-slide-panel {
        margin-top: $verify-gap;
        box-shadow: 0 0 1rpx 1px $uni-border-color inset;
        color: $verify-color;
        position: relative;
        display: flex;
        align-items: center;

        .verification-slide__tip {
          width: 100%;
          height: $slide-block-size;
          line-height: $slide-block-size;
          text-align: center;
          font-size: $uni-font-size-sm;
          position: absolute;
          top: 0;
          pointer-events: none;
        }

        .verification-slide__block-before {
          width: 0;
          height: $slide-block-size;
          background-color: mix(transparent, $block-before-color, 70%);
          box-shadow: 0 0 0 1rpx $block-before-color inset;
        }

        .verification-slide__block {
          width: $slide-block-size;
          height: $slide-block-size;
          box-shadow: 0 0 0 1rpx $uni-border-color inset;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 18px;
        }
      }
    }

    &.is-moving {
      .verification-slide__block {
        box-shadow: 0 0 0 1rpx $block-before-color inset !important;
      }
    }

    &.is-failed {
      .verification-tip-panel {
        --tip-bg-color: #{mix(transparent, $uni-color-error, 70%)};
      }

      .verification-slide__block-before {
        background-color: mix(transparent, $uni-color-error, 70%) !important;
        box-shadow: 0 0 0 1rpx $uni-color-error inset !important;
      }

      .verification-slide__block {
        .wd-icon {
          color: $uni-color-error;
        }
      }
    }

    &.is-success {
      .verification-tip-panel {
        --tip-bg-color: #{mix(transparent, $uni-color-success, 70%)};
      }

      .verification-slide__block {
        .wd-icon {
          color: $uni-color-success;
        }
      }
    }
  }
}
</style>
