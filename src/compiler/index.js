/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-04-21 10:09:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-21 16:25:53
 */
// 这里正则比较恶心
// 字符串里的 反斜杠
const cname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名
const qnameCapture = `((?:${cname}\\:)?${cname})`; // 获取标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 获取开始标签
const endTag = new RegExp(`^</${qnameCapture}[^>]*>`); // <xxx    > 获取关闭标签
// 获取属性和值的
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"[^"]*")|(?:'[^']*')|([^\s"'<>\/=`]+))?/; // aaa   =   "value" | 'value' | aaa
const startTagClose = /^\s*[\/]?>/; // 匹配开始关闭标签     <div   />
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; //{{aaaa}}
// let r = "  />".match(startTagClose);
// console.log(r);

function start(tagName, attributes) {}

function end(tagName) {}

function chars(text) {}

function parseHtml(html) {
  while (html) {}
}

// 编译的类
export function compilerToFunction(template) {
  console.log(template);
  parseHtml(template);
}
