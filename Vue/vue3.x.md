### vue3

文档：https://www.javascriptc.com/vue3js/



**特点**

使用 Composition API（组合API）使代码更灵活简洁，更好的逻辑复用和代码组织及代码的维护

在vue3中使用api都是按需引入的方式来使用

vue3做了向下兼容，也可以使用vue2的语法

更好的支持Typescript

按需编译，体积比Vue2.x更小。使用了 tree-shaking 移除一些不常用的 api

使用proxy 代替defineProperty 实现数据响应。proxy的性能比defineproperty好

对diff算法进行了优化，渲染更快。在vue2中的虚拟dom是全量比较的，而vue3 标记和提升所有静态根节点,diff 的时候只比较动态节点内容



### 全局api

每个vue应用都是通过 createApp 函数创建一个新的应用实例

```
import { createApp  } from 'vue'
import App from './App.vue'

createApp(App)...
```



### 生命周期的变化

|          vue2 | vue3            |
| ------------: | :-------------- |
|  beforeCreate | setup           |
|        create | setup           |
|   beforeMount | onBeforeMount   |
|       mounted | onMounted       |
|  beforeUpdate | onBeforeUpdate  |
|       updated | onUpdated       |
| beforeDestroy | onBeforeUnmount |
|     destroyed | onUnmounted     |

**执行循序：**

setup > beforeCreate > data > created > onBeforeMount > beforeMount > onMounted > mounted

这些钩子都应该在`setup` 函数中编写



### Setup

**一、setup函数**

setup是在props解析之后，beforeCreate执行之前执行的。

setup中没有this

在setup函数声明的函数或变量都需要return出去才可以使用

setup函数返回的是json对象供模板使用，如果加上async函数则是返回promise对象了，若要使用async则需要配合Suspense组件使用。

setup接收两个参数：

- 第一个参数是父组件传入的 **props** 属性

- 第二个参数是一个 **Setup 上下文** 对象context。该对象包含：
  - attrs：接收父组件传入没有通过props声明过的属性
  - slots：接收父组件传入的插槽内容对象
  - emit：分发自定义事件

```
setup(props, context) {
    // Attribute (非响应式对象)
    console.log(context.attrs)

    // 插槽 (非响应式对象)
    console.log(context.slots)

    // 触发事件 (方法)
    console.log(context.emit)
  }
```



**二、setup语法糖**

解决了setup函数中需要频繁将声明的变量、函数以及`import`引入的内容通过`return`向外暴露，才能在`<template/>`使用的问题

代码更加简洁

```
<script lang="ts" setup>
import { defineEmits, defineProps, defineExpose } from "vue";


// defineProps 用来接收父组件传来的 props 
const props = defineProps({ 
	name: {		// 获取父组件传递的属性
       type: String   
    }
});   


// defineEmits 用来声明触发的事件
const emit = defineEmits(["change"]);  // 声明触发子组件绑定的 change 事件
const sonClick = () =>{
    emit('change' , 'xxx')
}


// defineExpose	 用来暴露出给父组件通过 ref='childRef' 访问的属性/方法
const msg = ref('暴露的属性')
defineExpose({
    msg  // 暴露属性给父组件获取到
})

// 父获取子组件暴露的属性
childRef.value.msg   // 暴露的属性

</script>
```





### ref 和 reactive

创建响应式数据需要借助 ref 和 reactive 函数，ref 和 reactive都是创建深度响应式的数据

**ref**

创建一个包含响应式数据的引用对象

模板中不需要 `.value`

一般用来定义一个原始类型的数据

```
import { ref } from 'vue'
let name = ref('张三')

// 修改ref数据
name.value = 李四
```

**reactive** 

定义对象/数组格式的响应式数据

如果用ref来定义对象/数组，内部会自动将它们转为 reactive 的对象

一般用来定义一个引用类型的数据

```
import { reactive } from 'vue'
// 创建响应式数据
let state = ref({
	name:'张三'
})
// 修改数据不需要.value
state.name = 李四
```



### toRef 和 toRefs

**toRef**

为响应式对象上的某个属性创建一个ref引用，更新时引用对象会同步更新

区别ref：拷贝了一份新的数据值单独操作，更新时互不影响

```
import { reactive, toRef } from 'vue'
const state = ref({
	name:'张三'
})
const name = toRef(state,'name')
```



**toRefs**

将响应式对象中的所有属性包装成ref对象，并返回包含这些ref对象的普通对象

使用场景就是把解构失去响应式的数据再次获得响应式

```
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    
    const state = reactive({
        name:'张三',
        age: 18
    })

    return {
      // 这样对象里的name和age会失去响应式
      ...state
      // 这样再扩展解构出来的时候并保持着响应式
      ...toRefs(state)
    }
  }
}
```



### computed、watch和watchEffect

**computed**

computed 跟 vue2类似，不过需要先引入computed

```
import {  computed,ref } from "vue";    -----按需导入

const num = ref(1)
const newValue = computed(() =>{
	return num.value++
})
newValue.value++  // error   -----计算属性不可直接改变


// 也可以使用一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象
const num = ref(1)
const newValue = computed({
  get: () => num.value + 1,
  set: val => {
    count.value = val - 1
  }
})
console.log(num.value) //2   ----直接打印调用get
newValue.value = 1    --------修改调用set
console.log(num.value) // 0
```



**vue3有两个监听属性**

分别是watch和watchEffect

- **watchEffect**

默认初始时就立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。也就是说回调函数中使用了哪些响应式数据就监听哪些数据

```
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> logs 0

setTimeout(() => {
  count.value++
  // -> logs 1
}, 100)
```

[详细说明](https://www.javascriptc.com/vue3js/guide/reactivity-computed-watchers.html#watcheffect)



- **watch**

指定监听一个或多个响应式数据

它也是惰性的，即只有当被侦听的源发生变化时才执行回调

```
// 直接侦听ref
const count = ref(0)
watch(count, (newValue, oldValue) => {
  console.log(newValue,oldValue)
})

// 如果是监听reactive对象中的属性，必需通过函数来指定
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (newValue, oldValue) => {
     console.log(newValue,oldValue)
  }
)

// 如果是监听多个数据则使用数组
watch([ count,() => state.count], (newValue, oldValue) => {
  console.log(newValue,oldValue)
})

// 立即执行和深度监听
watch(
	[ count,() => state.count], 
	(newValue, oldValue) => {
      console.log(newValue,oldValue)
    },
    {
      immediate: true,  // 立即
      deep: true //深度
    }
)

```



与 watchEffect 比较，`watch` 允许我们：

- 懒执行副作用
- 更具体地说明什么状态应该触发侦听器重新运行
- 访问侦听状态变化前后的值



### ref获取元素 和 nextTick

vue2中都是通过 this.$xxx访问的，但vue3中没有this

nextTick的话直接通过按需引入就可以

ref 则需要声明一个相同名字的 ref。只有再挂载后才能访问 ref

```
<div ref="divRef">这是元素<div>

setup(){
	const divRef = ref<HTMLElement | null>(null) // 初始null是因为还未渲染完成赋值
	
	// onMounted可以用来在组件完成渲染并创建DOm节点后运行代码
	onMounted(() => {
       // DOM元素将在初始渲染后分配给ref
       console.log(divRef.value) // <div>这是元素</div>
    })
}

```



### toRaw和markRaw

**toRaw**

返回reactive或readonlyproxy 的原始对象数据

这是一个还原方法，可用于临时读取数据，也可用于写入而不会触发更改，得到的数据不具有响应式

```
const obj = reactive({ name: '张三' })
 
console.log(obj) // proxy { name : '张三'}
console.log(toRaw(obj))	// { name : '张三'}
```



**markRaw**

标记一个对象，使其永远不会转换为 proxy，就是不具有响应式。返回对象本身

应用场景：

- 有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
- 当渲染具有不可变数据源的大列表时，跳过 proxy 转换可以提高性能。



###  provide 和 inject

当多层组件嵌套可以使用 provide (提供)和 inject (注入)来传递参数

也可以在注入组件内部更新注入的数据。父组件提供函数暴露给子/孙去触发

provide

```
// 父组件
import { provide, reactive, ref } from 'vue'
setup() {
    const name = ref('张三')
    const age = reactive({ age:1 })

    provide('name', name)
    provide('age', age)
}

```

inject

接收两个参数：第一个是要注入的属性名；第二个是默认的值（可选）

```
// 子/孙组件
import { inject } from 'vue'
setup() {
	const getName = inject('name', '默认的可选值')
	const getAge = inject('age')
}
```



### 新增组件

**Fragment**

在vue2中，组件必须有一个跟标签

在vue3中，组件可以没有跟标签，内部会将多个标签包含在一个Fragment虚拟元素中

好处：减少标签层级，减小内存的占用

```
<template>
	<h1>6</h1>
	<h1>666</h1>
</template>
```



**Teleport**

Teleport 提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下呈现 HTML



**Suspense**

异步加载组件的loading界面

Suspense组件是配合异步组件使用的，比如把setup函数返回promise或者使用async，再组件未渲染完成前显示loading...





### 指令变化

v-if 和 v-for 解析顺序发生了变化，先解析执行 v-if 





### 组件选项声明方式

Vue3 使用 Composition API setup，是 Vue3 新增的一个选项， 他是组件内使用 Composition API 的入口。在vue2里我们都把`.vue`文件里的`js`部分叫做`Options API`， 而在vue3里变为`Composition API`



### template根模板变化

使用了Fragment做了处理，即使没有根节点也会加个根节点

为什么要根节点？

既然一个.vue单文件组件是一个vue实例，那么这个实例的入口在哪里？

如果在template下有多个div，那么该如何指定这个vue实例的根入口？
为了让组件能够正常的生成一个vue实例，那么这个div会被自然的处理成程序的入口。

通过这个‘根节点’，来递归遍历整个vue‘树’下的所有节点，并处理为vdom，最后再渲染成真正的HTML，插入在正确的位置





### 响应式数据的判断

**isRef**：检查一个值是否为一个 ref 对象
**isReactive**：检查一个对象是否是由 reactive 创建的响应式代理
**isReadonly**：检查一个对象是否是由 readonly 创建的只读代理
**isProxy**：检查一个对象是否是由 reactive 或者 readonly 方法创建的代理





### Vue3为什么用 Proxy 替代 vue2的defineProperty

响应式原理的改变：

Vue3 使用 Proxy 取代 Vue2的 Object.defineProperty

vue3的Proxy 可以直接监听对象和数组的变化，而vue2的defineProperty只能监听对象的变化



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



### vue3的Composition与vue2的Options Api区别

最大的区别就是功能聚合度更高，同一个功能的代码可以放在同一个hooks里，方便维护和开发





相关参考：

https://zhuanlan.zhihu.com/p/351445575