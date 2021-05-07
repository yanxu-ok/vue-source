import { patch } from "./vdom/patch";
import Watcher from "./observe/watcher";
/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-25 15:27:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-07 19:40:30
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

// watcher 和 dep
// 我们将视图更新的方法封装成了一个watcher
// 视图渲染之前会将watcher挂到Dep.target上
// 在vue中页面渲染使用的属性需要进行依赖收集，收集属性的渲染watcher
// 一开始劫持属性时，要为每个属性添加一个dep属性，用于存储这个渲染watcher(同一个watcher对应多个dep)
// 每个属性可能对应多个视图(多个视图肯定是多个watcher) 一个属性要对应多个watcher
// dep.depend()=>通知dep存放watcher=> Dep.target.addDep() =>通知watcher存放dep
// 双向存储
// 赋值时。dep.notify()将当前存放的watcher执行unpdata()方法进行更新视图
