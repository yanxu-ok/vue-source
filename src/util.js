/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-03-30 12:39:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-20 12:38:54
 */
// 是否是函数
export function isFunction(val) {
  return typeof val === "function";
}

// 是否是对象
export function isObject(val) {
  return typeof val === "object" && val !== null;
}
