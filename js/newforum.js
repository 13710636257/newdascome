/**
 * Created by a on 2017/5/17.
 */

$(function() {

	//----------常见问题切换------------

	$(".information_left .infonav li").click(function() {
		$(this).addClass("active").siblings().removeClass("active")
		var index = $(this).index(); //获取li的当前下标
		$('.information_left dd').eq(index).show().siblings().hide();
	})
	//---------产品分类 技术支持切换------------
	$(".technical_support .download li").click(function() {
		var index = $(this).index();
		$('.technical_support dd').eq(index).show().siblings().hide();
	})

	//------------帖子区域切换------------

	$(".note_content .note_title li").click(function() {
		$(this).addClass("show").siblings().removeClass("show")
		var index = $(this).index(); //获取li的当前下标
		$('.note_list').eq(index).show().siblings().hide();
	})

	$(".note_recommend .recommend_left li").click(function() {
		$(this).addClass("show").siblings().removeClass("show")
		var index = $(this).index(); //获取li的当前下标
		$('.note_list').eq(index).show().siblings().hide();
	})

	
//--------------论坛轮播图效果----------------

	var i = 0
	var time = null;

	function lunbo() {
		i++;
		if(i == 5) {
			i = 0;
		}
		$('.newpic li').eq(i).fadeIn('slow').siblings().fadeOut('fast')
		$('.small_yuan a').eq(i).css('background', '#0096d5').siblings().css('background', 'plum')
	}
	timer = setInterval(lunbo, 2000)
		//点击图片轮播
	$('.small_yuan a').on('click', function() {
		timer = clearInterval; //清楚定时器
		var index = $(this).index(); //获取小圆点的下标用变量存储起来
		$('.newpic li').eq(index).fadeIn('slow').siblings().fastadeOut('fast');
	})



	//	---------帖子区精字的出现-------------
	var $nlsee = $(".nlsee_btn");
	function testNum() {
		$nlsee.each(function(i, ele) {
			var num = Number($(ele).html())
			if(num > 200) {
				$(ele).parents(".liRight").find(".title").append('<img src="../img/forumf/choice.png">')
			}
		})
	}
	testNum();

})