/**
 * by 菲鸽 on 2024-03-06
 * 路由拦截，通常也是登录拦截
 * 这里使用白名单模式，只有白名单中的页面可以在未登录状态下访问
 */
import { useAdditionalInformation } from '@/hooks/use-additiona-lnformation';
import { getToken } from '@/utils/auth/auth';
import { whitelistPages } from '@/utils';

// TODO Check
const loginRoute = '/pages/login/index';

const isDev = import.meta.env.DEV;

// const userStore = useUserStore();
// const { isLogined } = userStore;

const isLogined = () => {
  return !!getToken();
};

// 白名单登录拦截器
const navigateToInterceptor = {
  // 注意，这里的 url 是 '/' 开头的，如 '/pages/index/index'，跟 'pages.json' 里面的 path 不同
  invoke(res) {
    const path = res.url.split('?')[0];

    let whitelist: string[] = [];
    whitelist = whitelistPages;
    const isInWhitelist = whitelist.includes(path);
    if (isLogined()) {
      if (path === '/pages/login/index') return false;
      if (path !== '/pages/additiona-lnformation/index') {
        return useAdditionalInformation();
      }
      return true;
    } else {
      if (isInWhitelist) return true;
      return '/pages/login/index';
    }
    // // 如果要跳转的是登录页且已经登录，则不进行跳转
    // if (path == '/pages/login/index' && hasLogin) {
    //   return false;
    // }
    //
    // if (isInWhitelist || hasLogin) {
    //   return true;
    // }
    //
    // const redirectRoute = `${loginRoute}?redirect=${encodeURIComponent(url)}`;
    // uni.navigateTo({ url: redirectRoute });
    // return false;
  }
};

export const routeInterceptor = {
  install() {
    uni.addInterceptor('navigateTo', navigateToInterceptor);
    uni.addInterceptor('reLaunch', navigateToInterceptor);
    uni.addInterceptor('redirectTo', navigateToInterceptor);
    uni.addInterceptor('switchTab', navigateToInterceptor);
  }
};
