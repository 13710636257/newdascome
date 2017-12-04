/**
 * Created by a on 2017/5/17.
 */

$(function() {
	//页面跳转
	if(window.name) {
		$('.login').attr('data-uid', window.name);
	 };

	//------------帖子区域切换------------
	$(".note_content .note_title li").click(function() {
		$(this).addClass("show").siblings().removeClass("show")
		var index = $(this).index(); //获取li的当前下标
		$('.note_list').eq(index).show().siblings().hide();
	})

	//--------------论坛轮播图效果----------------
	var i = 0
	var timer = null;

	function lunbo() {
		i++;
		if(i == 2) {
			i = 0;
		}
		$('.newpic li').eq(i).fadeIn('slow').siblings().fadeOut('fast')
		$('.small_yuan a').eq(i).css('background', '#0096d5').siblings().css('background', 'plum')
	}
	timer = setInterval(lunbo, 2000)
	
	//点击图片轮播
	$('.small_yuan a').on('click', function() {
		var index = $(this).index(); //获取小圆点的下标用变量存储起来
		$('.small_yuan a').eq(index).css('background', '#0096d5').siblings().css('background', 'plum')
		$('.newpic li').eq(index).fadeIn('slow').siblings().fadeOut('fast');
	})
	
	$('.content-image').bind({
		mouseenter:function(){
			clearInterval(timer);
		},
		mouseleave:function(){
			timer = setInterval(lunbo, 2000)
		}
	})
		
		
		
		


})















