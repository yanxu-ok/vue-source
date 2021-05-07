import Dep from "./dep";
import { pushTarget, popTarget } from "./dep";
// vm,当前实例
// exprFunc 更新试图的函数(update 和 render),
// callback 视图刷新后的回调,
// options 标识符 表示这个是否是渲染的watcher
let id = 0;
class Watcher {
  constructor(vm, exprFunc, callback, options) {
    this.vm = vm;
    this.exprFunc = exprFunc;
    this.callback = callback;
    this.options = options;

    // 自增标识符
    this.id = id++;
    this.watchers = [];
    this.idSet = new Set();

    // 自动执行render
    this.getters();
  }

  //当渲染时自动会执行渲染
  getters() {
    //取值之前先把自己挂载到dep上的静态属性,类似于全局后面变量取值时会将dep和watcher关联
    pushTarget(this);
    this.exprFunc();
    popTarget();
  }

  // 添加dep
  addDep(dep) {
    // 判断是否包含相同的depid,不相同才添加
    if (!this.idSet.has(dep.id)) {
      this.idSet.add(dep.id);
      this.watchers.push(dep);
      dep.deps.push(Dep.target);
    }
  }
}

export default Watcher;
