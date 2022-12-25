## React基础学习

中文文档：https://react.docschina.org/

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。



### react特点

1、采用组件化模式、声明式编码，提高开发效率及组件服用率

2、在React Native中可以使用react语法进行移动端开发

3、高效。使用虚拟dom+diffing算法，尽量减少与真实dom的交互



### 语法&概念



#### JSX

全称Javascript XML，是一个 JavaScript 的语法扩展

```
jsx基本语法例子：

<div id="root"></div>

const vdom = <div> hello </div>;
或
const arr = ['1','2','3']
const vdom = (
  <div clasName="xxx">
	  <ul style={ { color : red } }>
		  {
			arr.forEach((item,i) => {
			  return <li key={i} >{item}</li>
			})	
		  }
	  </ul>
  </div>
)

// 渲染虚拟dom到根节点中
ReactDOM.render(vdom, document.getElementById('root'))
```

jsx语法：

1. 只有一个根标签
2. 样式类名使用  **className**
3. 内联样式，书写方式 **style={ { key : value ，...} }** 
4. 标签中使用**变量**或**函数**时要包裹在一个花括号 { } 中，花括号里面也可以直接写js逻辑
5. jsx也是一个表达式，可以在 if 和 for 代码块中使用



#### 组件和Props

- 组件分为函数组件和class组件

function组件用useState，class组件用setState

```
// 接收唯一带有数据的 “props”对象与并返回一个 React 元素。这类组件被称为“函数组件”
function Welcome(props) {
	//	函数式组件使用 useState 来定义属性，读取(age)和修改（setAge）
	const [age, setAge] = useState('18');
  return <h1>我的名字是 {props.name}，年龄 { age }</h1>;
}

// 同时可以使用ES6的 class 来定义组件；使用类组件一定要继承react，同时要是用render并有返回值。类组件的参数需要通过 this 访问
class Welcome extends React.Component {
	constructor(props) {
       super(props);
       this.state = {name: 'xxx'};
    }
    
    changeName() {
    	// 修改名字
    	this.setState({ name: 'xxx' })
    }
	render() {
		return <h1>Hello, {this.props.name}</h1>;
	}
}

// 这里不能直接写 Welcome 函数或类名称 ，而是要以标签形式且闭合。
ReactDOM.render( <Welcome name="张三" /> , document.getElementById('root') );

```

 **组件名称必须以大写字母开头。**React 会将以小写字母开头的组件视为原生 DOM 标签。而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 `Welcome`。



- props：

当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）以及子组件（children）转换为单个对象传递给组件，这个对象被称之为 “props”。

组件不能修改自身的 `props`

```
// 该纯函数没有更改入参是允许的
function add(a, b) {
  return a + b
}

// 比如该函数修改了自身的入参是不行的
function withdraw(account, amount) {
  account.total -= amount;
}
```

**所有 React 组件都必须像纯函数一样保护它们的 props 不被更改**



#### State和生命周期

state基本使用：

```
class Clock extends React.Component {
  // 构造器不一定要写，要对实例进行初始化或添加属性时才写 
  constructor(props) {
  	// 如果使用了constructor构造器，则该构造器就必须调用super
    super(props);
    this.state = {date: new Date()};
  }
  
  // 挂载生命周期。 该方法会在组件已经被渲染到 DOM 中后运行
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  // 卸载生命周期。组件从 DOM 中被移除后执行卸载方法
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // 修改时间
  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```



#### 事件绑定

React 事件使用驼峰命名（如：onClick），而不是全部小写

另一个区别是，在 React 中你不能通过返回 false来阻止默认行为。必须明确调用 preventDefault 。例如，对于纯 HTML ，要阻止链接打开一个新页面的默认行为

```
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```



当使用一个 ES6 类 定义一个组件时，通常的一个事件处理程序是类上的一个方法。
例:

```
class A extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isOn: true};

    // 这个绑定是必要的，使`this`在回调中起作用
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.setState(state => ({
      isOn: !state.isOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}
```



在JSX回调中你必须注意 this 的指向。 在 JavaScript 中，类方法默认没有 绑定 的。如果你忘记绑定 this.handleClick 并将其传递给onClick，那么在直接调用该函数时，this 会是 undefined 。

这不是 React 特有的行为；这是 JavaScript 中的函数如何工作的一部分。 一般情况下，如果你引用一个后面没跟 () 的方法，例如 onClick={this.handleClick} ，那你就应该 绑定(bind) 该方法。

如果你没有使用属性初始化语法，可以在回调中使用一个 箭头函数：

```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // This syntax ensures `this` is bound within handleClick
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```



这个语法的问题是，每次 LoggingButton 渲染时都创建一个不同的回调。在多数情况下，没什么问题。然而，如果这个回调被作为 prop(属性) 传递给下级组件，这些组件可能需要额外的重复渲染。我们通常建议在构造函数中进行绑定，以避免这类性能问题。

将参数传递给事件处理程序
在循环内部，通常需要将一个额外的参数传递给事件处理程序。 例如，如果 id 是一个内联 ID，则以下任一方式都可以正常工作：

```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两行代码是等价的，分别使用 arrow functions 和 Function.prototype.bind 。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。



#### 列表和key

在 React 中，使用map遍历元素数组

键(Keys) 帮助 React 标识哪个项被修改、添加或者移除了。数组中的每一个元素都应该有一个唯一不变的键(Keys)来标识。

keys 只在数组的上下文中存在意义，不能放在遍历的组件内部。通常在元素中调用 map() 需要使用 keys。确保key是唯一

例：

```
const numbers = [1, 2, 3,...];

const listItems = numbers.map((it) =>
  <li key={it.toString()}>
    {it}
  </li>
);

或

const list = [{...},{}];
return (

  <ul>
    {list.map((it) => {
      const { id, name } = it
      <li key={id}>
        {name}
      </li>
    })}
  </ul>

)
```



### UseEffect

useEffect时reactHook中最重要，最常用的hook之一
官方原话：在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。所以推荐使用useEffect完成有副作用的操作

useEffect 相当于 function 组件里面的生命周期，useEffect相当于react中的什么生命周期呢？

官方原话：
如果你熟悉 React class 的生命周期函数，你可以把 useEffect Hook 看做 componentDidMount（组件挂载），componentDidUpdate（组件更新） 和 componentWillUnmount（组件将要摧毁） 这三个生命周期函数的组合

用法说明：
useEffect接收两个参数，第一个参数是逻辑处理函数，第二个参数是一个数组



**一、**第二个参数可以不传，不会报错，但浏览器会无线循环执行逻辑处理函数。

useEffect(() => {
/** 执行逻辑 */
// 无线循环
})



**二、**第二个参数只传一个空数组，逻辑处理函数里面的逻辑只会在组件挂载时执行一次 。相当于 componentDidMount

useEffect(() => {
/** 执行逻辑 */
},[])



三、第二个参数存放变量，逻辑处理函数会在组件挂载时执行一次和 a 或者 b 变量发生改变时执行一次。相当于componentDidMount 和 componentDidUpdate 的结合

```
const [a, setA] = useState(1);
const [b, setB] = useState(2);
useEffect(() => {
/** 执行逻辑 */
},[a,b])
```



四、useEffect第一个参数可以返回一个回调函数，这个回调函数将会在组件被摧毁之前和再一次触发更新时，将之前的副作用清除掉。就相当于componentWillUnmount

useEffect去除副作用。我们可能会在组件即将被挂载的时候创建一些不断循环的订阅（计时器，或者递归循环）。在组件被摧毁之前，或者依赖数组的元素更新后，应该将这些订阅也给摧毁掉。

比如以下两种情况

```
const [time, setTime] = useState(0)

// 情况1
useEffect(() => {
// 没有去除计时器，增大不必要的开销和代码风险
	const InterVal = setInterval(() => {
		setTime(time + 1)
	},1000)
},[])

// 情况2
useEffect(() => {
	const InterVal = setInterval(() => {
		setTime(time + 1)
	},1000)
	// 利用第四点，在组件被摧毁前去除计时器
	return () => {
   		clearInterval(InterVal )
   	}
},[])
```



**useEffect常见跳坑**
1、useEffect执行函数被循环执行。
出现这种情况可能有两种原因。

没传第二个参数，解决办法是加个空数组参数

```
useEffect(() => {
/** 执行逻辑 */
})

避免在useEffect执行函数里面改变了useEffect监测的变量，否则会导致无限循环
const [a, setA] = useState(1);
useEffect(() => {
/** 执行逻辑 */
setA(a + 1)
},[a])
```

2、useEffect监测不到依赖数组元素的变化。
只有一种可能，依赖数组元素的地址的值根本就没变，比如:

```
const [a, setA] = useState({
	b: 'dx',
	c: '18',
})

const changeA = () => {
	setA((old) => {
		old.b = 'yx'
		return old
	})
}

useEffect(() => {
/** 当组件挂载时执行一次changeA */
	changeA ()
},[])

/**当changeA执行却没有打印 a*/
useEffect(() => {
	/** 执行逻辑 */
	console.log(a)
},[a])
```

是因为changeA没有真正的改变a在栈中的值（地址的值），只是改变了a在堆中的值。
useEffect监测不到堆中值得变化，所有引用类型数据都应该注意这一点。
解决的办法

```
const [a, setA] = useState({
	b: 'dx',
	c: '18',
})

const changeA = () => {
	setA((old) => {
		const newA = {...old}
		newA .b = 'yx'
		return newA 
	})
}

useEffect(() => {
/** 当组件挂载时执行一次changeA */
	changeA ()
},[])

/**当changeA执行打印  {b:'yx',c:'18'}  */
useEffect(() => {
	/** 执行逻辑 */
	console.log(a)
},[a])
```



### 状态管理

redux，mobx