/*
 * @Descripttion:  这个部分主要是解析html成ast树
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-21 10:09:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-25 11:22:58
 */

// 这里正则比较恶心
// 字符串里的 反斜杠
const cname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名
const qnameCapture = `((?:${cname}\\:)?${cname})`; // 获取标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 获取开始标签
const endTag = new RegExp(`^</${qnameCapture}[^>]*>`); // </xxx    > 获取关闭标签
// 获取属性和值的
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)")|(?:'([^']*)')|([^\s"'<>\/=`]+))?/; // aaa   =   "value" | 'value' | aaa
const startTagClose = /^\s*(\/?)>/; // 匹配开始关闭标签     <div   />
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{aaaa}}
// let r = "  />".match(startTagClose);
// console.log(r);

// 将解析后的结果组成树结构  相当于用栈实现的树   元素节点类型1, 文本节点3
function createAstElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    attr: attrs,
    parent: null,
    chilrden: [],
  };
}
// 先判断有没有根节点 如果没有将第一个设为根
let root; //根节点
let stack = []; //栈
function start(tagName, attributes) {
  // 获取当前栈中最后元素
  const parent = stack[stack.length - 1];
  const element = createAstElement(tagName, attributes);
  if (!root) {
    root = element;
  }
  // 当前元素的父亲是栈中最后元素
  element.parent = parent;
  // 栈中最后元素的孩子是当前元素, 一开始parent是underfined 所以需要判断一下
  parent ? parent.chilrden.push(element) : null;
  stack.push(element);
}

function end(tagName) {
  let end = stack[stack.length - 1];
  // 直接弹栈
  stack.pop();
  if (!(end.tag == tagName)) throw new Error("标签闭合错误");
}

function chars(text) {
  // 文本节点直接赋值在栈中最后元素的children中
  text = text.replace(/\s/g, ""); // 这里的text有可能有空格先去掉
  //   console.log("chars", text);
  if (text) {
    const end = stack[stack.length - 1];
    end.chilrden.push({
      type: 3,
      text,
    });
  }
}

// 编译字符串得到
export function parseHtml(html) {
  // 删除字符串
  function advance(length) {
    html = html.substring(length);
  }

  // 解析开始标签并收集属性
  function parseStartTag() {
    let start = html.match(startTagOpen);
    if (start) {
      // 匹配获取到然后存起来，然后删掉
      let match = {
        tagName: start[1],
        attributes: [],
      };
      advance(start[0].length);
      let end;
      let attr;
      // 循环遍历直到匹配到闭合标签结束
      while (
        !(end = html.match(startTagClose)) &&
        (attr = html.match(attribute))
      ) {
        // 如果匹配到属性先赋值再将其本身删除
        // attr = html.match(attribute); // 可以移到条件里
        match.attributes.push({
          key: attr[1],
          value: attr[3] || attr[4] || attr[5],
        });
        advance(attr[0].length);
      }
      // 解析完开始标签最后把闭合标签给删掉
      if (end) {
        advance(end[0].length);
      }
      return match;
    }
    return false;
  }

  // 如果模板有内容就一直循环
  while (html) {
    // 获取字符串<的位置
    let startText = html.indexOf("<");
    if (startText === 0) {
      // 如果索引为0，有两种情况，1是开始标签 2是闭合开始标签
      const startTagMatch = parseStartTag();
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attributes);
        continue;
      }
      const endTagMatch = html.match(endTag);
      if (endTagMatch) {
        end(endTagMatch[1]);
        advance(endTagMatch[0].length);
        continue;
      }
    }
    //  解析文本
    let text;
    // 如果
    if (startText > 0) {
      text = html.substring(0, startText);
    }
    if (text) {
      chars(text);
      advance(text.length);
    }
  }
  return root;
}

// 练习 test
// let stack = [];
// let root;

// function createElement(tag, attrs) {
//   return {
//     tag,
//     attrs,
//     type: 1,
//     parent: null,
//     chilrden: [],
//   };
// }

// function start(tagName, attrs) {
//   const parent = stack[stack.length - 1];
//   const element = createElement(tagName, attrs);
//   if (!root) {
//     root = element;
//   }
//   element.parent = parent;
//   parent ? parent.chilrden.push(element) : null;
//   stack.push(element);
// }

// function end(tagName) {
//   const end = stack[stack.length - 1];
//   if (end.tag !== tagName) throw new Error("标签闭合错误");
//   stack.pop();
// }

// function chars(text) {
//   text = text.replace(/\s/g, "");
//   if (text) {
//     let end = stack[stack.length - 1];
//     end.chilrden.push({
//       type: 3,
//       text,
//     });
//   }
// }

// export function parseHtml(html) {
//   function advance(length) {
//     html = html.substring(length);
//   }

//   function parseStartTag() {
//     const startTag = html.match(startTagOpen);
//     if (startTag) {
//       let match = {
//         tagName: startTag[1],
//         attrs: [],
//       };
//       advance(startTag[0].length);
//       let attr;
//       while ((attr = html.match(attribute))) {
//         match.attrs.push({
//           key: attr[1],
//           value: attr[3],
//         });
//         advance(attr[0].length);
//       }
//       const endTag = html.match(startTagClose);
//       advance(endTag[0].length);
//       return match;
//     }
//     return false;
//   }

//   while (html) {
//     const startIndex = html.indexOf("<");
//     if (startIndex === 0) {
//       const startTagMatch = parseStartTag();
//       if (startTagMatch) {
//         start(startTagMatch.tagName, startTagMatch.attrs);
//         continue;
//       }
//       const endMatch = html.match(endTag);
//       if (endMatch) {
//         end(endMatch[1]);
//         advance(endMatch[0].length);
//       }
//       continue;
//     }
//     let text;
//     if (startIndex > 0) {
//       text = html.substring(0, startIndex);
//       if (text) {
//         chars(text);
//         advance(text.length);
//       }
//     }
//   }
//   return root;
// }
