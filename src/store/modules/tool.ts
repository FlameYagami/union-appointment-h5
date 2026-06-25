import useFormStore from '@/store/modules/form';
const useFormStorePinia = useFormStore();

export const validatorFn = (value, rule) => {
  if (useFormStorePinia.getForm().age) {
    let age = Number(useFormStorePinia.getForm().age);
    value = Number(value);
    if (value >= 1 && value <= age) {
      return true;
    } else {
      return Promise.reject(`请输入1到${age || 200}的整数`);
    }
  } else {
    return Promise.reject('请输入小于年龄的整数');
  }
};
