$(function(){
	var pid = window.name
	console.log(pid);
	function loadRender(){
		$.ajax({
			type:'POST',
			url:'http://192.168.11.122/tp3.2/index.php/home/bbs/commentList',
			data:{
				pid:pid
			},
			dataType:'json',
			
			success:function(data){
				console.log(data)
				
				
			}
		})
	}
	
	loadRender()
	
	
	$('.submit').click(function(){  //给提交评论按钮点击事件
		var val = $('#replycontent').val();//评论内容
		if(!val.trim()){
			alert('亲，请留下点东西！');
			return;
		}
		$.ajax({
			type:'POST',
			url:'http://192.168.11.122/tp3.2/index.php/home/bbs/comment',
			data:{
				pid:pid,//被评论的主题ID
				content:$('#replycontent').val()

			},
			dataType:'json',

			success:function(result){

			console.log(result)
				var data=result.data;
				creatpostDiv(data);

			}

		});

	})


	
   //后台给的数据

	 
	 
	 
	 

	 function creatpostDiv(data){
	 	var postStarter='';
	 	postStarter+='<div class="note_cleft" data-pid='+window.name+'>'+
					'	<p class="note_ctop">'+data.nickname+'</p>'+
						'<div class="personal_mesaage">'+
							'<img src="'+data.head_img+'" alt="">'+
							'<p>级别：'+'<span>'+data.grade+'</span>'+'</p>'+
							
							'<p>精华：'+'<span>'+data.essence+'</span>'+'</p>'+
							'<p>发帖：'+'<span>'+data.post+'</span>'+'</p>'+
							'<p>威望：'+'<span>'+data.exps+'</span>'+'</p>'+
						'</div>'+
					'</div>'+
					'<div class="note_cright">'+
						'<div class="title_tright">'+
							'<span>'+data.theme+'</span>'+
							'<img src="../img/forumDetail/recommend_3.gif" />'+
						'</div>'+
						'<div>'+
							'<div class="note_crtop">'+
								'<p class="publish_time">'+data.time+'</span>'+'</p>'+
								'<div class="title_tleft">'+
									'<span>查看：</span>'+
									'<span class="note_data seecount">'+data.look+'</span>'+
									'<span class="reversion">回复：</span>'+
									'<span class="note_data">'+data.reply+'</span>'+
								'</div>'+
							'</div>'+
							'<div class="note_crcontent">'+data.content+'</div>'+
							'<div class="note_setconfig pnote_set">'+
								'<span class="thumbs_up">'+data.like+'</span>'+
								'<span class="store">收藏</span>'+
								
							'</div>'+
						'</div>'+
					'</div>'
					
		$('.note_content').html(postStarter)		
	 }
	 
	 //creatpostDiv(data);
	 
	 
	 
	var pageDiv = $('.ppage');
	 window.location.hash='page=1';
	 
	 $('.submit').click(function(){  //点击回复事件  进行ajax请求
			$.ajax({
				url:'http://192.168.11.122/tp3.2/index.php/home/bbs/comment'+$('#replycontent').val(),
				success:function(data){
					var val = $('#replycontent').val();
					var json = eval('('+data+')');			
//					var d = getTime(json.time);
					//window.location.hash = 'page=1';
					var box = creatDiv(list);
					getPage();
				    $('.comment-list').prepend(box);
				    $('#replycontent').val('');
				}
			});
		})
	 
	 
	 
	 
  	var list  =data.list;
	function creatDiv(list){
		var commentlist = '';
		for(var  i= 0; i<list.length;i++){
		 commentlist +=
						'<div class="pperson clearfix">'+
						'<div class="note_cleft">'+
							'<p class="note_top">'+list[i].nickname+'</p>'+
							
							'<div class="personal_mesaage">'+
							'<img src="'+list[i].head_img+'" alt="">'+
							'<p>级别：'+'<span>'+list[i].grade+'</span>'+'</p>'+
							
							'<p>精华：'+'<span>'+list[i].essence+'</span>'+'</p>'+
							'<p>发帖：'+'<span>'+list[i].post+'</span>'+'</p>'+
							'<p>威望：'+'<span>'+list[i].exps+'</span>'+'</p>'+
							'</div>'+
							'</div>'+
						'<div class="comment_right">'+
							'<div>'+
								'<div class="note_rtop">'+
									'<p class="publish_time">回复于 '+
									'<span>'+list[i].time+'</span>'+
									'&nbsp;&nbsp;&nbsp;<span>只看该作者</span>'+
									'</p>'+
								'</div>'+
								'<div class="note_content">'+list[i].content+'</div>'+
								'<div class="note_setconfig">'+
									'<span class="thumbs_up" style="color: rgb(153, 153, 153);">点赞</span>'+
									'<span><img style="width: 20px;"  src="../img/forumDetail/cai.png"/>踩</span> &nbsp;&nbsp;'+
								'	<span>举报</span>'+
									'<span class="setrestore">回复</span>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
		 }
	
		$('.comment-list').html(commentlist);
	
	}
	creatDiv(list);
	
	
	
	//渲染页面内容
	setHtml(1);
	function setHtml(nub){
		$.ajax({
			type:'POST',
			url:'http://192.168.11.122/tp3.2/index.php/home/bbs/commentList',
//			data:{
//				pid:pid
//			},
			success:function(data){
				var arr = eval('('+data+')');
				$('.comment-list').html('');
				for(var i=0;i<arr.length;i++){
					var json = arr[i];
					
					var div = creatDiv(list);
					$('.comment-list').append(div);
				}
			}
		})
	}
	
	getPage();
	//获取页数
	function getPage(){
		$.ajax({
			url:'http://192.168.11.122/tp3.2/index.php/home/bbs/seeall',
			success:function(data){
				var page = eval('('+data+')').row;
				pageDiv.html('');
				for(var i=0;i<page;i++){
					var oA=$('<a href="javascript:;">1</a>')
					oA.html((1+i));
					if(i==0){
						oA.addClass('active');
					}
					oA.on('click',function(){
						window.location.hash='page='+this.innerHTML;
						setHtml(this.innerHTML)
						steColor(this.innerHTML-1)
					})
					
					pageDiv.append(oA);
				}
				
				
			}
		})
	}
	
//	触发事件  onhashchange hash值一改变就会触发的事件
	window.onhashchange=function(){
		var num=window.location.hash.split('=')[1];
		num=parseInt(num);
		setHtml(num)
	}
	
	
	function setColor(num){
		var oAs=pageDiv.find('a');
		for(var i=0;i<oAs.length;i++){
			oAs[i].className='';
		}
		oAs[num].className='active';
	}
	
	
	
	
})
