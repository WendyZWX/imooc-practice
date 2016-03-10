#### 来自：[慕课网-进击Node.js基础（一）](http://www.imooc.com/learn/348)

**爬虫演示结果**: 

![img](https://github.com/guihailiuli/imooc-practice/blob/master/the-basis-of-Node.js-first-stage/imooc-chapter-crawler-by-nodejs/imooc-chapter-crawler.PNG)


**comment.js中需要注意的几点：**
第一次运行时返回了302状态码，经过别人提示后，发现下面这3点需要多多注意

1. headers中再加引号时要认真小心，保证数据是JSON格式的
2. path路径应该是/course/documment,
3. 应该是mid值，而不是cid，这个和上面的都需要自己先评论后按照视频上的方法来确定具体数据

 ![img](http://img.mukewang.com/56e1314400018e6105000152.jpg)

