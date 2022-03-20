### css3新特性

#### 1、选择器

**伪元素选择器**

::before和 ::after

都需要配合 content:'内容或不填' 和display或position属性来使用

::first-line

::first-letter

::section



**伪类选择器** 

:link  设置超链接未被访问的样式
:visited  被访问过的样式

:hover	设置鼠标悬停时的样式
:active	元素被用户激活（在鼠标点击与释放之间）时的样式
:focus	输入焦点时的样式

.list>li:first-child     选中第一个子元素

.list>li:last-child     选中最后一个子元素

.list>li:nth-child(n)  选中第n个子元素

.list>li:nth-child(odd)  选中偶数行

.list>li:nth-child(even)  选中奇数行

.list>li:nth-child(2n)  支持数学表达式，选中偶数行

.list>:nth-of-type(1)  选择类型匹配的，选中的是第五个li,跳过ul中其他类型



#### 2、边框

- border-radius    圆角
- box-shadow    盒阴影
- border-image   边界图片



#### 3、背景和渐变

- background-image  添加背景图片或背景渐变效果
- background-size   指定背景图像的尺寸大小
- background-origin   指定背景图像的定位区域
- background-clip   背景剪裁属性是从指定位置开始绘制区域



#### 4、动画

```
// 对应参数：绑定名；完成时间；完成的周期；开始前的延迟；是否反复播放；不播放时应用的样式；是否在运行或停止
animation: name duration timing-function delay iteration-count direction fill-mode play-state;

@keyframes：绑定名 { 处理动画 }
```



```
div {
	animation:name 1s;
}

// 请用百分比来规定变化发生的时间，或用关键词 "from" 和 "to"，等同于 0% 和 100%。 0% 是动画的开始，100% 是动画的完成。
@keyframes name {
	from { XXX } 	to { XXX}
	或
	0%{ XXX }	100% { XXX }
}
```



#### 5、过渡属性

**transition**，过渡是元素从一种样式逐渐改变为另一种的效果



#### 6、2/3d变换属性

**transform：**3d，放大，旋转，角度变换



#### 7、多列布局

column-xxx



#### 8、媒体查询

**@media：**针对不同媒体类型可以定制不同的样式规则

