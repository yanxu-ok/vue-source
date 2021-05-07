/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-03-30 14:28:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-07 15:29:07
 */
import { isObject } from "../util";
import { arrayMethods } from "./array";
import Dep from "./dep";
class Observer {
  constructor(data) {
    // data.__ob__ = this;
    // 挂载变量会 后面数组新增方法会调用observeArray方法， 所有被劫持过的属性都会有__ob__属性,
    // 设置成不可枚举属性，后面的object.keys就不会遍历到，就不会溢出
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false,
    });
    // 如果是数组可以检测索引，但是检测索引性能大幅度下降，选择了重写数组的__proto__属性
    // 用户很少通过索引操作数组，内部数组不采用defineProperty
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods;
      // 如果数组里面也有对象的话，数组里面的对象也需要劫持这里需要在进行递归遍历
      this.observeArray(data);
    } else {
      this.walk(data);
    }
  }
  observeArray(data) {
    // 遍历数组将数组当中的对象进行劫持
    data.forEach((item) => observe(item));
  }
  walk(data) {
    //  遍历对象
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key]);
    });
  }
}

// 对每个属性进行重新定义
function defineReactive(data, key, value) {
  // 如果对象里面套对象在需要遍历
  observe(value);
  // 每个属性在添加一个dep属性时都会有一个dep属性,只是后将dep实例缓存起来,所以后面会有id相等的情况, 取值的时候调用关联方法
  let dep = new Dep();
  Object.defineProperty(data, key, {
    get() {
      dep.depend();
      console.log(dep);
      return value;
    },
    set(newV) {
      // 如果在赋新值的情况下如果是对象的话，对象当中的值也不会被检测，需要再次遍历
      observe(newV);
      value = newV;
    },
  });
}

export function observe(data) {
  // 如果是对象才观测
  if (!isObject(data)) {
    return;
  }
  return new Observer(data);
}
