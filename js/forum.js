		//获取帖子统计接 口
$(document).ready(function() {
		
		
		//---------获取贴分类接口-------------一刷新就加载数据
		$.ajax({
			url: "http://192.168.11.122/tp3.2/index.php/home/bbs/statistics",
			data: {
				todayAll: "5", //今日帖子总数
				yesterdayAll: "0", //昨日帖子总数
				postAll: "5" //帖子总数
					//			        eliteAll: "2"     
			},
			type: 'GET',
			dataType: 'json',
			
			success: function(data) { //url里面写接口
				if(data.code == 1000) {
					console.log(data.data.eliteAll)
					renderNumber(data.data)
				}
			}
		});
		
		
		$.ajax({
			url: 'http://192.168.11.122/tp3.2/index.php/home/bbs/seeall',
		data: {
			page: 1,
		},
		dataType: 'json',
		type: "GET",
		success: function(result) { 
			if(result.code == 1000) {
				//alert('成功！')
						console.log(result.data[0])
						var data = result.data;
						creatDiv(data)
					}
				}
			})
		
		
		//-------获取贴分类接口----------		
		$.ajax({
			url: 'http://192.168.11.122/tp3.2/index.php/home/bbs/classify',
		dataType: 'json',
		type: "GET",
		success: function(result) { //url里面写接口
					if(result.code == 1000) {
						console.log(result.data)
						var data = result.data;
						renderClassify(data);
					}
		
				}
			})	
			
		function renderClassify(data) {
			$('.select_type').html('');
			var html = '<option value="0">选择标题分类</option>';
			$.each(data, function(index, item) {
				html += '<option value="' + item.id + '" data-key="' + item.key + '">' + item.type + '</option>'
			});
			$('.select_type').html(html);
		}
		
			
		
})
	//动态创建div，用字符串连接起来
	function creatDiv(list) {
			var html = '';
		for(var i = 0; i < list.length; i++) {
			var data = list[i];
			html +=
				'<div class="comment" data-id = ' + data.id + '>' +
				'<div class="liLeft">' +
				'<p class="head_portrait"><img src="' + data.head_img + '">' +
				'</p>' +
				'<p>' + data.nickname + '</p>' +
				'</div>' +
				'<div class="liRight">' +
				'	<p>' +
				'<a class="title" href="forum-content.html">' + data.theme + '<img src="../img/forumf/choice.png" class="isShow"></a>' +
				'</p>' +
		
				'<div class="commentTime">' +
				'<p class="nlinfo">' +
				'<span class="nltime">' + data.time + '</span>' +
				'<span class="nltype">' + data.type + '</span>' +
				'</p>' +
				'<p class="nlcomment">' +
				'<span class="nlcomment_btn">' + data.look + '</span>' +
				'<span class="nlsee_btn">' + data.reply + '</span>' +
				'<span class="dle">删除</span>' +
				'</p>' +
				'</div>' +
				'</div>' +
				'</div>'
		}

		$('.note_list').html(html);
	
	}
	
	
	function renderNumber(data) {//分贴
		$('.today_number').html('今日：' + data.todayAll)
		$('.yesterday_number').html('昨日：' + data.yesterdayAll)
		$('.all_number').html('帖子：' + data.postAll)
		
	}
		//$(function() {
		
		var isNullType = function() {
			return $('.select_type option:selected').val() == 0 ? true : false;
		}
		var isNullTitle = function() {
			/* 去掉头尾的空格 长度还是为零 则不给发送*/
			return $.trim($commentTitle.val()) == 0;
		}
		
		var $submitBnt = $('.submit'),
		$commentTitle = $('.ntitle');
		
		$submitBnt.click(function() { 
			//------给提交按钮点击事件-----
		//if($('.login').data('uid') == undefined) {      判断是否有登录
		//window.location.href = './loginff.html';
		//} else {
		
		if(isNullType()) {
			confirm("类型不能为空，请选择类型！");
			return;
		}
		
		if(isNullTitle()) {
			confirm("标题不能为空，请输入标题，请不要超过25字！");
			return;
		} else {
			if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test($commentTitle.val())) {
		
			console.log('仅支持中英文、数字 _');
			}
		}

		/* 插件的 获取 textarea 的文本内容 name:description  ver:4.4.4*/
		if(CKEDITOR.instances.description.getData() == "") {
		confirm("内容不能为空！");
			return false;
		} else {
		//获取 处理数据 返回文本内容
		var txtValue = CKEDITOR.instances.description.getData();
		txtValue = txtValue.replace("<br />", "");
		txtValue = txtValue.replace("<br>", "");
		txtValue = txtValue.replace("<p>", "");
		txtValue = txtValue.replace("</p>", "");

		CKEDITOR.instances.description.setData("");
		
		}
		
		$.ajax({
			url: 'http://192.168.11.122/tp3.2/index.php/home/bbs/classify',
		data: {
			theme: $('.ntitle').val(),
			content: CKEDITOR.instances.description.getData(),
			type: $('.select_type option:selected').val() // 动态获取 暂时模拟
		},
		type: 'GET',
		success: function(result) { 
		
			}
		});
		
	 //}
		renderCommit();
		
		//------获取帖子统计接口-----
		$.ajax({
			url: "http://192.168.11.122/tp3.2/index.php/home/bbs/statistics",
		data: {
			todayAll: "5", //今日帖子总数
			yesterdayAll: "0", //昨日帖子总数
			postAll: "5" //帖子总数
				//			        eliteAll: "2"     
		},
		type: 'GET',
		dataType: 'json',
		success: function(data) { //url里面写接口
			if(data.code == 1000) {
				//alert('成功！');
				console.log(data.data.eliteAll)
				renderNumber(data.data)
			}
			//				console.log(data)
				}
			});
		
		})


		$(document).on('keydown', function(ev) { //键盘事件
		if(ev.keyCode == 13) {
			$submitBnt.trigger('click'); //触发器，触发某个元素的某个事件
				return false;
			}
		})
		
		
		//获取数据
		function getDate() {
			return {
				// 这个登录后才可以获取 
				id: "1",
				head_img: "http://192.168.11.122/tp3.2/Public/Hplus/img/a1.jpg", //用户头像
				theme: $('.ntitle').val(), //贴标题
				time: getTime(new Date() * 1), //发帖时间
				nickname: "fenylin", //用户昵称
				type: $('option:selected').html(), //贴类型
				look: '0',
				reply: '0'
			}
		};
		
		function renderCommit() {
			var data = getDate();
			console.log(data)
		
			var html = '<div class="comment" data-id="' + data.id + '">' +
			'<div class="liLeft">' +
			'<p class="head_portrait"><img src="' + data.head_img + '">' +
			'</p>' +
			'<p>' + data.nickname + '</p>' +
			'</div>' +
			'<div class="liRight">' +
			'	<p>' +
			'<a class="title" href="forum-content.html">' + data.theme + '</a>' +
			'</p>' +
			
			'<div class="commentTime">' +
			'<p class="nlinfo">' +
			'<span class="nltime">' + data.time + '</span>' +
			'<span class="nltype">' + data.type + '</span>' +
			'</p>' +
			'<p class="nlcomment">' +
			'<span class="nlcomment_btn">' + data.look + '</span>' +
			'<span class="nlsee_btn">' + data.reply + '</span>' +
			'<span class="dle">删除</span>' +
			'</p>' +
			'</div>' +
			'</div>' +
			'</div>'
			// 拼接 对应的html
			$('.note_list').append(html);
		}
		
		
		
		//	创建时间戳函数
		function getTime(t) {
			var time = new Date(t);
			var Y = oT(time.getFullYear());
			var Mon = oT(time.getMonth() + 1);
			var Data = oT(time.getDate());
			var H = oT(time.getHours());
			var Min = oT(time.getMinutes());
			var Sec = oT(time.getSeconds());
			//2017-04-5 16:37:01;	
		var riqi = Y + "-" + Mon + "-" + Data + ' ' + H + ':' + Min + ':' + Sec;
			return riqi;
		}
		
		function oT(n) {
			return n = n < 10 ? '0' + n : '' + n;
		}
		
		
		//---------获取主帖评论列表接口---------
		$('.note_list').delegate('.comment', 'click', function() {
		
		var $this = $(this);
		
		var pid = $this.data('id');
		
		window.name = pid;
		
		//console.log(window.name)
		
		})
		
		
		
		//	----------关键字搜索接口-----------
		$('.search_btn').on('click', function() {
		var inp = $('.search_input').val()
		if(inp == '') {
			return
		}
		
		$.ajax({
			url: 'http://192.168.11.122/tp3.2/index.php/home/bbs/seeall',
			data: {
				page: 1,
				elite:1,
				row: 10,
				keyword: inp
			},
			dataType: 'json',
			type: "POST",
			success: function(result) { //url里面写接口
				if(result.code == 1000) {
					//alert('成功！')
							console.log(result.data[0])
							var data = result.data;
							creatDiv(data)
						}
			
					}
			})
		
		})
		
		
		
		
		
		//绑定页数事件
		//$('.page').delegate('A', 'click', function(){
		//	var $this = $(this);
		//	var pageNumber = $this.html();
		//
		//	$.ajax({
		//	url: 'http://192.168.11.122/tp3.2/index.php/home/bbs/seeall',
		//	data: {
		//		page: pageNumber,
		//		elite:'1',
		//		row: 10,
		//		keyword: 555
		//	},
		//	dataType: 'json',
		//	type: "POST",
		//	success: function(result) {
		//		if(result.code == 1000) {
		//			//alert('成功！')
		//				}
		//				console.log(result.data[0].look)
		//
		//				var data = result.data;
		//
		//				creatDiv(data)
		//			}
		//	})
        //
		//})
		
		//})
		
	$(function() {
			//---------产品分类 技术支持切换------------
		$(".technical_support .download li").click(function() {
		var index = $(this).index();
		$('.technical_support dd').eq(index).show().siblings().hide();
		})

		//------------帖子区域切换------------


		$(".note_recommend .recommend_left li").click(function() {
		$(this).addClass("show").siblings().removeClass("show")
		var index = $(this).index(); //获取li的当前下标
		$('.note_list').eq(index).show().siblings().hide();
		})



//		回到顶部
		var top=document.getElementsByClassName("return-top")[0];
		window.onscroll=function(){

			if(document.body.scrollTop>900){
				top.style.display="block";
				}
			}
			document.ondblclick=function(){
				window.scrollTo(0,0);
				top.style.display="none"
			}

		//--------------论坛轮播图效果----------------
		
	})