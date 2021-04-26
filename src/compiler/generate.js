/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-23 14:18:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-25 11:48:21
 */
//   <div id="app" class="a">
//   <a href="1">2<div>1</div></a>
//   <ul>
//     <li>文本</li>
//   </ul>
// </div>
// render() {
//   return _c('div', {
//     id: 'app',
//     class: 'a'
//   }, )
// }
const style = /([^:;]+):([^:;]+)/g; // 解析是否是内联样式
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{aaaa}}

// 循环属性
function genAttrs(el) {
  //  先判断有没有属性
  let attr = el.attr;
  if (attr.length != 0) {
    let str = ""; // 字符串
    // 循环遍历的值是字符串但没有引号，所以要加上
    // 有另外一种情况 就是内联样式 写成对象形式的style:{ background: white,color: #000; }
    attr.forEach((element) => {
      if (element.key === "style") {
        let styleObj = {};
        element.value.replace(style, function () {
          styleObj[arguments[1]] = arguments[2];
        });
        element.value = styleObj;
      }
      str += `${element.key}:${JSON.stringify(element.value)},`;
    });
    // 最后会发现堆了个逗号  slice(0, -1)截取最后一项
    return `{${str.slice(0, -1)}}`;
  }
  return undefined;
}

// 处理文本和节点
function gen(el) {
  if (el.type === 1) {
    // 判断如果节点是类型是1的话 就继续递归
    return generate(el);
  }
  if (el.type === 3) {
    let text = el.text;
    // 如果节点是文本, 有两种结果 一种直接是文本，另一种包括 {{name}}
    // if (text) return `_v('${text}')`;
    if (!defaultTagRE.test(text)) {
      return `_v('${text}')`;
    } else {
      // 这里用到正则 exec方法如果是全局就一直循环
      //   先获取匹配到开始索引，然后判断当前索引不为零则说明前面有普通的文本
      // 判断索引如果大于上次的索引将前面的内容用tokens push进去, 然后将匹配到的结果push进去
      // 然后将lastindex 置为 index + match[0].length
      //   123{{name}}world{{age}}
      //   格式化成 _v(123+_s({{name}})+world+_s({{age}}))
      let tokens = [];
      let match; // 匹配结果
      let lastIndex = 0;
      defaultTagRE.lastIndex = 0;
      while ((match = defaultTagRE.exec(text))) {
        const index = match.index; // 获取匹配当前的索引
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }
        tokens.push(`_s(${match[1].trim()})`);
        lastIndex = index + match[0].length;
      }
      //   匹配完之后的索引如果小于字符串的长度 说明后面还有内容直接push最后的内容就可
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }
      return `_v(${tokens.join("+")})`;
    }
  }
}

//处理孩子节点
function genChilrden(el) {
  let chilrden = el.chilrden;
  if (chilrden) {
    return chilrden.map((c) => gen(c)).join(",");
  }
  return false;
}

// 生成代码
// 字符串要加上单引号，要不就是变量了
export function generate(el) {
  let chilrden = genChilrden(el);
  let str = `_c('${el.tag}',${genAttrs(el)}${chilrden ? "," + chilrden : ""})`; // 有孩子那就逗号和孩子一块显示，没有就不显示逗号
  return str;
}

// 练习
// function getAttrs(el) {
//   const attrs = el.attrs;
//   if (attrs.length !== 0) {
//     let str = "";
//     attrs.forEach((attr) => {
//       if (attr.key === "style") {
//         let styleObj = {};
//         attr.value.replace(style, function () {
//           styleObj[arguments[1]] = arguments[2];
//         });
//         attr.value = styleObj;
//       }
//       str += `${attr.key}:${JSON.stringify(attr.value)},`;
//     });
//     return `{${str.slice(0, -1)}}`;
//   }
// }

// function gen(el) {
//   if (el.type === 1) {
//     return generate(el);
//   }
//   if (el.type === 3) {
//     const text = el.text;
//     if (!defaultTagRE.test(text)) {
//       return `_v('${text}')`;
//     } else {
//       // 123{{name}}world{{age}}
//       let match;
//       let tokens = [];
//       let lastIndex = 0;
//       defaultTagRE.lastIndex = 0;
//       while ((match = defaultTagRE.exec(text))) {
//         const index = match.index;
//         if (index > lastIndex) {
//           tokens.push(JSON.stringify(text.slice(lastIndex, index)));
//         }
//         tokens.push(`_s(${match[0].trim()})`);
//         lastIndex = index + match[0].length;
//       }
//       if (lastIndex < text.length) {
//         tokens.push(JSON.stringify(text.slice(lastIndex)));
//       }
//       return `_v(${tokens.join("+")})`;
//     }
//   }
// }

// function getChilrden(el) {
//   if (el.chilrden.length != 0) {
//     return el.chilrden.map((c) => gen(c)).join(",");
//   }
// }

// export function generate(el) {
//   let chilrden = getChilrden(el);
//   let code = `_c('${el.tag}',${getAttrs(el)}${chilrden ? "," + chilrden : ""})`;
//   return code;
// }
