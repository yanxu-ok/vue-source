/*
 * @Descripttion:
 * @version:
 * @Author: 闫旭
 * @Date: 2021-03-29 17:09:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-29 17:27:03
 */
import babel from "rollup-plugin-babel";
export default {
  input: "src/main.js",
  output: {
    format: "umd",
    name: "Vue",
    file: "dist/vue.js",
    sourcemap: true, // es5代码 -> es6源代码
  },
  plugins: [
    babel({
      exclude: "node_modules/**", // 排除第三方模块
      //  规则配置单独使用 .babelrc
    }),
  ],
};
