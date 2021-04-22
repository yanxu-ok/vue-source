/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-21 10:09:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-22 11:40:10
 */
// 这里正则比较恶心
// 字符串里的 反斜杠
const cname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名
const qnameCapture = `((?:${cname}\\:)?${cname})`; // 获取标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 获取开始标签
const endTag = new RegExp(`^</${qnameCapture}[^>]*>`); // <xxx    > 获取关闭标签
// 获取属性和值的
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)")|(?:'([^']*)')|([^\s"'<>\/=`]+))?/; // aaa   =   "value" | 'value' | aaa
const startTagClose = /^\s*(\/?)>/; // 匹配开始关闭标签     <div   />
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{aaaa}}
// let r = "  />".match(startTagClose);
// console.log(r);

function start(tagName, attributes) {
  console.log("start", tagName, attributes);
}

function end(tagName) {
  console.log("end", tagName);
}

function chars(text) {
  console.log("chars", text);
}

// 编译字符串得到
function parseHtml(html) {
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
}

// 编译的类
export function compilerToFunction(template) {
  parseHtml(template);
}
