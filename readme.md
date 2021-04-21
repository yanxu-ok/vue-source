<!--
 * @Descripttion: 
 * @version: 
 * @Author: 闫旭
 * @Date: 2021-04-20 17:49:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-04-21 18:12:13
-->
## 1.vue 监控对象的变化
## 2.vue 监控数组的变化，改写方法，并且如果是数组，需要对其中的对象进行遍历  并且新增方法如果是对象也需要监控。
## 3.处理render方法  先编译html字符串得到需要的数据
### vue 知识点
1. Object.created() 创建一个对象,对象的__proto__为括号当中的参数
2. Array.prototype['push'].call(this,...arg)  这个this就是调用方法的当前数组,