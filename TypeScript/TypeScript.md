### TypeScript

参考：
https://juejin.cn/post/7031787942691471396#heading-16
https://www.runoob.com/typescript/ts-tutorial.html

官方文档：https://www.tslang.cn/



TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript。

常见的类型及使用



### ts基本类型

常用：boolean、number、string、array、object、enum、any、void、unknown
不常用：tuple、null、undefined、never、BigInt

### null和undefined
在 JavaScript 中，null 与 undefined 分别表示“这里有值，但是个空值”和“这里没有值”。
在 TypeScript 中，null 与 undefined 类型都是有具体意义的类型。
它们作为类型时，表示的是一个有意义的具体类型值。
这两者在没有开启 strictNullChecks 检查的情况下，就是默认情况下null和undefined是所有类型的子类型，所以你可以将null和undefined赋给任意类型

### void 类型
一个没有return的函数中，应当被标记为void类型。
在ts中void类型才表示空的值，没有意义的值

```
const fun = ():void => {}
```



### never
never 就是这么一个“什么都没有”的类型。此前我们已经了解了另一个“什么都没有”的类型，void。但相比于 void ，never 还要更加空白一些

never 类型会被直接无视掉，而 void 仍然存在。这是因为，void 作为类型表示一个空类型，就像没有返回值的函数使用 void 来作为返回值类型标注一样，void 类型就像 JavaScript 中的 null 一样代表“这里有类型，但是个空类型”。
而 never 才是一个“什么都没有”的类型，它甚至不包括空的类型，严格来说，never 类型不携带任何的类型信息，因此会在联合类型中被直接移除

### object

```
interface obj {
  name: string | number; //  | 或
  age: number;
  male?: boolean;  // 选填
}
```



### Array
常见的有
数组类型的定义方式有两种：

```
let arr:string[] = ["1","2"];
let arr2:Array<string> = ["1","2"]；
```

定义联合类型数组

```
// 这个数组既可以存储数值类型的数据，也可以存储字符串类型的数据
let arr:(string | number)[] = [23, 'string']
```

定义指定的对象成员数组

```
interface Arrobj{
  name:string,
  age:number
}
// 接口Arrobj定义了数组内的键值只能为name、age
let arr:Arrobj[] = [{name: 'hzx', age: 23}]
```

元组类型(tuple)
在 TypeScript 的基础类型中，元组（ Tuple ）表示一个已知数量和类型的数组 其实可以理解为他是一种数组里面每一项都需要定义类型的特殊数组

```
const flag: [string, number,string?] = ["hello", 1];
```




### 类型断言
语法 as type
类型断言是使用 as 关键字。类型断言的正确使用方式是，在 TypeScript 类型分析不正确或不符合预期时，将其断言为此处的正确类型

```
const { status } = res as { status：Number  }
```

通常解构赋值默认值进行了预期的类型断言。在实际场景中，还是 as any 这一种操作更多。但这也是让你的代码编程 AnyScript 的罪魁祸首之一


### 字面量类型 
比原始类型更精确的类型，同时也是原始类型的子类型
字面量类型主要包括字符串字面量类型、数字字面量类型、布尔字面量类型和对象字面量类型
简单来说就是一个已知的值

```
const str: "hollow" = "hollow";
const num: 2 = 2;
const bool: true = true;
```



### 联合类型 
联合类型表示取值可以为多种类型的一种，使用‘ | ’分隔每个类型

```
type nameType = {
  name: number | string;   // 可以为数字类型和字符串类型
};
```



### Enum 枚举类型（比较少用） 
普通枚举 初始值默认为 0 其余的成员会会按顺序自动增长 可以理解为数组下标

```
enum Color {
  RED,
  PINK,
  BLUE = 10, // 设置初始值
  BLACK = 黑色
}
const pink: Color = Color.PINK;
console.log(pink); // 1
const blue: Color = Color.BLUE;
console.log(blue); // 11
const black: Color = Color.BLACK;
console.log(black); // 黑色
```



### 交叉类型 

交叉类型的功能类似于接口继承，用于组合多个类型为一个类型（常用于对象类型）

```
// 使用 & 符号
interface Person { name: string }
interface People { sex: string }
type PersonMan = Person & People
相当于
type PersonMan  = {name: string, sex: string }
```



### 类型保护 
ts类型保护，是指通过一些关键字来缩小类型范围，如typeof instanceod for in等等



### 函数 

参数类型、返回值类型以及重载的应用

```

function foo(name: string): number {
  return name.length;
}
或
const foo = (name: string): number => {
  return name.length
}
或
// 这种是 -函数类型签名- ，可读性差不推荐使用
// 要么使用 -类型别名- 将 (name: string) => number 抽离出来 
const foo: (name: string) => number = (name) => {
  return name.length
}
```

 

### 类
通过class关键字来定义类

```

class Person {
  name: string; //如果初始属性没赋值就需要加上类型 

  constructor(inputName: string) {
    this.name = inputName;
  }

  print(addon: string): void {
    console.log(`${this.name} and ${addon}`)
  }

  get nameA(): string {
    return `${this.name}+A`;
  }

  set nameA(value: string) { // setter 方法不允许进行返回值的类型标注
    this.name = `${value}+A`
  }
}
```



### 接口

**接口定义**
接口既可以在面向对象编程中表示为行为的抽象，也可以用来描述对象的形状
我们用 interface 关键字来定义接口 在接口中可以用分号或者逗号分割每一项，也可以什么都不加

```
interface User {
  readonly name: string;
  age: number;
  sex?: number;
}

let userInfo: User = {
  name: 'zs',
  age: 18,
  email: '', // 多出变量 或 少了变量 都会报错
}
```



**行为的抽象**
接口可以把一些类中共有的属性和方法抽象出来,可以用来约束实现此接口的类
一个类可以实现多个接口，一个接口也可以被多个类实现
使用 implements关键字

```
//接口可以在面向对象编程中表示为行为的抽象
interface Speakable {
  speak(): void;
}
interface Eatable {
  eat(): void;
}
//一个类可以实现多个接口
class Person implements Speakable, Eatable {
  speak() {
    console.log("Person说话");
  }
  //   eat() {} //需要实现的接口包含eat方法 不实现会报错
}
```

**接口的继承**

```
// 使用 extends关键字
interface User {
  name:string;
  getName(): string;
}

interface Info extends User {
  age:number;
  getAge(): number;
}
```



**类型别名**
TS中，大多数情况下接口和类型别名的效果等价，但是在一些特定情况下两者还是有区别
1、type 可以声明 基本类型 别名、 联合类型 、 元组 等类型、而 interface 不行

```
type MyType1 = boolean;
type MyType2 = string | number;
type MyType3 = [string, boolean, number];
```

2、重复定义
接口可以定义多次 会被自动合并为单个接口 类型别名不可以重复定义

3、扩展方式
接口的扩展方式是继承，通过 extends 来实现。
类型别名的扩展方式就是交叉类型，通过 & 来实现

```
type PointX = {
  x: number;
};

type Point = PointX & {
  y: number;
};
```



### 泛型
**基本使用**
泛型是指在定义类、接口、函数的时候不先预先定义类型，而且是在调用的时候再去定义类型的一种特性
 使用 <T> 用来表示后续函数需要用到的类型 ，解决很多预先无法确定类型相关的问题。多参如：<T,U>

```
const setArray = <T>(length: number, value: T):any[] => {
  let arr = [];
  for(let i = 0; i < length; i++) {
    arr.push(value);
  }
  return arr
}

console.log('返回到数组：', setArray<string>(3,'zy')) // ['zy', 'zy','zy']
console.log('返回到数组：', setArray<number>(3, 1)) // [1,1,1]
```



**2、泛型约束**
在函数内使用泛型的时候，因为不明确值的类型，有些值的属性在定义的时候会报错，比如下 面的例子

```
const getLength = <T>(val:T) => {
  return `${val}长度：${val.length}` // Error 因为泛型 T 不一定包含属性 length，所以编译的时候报错了
}
`
这个时候为了解决这个问题，我们可以对泛型约束，使其只能传入那些包含length 属性的变量，这就是泛型约束
`
interface Attribute {
  length: number;
}
const getLength = <T extends Attribute>(val:T) => {
  return `${val}长度：${val.length}`
}
getLength('hello world')
getLength(180) // Error 报错 number类型的值是没有length属性 所以就会报错
```


注意我们在泛型里面使用的extends表示泛型约束，需要跟接口的继承区分开