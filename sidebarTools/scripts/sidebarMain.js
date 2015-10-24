requirejs.config({
	// 设置别名
	paths: {  
		jquery: "jquery-1.11.2"
	}
});
// 引入模块，给回调函数传参数
requirejs(['jquery','backtop'], function($,backtop) {

	// new backtop.BackTop($('#backTop'),{
	// 	mode: 'go',
	// 	pos: 510,
	// 	speed: 2000
	// });

	//jquery插件：
	$('#backTop').backtop({
		mode: 'move'
	});
	


	// var scroll = new scrollto.ScrollTo({
	// 	dest: 0,
	// 	speed: 800

	// });

	// $('#backTop').on('click', $.proxy(scroll.move,scroll));

	// 监听window对象的滚动事件，
	// $(window).on('scroll', function() {
	// 	checkPosition($(window).height());
	// });
	// checkPosition($(window).height());

	// function move() {
	// 	$('html,body').animate({
	// 		scrollTop: 0
	// 	}, 800);
	// }
	// function go() {
	// 	$('html,body').scrollTop(0);
	// }

	// function checkPosition(pos) {
	// 	if($(window).scrollTop() > pos) {
	// 		$('#backTop').fadeIn();
	// 	}else {
	// 		$('#backTop').fadeOut();
	// 	}
	// }
	

});