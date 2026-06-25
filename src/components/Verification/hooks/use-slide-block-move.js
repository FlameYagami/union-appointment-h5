import { VERIFY_STATUS } from '@/components/Verification/enums';

export const useSlideBlockMove = ({
  verificationMaskRef,
  verifyConfig,
  handleCheck,
  verifyStatus
}) => {
  const blockLeftDistance = ref(0);
  /* 滑动耗时 */
  const moveTake = ref(undefined);
  let startX;
  let startTime;
  const handleMoveStart = (event) => {
    const changedTouche = event.changedTouches[0];
    if (!changedTouche) return;
    /* 阻止 移动端浏览器 默认滑动 */
    if (document.documentElement.style) {
      document.documentElement.style.overflow = 'hidden';
    }
    verifyStatus.value = VERIFY_STATUS.MOVING.code;
    startX = changedTouche.clientX;
    startTime = new Date().getTime();

    verificationMaskRef.value.$el.addEventListener('touchmove', handleMove);
    verificationMaskRef.value.$el.addEventListener('touchend', handleEnd);
  };

  function handleMove(event) {
    const changedTouche = event.changedTouches[0];
    if (!changedTouche) return;

    move(changedTouche.clientX);
  }

  function handleEnd() {
    if (document.documentElement.style) {
      document.documentElement.style.overflow = 'unset';
    }
    verificationMaskRef.value.$el.removeEventListener('touchmove', handleMove);
    verificationMaskRef.value.$el.removeEventListener('touchend', handleEnd);
    verifyStatus.value = VERIFY_STATUS.VERIFYING.code;
    moveTake.value = Math.floor((new Date().getTime() - startTime) / 10) / 100;
    handleCheck();
  }

  function move(endX) {
    let diff = endX - startX;
    if (typeof diff !== 'number') return;
    diff = Math.floor(diff);
    if (diff < 0) {
      diff = 0;
    } else if (diff > verifyConfig.maxMoveDistance) {
      diff = verifyConfig.maxMoveDistance;
    }

    blockLeftDistance.value = diff;
  }

  return {
    handleMoveStart,
    blockLeftDistance,
    moveTake
  };
};
