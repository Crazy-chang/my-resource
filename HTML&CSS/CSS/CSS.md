​	

### 1、样式属性权重和优先级

!important > 行内样式 > ID > 类、伪类、属性 > 标签名 > 继承 > 通配符

**！important** 无穷大

内联样式，如: style=””，权值为1000。

ID选择器，如：#content，权值为100。

类，伪类和属性选择器，如.content，权值为10。

标签名，如div p，权值为1。



### 2、px、rpx、rem、em、vh、vw

px：px像素（Pixel），相对长度单位。是相对于显示器屏幕分辨率而言的

rpx：是微信小程序的尺寸单位，可根据屏幕宽度自适应

em：是相对单位，会继承父级元素的字体大小。改动父元素的字体大小，子元素会等比例变化

rem：rem(root em)是CSS3新增的相对单位，相对根节点html大小来计算（若根节点没有设置则默认浏览器的值来计算），布局的本质是整体等比缩放

vh：视图窗口高度，1vh = 1%

vw：视图窗口宽度，1vw = 1%



### 3、css 属性之继承

**可继承：** 

1. 字体系列属性：font-family/weight/size/style
2. 文本系列属性：文本缩进；水平对齐；行高；间距；颜色
3. 元素可见性：visibility
4. 列表布局属性：list-xxx

**不可继承 ：**

1. 盒子模型的属性
2. 定位属性；
3. 背景属性
4. 文本属性：垂直文本对齐；阴影效果；空白符的处理；文本的方向



### 4、盒模型

盒子模型（Box Modle）可以用来对元素进行布局，由实际内容（content）、内边距（padding）、边框（border）与外边距（margin）这几个部分组成。

**W3C盒模型（标准盒模型）**

标准盒模型的width与height只含content，不包括padding和border

**怪异盒模型(又称ie盒模型)**

IE盒模型的width与height是 content+padding+border



通过对box-sizing属性的设置，就可以让盒模型在标准和怪异中进行转换。
box-sizing:content-box(默认); 盒模型设置为w3c标准盒子模型
box-sizing:border-box; 盒模型设置为怪异（IE）盒子模型



### 5、link和@import的区别

**1.从属关系区别**
`@import`是 CSS 提供的语法规则，只能加载CSS；

`link`是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。

**2.加载顺序区别**
`link`标签引入的 CSS 会同时加载；

`@import`引入的 CSS 将在页面加载完毕后被加载。

**3.兼容性区别**
`@import`是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；

`link`标签作为 XHTML 元素，不存在兼容性问题。

**4.DOM可控性区别**

link支持使用js去控制DOM去改变样式；而@import不支持

**5.权重区别(该项有争议，下文将详解)**
`link`引入的样式权重大于`@import`引入的样式。

[详细](https://www.cnblogs.com/my--sunshine/p/6872224.html)



### 6、@support含义及用法

**@support**
CSS中的@support主要是用于检测浏览器是否支持CSS的某个属性，其实就是条件判断，如果支持某个属性，**你可以写一套样式，如果不支持某个属性，你也可以提供另外一套样式作为替补。**但是这里有一点需要注意的是：@support对于浏览器的版本也是有要求的，不是说所有的浏览器以及其所有的版本都是支持@support的。
1.逻辑操作符：“not” 的用法

@supports not (display: flex) {  div {    float: right;  }}
1
注释：如果浏览器不支持display:flex属性的话，那么div的样式就是display:right
2.逻辑操作符：“and”的用法

@supports (display: flex) and ( box-shadow: 2px 2px 2px black ) {
	/*自己的样式*/
}

注释：如果浏览器支持display:flex和box-shadow的属性，就执行里面自己的样式

3.逻辑操作符：“or” 的用法

@supports (display: -webkit-flex) or (display: -moz-flex) or(display: flex) {
      /*自己的样式 */
}

注释：如果浏览器支持其中一个就可以执行里面自己的样式

4.混用的例子
“or”和“and”混用，在@supports中“or”和“and”混用时，必须使用括号（）来区分其优先级

@supports ((transition-property: color) or (animation-name: foo)) and (transform: rotate(10deg)) { 
	/*自己的样式 */
}
@supports (transition-property: color) or ((animation-name: foo) and (transform: rotate(10deg))) {
        /*自己的样式 */
}



**“or”、“and” 和 “not” 混用**

@supports (display: grid) and (not (transition-property: color) or (animation-name: foo)){
/*自己的样式 */
}



### 7、BFC 

BFC(Block formatting context)直译为"块级格式化上下文"，是 Web 页面的可视化 CSS 渲染中的一部分，是布局过程中生成块级盒子的区域，也是浮动元素和其他元素的交互限定区域。

通俗来讲：BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

#### 创建 BFC 的条件：

1. 根元素：body;
2. 元素设置浮动：float 除 none以外的值
3. 元素设置绝对定位：position（absolute、fixed）
4. display值为：inline-block、table-cell、table-caption、flex等
5. overflow值为：hidden、auto、scroll；

#### BFC特点（渲染规则）：

- 垂直方向上，自上而下排列，和文档流的排列方式一致。
- 在 BFC 中上下相邻的两个容器的 margin 会重叠
- 计算 BFC 的高度时，需要计算浮动元素的高度
- BFC 区域不会与浮动的容器发生重叠
- BFC 是独立的容器，容器内部元素不会影响外部元素
- 每个元素的左 margin 值和容器的左 border 相接触

#### **BFC 的作用：**

##### 解决 margin 的重叠问题

- 由于 BFC 是一个独立的区域，内部的元素和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin 重叠的问题。

##### 解决高度塌陷的问题

- **解决高度塌陷的问题**：在对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变成一个 BFC。常用的办法是给父元素设置`overflow:hidden`。

##### 创建自适应两栏布局

- 可以用来创建自适应两栏布局：左边的宽度固定加上浮动，右边的宽度自适应再设置成BFC。



#### IFC内联格式化上下文

IFC的线框高度由其包含行内元素中最高的实际高度计算而来，不受到竖直方向的padding/margin影响

IFC的inline box一般左右都贴紧整个IFC，但是因为float元素二扰乱。float元素会位于IFC与line box之间，使得line box宽度缩短。同个IFC下的多个line box高度会不同。IFC中不可能有块级元素，当插入块级元素时（如p中插入div）会产生两个匿名快与div分隔开，即产生两个IFC，每个IFC对外表现为块级元素，与div垂直排列。

ifc应用/作用：

- 水平居中：当一个块要在环境中水平居中时候，设置其为inline-block则会在外层产生IFC，通过text-align:center则可以使其水平居中。
- 垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle,其他行内元素则可以在此父元素下垂直居中。



### 8、单/多行文本溢出隐藏

单行文本溢出

```
overflow: hidden;	// 溢出隐藏
text-overflow: ellipsis;		// 溢出省略
white-space: nowrap;		// 规定段落中的文本不换行
```

多行文本溢出

```
overflow: hidden;
text-overflow: ellipsis;
display:-webkit-box;	// 作为弹性伸缩盒子模型显示
-webkit-box-orient: vertical;	// 设置伸缩盒子子元素排列方式（垂直排列）
-webkit-line-clamp:3; 	// 显示行数
```



### 9、清除浮动：

1. 给父级 div 定义`height`属性
2. 最后一个浮动元素之后添加一个空的 div 标签，并添加`clear:both`样式
3. 包含浮动元素的父级标签添加overflow：hidden或overflow：auto
4. 使用 :after 伪元素+`clear:both`。





### 10、水平剧中的方式

1. 利用绝对定位

   ```
   .parent {   
       position: relative;
   }
   // 方法一
   .child {
       position: absolute;
       left: 50%;
       top: 50%;
       transform: translate(-50%,-50%);//通过 translate 来调整元素的中心点到页面的中心
   }
   // 方法二
   .child {
       position: absolute;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       margin: auto;
   }
   // 方法三
   .child {
       position: absolute;
       top: 50%;
       left: 50%;
       margin-top: -50px;     /* 自身 height 的一半 */
       margin-left: -50px;    /* 自身 width 的一半 */
   }
   ```

   
   
2. 使用flex

   ```
   .parent {
       display: flex;
       justify-content:center;
       align-items:center;
   }
   ```

   



### 11、Flex 弹性布局

Flex 是 FlexibleBox 的缩写，意为弹性布局。设为 Flex 布局以后，**子元素的 float、clear 和 vertical-align 属性将失效**。自身就变为容器，所有子元素则自动成为容器成员。容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿水平主轴排列。

flex 布局是 CSS3 新增的一种布局方式，可以通过将一个元素的 display 属性值设置为 flex 从而使它成为一个 flex 容器，它的所有子元素都会成为它的项目。

**设置在父容器的属性：**

1. flex-direction属性决定子成员主轴方向排列
2. flex-wrap属性，一条轴线排不下，如何换行；规定灵活项目是否拆行或拆列
3. flex-flow属性是 flex-direction 属性和 flex-wrap 属性的复合属性，默认值为 row nowrap。
4. justify-content属性定义子成员在主轴上的对齐方式
5. align-items属性定义了子成员在交叉轴方向如何对齐
6. align-content属性定义了子成员垂直方向排列以及子成员间的隔开间距



**设置在子成员项的属性：**

1. order属性定义子项排列顺序。数值越小，排越前，默认为0
2. flex-grow属性定义子项放大比例，默认0，即如果存在剩余空间，也不放大
3. flex-shrink属性定义了子项的缩小比例，默认为1，即如果空间不足，该子子项将缩小
4. flex-basis该属性在分配多余空间之前，子项先占据的主轴空间，然后再计算主轴是否有多余空间，有多余则按比例分配。默认值为`auto`，即子项本来的大小
5. flex 属性是 flex-grow，flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选
6. align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。



**flex：1  你了解吗**

通常flex：1 是由 flex-grow：1，flex-shrink：1和flex-basis：0%组成。

```
 例子：
   .parent {
        display: flex;
        width: 600px;
    }
        
   .item-1 {
        width: 140px;
        flex: 2 1 0%;
    }
    .item-2 {
        width: 100px;
        flex: 2 1 auto;
    }
    .item-3 {
        flex: 1 1 200px;
    }

```

主轴上的父容器为：600

子容器总值为：  0%（0%就是宽度为0，故140px无用） + auto（既本身宽度，上面是100px） + 200px  =  300

所以剩余空间：600 - 300 = 300

缩放比分别为：2/5，2/5，1/5

所以剩余空间分配为：2/5 * 300=120 ，其它同理；

最终宽度为：0% + 120 = 120；auto + 120 = 220；200 + 60 = 260





### 对 requestAnimationframe 的理解

https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame

实现动画效果的方法比较多，Javascript 中可以通过定时器 setTimeout 来实现，CSS3 中可以使用 transition 和 animation 来实现，HTML5 中的 canvas 也可以实现。除此之外，HTML5 提供一个专门用于请求动画的 API，那就是 requestAnimationFrame，顾名思义就是**请求动画帧**。

使用requestAnimationFrame代替setTimeout，减少了重排的次数，极大提高了性能

MDN 对该方法的描述：

> window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

**优势：**

- CPU 节能
- 函数节流
- 减少 DOM 操作





### 自适应布局方式有那些

1、媒体查询：对不同屏大小设置不同一套样式
2、百分比：流式布局，
3、flex弹性布局
4、flexible.js (要理解原理)



### 样式穿透

```
1、
外层容器 >>> 组件 { 

}

2、
外层容器 /deep/ 组件 {

}

3、
外层容器 ::v-deep 组件 {

}

```



### 换主题样式方案：

1、通过vuex存储和控制全局样式

2、通过 `<link>` 标签动态加载不同的主题样式

3、通过scss定义变量



### position属性

| static   | 静态定位 | 默认值。没有定位，元素出现在正常的文档流中                   |
| -------- | -------- | ------------------------------------------------------------ |
| relative | 相对定位 | 生成相对定位的元素，相对于其正常位置进行定位。与 static 相似，元素原本的位置会被保留，区别是从文档的正常显示顺序里脱离出来 |
| absolute | 绝对定位 | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。常用于结合 relative 来使用 |
| fixed    | 固定定位 | 生成固定定位的元素，脱离文档流，相对于浏览器窗口进行定位     |
| sticky   | 粘性定位 | 该定位基于用户滚动的位置。它的行为就像 relative，而当页面滚动超出目标区域时，它的表现就像fixed，它会固定在目标位置。常用于吸顶 |
| inherit  | 继承定位 | 规定应该从父元素继承 position 属性的值。                     |



### CSS hack

什么是CSS hack？就是针对针对不同的浏览器或不同版本设置不同的CSS属性, 我们就称之为CSS Hack。其中以firefox，IE为主

CSS hack的写法大致归纳为3种：条件hack、属性级hack、选择符级hack。



### display 、visibility 、opacity

**display ：**

默认值为 `block` 或 `inline`，为none时是隐藏

- **事件监听**：无法进行 DOM 事件监听，不能点击
- **继承**：不可继承，由于元素从渲染树消失，造成子孙节点消失
- **transition**：不支持 
- **性能**：修改元素会造成文档回流，性能消耗较大



**visibility ：**

默认值为 `visible`可见；hidden为隐藏；inherit是从父元素继承 visibility 属性的值；collapse指当在表格元素中使用时，此值可删除一行或一列，但是它不会影响表格的布局。被行或列占据的空间会留给其他内容使用。如果此值被用在其他的元素上，会呈现为 "hidden"

- **事件监听**：无法进行 DOM 事件监听，不能点击

- **继承**：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏
- **transition**：支持 ，visibility 会立即显示，隐藏时会延时
- **性能**：修改元素只会造成本元素的重绘，性能消耗较少



**opacity：**

透明度属性，值是 0~1 ，0 的透明度为 100%，文档流还存在只是看不见

- **事件监听**：可以进行 DOM 事件监听，可以点击

- **继承**：会被子元素继承，且子元素并不能通过 opacity: 1 来取消隐藏；
- **transition**：支持
- **性能**：提升为合成层，是重建图层，不和动画属性一起则不会产生repaint（不脱离文档流，不会触发重绘），性能消耗较少





自适应正方形、等宽高比矩形

三列布局



