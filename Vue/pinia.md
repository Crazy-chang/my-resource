### Pinia

文档： https://pinia.web3doc.top/

Pinia 是 Vue 的存储库，可以说是新一代的状态管理器，由 Vue.js团队中成员所开发的，因此也被认为是下一代的 Vuex



### 特点

去除了 mutations

actions 支持同步和异步

能够构建多个stores，并实现代码自动拆分

完整的 typescript 支持

足够轻量，只有 1kb 

可扩展，使用插件扩展 Pinia 功能

dev-tools 的支持

服务器端渲染支持



### 安装

```
yarn add pinia
# 或者使用 npm
npm install pinia
```



### 创建 Store并使用

1、创建 Store，新建 src/store 目录并在其下面创建 index.ts，导出 store

```javascript
import { createPinia } from 'pinia'

const store = createPinia()

export default store
```

2、在 main.ts 文件下使用

```
import { createApp } from 'vue';
import App from './App.vue';

import store from './store'

createApp(App).use(store)
```



### 定义一个 Store 

 Store 是使用 `defineStore()` 定义的。接收两个参数，第一个参数是**唯一的id**且必填

```
// //src/store/main.ts
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state:()=>{
  	return {
  		name: 'Pinia',
  		age: 0
  	}
  },
  getter:()=>{},
  actions:()=>{
  	changeName(){
  		this.name = '老六'
  	}
  }
})
```



### 获取State

一旦 store 被实例化，你就可以直接在 store 上访问 `state`、`getters` 和 `actions` 中定义的任何属

**注意：**`store` 是一个用`reactive` 包裹的对象，这意味着不需要在getter 之后写`.value`，但是，就像`setup` 中的`props` 一样，**我们不能对其进行解构**，否则失去响应式

```
// setup语法糖
<template>
  <div>{{ useStore.name }}</div>
</template>

<script lang="ts" setup>
import { useStore } from '@/store/main'

const userStore = useStore()
</script>

// setup()
import { useStore } from '@/stores/main'

export default {
  setup() {
    const store = useStore()

    return {
      // 您可以返回整个 store 实例以在模板中使用它
      store,
    }
  },
}

```

针对解构失去响应式，官方给出 **storeToRefs()** 方法来恢复响应。它将为任何响应式属性创建 refs

```
import { storeToRefs } from 'pinia'

export default defineComponent({
  setup() {
    const store = useStore()
    // name 是响应式引用
    // 这也会为插件添加的属性创建引用
    // 但跳过任何 action 或 非响应式（不是 ref/reactive）的属性
    const { name } = storeToRefs(store)

    return {
      name
    }
  },
})
```



修改state

```
// 第一种可以直接修改
const store = useStore()

store.name = '张三'

// 第二种：调用 $patch 方法。 可以同时更改多个
store.$patch({
  age: store.age + 1,
  name: '李四'
})
// 或者
store.$patch((state) => {
	store.age++;
	state.name = '王五'
})

// 第三种 是调用 actions 里的方法去改变 state
store.changeName() 
```



### Getters

等同于vuex的Getters

```
export const useStore = defineStore({
 id: 'user',
 state: () => {
   return {
     name: '张三'
   }
 },
 getters: {
 	// 在typescript中
 	// 自动将返回类型推断为字符串
   fullName: (state) => {
     return state.name + '丰'
   }
   // 或者  返回类型必须明确设置
   fullName: () : String => {
     return this.name + '丰'
   }
   // 转递参数
   getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
 }
})

// 使用时就拼接上去了
userStore.fullName // 张三丰

```



**将参数传递给getters**

在执行此操作时，**getter 不再缓存**，它们只是您调用的函数

```
// 组件中使用上面的 getUserById 方法
<script>
export default {
  setup() {
    const store = useStore()

    return { getUserById: store.getUserById }
  },
}
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```



### actions

Actions 相当于组件中的  methods

```
export const useStore = defineStore({
 id: 'user',
 state: () => {
   return {
     name: '张三',
     age:0
   }
 },
 actions: {
   // 同步
   changeAge(age : number) {
     this.age = age ? age : 18
   },
   // 异步
   async changeName() {
     const { data } = await api.getUser()
     this.name = data.name
     this.changeAge(data.age)
   },
 }
})
```





### Plugins

由于是底层 API，Pania Store可以完全扩展。 以下是您可以执行的操作列表：

- 向 Store 添加新属性
- 定义 Store 时添加新选项
- 为 Store 添加新方法
- 包装现有方法
- 更改甚至取消操作
- 实现本地存储等副作用
- **仅**适用于特定 Store



一个简单例子

```
import { createPinia } from 'pinia'

// 为安装此插件后创建的每个store添加一个名为 `secret` 的属性
// 这可能在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将插件提供给 pinia
pinia.use(SecretPiniaPlugin)

// 在另一个文件中
const store = useStore()
store.secret // 'the cake is a lie'
```



Pinia 插件是一个函数，可以选择返回要添加到 store 的属性。 它需要一个可选参数，一个 *context*

插件仅适用于**在将`pinia`传递给应用程序后创建的 store **，否则将不会被应用



### pinia数据持久化

**安装**

```
yarn add pinia-plugin-persistedstate
// 或
npm i pinia-plugin-persistedstate
```

**使用插件** 在main.ts中注册

```
import { createApp } from "vue";
import App from "./App.vue";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
createApp(App).use(pinia);
```

**模块开启持久化**

```
const useHomeStore = defineStore("use",{
  // 开启数据持久化
  persist: true,
  ...
});
```

做了持久化后若请求获取到新数据，插件会自己更新到最新数据。



**按需持久化**

```
import { defineStore } from 'pinia'

export const useStore = defineStore('main', s{
  state: () => {
    return {
      name: 'pinia',
      obj: {
        data: 'pinia',
        age: 18
      },
    }
  },
  // 所有数据持久化
  // persist: true,
  // 持久化存储插件其他配置
  persist: {
    // 修改存储中使用的键名称，默认为当前 Store的 id
    key: 'main',
    // 修改为 sessionStorage，默认为 localStorage
    storage: window.sessionStorage,
    // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
    paths: ['obj.data'],
  },
})
```



### 与 vuex 相比

pinia 去除了 mutations

pinia 的 actions 支持同步和异步

pinia对于typescript的支持性更好

友好的devTools支持

pinia只有1kb

简化了很多方法的写法