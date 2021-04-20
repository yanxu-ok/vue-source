/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-03-30 11:23:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-20 10:08:19
 */
import { isFunction } from "./util";
import { observe } from "./observe/index";
// 状态的初始化
export function initState(vm) {
  const opts = vm.$options;
  if (opts.data) {
    initData(vm);
  }
}

// 代理
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key];
    },
    set(newV) {
      vm[source][key] = newV;
    },
  });
}

function initData(vm) {
  let data = vm.$options.data;

  // vue2会将data中的所有数据进行数据劫持，Object.defineProperty
  // 两种形式 对象函数
  // data函数返回的数据不会替换data,
  // 此时vm 和 data 没有任何关系 可以挂载到vm下
  data = vm._data = isFunction(data) ? data.call(vm) : data;

  // 代理  将vm.age => vm._data.age  相当于_data属性重新复制到vm上的属性 当查找vm上的属性时，则会去找vm._data下的属性
  observe(data);

  for (const key in data) {
    proxy(vm, "_data", key);
  }
}
