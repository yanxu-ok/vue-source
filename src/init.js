import { initState } from "./state";
// Vue是构造函数
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // el ,data
    const vm = this;
    vm.$options = options; // 后面会对options扩展

    // 对 data  computed watch props  进行状态处理
    initState(vm);
  };
}
