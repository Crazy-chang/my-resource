## ES6新特新总结

参考文章：https://es6.ruanyifeng.com/#README

### 1、let，const 声明

​	**let：**块级作用域，声明变量后可立马赋值或使用时赋值；

​	**const：**const保证的并不是变量的值不能改动，而是变量指向的那个内存地址不能改动。对于基本类型的数据（数值、字符串、布尔值），其值就保存在变量指向的那个内存地址，因此等同于常量。

但对于引用类型的数据（主要是对象和数组）来说，变量指向数据的内存地址，保存的只是一个指针，const只能保证这个指针是固定不变的，至于它指向的数据结构是不是可变的，就完全不能控制了。



**var和let和const区别**

**（1）块级作用域：**块作用域由 `{ }`包括，let和const具有块级作用域，var不存在块级作用域。块级作用域解决了ES5中的两个问题：

- 内层变量可能覆盖外层变量
- 用来计数的循环变量泄露为全局变量

**（2）变量提升：**var存在变量提升，let和const不存在变量提升，即在变量只能在声明之后使用，否在会报错。

**（3）给全局添加属性：**浏览器的全局对象是window，Node的全局对象是global。var声明的变量为全局变量，并且会将该变量添加为全局对象的属性，但是let和const不会。

**（4）重复声明：**var声明变量时，可以重复声明变量，后声明的同名变量会覆盖之前声明的遍历。const和let不允许重复声明变量。

**（5）暂时性死区：**在使用let、const命令声明变量之前，该变量都是不可用的。这在语法上，称为暂时性死区。使用var声明的变量不存在暂时性死区。

**（6）初始值设置：**在变量声明时，var 和 let 可以不用设置初始值。而const声明变量必须设置初始值。

**（7）指针指向：**let和const都是ES6新增的用于创建变量的语法。 let创建的变量是可以更改指针指向（可以重新赋值）。但const声明的变量是不允许改变指针的指向（不可以重新赋值）。



**如何实现块级作用域代码实现：**使用自执行函数或闭包实现



### 2、变量的解构赋值

匹配模式：只要等号两边的模式相同，左边的变量就会被赋予对应的值

规则：只要等号右边的值不是对象或数组，就先将其转为对象

常见的有

- **字符串解构**：`const [a, b, c, d, e] = "hello"`
- **对象解构**：const { x, y：a（改名），z = 3（默认值） } = { x: 1, y: 2 }
- **数组解构**：const [a,b=2] = [1]

还有数值、布尔、函数。



### 3、扩展操作

字符串扩展

数值扩展

对象扩展运算符

数组扩展运算符

#### 函数扩展

**箭头函数**

箭头函数不会创建this（简单说箭头函数没有this），它只会继承上一层作用域链的this；

call()、apply()、bind()等方法不能改变箭头函数中this的指向，所以继承来的this指向永远不会改变

没有自己的arguments

没有prototype，所以箭头函数不能作为构造函

不能用作Generator函数

不能使用yeild关键字



#### 运算符扩展

**可选链操作符( ?. )**

允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效，null 或者 undefined 的情况下不会引起错误，该表达式短路返回值是 undefined；

```
读取对象内部的某个属性，往往需要判断一下，属性的上层对象是否存在

// 通常写法
if(obj && obj.arr && obj.arr.value){}

// 上面的简写
if(obj?.arr?.value){}

```



**空值合并操作符（??）**

当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数

与 || 不同点是 属性的值如果为空字符串或`false`或`0`时 || 生效，?? 不生效

?? 不能与 || 和 && 一起使用，除非使用 （括号） 来表明优先级，否则报错



#### 正则扩展



### 4、Symbol

代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题



### 5、Set

- 定义：类似于数组的数据结构，成员值都是唯一且没有重复的值
- 声明：`const set = new Set(arr)`
- 入参：具有`Iterator接口`的数据结构
- 方法：
  - **add()**：添加值，返回实例
  - **delete()**：删除值，返回布尔
  - **has()**：检查值，返回布尔
  - **clear()**：清除所有成员



**应用场景：**

- 去重字符串：`[...new Set(str)].join("")`
- 去重数组：`[...new Set(arr)]`或`Array.from(new Set(arr))`
- 集合数组
  - 声明：`const a = new Set(arr1)`、`const b = new Set(arr2)`
  - 并集：`new Set([...a, ...b])`
  - 交集：`new Set([...a].filter(v => b.has(v)))`
  - 差集：`new Set([...a].filter(v => !b.has(v)))`

- 映射集合
  - 声明：`let set = new Set(arr)`
  - 映射：`set = new Set([...set].map(v => v * 2))`或`set = new Set(Array.from(set, v => v * 2))`



**Set创建的数组和普通数组区别**

Set里的key是唯一的，如果key是对象，如`[{name: 1}, {name: 1}]`这样的包含`Object`的数组，那么你把它转换为`Set`时并不能去重，因为虽然这两个对象看起来一样，但在`Set`看来，这个数组里的两个对象是两个完全不同的值，所以并不符合去重的要求。



### 6、Map

map本质上就是键值对的集合，但是普通的Object中的键值对中的键只能是字符串。而ES6提供的Map数据结构类似于对象，但是它的键不限制范围，可以是任意类型，是一种更加完善的Hash结构。如果Map的键是一个原始数据类型，只要两个键严格相同，就视为是同一个键。



- 定义：类似于对象的数据结构，成员键是任何类型的值
- 声明：`const set = new Map(arr)`
- 入参：具有`Iterator接口`且每个成员都是一个双元素数组的数据结构
- 方法
  - **get()**：返回键值对
  - **set()**：添加键值对，返回实例
  - **delete()**：删除键值对，返回布尔
  - **has()**：检查键值对，返回布尔
  - **clear()**：清除所有成员





### 7、Proxy

- 定义：修改某些操作的默认行为
- 声明：`const proxy = new Proxy(target, handler)`
- 入参
  - **target**：拦截的目标对象
  - **handler**：定制拦截行为

- 

代理；在vue3中解决了vue2只能响应式对象不能处理数组问题；

### 8、Reflect

### 9、Promise 

#### 概念

**Promise** 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

一个 `Promise`有以下几种状态:

- *pending*: 进行中。
- *fulfilled*: 已完成。
- *rejected*: 已拒绝。

当把一件事情交给promise时，它的状态就是Pending，其中有两个过程，任务完成了状态就变成了Resolved、没有完成失败了就变成了Rejected。一旦进行中的状态变为已完成或已拒绝就永远不能更改状态了。

promise解决了回调地狱的基本缺陷问题

 `async/await` 语法糖又进一步优化了promise的超长链式调用问题

#### Promise对象下的方法

1. then()

   `then`方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为`resolved`时调用，第二个回调函数是Promise对象的状态变为`rejected`时调用。其中第二个参数可以省略。

   `then`方法返回的是一个新的Promise实例（不是原来那个Promise实例）。因此可以采用链式写法，即`then`方法后面再调用另一个then方法。

   

2. catch()

   方法可以用于您的promise组合中的错误处理

3. finally()

   参数是Promise结束后调用的函数；在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数

4. resolve()

   该方法接收一个参数；返回一个解析过的`Promise`对象

5. reject()

   该方法接收一个被拒绝原因的参数；返回一个带有拒绝原因的`Promise`对象

6. all()

   该方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个`promise`对象。当数组中-**所有**-的`promise`的状态都达到`resolved`的时候，`all`方法的状态就会变成`resolved`，如果**有一个**状态变成了`rejected`，那么`all`方法的状态就会变成`rejected`。

7. allSettled()

   接收一个数组，数组的每一项都是一个`promise`对象。

   该方法会返回所有的结果，无论是成功的达成或被拒绝。

8. race()

   `race`方法和`all`一样，接受的参数是一个每项都是`promise`的数组，但是与`all`不同的是，当最先执行完的事件执行完之后，就直接返回该`promise`对象的值。如果第一个`promise`对象状态变成`resolved`，那自身的状态变成了`resolved`；反之第一个`promise`变成`rejected`，那自身状态就会变成`rejected`。



**promise的then透传问题**

then接收的参数是函数，当传的不是函数，会发生透传，会把上一个值之间往后传



### 10、Iterator

### 11、Generator

Generator 函数是 ES6 提供的一种异步编程解决方案。Generator 函数也可以理解成状态机，内部可以封装多个状态。

形式上，Generator函数是一个普通函数，调用时（该函数不执行）只返回指向内部的指针对象（不是运行结果），该对象就是遍历器对象，而Generator就是一个遍历器对象生成函数（生成器）。

```
function* gen(){
	yield 1;
	yield 2;
}
let g = gen()

g.next()  // {value:1,done:false}
g.next()  // {value:2,done:false}
// 这里的true表示已经执行完
g.next()  // {value:undefide,done:true} 
```



**特点：**

1. 在 function 关键字和函数名之间有一个星号（只要位置在之间即可）
2. 函数体内部使用yield表达式

**该对象下的方法：**

1. next：使指针指向下一个状态，返回{value，done}，若传入参数会被当做上一个yield表达式的返回值
2. return：返回指定值并终结遍历Generator函数，返回{value：入参（不传则undefined），done：true}
3. throw：在Generator函数体外抛出错误，然后在函数体内捕获错误，返回自定义的new Errow('自定义的错误')

共同点：本质上都是同一件事，作用都是让函数恢复执行，并且使用不同的语句替换`yield`表达式。

不同点：

- **next()**：将`yield命令`替换成一个`值`
- **return()**：将`yield命令`替换成一个`return语句`
- **throw()**：将`yield命令`替换成一个`throw语句`



**yield表达式：**

由于Generator函数返回遍历器对象，只有调用next才会执行遍历内部状态，所以提供了一种可以暂停执行的函数，yield表达式就是暂停标志。

若函数内部可以不使用yield，但会变成单纯的暂缓执行函数，还是需要next触发

当调用next方法其运行逻辑如下

1. 遇到yield表达式，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值作为返回的对象的value属性值
2. 下一次调用next时，再继续往下执行直到遇到yield
3. 如果没遇到新的yield，就一直运行到函数结束，直到遇到return语句为止，并将return语句后面的表达式值作为返回的value
4. 如果该函数没有return语句，则返回对象的value属性值为undefined

**yield*表达式：**

用来在一个`Generator函数`里执行另一个`Generator函数`

上下文：

执行产生的`上下文环境`一旦遇到`yield命令`就会暂时退出堆栈(但并不消失)，所有变量和对象会冻结在`当前状态`，等到对它执行`next()`时，这个`上下文环境`又会重新加入调用栈，冻结的变量和对象恢复执行



应用场景：

1. 异步操作同步化表达
2. 控制流管理
3. 为对象部署Iterator接口：把`Generator函数`赋值给对象的`Symbol.iterator`，从而使该对象具有`Iterator接口`
4. 作为数据结构



**与Iterator接口的关系：**

任意一个对象的`Symbol.iterator`方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。

由于 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口。



### 12、async 

就是 Generator 函数的语法糖。

async函数是对 Generator 函数的改进，体现在以下4点

1、内置执行器

2、更好的语义

3、更广的适用性

4、返回值是Promise



### 13、Class 

- 对一类具有共同特征的事物的抽象(构造函数语法糖)

- 原理：类本身指向构造函数，所有方法定义在`prototype`上，可看作构造函数的另一种写法(`Class === Class.prototype.constructor`)
- 方法和关键字
  - **constructor()**：构造函数，`new命令`生成实例时自动调用
  - **extends**：继承父类
  - **super**：新建父类的`this`
  - **static**：定义静态属性方法
  - **get**：取值函数，拦截属性的取值行为
  - **set**：存值函数，拦截属性的存值行为





### 14、Module

extend 暴露出模块内部功能； import 导入模块内部功能 

#### ES6的Module和CommonJS模块的区别：

- CommonJS是对模块的浅拷⻉，ES6 Module是对模块的引⽤，即ES6 Module只存只读，不能改变其值，也就是指针指向不能变，类似const；
- import的接⼝是read-only（只读状态），不能修改其变量值。 即不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对commonJS对重新赋值（改变指针指向），但是对ES6 Module赋值会编译报错。

ES6的Module和CommonJS模块的共同点：

- CommonJS和ES6 Module都可以对引⼊的对象进⾏赋值，即对对象内部属性的值进⾏改变。



