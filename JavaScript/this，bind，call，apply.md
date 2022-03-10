### 1、this:

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

   



### 2、箭头函数

箭头函数不会创建this（简单说箭头函数没有this），它只会继承上一层作用域链的this；

**call()、apply()、bind()等方法不能改变箭头函数中this的指向，所以继承来的this指向永远不会改变**

**没有自己的arguments；**

**没有prototype：所以箭头函数不能作为构造函数**

**不能用作Generator函数，**

**不能使用yeild关键字**





### 3、bind:

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



### 4、call:

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



### 5、apply:

call 和 apply 方法只有一个区别，就是 `call()` 方法接受的是**一个参数列表**，而 `apply()` 方法接受的是**一个包含多个参数的数组**。