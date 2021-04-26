/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-25 15:23:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-26 09:36:26
 */
export function createElement(vm, tag, data = {}, ...chilrden) {
  return vnode(vm, tag, data, data.key, chilrden, undefined);
}

export function createTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text);
}

function vnode(vm, tag, data, key, chilrden, text) {
  return {
    vm,
    tag,
    data,
    key,
    chilrden,
    text,
    // .....
  };
}
