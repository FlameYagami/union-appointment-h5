import {
  defineStore
} from 'pinia';
const useFormStore = defineStore('form', {
  state: () => ({
    form: {}
  }),
  actions: {
    // 获取评估表单
    getForm() {
      return this.form
    },
    // 设置评估表单
    setForm(data) {
      this.form = Object.assign({}, this.form, data)
    },
    // 清空表单数据
    clearForm() {
      this.form = {}
    },
  }
});

export default useFormStore;
