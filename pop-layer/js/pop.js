
function openNew() {
	//获取整个页面的高宽
	var sWidth = document.body.scrollWidth;
	var sHeight = document.body.scrollHeight;
    //获取可视区域的高宽
    var cHeight = document.documentElement.clientHeight;
    var cWidth = document.documentElement.clientWidth;
    //创建阴影层
    var oMask = document.createElement('div');
    oMask.id = "mask";
    oMask.style.height = sHeight + "px";
    //width在css中用100%实现
    // oMask.style.width = sWidth + "px"; 
    document.body.appendChild(oMask);
    //创建登入框
    var oLogin = document.createElement("div");
    oLogin.id = "login";
    oLogin.innerHTML = "<div class='loginCon'><div id='close'>点击关闭</div></div>";
    document.body.appendChild(oLogin);
    //获取登录框的宽高：
    var dHeight = oLogin.offsetHeight;
    var dWidth = oLogin.offsetWidth;
    //登录框在页面的位置
    oLogin.style.left = (cWidth - dWidth) / 2 + "px";
    oLogin.style.top = (cHeight - dHeight) / 2 + "px";
    //点击关闭
    var oClose = document.getElementById("close");
    oClose.onclick = oMask.onclick = function() {
    	document.body.removeChild(oMask);
    	document.body.removeChild(oLogin);
    };
}

window.onload = function() {
	var oBtn = document.getElementById("btnLogin");
	oBtn.onclick = function() {
		openNew();
		
	};

};