import { patch } from "./vdom/patch";

/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-25 15:27:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-26 09:51:55
 */
export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    //   既有初始化 又有更新
    const vm = this;
    patch(vm.$el, vnode);
  };
}

export function mountComponent(vm, el) {
  // 更新函数 数据变化后会再次调用此函数
  function updateComponent() {
    //   调用render函数生成虚拟dom
    vm._update(vm._render());
    // 用虚拟dom生成真是dom
  }
  updateComponent();
}
