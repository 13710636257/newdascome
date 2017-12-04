$(function(){
	
$(".user-left ul li").click(function() {
		$(this).addClass("bgd-color").siblings().removeClass("bgd-color")
		var index = $(this).index(); //获取li的当前下标
		$('.user-right').eq(index).show().siblings('.user-right').hide();
	});


//点击修改设置弹框出现与隐藏
	$(".close-img").on('click',function(){
		$(this).parents(".modal-container").hide();
	});

	$('.btn-acnt-pwd').click(function(){
		$(".modify-password").show();
	});
	
	
	$('.btn-mail').click(function(){
		$(".modal-password").show();
	});


	//获取验证码倒计时
	var countdown=60;
	$('.get-code-btn').on('click',function(){
			settime(this)
	});
	
	function settime(obj){
		if(countdown==0){
			obj.removeAttribute('disabled');
			obj.value='获取验证码';
			countdown=60;
			return;
		}else{
			obj.setAttribute('disabled',true);
			obj.value="重新发送(" + countdown + ")";
			countdown--;
		}
		setTimeout(function(){
			settime(obj)
		},1000)
		
	}
	
	
//	修改头像获取图片
	
	
	
});







