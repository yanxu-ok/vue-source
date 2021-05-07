/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-25 16:47:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-07 15:51:06
 */
export function patch(oldVnode, vnode) {
  if (oldVnode.nodeType === 1) {
    // 这是元素节点
    // 获取父亲 调用父亲方法删除自己
    const parentEle = oldVnode.parentNode;
    // 创建真实节点
    const ele = createEle(vnode);
    console.log(vnode);
    parentEle.insertBefore(ele, oldVnode.nextSibling);
    parentEle.removeChild(oldVnode);
    // console.log(oldVnode);
    return ele;
    // 这个地方一定要返回创建的新元素
  }
}

// 创建真实dom
function createEle(vnode) {
  let { tag, data, key, text, chilrden } = vnode;
  if (typeof tag == "string") {
    // 说明是节点
    vnode.el = document.createElement(tag);
    chilrden.forEach((child) => {
      vnode.el.appendChild(createEle(child));
    });
  } else {
    // 说明是文本
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}
