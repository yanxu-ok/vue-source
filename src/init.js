/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-03-30 10:12:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-21 10:15:59
 */
import { initState } from "./state";
import { compilerToFunction } from "./compiler/index";
// Vue是构造函数
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // el ,data
    const vm = this;
    vm.$options = options; // 后面会对options扩展

    // 对 data  computed watch props  进行状态处理
    initState(vm);

    // 用户可以直接用vm.$mount进行挂载，或者判断el进行挂载
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  Vue.prototype.$mount = function (el) {
    el = document.querySelector(el);
    const vm = this;
    const options = vm.$options;
    // 处理模板编译成render函数
    if (!options.render) {
      let template = options.template;
      // 如果也没有template，但是有el 则就取el的节点
      if (!template && el) {
        template = el.outerHTML;
        let render = compilerToFunction(template);
        options.render = render;
      }
    }
  };
}
