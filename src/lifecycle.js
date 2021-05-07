import { patch } from "./vdom/patch";
import Watcher from "./observe/watcher";
/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-25 15:27:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-07 15:51:58
 */

export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    //   既有初始化 又有更新
    const vm = this;
    vm.$el = patch(vm.$el, vnode);
    // 将返回的新元素替换之前的节点,因为之前的节点已经被删除
  };
}

// 挂载组件
export function mountComponent(vm, el) {
  // 更新函数 数据变化后会再次调用此函数
  function updateComponent() {
    //   调用render函数生成虚拟dom
    vm._update(vm._render());
    // 用虚拟dom生成真是dom
  }
  // updateComponent();

  //创建一个观察者watcher
  new Watcher(vm, updateComponent, () => {}, true);
}
