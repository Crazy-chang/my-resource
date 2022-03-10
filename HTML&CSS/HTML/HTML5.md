### 描述

HTML产生于1990年，1997年HTML4成为互联网标准，并广泛应用于互联网应用的开发。

HTML5是构建Web内容的一种语言描述方式，HTML5是互联网的下一代标准，是构建以及呈现互联网内容的一种语言方式，被认为是互联网的核心技术之一。

HTML5是Web中核心语言HTML的规范，用户使用任何手段进行网页浏览时看到的内容原本都是HTML格式的，在浏览器中通过一些技术处理将其转换成为了可识别的信息，HTML5在从前HTML4.01的基础上进行了一定的改进。



### DOCTYPE(⽂档类型) 的作⽤

 **< !DOCUTYPE html >**；这是文件第一行代码声明！这样声明才可以使用HTML5的新特性

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义****来解析文档**，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在 HTML ⽂档的第⼀⾏。

浏览器渲染页面的两种模式（可通过 document.compatMode 获取，比如，语雀官网的文档类型是**CSS1Compat**）：

- **CSS1Compat：标准模式（Strick mode）**，默认模式，浏览器使用 W3C 的标准解析渲染页面。在标准模式中，浏览器以其支持的最高标准呈现页面。
- **BackCompat：怪异模式(混杂模式)(Quick mode)**，浏览器使用自己的怪异模式解析渲染页面。在怪异模式中，页面以一种比较宽松的向后兼容的方式显示。



### html5的新特性

#### 1、语义化标签

**语义化是指** 根据内容的结构化（内容语义化），选择合适的标签（代码语义化）。通俗来讲就是用正确的标签做正确的事情。

新的特殊内容元素，比如 ：

article：定义页面内容以外的内容

footer：定义文档或节的页脚

header：规定文档或节的页眉

nav：定义导航链接

section：定义文档的节

为了在没有CSS的情况下，页面也能呈现出很好地内容结构（即使去掉css样式页面也能以一种清晰的结构展现。）

有利于SEO（搜索引擎优化）：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；

1。更利于搜索引擎（爬虫）的抓取，识别（SEO的优化）和便于团队开发和维护(可维护性更高，因为结构清晰,so易于阅读)。
2。更有利于特殊终端的阅读(手机，个人助理等）。



#### 2、表单新特性

新的表单控件，比如calendar、date、time、email、url、search



#### 3、音频标签

很多的视频都是通过插件（比如flash）来实现的，但并不是所有的浏览器都拥有相同的插件，为了能让视频和音频在网页内播放成功，HTML5规定了一种通过video，audio来包含视频播放的标准。

video：支持的格式有ogg，MP3，webm

audio：支持的格式有ogg，Wav，mp3

该标签都包含多个source元素，source 元素可以链接不同的音频文件。浏览器将使用第一个可识别的格式

```
例：  <video width="320" height="240" controls="controls">
			<source src="movie.ogg" type="video/ogg">
			 <source src="movie.mp4" type="video/mp4">
		Your browser does not support the video tag.
		</video>
```



#### 4、canvas画布标签



#### 5、svg标签

SVG 指可伸缩矢量图形 (Scalable Vector Graphics)，SVG 用于定义用于网络的基于矢量的图形，SVG 使用 XML 格式定义图形，SVG 图像在放大或改变尺寸的情况下其图形质量不会有损失

**SVG 的优势：**

（1）SVG 图像可通过文本编辑器来创建和修改

（2）SVG 图像可被搜索、索引、脚本化或压缩

（3）SVG 是可伸缩的

（4）SVG 图像可在任何的分辨率下被高质量地打印

（5）SVG 可在图像质量不下降的情况下被放大



#### 6、拖放api（draggable）

```
例：   <div draggable="true"></div>
```

（1）拖放是一种常见的特性，即抓取对象之后拖到另一个位置并释放

（2）在 HTML5 中，拖放是标准的一部分，任何元素都能够拖放



#### 7、地理定位（Geolocation）

Geolocation API 用于获得用户的地理位置

鉴于该特性可能侵犯用户的隐私，除非用户同意，否则用户位置信息是不可用的



#### 8、webworker

它是独立运行在后台的 JavaScript，与主线程区分开，内存会另开辟一个空间给他，不会影响页面的加载（性能）。

Web Worker的基本原理就是在当前javascript的主线程中，使用Worker类加载一个javascript文件来开辟一个新的线程，

起到互不阻塞执行的效果，并且提供主线程和新线程之间数据交换的接口：postMessage、onmessage。



#### 9、Web 存储（WebStorage ）

其中包括localStorage和sessionStorage

**localStorage：**

存储的数据没有时间限制；存储键值对数据；大小5M左右

**sessionStorage：**

当用户关闭浏览器窗口后，数据会被删除；存储键值对数据；大小5M左右



sessionStorage和localStorage一样

保存数据：localStorage.setItem(key,value);

读取数据：localStorage.getItem(key);

删除单个数据：localStorage.removeItem(key);

删除所有数据：localStorage.clear();

得到某个索引的key：localStorage.key(index);





#### 10、webscoket

WebSocket是Html5定义的一个新协议，与传统的http协议不同，该协议可以实现服务器与客户端之间全双工通信。简单来说，首先需要在客户端和服务器端建立起一个连接，这部分需要http。连接一旦建立，客户端和服务器端就处于平等的地位，可以相互发送数据，不存在请求和响应的区别。

WebSocket的优点是实现了双向通信，缺点是服务器端的逻辑非常复杂。现在针对不同的后台语言有不同的插件可以使用。

很多网站为了实现推送技术，所用的技术都是 Ajax 轮询。轮询是在特定的的时间间隔下，由浏览器对服务器发出HTTP请求，然后由服务器返回最新的数据给客户端的浏览器。这种传统的模式带来很明显的缺点，即浏览器需要不断的向服务器发出请求，然而HTTP请求可能包含较长的头部，其中真正有效的数据可能只是很小的一部分，显然这样会浪费很多的带宽等资源。

HTML5 定义的 WebSocket 协议，能更好的节省服务器资源和带宽，并且能够更实时地进行通讯。





### Canvas 与 SVG 的比较：

（1）Canvas：

依赖分辨率

不支持事件处理器

弱的文本渲染能力

能够以 .png 或 .jpg 格式保存结果图像

最适合图像密集型的游戏，其中的许多对象会被频繁重绘

（2）SVG：

不依赖分辨率

支持事件处理器

最适合带有大型渲染区域的应用程序（比如谷歌地图）

复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）

不适合游戏应用





好文[跳转](https://blog.csdn.net/weixin_45709829/article/details/115433620?ops_request_misc=%257B%2522request%255Fid%2522%253A%2522164086917216780271979046%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=164086917216780271979046&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~top_click~default-2-115433620.pc_search_em_sort&utm_term=html5%E6%96%B0%E7%89%B9%E6%80%A7&spm=1018.2226.3001.4187)




