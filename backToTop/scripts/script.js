window.onload = function () {
	var obtn = document.getElementById('btn');
	var clientHeight = document.documentElement.clientHeight;  //页面可视区高度
	var timer = null;
	var isScroll = true;

	if(document.documentElement.scrollTop || document.body.scrollTop == 0) {
		obtn.style.display = "none";

	}
	//用户滚动滚轮触发
	window.onscroll = function() {
		var osTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(osTop >= clientHeight) {
			obtn.style.display = "block";
		}else {
			obtn.style.display = "none";
		}
		if(!isScroll) {
			clearInterval(timer);
		}
		isScroll = false;
	}
	obtn.onclick = function() {
		timer = setInterval(function() {
			var osTop = document.documentElement.scrollTop || document.body.scrollTop;
			var scrollSpeed = osTop / 4;
			document.documentElement.scrollTop -= scrollSpeed;
			document.body.scrollTop -= scrollSpeed;
			isScroll = true;
			
		}, 30);
	}
}