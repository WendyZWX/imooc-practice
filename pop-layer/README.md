
#### 来自：[慕课网-弹出层效果](http://www.imooc.com/learn/58)

#### Demo: [Click here](http://huanyouchen.github.io/demo/imooc/pop-layer/popLayer.html)

学习本课程遇到的问题：

- 课程中老师提供的弹出层页面代码中有个问题：

 在设置遮罩层可视区域的宽度时：
```javascript
oMask.style.height = sHeight + "px";
oMask.style.width = sWidth + "px"; 
```
直接用的可视区域的宽度，这样如果我在较小的浏览器的可视区域状态下点击登录，此时弹出登录框且页面上有遮罩层，但是当我再把可视区域宽度拉大后，页面上的遮罩层就不能够完全覆盖住整个可视区域了.
解决的办法是，在设置宽度时，在css中直接用: ```width:100%```,即可。

- text-indent: -999em的理解

把该元素内的文字移到屏幕外面去，这是一个平稳退化。既保证中间的文字存在
又能在正常浏览时保证这些文字不出来。虽然我们不需要眼睛看见那些文字，但是希望搜索引擎可以搜到或盲人用的软件能知道，就可以用这个把文字“隐藏”的属性。
也有用font-size:0px做出类似效果的实现。但font-size即使为0，字体在个别浏览器上仍然只会变成极小的黑点而不能彻底消失，所以通常用font-size都和text-indent联用。
