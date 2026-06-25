import * as cornerstone from 'cornerstone-core';
import dicomParser from 'dicom-parser';
import * as cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';

/**
 *
 * @param fileUrl - dcm 文件路径
 * @param dicomContainer - 渲染容器
 * @returns {Promise<void>}
 */
export const loadDicomImage = async (fileUrl, dicomContainer) => {
  /* 通过try catch 判断是否有对应的拓展 没有则赋值*/
  try {
    if (!cornerstoneWADOImageLoader.external.dicomParser) return;
  } catch (e) {
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
  }

  try {
    if (!cornerstoneWADOImageLoader.external.cornerstone) return;
  } catch (e) {
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
  }

  if (!dicomContainer) return;
  if (!fileUrl) return;
  cornerstone.enable(dicomContainer);
  const imageIdObject = `wadouri:${fileUrl}`;

  try {
    const image = await cornerstone.loadImage(imageIdObject);
    const viewport = cornerstone.getDefaultViewportForImage(dicomContainer, image);
    cornerstone.displayImage(dicomContainer, image, viewport);
    return dicomContainer;
  } catch (error) {
    console.error('Error loading DICOM image:', error);
  }
};

export const dcmToImage = async (fileUrl) => {
  const dicomWrapper = document.createElement('div');
  dicomWrapper.style.width = '200px';
  dicomWrapper.style.height = '600px';
  document.body.appendChild(dicomWrapper);
  await loadDicomImage(fileUrl, dicomWrapper);
  const canvas = dicomWrapper.children[0];
  const canvasContext = canvas.getContext('2d');
}
