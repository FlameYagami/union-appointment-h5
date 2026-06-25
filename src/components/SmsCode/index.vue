<template>
  <wd-input
    v-model="smsCode"
    clearable
    custom-class="valid-code"
    label="验证码"
    placeholder="请输入"
    prop="code"
    ref="codeInputRef"
  >
    <template #suffix>
      <wd-button :disabled="codeEffectiveTime > 0" size="small" @click="getCode">
        获取验证码
        <span v-if="codeEffectiveTime > 0">{{ codeEffectiveTime }}</span>
      </wd-button>
    </template>
  </wd-input>
</template>

<script setup>
import { apiWxWorkerSmsPasswordForget } from '@/service/system/sms';

defineOptions({ name: 'SmsCode' });
const props = defineProps({
  telephone: {
    type: String,
    required: true,
    default: ''
  },
  formRef: {
    type: Object,
    default: () => ({})
  }
});

const smsCode = defineModel('modelValue', { required: true, default: '', type: String });

const countdownCount = 60;
const codeEffectiveTime = ref(undefined);

function countdown(seconds, onTick, onComplete) {
  let remaining = seconds;
  remaining--;
  const timer = setInterval(() => {
    if (onTick) {
      onTick(remaining);
    }
    remaining--;
    if (remaining < 0) {
      clearInterval(timer);
      if (onComplete) {
        onComplete();
      }
    }
  }, 1000);
}

const getCode = async () => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { valid } = await props.formRef?.validate('telephone');
  console.log(valid);
  if (!valid) return;
  const _data = { telephone: props.telephone, type: '10' };
  await apiWxWorkerSmsPasswordForget(_data);
  codeEffectiveTime.value = countdownCount;
  countdown(countdownCount, (remaining) => {
    codeEffectiveTime.value = remaining;
  });
};
</script>

<style lang="scss">
.valid-code {
  .wd-input__value {
    .wd-input__suffix {
      display: flex;
      align-items: center;

      .wd-input__clear {
        margin-right: 25px;
      }
    }
  }
}
</style>
