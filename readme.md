<!--
 * @Descripttion: 
 * @version: 
 * @Author: 闫旭
 * @Date: 2021-04-20 17:49:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-22 17:30:03
-->
## 1.vue 监控对象的变化
## 2.vue 监控数组的变化，改写方法，并且如果是数组，需要对其中的对象进行遍历  并且新增方法如果是对象也需要监控。
## 3.处理render方法 
  1. 模板编译  先编译html字符串得到需要的数据
  2. 构建ast数 这个地方类似用栈实现一个树 循环引用 ![avatar](https://img11.iqilu.com/29/2021/04/22/1674f9ec0e897e47c020ec7f088d76ed.png)

### vue 知识点
1. Object.created() 创建一个对象,对象的__proto__为括号当中的参数
2. Array.prototype['push'].call(this,...arg)  这个this就是调用方法的当前数组,
3. match 正则表达式方法 分组 (?:) 表示 这个分组用match匹配但是捕获，就是打印的话不显示