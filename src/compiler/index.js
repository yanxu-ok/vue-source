import { parseHtml } from "./parse";
import { generate } from "./generate";

// 编译的类
export function compilerToFunction(template) {
  const root = parseHtml(template);
  const renderStr = generate(root);
  const render = new Function(`with(this){ return ${renderStr} }`);
  return render;
  // html -> ast(只能描述语法，语法不存在的属性无法描述) -> render函数 ->虚拟dom(增加额外的属性)
}
