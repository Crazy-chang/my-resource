# my-resource

### 生命周期的变化

### 响应式原理的改变，

Vue3.x 使用 Proxy 取代 Vue2.x 版本的 Object.defineProperty。vue3的Proxy 可以直接监听对象和数组的变化。

### 组件选项声明方式，

Vue3.x 使用 Composition API setup 是 Vue3.x 新增的一个选项， 他是组件内使用 Composition API 的入口。在`vue2.0`里我们都把`.vue`文件里的`js`部分叫做`Options API`， 而在3.0里变为`Composition API`。

### template模板语法变化；

template不用根标签

为啥template不用很标签：

做了Fragment处理，即使没有根节点也会加个根节点

为什么要根节点？

既然一个.vue单文件组件是一个vue实例，那么这个实例的入口在哪里？

如果在template下有多个div，那么该如何指定这个vue实例的根入口？
为了让组件能够正常的生成一个vue实例，那么这个div会被自然的处理成程序的入口。

通过这个‘根节点’，来递归遍历整个vue‘树’下的所有节点，并处理为vdom，最后再渲染成真正的HTML，插入在正确的位置

### slot 具名插槽语法；

### 自定义指令；

v-model 的升级

### 新增组件

其它方面的更改，Suspense 支持 Fragment（多个根节点）和 Protal（在 dom 其他部分渲染组建内容）组件，针对一些特殊的场景做了处理。 基于 treeshaking 优化，提供了更多的内置功能。

main.js，新增createApp方法





一般来说定义一个基本数据类型会用`ref`，而引用类型则会采用`reactive`，那么问题来了，`ref`虽然定义了一个基本数据类型，但实际上它却是一个引用类型，取值和赋值时必须要带上`.value`属性

`reactive`的弊端是不能解构，解构就会失去响应性





### vue2 和 vue3的区别是什么？



### Vue3为什么用 Proxy 替代 vue2的defineProperty？

vue2里用的事defineProperty来做响应式，这个api需要单独对每个课迭代的key值进行监测。

defineProperty无法监测到数组的变化，数组监听不用重写方法 也能实现 set map 等数据结构响应式监听

defineProperty通过调用defineReactive，数据发送变化的时候触发update实现响应式，当存在多级嵌套的时候需要使用递归，对象属性的添加和删除无法检测，但是存在问题例如对数组监听，所以新增了set和 delete API


但是数组的监听据说是defineProperty本身做了处理，原因是性能问题，但是对象属性无法监听删除的这个问题依旧存在


and defineProperty的get是用闭包来实现数据存储hhh，不优雅

因为2.0无法监听到除开data初始值的变化，3.0的proxy为什么可以

vue3使用的proxy可以把逻辑写在handle里，一次编写统一拦截

proxy用到的时候拦截，defineProperty初始化就拦截了



Object.defineProperty 特点

- 必须预先知道要拦截的 key 是什么，这也就是为什么 Vue2 里对于对象上的新增属性无能为力，所以 Vue 初始化的过程中需要遍历 data 来挟持数据变化，造成速度变慢，内存变大的原因。
- 深度监听需要递归到底，一次性计算量大
- 无法监听 新增属性 和 删除属性（处理方案Vue.set和Vue.delete）
- 无法原生监听数组，需要特殊处理（重写）

proxy 深度监听怎么提高性能?

- 层级只监听当前层级

- 使用的时候监听

- 可监听数组的变化

- 可监听新增和删除

  

在vue2中，主要使用的是观察者模式，不管数据多大的时候都会对数据进行创建检查者，而vue3对数据进行了懒观察，仅对可见部分数据创建观察者，大大节省了性能



### Vue3所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

最大的区别就是功能聚合度更高，同一个功能的代码可以放在同一个hooks里，方便维护和开发

Options 总是划船找代码