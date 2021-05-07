<!--
 * @Descripttion: 
 * @version: 
 * @Author: 闫旭
 * @Date: 2021-04-20 17:49:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-05-06 17:54:39
-->
## 1.vue 监控对象的变化
## 2.vue 监控数组的变化，改写方法，并且如果是数组，需要对其中的对象进行遍历  并且新增方法如果是对象也需要监控。
## 3.处理render方法 
  1. 模板编译  先编译html字符串得到需要的数据
  2. 构建ast数 这个地方类似用栈实现一个树 循环引用 ![avatar](https://img11.iqilu.com/29/2021/04/22/1674f9ec0e897e47c020ec7f088d76ed.png)
  3. 通过ast树 递归 构建生成 render字符串
  4. new Function(字符串) 执行函数生成 虚拟dom _c _v _s 在原型上扩展
  5. update根据参数vdom更新比较 生成真实dom (data数据更新之后直接调用render方法就可以，词法分析只解析一次)
## 响应式原理
  1. 以上只完成了dom编译，数据改变视图并没有刷新，此时用到了观察者模式，对数据进行观察，页面进行刷新，数据是被观察者，页面是观察者。
  2. 要理解watch，比如说vuex一个属性会在多个地方引用，这种情况说明一个属性会有多个watcher，所以需要一个依赖收集器dep来收集所有的watcher，每个属性都会添加一个dep，反过来，watcher会观测多个属性，render函数在执行时需要去vm上取值，所需要的属性都会被当前的watcher收集

### vue 知识点
1. Object.created() 创建一个对象,对象的__proto__为括号当中的参数
2. Array.prototype['push'].call(this,...arg)  这个this就是调用方法的当前数组,
3. match 正则表达式方法 分组 (?:) 表示 这个分组用match匹配但是捕获，就是打印的话不显示
4. 正则表达式 exec方法
   1. 如果 exec() 找到了匹配的文本，则返回一个结果数组。否则，返回 null。此数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个子表达式相匹配的文本（如果有的话），第 2 个元素是与 RegExpObject 的第 2 个子表达式相匹配的文本（如果有的话），以此类推。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。index 属性声明的是匹配文本的第一个字符的位置。input 属性则存放的是被检索的字符串 string。我们可以看得出，在调用非全局的 RegExp 对象的 exec() 方法时，返回的数组与调用方法 String.match() 返回的数组是相同的。

   2. 但是，当 RegExpObject 是一个全局正则表达式时，exec() 的行为就稍微复杂一些。它会在 RegExpObject 的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExpObject 的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。这就是说，您可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
   3. 循环 如果用了全局 则必须循环前先将lastindex置为0
5. let str = 'return ' + '`Hello ${name}!`';let func = new Function('name', str);func('Jack') // "Hello Jack!"
6. parentNode 是着的父节点   parentElement 父元素   parentElement最上层是null  parentNode嘴上main是document
7. 在Javascript中，只提供了一种删除节点的方法：removeChild()。removeChild() 方法用来删除父节点的一个子节点。
8. insertBefore(ele, oldVnode.nextSibling)  // ele新元素  后面的参数指定的是插入的位置