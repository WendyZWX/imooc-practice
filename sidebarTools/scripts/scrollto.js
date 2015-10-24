// 将滚动条移动到指定的位置
define(['jquery'], function($) {
	function ScrollTo(opts) {
		this.opts = $.extend({},ScrollTo.DEFAULTS,opts);
		this.$el = $('html,body');
	}
	// 将所有方法添加到构造函数原型中，可以使内存中只保留一份所有方法
	ScrollTo.prototype.move = function() {
		var opts = this.opts,
			dest = opts.dest;
		if($(window).scrollTop() != dest) {
			if(!this.$el.is(':animated')) {	
				this.$el.animate({
					scrollTop:dest
				},opts.speed);
			}
			
		} 
	};
	ScrollTo.prototype.go = function() {
		var dest = this.opts.dest;
		if($(window).scrollTop() != dest) {
			this.$el.scrollTop(dest);
		}
		
	}
	ScrollTo.DEFAULTS = {
		dest : 0,
		speed : 800
	};

	return {
		ScrollTo : ScrollTo
	};

});
