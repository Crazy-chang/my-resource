### JS数据类型及区别

#### JS共有八种数据类型

Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

其中 Symbol 和 BigInt 是ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

#### null和undefined区别

都是基本数据类型，都只有本身自己一个值。一般变量声明了但还没有定义的时候会返回 undefined，最原始的状态值。而null主要用于赋值给一些可能会返回对象的变量作为初始化，而不是最原始状态。

**undefined：** 未定义的值；也可以作为变量名，但避免混淆一般不会这样做

**null：**表示为空对象

如果定义的变量在将来被赋值为对象，最好将该变量初始化为null。

当一个数据不再需要使用时，最好通过赋值为null来释放其引用。

typeof null 返回的类型非自身，而是object。

原因：不同的对象在底层都表示为[二进制](https://so.csdn.net/so/search?q=二进制&spm=1001.2101.3001.7020)，在 JavaScript 中二进制前三位都为 0 的话会被判
断为 object 类型， null 的二进制表示是全 0，自然前三位也是 0，所以执行 typeof 时会返回“ object ”。历史遗留bug。



####  数据类型检测的方式有哪些

#### （1）typeof

```
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object    
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object
```

其中数组、对象、**null**都会被判断为object，其他判断都正确。



#### （2）instanceof

`instanceof`可以正确判断对象的类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。

```
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 
 
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

可以看到，`instanceof`**只能正确判断引用数据类型**，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。



#### （3） constructor

```
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```

`constructor`有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了：

```
function Fn(){};
 
Fn.prototype = new Array();
 
var f = new Fn();
 
console.log(f.constructor===Fn);    // false
console.log(f.constructor===Array); // true
```



#### （4）Object.prototype.toString.call()

`Object.prototype.toString.call()` 使用 Object 对象的原型方法 toString 来判断数据类型：

```
var a = Object.prototype.toString;
 
console.log(a.call(2));		// [object Number]
console.log(a.call(true));		// [object Boolean]
console.log(a.call('str'));		// [object String]
console.log(a.call([]));		// [object Array]
console.log(a.call(function(){}));		// [object Function]
console.log(a.call({}));		// [object Object]
console.log(a.call(undefined));		// [object Undefined]
console.log(a.call(null));		// [object Null]
```

同样是检测对象obj调用toString方法，obj.toString()的结果和Object.prototype.toString.call(obj)的结果不一样，这是为什么？

这是因为toString是Object的原型方法，而Array、function等**类型作为Object的实例，都重写了toString方法**。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法（function类型返回内容为函数体的字符串，Array类型返回元素组成的字符串…），而不会去调用Object上原型toString方法（返回对象的具体类型），所以采用obj.toString()不能得到其对象类型，只能将obj转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用Object原型上的toString方法。



#### （5）typeof和instanceof的区别

typeof用来判断基本数据类型（除null外），instanceof判断引用数据类型

`typeof`会返回一个变量的基本类型，`instanceof`返回的是一个布尔值



#### 数据类型转换

数据转换分为显示转换和隐式转换

**显示转换：**

常见的️显式转换方法有：Boolean()、String()、toString()、Number()、parseFloat()、parseInt()

显示类型强制转换，通常是使用上面的方法进行类型转换



**隐式转换：**

常见的隐式转换方法有：四则运算(加减乘除) 、操作符、逻辑运算符 、判断语句(if)等

隐式转换是指对不同类型的值在进行逻辑判断或者有逻辑运算符时被触发（== || && !），值可以在类型间自动转换

toString：它的作用是返回一个反映这个对象的字符串

valueOf：它的作用是返回它相应的原始值

```
// 常见问题例子：
let a = ? 
if(a == 1 && a ==2 && a ==3){console.log('输出')}

var a={ 
	i:1,
	toString/valueOf(){
		return this.i++;
    }
}

if (a==1 && a==2 && a==3) {
	console.log("输出");
}
浅析：运行时，会判断类型，之后则会执行对应的toString或valueOf，由于toString或valueOf被这里覆盖了，所以每次执行结果都会加一

```



### 什么是 DOM 和 BOM？

- DOM 指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的属性和方法
- BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。



### 原型与原型链

在js中是使用构造函数来创建对象的，每个构造函数(constructor)都有一个prototype属性(原型对象)，prototype属性对象包含了该构造函数的的所有共享属性和方法。

当使用构造函数创建一个对象后，对象内部都包含了一个指针，指向构造函数的 prototype 属性对应的值，而实例(instance)都包含一个指向原型对象的内部指针.

有限的实例对象和原型之间组成有限链，就是用来实现共享属性和继承

当访问一个对象的属性时，如果该对象不存在这个属性，就会它的原型对象里面去找，这个原型对象有自己的原型，于是就这样一直找下去，也就形成了原型链的概念。原型链的尽头一般来说都是 Object.prototype.__proto__ (null)。



### 闭包

**闭包是指有权访问另一个函数作用域中变量的函数**，创建闭包的最常见的方式就是在一个函数内创建另一个函数，创建的函数可以访问到当前函数的局部变量。

**常用的用途：**

1. 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来创建私有变量。
2. 闭包的另一个用途是使已经运行结束的函数上下文中的变量对象继续留在内存中，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。



### 作用域与作用域链

**作用域**

（1）全局作用域

- 最外层函数和变量拥有全局作用域
- 所有未定义直接赋值的变量自动声明为全局作用域
- 所有window对象的属性都拥有全局作用域
- 全局作用域弊端就是过多变量会污染全局命名空间，容易造成命名冲突

（2）函数作用域

- 函数作用域声明在函数内部的变量，一般只有函数内固定的代码片段可以访问到
- 作用域是分层的，内层作用域可以访问外层作用域，反之不行

（3）块级作用域

- 使用ES6中新增的let和const指令可以声明块级作用域，块级作用域可以在函数中创建也可以在一个代码块中的创建（由`{ }`包裹的代码片段）
- let和const声明的变量不会有变量提升，也不可以重复声明
- 在循环中比较适合绑定块级作用域，这样就可以把声明的计数器变量限制在循环内部。



**作用域链**

在当前作用域中查找所需变量，但是该作用域没有这个变量，那这个变量就是自由变量。如果在自己作用域找不到该变量就去父级作用域查找，依次向上级作用域查找，直到访问到window对象就被终止，这一层层的关系就是作用域链。

作用域链的作用是**保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数**

作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。





### 堆与栈

**栈（stack）：**

原始数据类型（Undefined、Null、Boolean、Number、String）

原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；

**堆（heap）：**

引用数据类型（对象、数组和函数）

引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。



堆和栈的概念存在于数据结构和操作系统内存中

**在数据结构中：**

- 在数据结构中，栈中数据的存取方式为先进后出。
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

**在操作系统中，内存被分为栈区和堆区：**

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。





### new操作符

就是创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。设置对象中的属性和方法（为对象添加属性和方法）

new操作符执行过程

1. 首先创建一个新的空对象
2. 设置原型，将对象原型设置为函数的prototype对象
3. 让函数得this指向这个对象，执行构造函数代码（为这个新对象添加属性）
4. 判断函数返回值类型，如果是值类型，返回创建的对象。如果是引用类型，就返回这个引用类型的对象



### 对象继承有哪些

1. 原型链继承：

   缺点：

   1. 当原型链中包含引用类型值的原型时,该引用类型值会被所有实例共享;
   2. 在创建子类型(如创建Son的实例)时,不能向超类型(如Father)的构造函数中传递参数

    

2. 借用构造函数继承

   该方式是通过在子类型的函数中使用call或apply来调用超类型的构造函数来实现的。

   优点：

   1. 解决了不能向超类型传递参数的缺点（可以在子类构造函数中向父类传参）
   2. 父类的引用属性不会被共享

   缺点：

   1. 无法实现函数方法的复用
   2. 子类不能访问父类原型上定义的方法（即不能访问Parent.prototype上定义的方法），因此所有方法属性都写在构造函数中，每次创建实例都会初始化

   

3. 组合继承

   组合继承综合了`原型链继承`和`借用构造函数继承(构造函数继承)`，将两者的优点结合了起来。

   就是使用原型链继承原型上的属性和方法，而通过构造函数继承实例属性，这样既可以把方法定义在原型上以实现重用，又可以让每个实例都有自己的属性

   优点：

   1. 父类的方法可以复用

   2. 可以在子构造函数中向父构造函数中传参

   3. 父类构造函数中的引用属性不会被共享

      

4. 原型继承

   对参数对象的一种浅复制，基于已有的对象来创建新的对象。

   优点：父类方法可复用

   缺点：ES5 中定义的 Object.create() 方法就是原型式继承的实现。缺点与原型链继承方式相同。

   

5. 寄生继承

   思路就是创建一个用于封装继承过程的函数，通过传入一个对象，然后复制一个对象的副本，然后对象进行扩展，最后返回这个对象。

   优点：对一个简单对象实现继承，如果这个对象不是自定义类型时

   缺点：没有办法实现函数的复用

6. 寄生组合继承（重点）

   **寄生组合式继承就是为了降低调用父类构造函数的开销而出现的** 。寄生式组合继承可以算是引用类型继承的最佳模式

   优点：

   1. 只调用一次父类构造函数
   2. Child可以向Parent传参
   3. 父类方法可以复用
   4. 父类的引用属性不会被共享



### 事件流模型（冒泡和捕获）：

**冒泡和捕获**

冒泡和捕获是指在元素上的事件被触发的时候，js 传递事件的两种方向，或者说过程。
1、捕获阶段：先由文档的根节点 document 往事件触发对象，**从外向内捕获**事件对象；
3.冒泡阶段：从目标事件位置往文档的根节点方向回溯，**从内向外冒泡**事件对象。



**事件委托（代理）**：

就是将子元素绑定的全部事件代理到父节点去触发。事件委托的原理是DOM元素的事件冒泡。

优点：节约内存占用，减少事件注册，**从而减少性能的消耗**



### 类数组对象

```
var arrLike = {
  0: 'name',
  1: 'age',
  2: 'job',
  length: 3
}
```

类数组对象与数组的性质相似，是因为类数组对象在**访问**、**赋值**、**获取长度**上的操作与数组是一致的

**区别：类数组对象不能直接使用数组的方法**

arguments 中包含了函数传递的参数；arguments 是一个经典的类数组对象，我们可以通过上述的  Function.call 或者 Function.apply 方法来间接调用数组的方法，也可以直接通过 Array.prototype.slice  或 Array.prototype.splice  等方法把类数组对象转换成真正的数组





### this、bind、call、apply

**一、this**

通常指全局上下文

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

在ES5的严格模式下，this被规定为不会指向全局对象，所以严格模式下的this就是`undefined`。之后就是谁调用this就指向谁。



1. **作为对象的方法调用**
   当函数作为对象的方法被调用时，`this指向该对象`

2. **作为普通函数调用**
   this总是指向全局对象（在浏览器中，通常是Window对象）

3. **构造器调用**
   构造器和普通函数没什么不同。构造器和普通函数的区别在于`被调用的方式`

4. **call，apply调用**

   跟普通的函数调用相比，用call和apply可以动态的改变函数的this。允许不同对象分配和调用一个对象的函数/方法

   var obj1 = {
       name: 1,
       getName: function (num = '') {
           return this.name + num;
       }
   };

   var obj2 = {
       name: 2,
   };
   // 可以理解成在 obj2的作用域下调用了 obj1.getName()函数
   console.log(obj1.getName()); // 1
   console.log(obj1.getName.call(obj2, 2)); // 2 + 2 = 4
   console.log(obj1.getName.apply(obj2, [2])); // 2 + 2 = 4

   



**二、bind**

`bind()`方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被永久的指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

```
例：
const obj = {
    name: 1,
    getName: function ( ) {
        return this.name ;
    }
};

const fn = obj.getName
console.log(fn())  // 值为 undefined

const boundFn = fn.bind(obj)
console.log(boundFn())   // 值为 1


```

**多个bind绑定this指向问题**

bind就是创建一个新的函数，把函数this指向永久绑定为bind的第一个参数。之后无论再如何调用函数都不会改变this指向。



**三、call**

`call()` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。



例：

function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Food(name, price) {

  Product.call(this, name, price);  

  this.category = 'food';
}

let obj =  new Food('cheese', 5)

console.log( obj.name )；   //  cheese



**四、apply**

call 和 apply 方法只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。





### AST抽象语法树

**（a）概念：**

AST 全称为 Abstract Syntax Tree，译为抽象语法树。在 JavaScript 中，任何一个对象（变量、函数、表达式等）都可以转化为一个抽象语法树的形式。抽象语法树本质就是一个树形结构的对象。



**（b）特点：**

一个对象生成 AST 的关键所在是词法分析和语法分析。

词法分析：进行词法分析的程序或者函数叫作词法分析器，也叫扫描器。指的是将对象逐个扫描，获取每一个字母的信息，生成由对象组成的一维数组。

语法分析：是编译过程的一个逻辑阶段，语法分析的任务是在词法分析的基础上将单词序列组合成语法树。就是将有关联的对象整合成[树形结构](https://so.csdn.net/so/search?q=树形结构&spm=1001.2101.3001.7020)的表达形式。



**（c）用途：**

1. 常用各类转义、编译的插件中。比如最典型的 ES6 转换为 ES6 工具 、JSX 语法转换为 JavaScript 语法。即 babel 模块
2. 代码语法的检查，比如代码规范工具 ESLint 模块
3. 各类 JS/CSS/HTML 压缩工具
4. 代码的格式化、高亮
5. 代码错误提示
6. 代码自动补全



### 浅谈ajax、fetch和axios

**ajax：**

ajax是 Asynchronous JavaScript XML 的缩写，被译为异步 JavaScript 和 XML

ajax是一个**概念模型**，只是为实现异步交互的手段，是一个囊括了众多现有技术的**集合**，并不具体代指某项技术。其中最重要的是 XMLHttpRequest（XHR）对象

Ajax 最重要的特性就是可以**局部刷新页面**，而不需要重载（刷新）整个页面

而jQuery的ajax，只是对ajax的封装，使用对象形式及回调处理。

缺点：容易产生回调地狱（以下都可以解决）；XHR 结构不清晰



**fetch：**

fetch() 是一个全局方法，属于原生的 js 代码，脱离 XHR ，基于 Promise

Fetch API提供了许多与 XMLHttpRequest 相同的功能，但被设计成**更具可扩展性和高效性**

默认不带cookie，使用时需要设置

fetch方法必须接受一个参数（资源的路径）

fetch请求无论成功与否，它都返回一个 Promise 对象。fetch 不同于 xhr ，xhr 自带取消、错误等方法，所以服务器返回 4xx 或 5xx 时，是不会抛出错误的，需要手动处理，通过 response 中的 status 字段来判断。只有在网络错误的情况下，promise才会被reject

缺点：

浏览器支持性比较差

fetch不支持jsonp

fetch 自身没有提供 中止请求的方法。但是部分浏览器有实现AbortController，可以通过AbortController中止fetch请求

参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API



**Axios：**

一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中

本质上也是对原生XHR的封装，只不过它是Promise的实现版本

客户端 Axios 的主要特性有：

- 从浏览器创建 XMLHttpRequest
- 支持 Promise API
- 拦截请求和响应
- 转换请求和响应数据
- 取消请求
- 自动转换JSON数据
- 客户端支持防御CSRF/XSRF



