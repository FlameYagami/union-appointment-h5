import { clearCache } from '@/config/cache-key.config';
import { apiUserSimple } from '@/service/system/user';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import {
  initial,
  kernel,
  getToken,
  removeCarnet,
  removeToken,
  setCarnet,
  setToken
} from '@/utils/auth/auth';
import { randomString } from '@/utils/tool';
import { handleEncryptData, setCryptoEnabled } from '@/utils/auth/crypto';
import { rsaEncrypt } from '@/utils/auth/jsencrypt';
import {
  apiGetPubConfig,
  apiGetSysPermission,
  apiLogout,
  apiSysLogin
} from '@/service/system/login';

const initState = (isClear) => {
  return {
    token: isClear ? '' : getToken(),
    orgId: '',
    userRoleId: '',
    userRoleLabels: [],
    deptId: '',
    roleId: '',
    userId: '',
    nickname: '',
    username: '',
    telephone: '',
    passwordChanged: '0',
    /** 是否需要填写用户信息 */
    needUserInfo: false,
    /** 是否需要同意书 */
    needConsentForm: false
  };
};

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>(initState());
    const infoReady = ref(false);

    const isLogined = computed(() => !!userInfo.value.token);

    const sysLogin = async (loginForm) => {
      const aesKey = randomString(16);
      const aesIv = randomString(16);
      const aesStr = aesKey + '|' + aesIv;
      setCarnet(aesStr);
      const _loginForm = {
        username: loginForm.username.trim(),
        password: handleEncryptData(loginForm.password, kernel(), initial()),
        carnet: rsaEncrypt(aesStr, loginForm.cryptoKey),
        captcha: loginForm.captcha
      };
      try {
        const { data } = await apiSysLogin(_loginForm);

        setToken(data);
        userInfo.value.token = data;
        await getInfo();
        const { data: userData } = await apiUserSimple();
        Object.assign(userInfo.value, {
          telephone: userData.telephone,
          needConsentForm: userData.needConsentForm,
          needUserInfo: userData.needUserInfo
        });
      } catch (e) {
        console.log(e);
        if(e.code == 401){
          uni.showToast({
            icon: 'none',
            title: e.msg
          });
        }
        throw new Error(e.msg);
      }
    };

    const getPubConfig = async () => {
      try {
        const { data } = await apiGetPubConfig();
        setCryptoEnabled(data.cryptoEnabled);
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getCheckRule = async () => {
      try {
        const { data } = await apiCheckRole();
        return data;
      } catch (error) {
        console.log(error);
      }
    };

    /**
     * 获取用户信息
     */
    const getInfo = async () => {
      if (!isLogined.value) return;
      infoReady.value = false;
      await getPubConfig();
      const { data } = await apiGetSysPermission();
      Object.assign(userInfo.value, {
        deptId: data.deptId,
        orgId: data.orgId,
        userRoleId: data.userRoleId,
        userRoleLabels: data.userRoleLabels,
        roleId: data.roleId,
        userId: data.userId,
        nickname: data.nickname,
        username: data.username,
        passwordChanged: data.passwordChanged
      });
      infoReady.value = true;
    };
    /**
     * 退出系统
     */
    const sysLogout = () => {
      return new Promise((resolve, reject) => {
        apiLogout()
          .then(() => {

          })
          .catch((error) => {
            reject(error);
          })
          .finally(() =>{
            removeToken();
            removeCarnet();
            clearUserInfo();
            clearCache();
            uni.navigateTo({
              url: '/pages/login/index',
              success: () => {
                resolve();
              },
              fail: () => {
                // eslint-disable-next-line prefer-promise-reject-errors
                reject('跳转失败');
              }
            });
          })
      });
    };

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val;
    };

    const clearUserInfo = () => {
      userInfo.value = initState(true);
    };

    const waitInfoReady = () => {
      if (infoReady.value) return Promise.resolve();
      return new Promise<void>((resolve) => {
        const stop = watch(infoReady, (val) => {
          if (val) {
            stop();
            resolve();
          }
        });
      });
    };

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      sysLogin,
      sysLogout,
      getInfo,
      waitInfoReady,
      infoReady,
      getPubConfig,
      getCheckRule,
      isLogined
    };
  },
  {
    persist: true
  }
);
