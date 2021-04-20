/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-20 14:40:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-20 15:42:45
 */
import { observe } from "./index";
let oldArrayPrototype = Array.prototype;
// 拷贝一份数组之前的原型对象
export let arrayMethods = Object.create(oldArrayPrototype);
const methods = [
  "push",
  "pop",
  "unshift",
  "shift",
  "reverse",
  "sort",
  "splice",
];
methods.forEach((method) => {
  // 用户如果要调用以上的方法会调用下面重写的方法
  // 数组新增如果是对象的话还需要劫持
  arrayMethods[method] = function (...arg) {
    // 直接调用原来数组方法
    oldArrayPrototype[method].call(this, ...arg);
    let inserted;
    let ob = this.__ob__;
    switch (method) {
      case "push":
      case "unshift":
        inserted = arg;
        break;
      case "splice":
        inserted = arg.slice(2);
        //splice函数参数第二项之后的才是增加的参数
        break;
      default:
        break;
    }
    // console.log(inserted);
    // 如果是数组新增的是对象 则进行劫持
    // 我理解第一种方法 直接对这个数组进行观测
    // if (inserted) observe(inserted);
    // 源码的第二种方法 挂载this
    console.log(this);
    if (inserted) ob.observeArray(inserted);
  };
});
