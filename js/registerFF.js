$(function() {
	//用户名验证
	var username = $(".username");
	var NickTips = username.next();
	//用户名获得焦点时清除不通过的样式
	username.focus(function() { //获取焦点
		getFocus(username, NickTips, "用户名仅支持中英文、数字");
	});
	//用户名失去焦点时设置不通过的样式
	username.blur(function() {
		var _this = $(this);
		//判断是否为空
		if(_this.val().length == 0) {
			flag = false;
			getBlur(username, NickTips, "请输入用户名");
//		} else if(_this.val().length > 6 && _this.val().length < 20) {
//			flag = false;
//			getBlur(username, NickTips, "6-20位字符，不能使用空格");
		} else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(_this.val())) { //判断昵称的格式
			flag = false;
			getBlur(username, NickTips, "用户名仅支持中英文、数字");
		} else {

		}
	});
	
//-----手机号验证-------------
	regPhone();
	function regPhone() {
		var flag = false;
		var repPhone = $(".phone"); //获取类名
		var repTips = repPhone.next(); //获取span标签
		repPhone.focus(function() { //获取焦点
			getFocus(repPhone, repTips);
		});

		repPhone.blur(function() { //失去焦点
			var _this = $(this);
			if(_this.val().length == 0) {
				flag = false;
				getBlur(_this, repTips, "请输入手机号码");
			} else if(!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(_this.val())){
				flag = false;
				getBlur(_this, repTips, "请输入有效的11位手机号码");
			} else {

			}
		});

	}

	//密码验证
	var repPwd = $(".password");
	var pwdTips = repPwd.next();
	repPwd.focus(function() {
		getFocus(repPwd, pwdTips, '支持大小写字母、数字');
	});
	repPwd.blur(function() {
		var _this = $(this);
		//判断密码是否为空
		if(_this.val().length == 0) {
			flag = false;
			getBlur(repPwd, pwdTips, "请输入密码");
		} else if(_this.val().length < 6 || _this.val().length > 16) { //判断密码长度
			flag = false;
			getBlur(repPwd, pwdTips, "密码只能在6~16个字符之间");
		} else if(!/^[A-Za-z0-9]+$/.test(_this.val())) { //判断密码格式
			flag = false;
			getBlur(repPwd, pwdTips, "仅支持大小写字母、数字，请重新输入");
		} else { //通过验证
			pwdTips.html("<img src='../img/login/check_right.gif' alt='验证通过'/>");
			flag = true;
		}
		//重新修改时要判断密码和确认密码是否相等

		if(repCheck.val() != repPwd.val()) {
			flag = false;
			getBlur(repCheck, checkTips, '两次输入的密码不一致，请重新输入...');

		} else {

			if(repCheck.val().length != 0) {
				flag = true;
				checkTips.html("<img src='../img/login/check_right.gif' alt='验证通过'/>");
			} else {
				flag = false;
				getBlur(repCheck, checkTips, "请输入密码");

			}
		}

	});

		//确认密码
		var repCheck = $("#re_pcheck");
		var checkTips = repCheck.next();
		repCheck.focus(function() {
			getFocus(repCheck, checkTips);
		});
		repCheck.blur(function() {
			var _this = $(this);
			//判断确认密码是否为空
			if(_this.val().length == 0) {
				flag = false;
				getBlur(repCheck, checkTips, "请重新输入密码");
			} else if(repCheck.val() != repPwd.val()) { //判断密码是否一致
				flag = false;
				getBlur(repCheck, checkTips, '两次输入的密码不一致，请重新输入...');
			} else { //通过验证
				checkTips.html("<img src='../img/login/check_right.gif' alt='验证通过'/>");
				flag = true;
			}
		});

	//邮箱注册

	regEmail();
	function regEmail() {
		//邮箱
		var reEmail = $(".email");
		var reEmailTips = reEmail.next();
		//验证标记
		var flag = false;
		//邮箱获得焦点时
		reEmail.focus(function() {
			getFocus(reEmail, reEmailTips)
		});
		//邮箱失去焦点时
		reEmail.blur(function() {
			var _this = $(this);
			//判断邮箱是否为空
			if(_this.val().length == 0) {
				flag = false;
				getBlur(reEmail, reEmailTips, '请输入邮箱');
			} else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(_this.val())) { //判断邮箱格式是否正确
				flag = false;
				getBlur(reEmail, reEmailTips, '邮箱格式不对，请重新输入');
			} else {
				$.ajax({   //申请ajax来判断邮箱是否存在
                    type:'post',
                    url:'http://192.168.11.111/php/Apply/User/login/register',
                    data:reEmail.val(),
                    success:function(data){
                        if(data.code==0){
                            //邮箱存在
                            flag=false;
                            getBlur(reEmail,reEmailTips,data.msg);
                        }else if(data.code==1){
                            //邮箱不存在
                            flag=true;
                            reEmailTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                        }

                    }
                    
                });
			}
		});
	};

	//邮箱验证
	var remsgVerify = $("#re_msgverify");
	var sendMsg = $("#send_msg");
	var sendMsgTips = sendMsg.next();
	sendMsg.on('click', function() {  //点击获取邮箱验证码
	$.ajax({
			type: 'get',
			url: 'http://192.168.11.111/Apply/User/login/mailVerify',
			data: {
				mail: $(".email").val(),
			},
			dataType: 'json',
			success: function(data) {
				if(data.code == 1000) {
					console.log(data)
					console.log('邮箱发送成功');
				}else{
					console.log('请求验证码失败');
				}
			}
		});
		
	});

	//获取邮箱验证码倒计时
	var countdown = 60;
	$('#send_msg').on('click',function(){
		settime(this)
	});
	function settime(obj) {
		if(countdown == 0) {
			obj.removeAttribute("disabled");
			obj.value = "获取验证码";
			countdown = 60;
			return;
		} else {
			obj.setAttribute("disabled", true);
			obj.value = "重新发送(" + countdown + ")";
			countdown--;
		}
		setTimeout(function() {
			settime(obj)
		}, 1000)
	};
	
	//  图片验证码验证
	$('.change_img').on('click', function() {
		$('#code_img').attr('src', 'http://192.168.11.111/Apply/User/login/code?_t = ' + new Date()*1)
	})


	//立即注册
	var submitBtn = $(".submit");
	var regEmailform = $("#reg_allform");
	submitBtn.on('click', function(event) {
		$.ajax({
			type:'POST',
			url: 'http://192.168.11.111/Apply/User/login/register',
			data:$('#reg_allform').serialize(),
			dataType: 'json',
			success: function(data) {
				var code = data.code
				if(code == 1000) {
					console.log(data);
					alert("提交成功");
					setTimeout(function(){
						$(window).attr('location','./loginff.html');
					},2000);

					
				} else if(code == 1004) {
					$('.responseMsg').show();
					//$('<div id="repson" />').html("<font color=red>验证码不正确</font>").appendTo('#responseMsg').fadeOut(2000);
					//$("#re_msgverify").select();

				};
				
//				判断用户输入的邮箱验证码是否正确
//				if(code==1){
//                  $('<div id="repson" />').html("<font color=red>验证码不正确</font>").appendTo('#responseMsg').fadeOut(2000);
//                  $("#re_msgverify").select();
//                   return false;
//                  }
//                  else if(resualt==0){
//                  return true;
//                  }
			}
		});

	});

	//协议
	var checkBtn = $("#service_btn");
	var serviceTips = $(".service_tips");
	checkBtn.click(function() {
		if(checkBtn[0].checked) {
			flag = true;
			getBlur(0, serviceTips, '');
		} else {
			flag = false;
			getBlur(0, serviceTips, '请接受得实用户协议');
		};
	});

	/**
     *
     获取焦点的样式
     *
     @method getFocus
     *
     *
     @param {jquery对象} reInput 输入框节点
     @param {jquery对象} reTip 输入框节点
     @param {string} reInput 获取焦点的提醒信息
     *
     @return 无返回值
     */
	//封装获取焦点的样式
	function getFocus(reInput, reTip, msg) {
		if(reTip) {
			reTip.html(msg || '');
			reTip.css("color", '#ccc');
		}
		if(reInput) {
			reInput.css({
				"backgroundColor": '',
				"border-color": ""
			});
		};

	};
	/**
	 *
	 失去焦点不通过验证的样式
	 *
	 @method getBlur
	 *
	 *
	 @param {jquery对象} reInput 输入框节点
	 @param {jquery对象} reTip 输入框节点
	 @param {string} reInput 失去焦点不通过验证的提醒信息
	 *
	 @return 无返回值
	 */
	// 失去焦点不通过验证的样式
	function getBlur(reInput, reTip, msg) {
		if(reTip) {
			reTip.html(msg || '');
			reTip.css("color", '#ff0000');
		}
		if(reInput) {
			reInput.css({
				"backgroundColor": '#ffe6e7',
				"border-color": "#fca1a5"
			});
		};

	};

});