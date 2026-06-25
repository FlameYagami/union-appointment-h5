import Tesseract from 'tesseract.js';

// 生成固定位数随机字符串
export function randomString(e) {
  e = e || 32;
  const t = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const a = t.length;
  let n = '';
  for (let i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
  return n;
}

// 获取上传身份证的身份证号
export async function getImageCardNumber(min, max) {
  function validateIdCard(idCard) {
    // 正则表达式匹配身份证号基本格式
    const pattern = /^[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]$/;
    if (!pattern.test(idCard)) {
      return false;
    }

    // 加权因子
    const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码对应值
    const validCodes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

    // 前 17 位数字
    const idCard17 = idCard.slice(0, 17);
    // 第 18 位校验码
    const idCard18 = idCard.slice(17).toUpperCase();

    let sum = 0;
    for (let i = 0; i < 17; i++) {
      sum += parseInt(idCard17[i]) * weights[i];
    }

    // 计算校验码
    const mod = sum % 11;
    const calculatedCode = validCodes[mod];

    return calculatedCode === idCard18;
  }

  // 1. 初始化时创建缓存的 Tesseract Worker（全局复用）
  let tesseractWorker = null;
  const initWorker = async () => {
    if (!tesseractWorker) {
      const { createWorker } = await import('tesseract.js');
      tesseractWorker = await createWorker();
      await tesseractWorker.load();
      // await tesseractWorker.loadLanguage('eng');
      // await tesseractWorker.initialize('eng');
      // 一次性设置所有优化参数
      await tesseractWorker.setParameters({
        // tessedit_char_whitelist: '0123456789X',
        // tessedit_pageseg_mode: '7',
        // oem: '1',
      });
    }
    return tesseractWorker;
  };
  // 通用图像预处理函数（H5专用方案）
  const preprocessImage = async (filePath) => {
    // 1. 创建原生Canvas元素（H5核心修正）
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 2. 加载图片到内存
    const img = await loadImage(filePath);

    // 3. 计算缩放比例（限制最大宽度）
    const maxWidth = 800;
    const scale = Math.min(maxWidth / img.width, 1);
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    // 4. 绘制图像到Canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // 5. 二值化处理（使用原生getImageData）
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // debugger
    const data = imageData.data;

    const threshold = 100;

    // 双边滤波（平滑处理）
    function bilateralFilter(data, width, height, diameter, sigmaColor, sigmaSpace) {
      const tempData = new Uint8ClampedArray(data.length);
      const radius = Math.floor(diameter / 2);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          for (let c = 0; c < 3; c++) {
            let sum = 0;
            let weightSum = 0;
            for (let dy = -radius; dy <= radius; dy++) {
              for (let dx = -radius; dx <= radius; dx++) {
                const nx = Math.min(Math.max(x + dx, 0), width - 1);
                const ny = Math.min(Math.max(y + dy, 0), height - 1);
                const index = (ny * width + nx) * 4 + c;
                const currentIndex = (y * width + x) * 4 + c;
                const colorDiff = data[index] - data[currentIndex];
                const spaceDiff = Math.sqrt(dx * dx + dy * dy);
                const colorWeight = Math.exp(
                  -(colorDiff * colorDiff) / (2 * sigmaColor * sigmaColor)
                );
                const spaceWeight = Math.exp(
                  -(spaceDiff * spaceDiff) / (2 * sigmaSpace * sigmaSpace)
                );
                const weight = colorWeight * spaceWeight;
                sum += data[index] * weight;
                weightSum += weight;
              }
            }
            tempData[(y * width + x) * 4 + c] = Math.round(sum / weightSum);
          }
          tempData[(y * width + x) * 4 + 3] = data[(y * width + x) * 4 + 3];
        }
      }
      for (let i = 0; i < data.length; i++) {
        data[i] = tempData[i];
      }
    }

    // 应用双边滤波
    bilateralFilter(data, canvas.width, canvas.height, 5, 10, 10);

    // 二值化处理
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const val = avg > threshold ? 255 : 0;
      data[i] = data[i + 1] = data[i + 2] = val;
    }
    // 图像细化（Zhang-Suen 算法）
    function zhangSuenThinning(data, width, height) {
      let changed;
      do {
        changed = false;
        const mark = new Array(data.length / 4).fill(false);

        // 第一次扫描
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const p1 = (y * width + x) * 4;
            if (data[p1] === 0) continue;

            const p2 = ((y - 1) * width + x) * 4;
            const p3 = ((y - 1) * width + x + 1) * 4;
            const p4 = (y * width + x + 1) * 4;
            const p5 = ((y + 1) * width + x + 1) * 4;
            const p6 = ((y + 1) * width + x) * 4;
            const p7 = ((y + 1) * width + x - 1) * 4;
            const p8 = (y * width + x - 1) * 4;
            const p9 = ((y - 1) * width + x - 1) * 4;

            const np =
              (data[p2] === 255 ? 1 : 0) +
              (data[p3] === 255 ? 1 : 0) +
              (data[p4] === 255 ? 1 : 0) +
              (data[p5] === 255 ? 1 : 0) +
              (data[p6] === 255 ? 1 : 0) +
              (data[p7] === 255 ? 1 : 0) +
              (data[p8] === 255 ? 1 : 0) +
              (data[p9] === 255 ? 1 : 0);

            let transitions = 0;
            if (
              (data[p2] === 0 && data[p3] === 255) ||
              (data[p3] === 0 && data[p4] === 255) ||
              (data[p4] === 0 && data[p5] === 255) ||
              (data[p5] === 0 && data[p6] === 255) ||
              (data[p6] === 0 && data[p7] === 255) ||
              (data[p7] === 0 && data[p8] === 255) ||
              (data[p8] === 0 && data[p9] === 255) ||
              (data[p9] === 0 && data[p2] === 255)
            ) {
              transitions++;
            }

            if (
              np >= 2 &&
              np <= 6 &&
              transitions === 1 &&
              data[p2] * data[p4] * data[p6] === 0 &&
              data[p4] * data[p6] * data[p8] === 0
            ) {
              mark[y * width + x] = true;
              changed = true;
            }
          }
        }

        for (let i = 0; i < mark.length; i++) {
          if (mark[i]) {
            const index = i * 4;
            data[index] = data[index + 1] = data[index + 2] = 0;
          }
        }

        // 重置标记数组
        mark.fill(false);

        // 第二次扫描
        for (let y = 1; y < height - 1; y++) {
          for (let x = 1; x < width - 1; x++) {
            const p1 = (y * width + x) * 4;
            if (data[p1] === 0) continue;

            const p2 = ((y - 1) * width + x) * 4;
            const p3 = ((y - 1) * width + x + 1) * 4;
            const p4 = (y * width + x + 1) * 4;
            const p5 = ((y + 1) * width + x + 1) * 4;
            const p6 = ((y + 1) * width + x) * 4;
            const p7 = ((y + 1) * width + x - 1) * 4;
            const p8 = (y * width + x - 1) * 4;
            const p9 = ((y - 1) * width + x - 1) * 4;

            const np =
              (data[p2] === 255 ? 1 : 0) +
              (data[p3] === 255 ? 1 : 0) +
              (data[p4] === 255 ? 1 : 0) +
              (data[p5] === 255 ? 1 : 0) +
              (data[p6] === 255 ? 1 : 0) +
              (data[p7] === 255 ? 1 : 0) +
              (data[p8] === 255 ? 1 : 0) +
              (data[p9] === 255 ? 1 : 0);

            let transitions = 0;
            if (
              (data[p2] === 0 && data[p3] === 255) ||
              (data[p3] === 0 && data[p4] === 255) ||
              (data[p4] === 0 && data[p5] === 255) ||
              (data[p5] === 0 && data[p6] === 255) ||
              (data[p6] === 0 && data[p7] === 255) ||
              (data[p7] === 0 && data[p8] === 255) ||
              (data[p8] === 0 && data[p9] === 255) ||
              (data[p9] === 0 && data[p2] === 255)
            ) {
              transitions++;
            }

            if (
              np >= 2 &&
              np <= 6 &&
              transitions === 1 &&
              data[p2] * data[p4] * data[p8] === 0 &&
              data[p2] * data[p6] * data[p8] === 0
            ) {
              mark[y * width + x] = true;
              changed = true;
            }
          }
        }

        for (let i = 0; i < mark.length; i++) {
          if (mark[i]) {
            const index = i * 4;
            data[index] = data[index + 1] = data[index + 2] = 0;
          }
        }
      } while (changed);
    }

    // 应用图像细化
    // zhangSuenThinning(data, canvas.width, canvas.height);

    // 6. 输出处理后的Base64
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL('image/jpeg', 0.7); // JPEG压缩
  };

  // H5图片加载辅助函数
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
      // 处理跨域问题
      // img.crossOrigin = 'Anonymous'; // 如需跨域请取消注释
    });
  };
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: async (res) => {
        const tempFilePaths = res.tempFilePaths;
        setTimeout(async () => {
          await uni.showLoading({
            title: '识别中',
            mask: true
          });
          if (tempFilePaths.length > 0) {
            const filePath = tempFilePaths[0];

            try {
              // const tesseractRes = await Tesseract.recognize(filePath, 'eng', {
              //   tessedit_char_whitelist: '0123456789X', // 允许数字 + 大写 X
              //   tessedit_pageseg_mode: '7', // PSM 7：单行文本模式（加速关键）
              //   oem: '1', // 仅用 LSTM OCR 引擎（平衡速度与精度）
              //   // 新增优化参数
              //   // dpi: 150, // 手动设置合适 DPI（避免自动检测耗时）
              //   // tessedit_do_invert: '0', // 禁用反色处理（减少计算）
              //   // preserve_interword_spaces: '0', // 关闭空格保留（针对连续数字场景）
              //   // worker: Tesseract.createWorker({
              //   //   workerPath: 'tesseract.js/worker.min.js',
              //   //   corePath: 'tesseract.js-core/tesseract-core.wasm.js',
              //   //   workerBlobURL: false, // 避免 Blob URL 性能问题
              //   //   cacheMethod: 'refresh', // 复用缓存模型
              //   // })
              // }, );
              const worker = await initWorker(); // 复用Worker
              const processed = await preprocessImage(filePath);
              console.log(processed);
              const tesseractRes = await worker.recognize(processed);
              console.log(tesseractRes);
              const pattern =
                /[1-9]\d{5}(18|19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}[0-9Xx]/;
              const match = tesseractRes.data.text.match(pattern);
              uni.hideLoading();
              if (match) {
                const idCard = match[0];
                if (validateIdCard(idCard)) {
                  resolve(idCard);
                } else {
                  resolve(false);
                  // resolve(idCard);
                }
              } else {
                resolve(false);
                // console.log(tesseractRes);

                // resolve(tesseractRes.data.text);
              }
            } catch (err) {
              uni.hideLoading();
              console.log('识别失败', err);
              resolve(false);
              // resolve(err);
            }
          } else {
            uni.hideLoading();
            resolve(false);
          }
        }, 500);
      },
      fail: (err) => {
        uni.hideLoading();
        console.error('选择图片失败:', err);
        resolve(false);
      }
    });
  });
}
// 身份证号脱敏
export function maskIdCard(idNumber) {
  if (/^\d{4}\*{10}\d{4}$/.test(idNumber)) {
    return idNumber;
  }
  return idNumber.slice(0, 4) + '**********' + idNumber.slice(-4);
}
/**
 * 格式化评估数据
 * @param data
 * @param {'v1' | 'v2'} version - 输出类型('v1'：第一种亲属关系结构， 'v2'：第二种亲属关系结构)
 * @returns {Object} 格式化后的数据
 */
export function formatEvaluateData(data, version) {
  const newData = { ...data };
  const familyTumorDetail = JSON.parse(data.familyTumorDetail);

  const versionMap = {
    v1: formatToV1,
    v2: formatToV2
  };
  if (familyTumorDetail?.length > 0) {
    versionMap[version]();
  }

  function formatToV1() {
    if (Object.prototype.hasOwnProperty.call(familyTumorDetail[0], 'e42l')) {
      const res = familyTumorDetail.map((item) => {
        const result = { e41: item.e41, e42: [], e42o: '' };
        if (item.e42l?.length > 0) {
          for (const v of item.e42l) {
            result.e42.push(v.e42);
            v.e42o && (result.e42o = v.e42o);
          }
        }
        result.e42 = result.e42.join(',');
        return result;
      });
      newData.familyTumorDetail = JSON.stringify(res);
    }
  }
  function formatToV2() {
    if (Object.prototype.hasOwnProperty.call(familyTumorDetail[0], 'e42o')) {
      const res = familyTumorDetail.map((item) => {
        const result = { e41: item.e41, e42l: [] };
        for (const v of item.e42.split(',') || []) {
          result.e42l.push({ e42: v, e42a: null, e42o: item.e42o || '' });
        }
        return result;
      });
      newData.familyTumorDetail = JSON.stringify(res);
    }
  }
  return newData;
}

export const cancerTypeData = {
  1: '肺癌',
  2: '结直肠癌',
}