import { pages, subPackages, tabBar } from '@/pages.json';
import { isMpWeixin } from './platform';

// 定义白名单
export const whitelistPages = [
  '/pages/login/index',
  '/pages/forgot-password/index',
  '/pages-sub/questionPage/index'
  // 可添加更多不需要登录就能访问的页面
];

const getLastPage = () => {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
};

/** 判断当前页面是否是tabbar页  */
export const getIsTabbar = () => {
  if (!tabBar) {
    return false;
  }
  if (!tabBar.list.length) {
    return false;
  }
  const lastPage = getLastPage();
  const currPath = lastPage.route;
  return !!tabBar.list.find((e) => e.pagePath === currPath);
};

/**
 * 获取当前页面路由的 path 路径和 redirectPath 路径
 * path 如 ‘/pages/login/index’
 * redirectPath 如 ‘/pages/demo/base/route-interceptor’
 */
export const currRoute = () => {
  const lastPage = getLastPage();
  const currRoute = (lastPage as any).$page;
  const { fullPath } = currRoute as { fullPath: string };
  return getUrlObj(fullPath);
};

const ensureDecodeURIComponent = (url: string) => {
  if (url.startsWith('%')) {
    return ensureDecodeURIComponent(decodeURIComponent(url));
  }
  return url;
};
/**
 * 解析 url 得到 path 和 query
 * 比如输入url: /pages/login/index?redirect=%2Fpages%2Fdemo%2Fbase%2Froute-interceptor
 * 输出: {path: /pages/login/index, query: {redirect: /pages/demo/base/route-interceptor}}
 */
export const getUrlObj = (url: string) => {
  const [path, queryStr] = url.split('?');
  if (!queryStr) {
    return {
      path,
      query: {}
    };
  }
  const query: Record<string, string> = {};
  queryStr.split('&').forEach((item) => {
    const [key, value] = item.split('=');
    query[key] = ensureDecodeURIComponent(value);
  });
  return {
    path,
    query
  };
};
/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 这里设计得通用一点，可以传递key作为判断依据，默认是 needLogin, 与 route-block 配对使用
 * 如果没有传 key，则表示所有的pages，如果传递了 key, 则表示通过 key 过滤
 */
export const getAllPages = (key = 'needLogin') => {
  const mainPages = [
    ...pages
      .filter((page) => !key || page[key])
      .map((page) => ({
        ...page,
        path: `/${page.path}`
      }))
  ];
  const subPages: any[] = [];
  subPackages.forEach((subPageObj) => {
    const { root } = subPageObj;
    subPageObj.pages
      .filter((page) => !key || page[key])
      .forEach((page: { path: string } & Record<string, any>) => {
        subPages.push({
          ...page,
          path: `/${root}/${page.path}`
        });
      });
  });
  const result = [...mainPages, ...subPages];
  return result;
};

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const getNeedLoginPages = (): string[] => getAllPages('needLogin').map((page) => page.path);

/**
 * 得到所有的需要登录的pages，包括主包和分包的
 * 只得到 path 数组
 */
export const needLoginPages: string[] = getAllPages('needLogin').map((page) => page.path);

/**
 * 根据微信小程序当前环境，判断应该获取的BaseUrl
 */
export const getEnvBaseUrl = () => {
  let baseUrl = import.meta.env.VITE_SERVER_BASEURL + import.meta.env.VITE_SERVER_API;
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion }
    } = uni.getAccountInfoSync();
    switch (envVersion) {
      case 'develop':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_DEVELOP || baseUrl;
        break;
      case 'trial':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_TRIAL || baseUrl;
        break;
      case 'release':
        baseUrl = import.meta.env.VITE_SERVER_BASEURL__WEIXIN_RELEASE || baseUrl;
        break;
    }
  }
  return baseUrl;
};

/**
 * 根据微信小程序当前环境，判断应该获取的UPLOAD_BASEURL
 */
export const getEnvBaseUploadUrl = () => {
  let baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL;
  if (isMpWeixin) {
    const {
      miniProgram: { envVersion }
    } = uni.getAccountInfoSync();
    switch (envVersion) {
      case 'develop':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_DEVELOP || baseUploadUrl;
        break;
      case 'trial':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_TRIAL || baseUploadUrl;
        break;
      case 'release':
        baseUploadUrl = import.meta.env.VITE_UPLOAD_BASEURL__WEIXIN_RELEASE || baseUploadUrl;
        break;
    }
  }
  return baseUploadUrl;
};

/**
 * 检查目标页面是否在白名单中
 * @param {string} path 目标页面路径
 * @returns {boolean} 是否在白名单中
 */
export const isInWhitelist = (path: string) => {
  return whitelistPages.includes(path);
};
