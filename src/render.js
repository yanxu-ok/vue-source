import { createElement, createTextElement } from "./vdom/index";

/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-25 15:25:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-26 09:38:53
 */
export function renderMixin(Vue) {
  Vue.prototype._c = function () {
    return createElement(this, ...arguments);
  };
  Vue.prototype._v = function (text) {
    return createTextElement(this, text);
  };
  Vue.prototype._s = function (val) {
    return JSON.stringify(val);
  };
  Vue.prototype._render = function () {
    const vm = this;
    const render = vm.$options.render;
    const vnode = render.call(vm);
    return vnode;
  };
}
