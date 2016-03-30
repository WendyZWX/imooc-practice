;(function($) {  //加;为了防止在此之前引入的脚本未完美封闭，拼接报错。
	var Carousel = function(poster) {
		var self = this;
		//保存单个旋转木马对象
		this.poster = poster;
		//设置广告指针的区域
		this.posterItemMain = poster.find("ul.poster-list");
		//保存切换按钮
		this.prevBtn = poster.find("div.poster-prev-btn");
		this.nextBtn = poster.find("div.poster-next-btn");
		//幻灯片的数量
		this.posterItems = poster.find("li.poster-item");
		//如果数量是偶数：
		if(this.posterItems.size() % 2 == 0) {
			this.posterItemMain.append(this.posterItems.eq(0).clone());
			this.posterItems = this.posterItemMain.children();
		}
		//第一个幻灯片
		this.posterFirstItem = this.posterItems.first();
		this.posterLastItem = this.posterItems.last();
		//定义旋转的标示
		this.rotateFlag = true; 

		//配置默认参数
		this.setting = {
			"width" : 1000,               //幻灯片的宽度
                        "height" : 270,               //幻灯片的高度
                        "posterWidth" : 640,          //幻灯片第一帧的宽度
                        "posterHeight" : 270,         //幻灯片第一帧的高度
                        "verticalAlign" : "middle",   
                        "scale" : 0.8,               //记录显示的比例关系90%
                        "speed" : 1000,
                        "autoPlay" : false,
                        "delay" : 1000        //自动播放的间隔时间
		};
		$.extend(this.setting, this.getSetting());

		//设置配置参数值：
		this.setSettingValue();
		this.setPosterPos();
		// console.log(this.setting);

		//左右旋转按钮
		this.nextBtn.click(function() {
			if(self.rotateFlag) {
				self.rotateFlag = false;  //防止多次快速点击
				self.carouseRotate("left");   //往左旋转
			}
		});
		this.prevBtn.click(function() {
			if(self.rotateFlag) {
				self.rotateFlag = false;
				self.carouseRotate("right");   //往右旋转
			}
		});
		//是否开启自动播放
		if(this.setting.autoPlay) {
			this.autoPlay();
			this.poster.hover(function() {
				              //当鼠标移入时暂停自动播放
				              window.clearInterval(self.timer);
			                 },function() {
			                 //移出后继续自动播放
			                 self.autoPlay();
			                 });
		}

	};
	Carousel.prototype = {
		//自动播放
		autoPlay : function() {
			var self = this;
			this.timer = window.setInterval(function() {
				self.nextBtn.click();
			}, this.setting.delay);
		},

		//旋转
		carouseRotate : function(dir) {   //dir代表方向
			//一个代码片段里this有可能代表不同的对象,而编码者希望_this_代表最初的对象
            var _this_ = this;    
            var zIndexArr = [];   //zIndex的数组
            if(dir === "left") {
            	this.posterItems.each(function() {
            		//self指向当前帧
            		var self = $(this),
            		    //当前帧是第一帧则使用最后的帧来代替否则用上一帧代替
            		    //get(0)返回原生的dom对象，如果不存在就是null,用来做判断用，
            		    //如果不打回原型，JQ始终是个对象，所以就是true
            		    //self.prev()是JQ对象,,prev().get(0)原生DOM对象
            		    prev = self.prev().get(0) ? self.prev() : _this_.posterLastItem,
            		    width = prev.width(),
            		    height = prev.height(),
            		    opacity = prev.css("opacity"),
            		    zIndex = prev.css("zIndex"),
            		    left = prev.css("left"),
            		    top = prev.css("top");
            		zIndexArr.push(zIndex);
            		self.animate({
            			width:width,
						height:height,
						// zIndex:zIndex,
						opacity:opacity,
						left:left,
						top:top
            		}, _this_.setting.speed, function() {
            			_this_.rotateFlag = true;
            		});

            	});
            	//zIndex需要单独保存再设置，防止循环时候设置再取的时候值永远是最后一个的zindex
            	this.posterItems.each(function (i) {
            		$(this).css("zIndex", zIndexArr[i]);
            	});

            }else if(dir === "right"){
            	this.posterItems.each(function() {
            		//self指向当前帧
            		var self = $(this),
            		    next = self.next().get(0) ? self.next() : _this_.posterFirstItem,
            		    width = next.width(),
            		    height = next.height(),
            		    opacity = next.css("opacity"),
            		    zIndex = next.css("zIndex"),
            		    left = next.css("left"),
            		    top = next.css("top");
            		    zIndexArr.push(zIndex);
            		    self.animate({
            			   width:width,
				   height:height,
				   // zIndex:zIndex,
				   opacity:opacity,
				   left:left,
				   top:top
            		    }, _this_.setting.speed, function() {
            		    	_this_.rotateFlag = true;
            		    });
            	});
            	this.posterItems.each(function (i) {
            		$(this).css("zIndex", zIndexArr[i]);
            	});
            }
		},

		//设置剩余帧的位置关系
		setPosterPos : function() {
			var self = this;
			var sliceItems = this.posterItems.slice(1),
			    sliceSize = sliceItems.size() / 2,
			    //右边的剩余帧数：
			    rightSlice = sliceItems.slice(0, sliceSize);
			    //层级数
			    level = Math.floor(this.posterItems.size() / 2);
			    //左边的剩余帧数
			    leftSlice = sliceItems.slice(sliceSize);
			    // alert(leftSlice.size());
           //设置右边帧的位置关系和宽度高度top
			var rightWidth = this.setting.posterWidth;
			var rightHeight = this.setting.posterHeight;
			//右边各个图片间的间隙:((总幻灯片宽度-第一个图片宽度)/2)总层级数
			var gap = ((this.setting.width - this.setting.posterWidth) / 2 ) / level;
			// alert(gap);
			//设置右边的帧的位置关系，
			//第一帧的left值
			var firstPosterLeft = (this.setting.width - this.setting.posterWidth) / 2;
			//固定变化的left值：firstPosterLeft + rightWidth
            var fixOffsetLeft = firstPosterLeft + rightWidth;

            //设置左边位置关系
			rightSlice.each(function(i) {
				level--;    //层级递减
				rightWidth = rightWidth * self.setting.scale;
				rightHeight = rightHeight * self.setting.scale;
				var j = i;  //用于逐步增加间隙值

                //右边各个帧之间的层级，宽高，透明度，帧之间距离
				$(this).css({
					zIndex : level,
					width : rightWidth,
					height : rightHeight,
					opacity : 1/(++j),
					//第一帧的left值+第一帧自身的宽度+间隙gap值 - 第二帧的宽度
					left : fixOffsetLeft + (++i)*gap - rightWidth,
					// top : (幻灯片的高度 - 自身的高度)/2
					// top : (self.setting.height - rightHeight)/2
					top : self.setVerticalAlign(rightHeight)
				});
				
			});
			//lw的宽高为右边最后一帧的宽高
			var leftWidth = rightSlice.last().width(),
			    leftHeight = rightSlice.last().height();
			    //opacity的循环关系
			    opacityLoop = Math.floor(this.posterItems.size() / 2);

			leftSlice.each(function(i) {

				$(this).css({
					zIndex : i,
					width : leftWidth,
					height : leftHeight,
					//opacity由小变大
					opacity : 1 / opacityLoop,
					//第一帧的left值+第一帧自身的宽度+间隙gap值 - 第二帧的宽度
					left : i*gap,
					// top : (幻灯片的高度 - 自身的高度)/2
					// top : (self.setting.height - leftHeight)/2
					top : self.setVerticalAlign(leftHeight)
				});
				leftWidth = leftWidth / self.setting.scale;
				leftHeight = leftHeight / self.setting.scale;
				opacityLoop--;
			});
		},
		//设置垂直对齐方式
		setVerticalAlign : function(height) {
			var verticalType = this.setting.verticalAlign;
			var top = 0;
			if(verticalType === "middle") {
				top = (this.setting.height - height) / 2;
			}else if(verticalType === "top") {
				top = 0;
			}else if(verticalType === "bottom") {
				top = this.setting.height - height -15;
			}else {
				//配置错误情况,默认居中
				top = (this.setting.height - height) / 2;
			}

			return top;
		},

		//设置配置参数去控制基本的宽高:
		setSettingValue : function() {
			this.poster.css({
				width : this.setting.width,
				height : this.setting.height

			});
			this.posterItemMain.css({
				width : this.setting.width,
				height : this.setting.height
			});
			//计算上下按钮宽度高度值
			var btnWidth = (this.setting.width - this.setting.posterWidth) / 2;
			this.nextBtn.css({
				width : btnWidth,
				height : this.setting.height,
				//向上取整，避免小数值
				zIndex : Math.ceil(this.posterItems.size() / 2)
			});
			this.prevBtn.css({
				width : btnWidth,
				height : this.setting.height,
				zIndex : Math.ceil(this.posterItems.size() / 2)
			});
             //计算第一个幻灯片的宽度
			this.posterFirstItem.css({
				width: this.setting.posterWidth,
				height: this.setting.posterHeight,
				left : btnWidth,
				//第一帧的层级向下取值，比按钮的低
				zIndex : Math.floor(this.posterItems.size() / 2)

			});
		},


		//获取人工配置参数
		getSetting : function() {
			var setting = this.poster.attr("data-setting");
			//如果有人工配置
			if(setting && setting !== "") {
				//转换成JSON对象
				return $.parseJSON(setting);
			}else {
				return {};
			}
		}

	};
	//初始化页面里传递进来的所有的集合
	//Carousel被定义为类，init方法是类的静态方法
	Carousel.init = function(posters) {
		var _this_ = this;
		posters.each(function() {
			//遍历posters中的每一个，this相当于Carousel
            new _this_($(this));
		});
	};
  
    //全局注册一下  
    //这样写是将自执行函数内的Carousel函数设置成全局对象window的属性，
    //相当于window.Carousel = Carousel，即把Carousel函数设置成全局函数
    window['Carousel'] = Carousel;
})(jQuery);

//如果传入的jQuery写成jquery的话，控制台会报错：undefined

