<route lang="json5">
{
  style: {
    navigationBarTitleText: '登录',
    navigationStyle: 'custom'
  }
}
</route>

<template>
  <view class="login_container">
    <view class="title">欢迎登录</view>
    <!-- <template v-if="!isProd"> -->
    <view class="platform">工会预约平台</view>
    <!-- </template> -->
    <view class="form_box">
      <view class="form_row">
        <wd-form ref="formRef" :model="formModel" :rules="formRules">
          <view class="form_item">
            <view class="label">账号</view>
            <wd-input v-model="formModel.username" clearable placeholder="请输入账号" prop="username" size="large" />
          </view>
          <view class="form_item">
            <view class="label">密码</view>
            <wd-input v-model="formModel.password" clearable placeholder="请输入密码" prop="password" show-password
              size="large" />
          </view>
          <view class="remember_password_row">
            <wd-checkbox v-model="isRememberPassword" shape="square">记住密码</wd-checkbox>
            <text class="forgot-password" @click="toForgotPassword">忘记密码</text>
          </view>
        </wd-form>
        <view class="footer">
          <wd-button block size="large" type="primary" @click="handleSubmit">登录</wd-button>
        </view>
        <!-- <view class="tip_box">如忘记密码，请及时联系机构管理员处理！</view> -->
      </view>
    </view>
    <verification ref="verificationRef" @success="handleSuccess"></verification>
  </view>
</template>

<script setup>
import { useUserStore } from '@/store';
import Verification from '@/components/Verification/index.vue';
import { CacheKey } from '@/config/cache-key.config';
import { handleDecryptData, handleEncryptData } from '@/utils/auth/crypto';
import { initial, kernel } from '@/utils/auth/auth';
import { currRoute } from '@/utils/index';

const userStore = useUserStore();
const { getPubConfig, sysLogin, isLogined, getCheckRule } = userStore;

const isProd = import.meta.env.MODE === 'production';
// const isProd = true;
console.log('当前环境', import.meta.env.MODE);

const verificationRef = ref(null);
const formRef = ref(null);

// 表单数据
const formModel = ref({
  username: '',
  password: '',
  cryptoKey: '',
  captcha: ''
});
const formRules = {
  username: [
    {
      required: true,
      message: '请填写账号'
    }
  ],
  password: [
    {
      required: true,
      message: '请填写密码'
    }
  ]
};

// 是否记住密码
const isRememberPassword = ref(false);

const pubConfig = ref({
  registerEnable: '0',
  cryptoKey: '',
  captchaEnable: '1'
});
onShow(() => {
  init();
  if (isLogined) {
    uni.navigateTo({
      url: '/pages/index/index'
    });
  }
});

const toForgotPassword = () => {
  uni.navigateTo({
    url: '/pages/forgot-password/index'
  });
};

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(({ valid }) => {
      if (valid) {
        if (pubConfig.value.captchaEnable !== '0') {
          verificationRef.value.show();
        } else {
          handleLogin();
        }
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

const handleSuccess = (data) => {
  if (data) {
    formModel.value.captcha = data.captchaVerification;
  }
  handleLogin();
};

const handleLogin = async () => {
  formModel.value.cryptoKey = pubConfig.value.cryptoKey;
  await sysLogin(formModel.value);

  await handleRememberPassword();

  uni.navigateTo({
    url: '/pages/index/index'
  });
  // // 获取当前页面的 URL
  // const { path, query } = currRoute();
  // // 检查是否有重定向参数
  // const redirectUrl = query.redirect;
  // console.log('redirectUrl:', redirectUrl);
  // if (redirectUrl) {
  //   // 跳转到重定向路径
  //   uni.navigateTo({
  //     url: redirectUrl,
  //     fail: () => {
  //       uni.switchTab({
  //         url: redirectUrl
  //       });
  //     }
  //   });
  // } else {
  //   // 如果没有重定向参数，跳转到默认页面
  //   uni.switchTab({
  //     url: '/pages/index/index'
  //   });
  // }
};

const handleRememberPassword = () => {
  if (isRememberPassword.value) {
    const jsonStr = JSON.stringify({
      username: formModel.value.username,
      password: formModel.value.password,
      rememberMe: isRememberPassword.value
    });
    const encryptObj = handleEncryptData(jsonStr);
    uni.setStorageSync(CacheKey.RememberPassword, encryptObj);
  } else {
    uni.removeStorageSync(CacheKey.RememberPassword);
  }
};

const init = async () => {
  pubConfig.value = await getPubConfig();
  /* 恢复记住的账号密码 */
  const data = uni.getStorageSync(CacheKey.RememberPassword);
  const decryptData = handleDecryptData(data);
  if (!decryptData) return;
  const parseData = JSON.parse(decryptData);

  formModel.value.username = parseData.username;
  formModel.value.password = parseData.password;
  isRememberPassword.value = parseData.rememberMe;
};
</script>

<style lang="scss" scoped>
page {
  background-color: #eceff8;
}

.login_container {
  width: 100%;
  height: 100%;
  padding-bottom: 40rpx;
  overflow: hidden;
  background-image: url('@/static/images/backGroundImg.png');
  background-repeat: no-repeat;
  /* 图片不重复 */
  background-size: 100% auto;

  /* 保持图片长宽比例，使图片完全包含在元素内 */
  .logo_box {
    height: 66rpx;
    margin-top: 84rpx;
    margin-left: 24rpx;

    img {
      height: 66rpx;
    }
  }

  .title {
    width: 100%;
    margin-top: 120rpx;
    margin-left: 24rpx;
    font-size: 46rpx;
    font-weight: 900;
    letter-spacing: 9rpx;
    /* 设置渐变背景 */
    background-image: linear-gradient(to bottom, #4bbef9, #0743e3);
    /* 使背景裁剪到文字 */
    -webkit-background-clip: text;
    background-clip: text;
    /* 让文字颜色透明，从而显示出背景渐变 */
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }

  .platform {
    width: 100%;
    margin-top: 30rpx;
    margin-left: 24rpx;
    font-size: 32rpx;
    font-weight: 600;
    /* 设置渐变背景 */
    background-image: linear-gradient(to bottom, #4bbef9, #0743e3);
    /* 使背景裁剪到文字 */
    -webkit-background-clip: text;
    background-clip: text;
    /* 让文字颜色透明，从而显示出背景渐变 */
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
  }

  .form_box {
    width: 100%;
    padding: 0 28rpx;

    .form_row {
      padding: 0 51rpx;
      padding-top: 83rpx;
      padding-bottom: 80rpx;
      margin-top: 95rpx;
      background: #ffffff36;
      border-radius: 40rpx 40rpx 40rpx 40rpx;
      box-shadow: 0 7rpx 21rpx 0 #b0c6e73d;
    }

    .form_item {
      margin-bottom: 42rpx;

      .label {
        margin-bottom: 23rpx;
        font-size: 32rpx;
        font-weight: 500;
      }

      .wd-input {
        width: 100%;
      }
    }

    .remember_password_row {
      // float: right;
      display: flex;
      justify-content: space-between;

      .forgot-password {
        font-size: 14px;
        // color: rgb(147 197 253 / 0.5);
        color: #242425;
      }
    }

    .footer {
      display: flex;
      justify-content: center;
      margin-top: 60rpx;

      .wd-button {
        width: 80%;
        background: linear-gradient(to bottom, #4bbef9, #0743e3);
      }
    }
  }

  .tip_box {
    margin-top: 130rpx;
    color: #a8a8a8;
    text-align: center;
  }
}
</style>
