/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-05-07 14:29:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-07 15:19:27
 */
let id = 0;
class Dep {
  constructor() {
    //   自增标识符
    this.id = id++;
    this.deps = [];
  }

  depend(key) {
    // 如果当前静态属性target有值(这里肯定有值,代表的是当前的watcher)
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
}

// Dep上挂载全局属性
export function pushTarget(watcher) {
  Dep.target = watcher;
}

// 取消全局属性
export function popTarget() {
  Dep.target = null;
}

export default Dep;
