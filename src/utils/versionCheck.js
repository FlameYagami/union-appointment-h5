// import { uni } from 'uni-app';

const VERSION_FILE =
  process.env.NODE_ENV === 'development' ? '/wkr/package.json' : '/wkr/version.json';
/* 5分钟检查一次 */
// const CHECK_INTERVAL = 5 * 60 * 1000;
const CHECK_INTERVAL = 1000;
console.log('process.env.NODE_ENV ',
  process.env.NODE_ENV);

let polling;

export function initVersionCheck() {
  clearInterval(polling);
  // 定时检查
  polling = setInterval(checkVersion, CHECK_INTERVAL);
}

async function checkVersion() {
  try {
    // 使用uni.request替代axios
    const data = await new Promise((resolve, reject) => {
      uni.request({
        url: VERSION_FILE,
        success: (res) => resolve(res),
        fail: (err) => reject(err)
      });
    });
    // const module = await import(`${VERSION_FILE}`);
    // const data = module.default;
    // console.log('__APP_VERSION__', __APP_VERSION__);
    // console.log('data', data);

    if (__APP_VERSION__ !== data.version) {
      showUpdateNotification();
    }
  } catch (error) {
    console.error('Version check failed:', error);
  }
}

function showUpdateNotification() {
  clearInterval(polling);
  polling = null;

  // 使用uni.showModal替代自定义弹窗
  uni.showModal({
    title: '系统更新',
    content: '检测到系统版本更新，是否立即刷新页面？\n\n如果您正在填写表单，请点击[取消]',
    confirmText: '刷新',
    cancelText: '稍后',
    confirmColor: '#409EFF',
    success: (res) => {
      if (res.confirm) {
        // H5环境下使用location.reload刷新
        location.reload();
      }
    },
    complete: () => {
      initVersionCheck();
    }
  });
}
