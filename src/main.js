/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-03-29 17:14:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-25 15:27:50
 */
import { initMixin } from "./init";
import { renderMixin } from "./render";
import { lifeCycleMixin } from "./lifecycle";
// vue 构造函数
function Vue(options) {
  // 初始化  组件
  this._init(options);
}

// 将来会在原型上加很方法 写多了不太好 所以抽出文件来声明
// 扩展一下原型方法
initMixin(Vue);
renderMixin(Vue);
lifeCycleMixin(Vue);

export default Vue;
