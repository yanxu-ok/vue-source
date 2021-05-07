/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-05-07 14:29:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-07 19:40:37
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
  // 添加watcher方法
  addWatcher(watcher) {
    this.deps.push(watcher);
  }

  // 循环执行watcher当中的方法
  notify() {
    this.deps.forEach((watcher) => watcher.upData());
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
