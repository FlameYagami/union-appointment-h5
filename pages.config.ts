import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '工会预约',
    navigationBarBackgroundColor: '#F8F8F8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF'
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue'
    }
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#1A63E9',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px'
  }
});
