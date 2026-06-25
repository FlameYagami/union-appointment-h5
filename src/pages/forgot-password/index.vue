<route lang="json5">
{
  style: {
    navigationBarTitleText: '忘记密码',
    navigationStyle: 'white'
  }
}
</route>

<template>
  <wd-form ref="formRef" :model="formModel" :rules="formRules">
    <wd-input
      v-model="formModel.telephone"
      :label-width="labelWidth"
      clearable
      label="手机号"
      placeholder="请输入"
      prop="telephone"
      show-word-limit
    />
    <wd-input
      v-model="formModel.newPassword"
      :label-width="labelWidth"
      clearable
      label="设置新密码"
      placeholder="请输入"
      prop="newPassword"
      show-password
    />
    <wd-input
      v-model="formModel.confirmPassword"
      :label-width="labelWidth"
      clearable
      label="确认密码"
      placeholder="请输入"
      prop="confirmPassword"
      show-password
    />
    <sms-code
      v-model="formModel.code"
      :label-width="labelWidth"
      :telephone="formModel.telephone"
      :form-ref="formRef"
    />
    <view class="form-footer">
      <wd-button type="primary" @click="handleSubmit">提交</wd-button>
    </view>
  </wd-form>
</template>

<script setup>
import SmsCode from '@/components/SmsCode/index.vue';
import { apiWxWorkerUserPasswordForget } from '@/service/system/sms';

defineOptions({ name: 'ForgotPassword' });
const formModel = ref({
  telephone: '',
  confirmPassword: '',
  newPassword: '',
  code: ''
});
const labelWidth = '100px';
const formRef = ref(null);

/**
 * 验证密码
 */
function checkPassword(value) {
  const regPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$~#^!%*?&|+=-])[A-Za-z\d@$~#^!%*?&|+=-]{8,16}$/;
  if (!regPassword.test(value)) {
    return Promise.reject(new Error('密码必须由数字、字母、特殊字符组合,请输入8-16位'));
  }
  return Promise.resolve();
}

function equalToPassword(value) {
  if (formModel.value.newPassword !== value) {
    return Promise.reject(new Error('两次输入的密码不一致'));
  } else {
    return Promise.resolve();
  }
}

const formRules = ref({
  telephone: [
    { required: true, message: '手机号是必填的', trigger: 'blur' },
    { pattern: /^1[3-9][0-9]\d{8}$/, message: '请输入正确的手机号' }
  ],
  newPassword: [
    { required: true, message: '新密码是必填的', trigger: 'blur' },
    { validator: checkPassword }
  ],
  confirmPassword: [
    { required: true, message: '确认密码是必填的', trigger: 'blur' },
    { validator: equalToPassword }
  ],
  code: [{ required: true, message: '验证码是必填的', trigger: 'blur' }]
});

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;
  const data = {
    telephone: formModel.value.telephone,
    code: formModel.value.code,
    newPassword: formModel.value.newPassword
  };
  await apiWxWorkerUserPasswordForget(data);
  uni.showToast({
    icon: 'none',
    title: '修改成功',
    duration: 3000
  });
  uni.navigateTo({ url: '/pages/login/index' });
};
</script>

<style lang="scss">
.form-footer {
  padding: 40rpx;

  .wd-button {
    width: 100%;
  }
}
</style>
