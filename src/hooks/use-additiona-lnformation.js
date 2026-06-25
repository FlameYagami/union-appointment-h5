import { useUserStore } from '@/store';

export const useAdditionalInformation = () => {
  if (useUserStore().userInfo.passwordChanged !== '1') {
    console.log(useUserStore().userInfo.passwordChanged !== '1');
    uni.redirectTo({ url: '/pages/additiona-lnformation/index' });
    return false;
  } else {
    return true;
  }
};
