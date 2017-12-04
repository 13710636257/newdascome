/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/13.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/13.
 */

/**
 * Created by a on 2017/3/15.
 */
$(function(){

    //标题栏切换
    var reLeft=$(".re_left");
    var reLefts=reLeft.children();
    var reRight=$(".re_right");
    var reRights=reRight.children();
    for(var i=0;i<reLefts.length;i++){
        reLefts[i].index=i;
    }
    reLefts.on('click',function(){
        var _this=$(this);
        reLefts.css('color','#A0A0A0');
        _this.css('color','rgb(0, 193, 234)');
        reRights.css('display','none');
        $(reRights[this.index]).css("display",'block');

    })


    //手机注册
    regPhone();
    function regPhone(){
        var flag=false;
        //手机号验证
        var repPhone=$("#re_pphone");
        var repTips=repPhone.next();
        repPhone.focus(function(){
            getFocus(repPhone,repTips);
        });
        repPhone.blur(function(){
            var _this=$(this);
            if(_this.val().length==0){
                flag=false;
                getBlur(_this,repTips,"请输入手机号码");
            }else if(!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(_this.val())){
                flag=false;
                getBlur(_this,repTips,"请输入有效的11位手机号码");
            }else{
                $.ajax(
                    {
                        type:'post',
                        url:'../json/register.json',
                        data:'_this.val()',
                        success:function(data){
                            if(data.verify){
                                flag=true;
                                repTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                            }else{
                                flag=false;
                                getBlur(_this,repTips,"用户已存在，请重新输入");
                            }
                        }

                    }
                )
            }
        });

        //昵称验证
        var repNick=$("#re_pnick");
        var NickTips=repNick.next();
        //昵称获得焦点时清除不通过的样式
        repNick.focus(function(){
            getFocus(repNick,NickTips,"昵称仅支持中英文、数字");
        });
        //昵称失去焦点时设置不通过的样式
        repNick.blur(function(){
            var _this=$(this);
            //判断是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(repNick,NickTips,"请输入昵称");
            }else if(_this.val().length<6||_this.val().length>14){
                flag=false;
                getBlur(repNick,NickTips,"长于14个英文或7个汉字或低于6个英文");
            } else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(_this.val())){  //判断昵称的格式
                flag=false;
                getBlur(repNick,NickTips,"昵称仅支持中英文、数字");
            }else{
                $.ajax({
                    type:'post',
                    url:'../json/register.json',
                    data:repNick.val(),
                    success:function(data){
                        if(data.code==0){
                            //昵称存在
                            flag=false;
                            getBlur(repNick,NickTips,data.msg);
                        }else if(data.code==1){
                            //昵称不存在
                            flag=true;
                            NickTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                        }
                    },
                })
            }
        });
        //密码验证
        var repPwd=$("#re_ppwd");
        var pwdTips=repPwd.next();
        repPwd.focus(function(){
            getFocus(repPwd,pwdTips,'支持大小写字母、数字');
        });
        repPwd.blur(function(){
            var _this=$(this);
            //判断密码是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(repPwd,pwdTips,"请输入密码");
            }else if(_this.val().length<6||_this.val().length>30){ //判断密码长度
                flag=false;
                getBlur(repPwd,pwdTips,"密码只能在6~30个字符之间");
            }else if(!/^[A-Za-z0-9]+$/.test(_this.val())){  //判断密码格式
                flag=false;
                getBlur(repPwd,pwdTips,"仅支持大小写字母、数字，请重新输入");
            }else{  //通过验证
                pwdTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                flag=true;
            }
            //重新修改时要判断密码和确认密码是否相等

            if(repCheck.val()!= repPwd.val()){
                flag=false;
                getBlur(repCheck,checkTips,'两次输入的密码不一致，请重新输入...');
            }else{

                if(repCheck.val().length!=0){
                    flag=true;
                    checkTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                }else{
                    flag=false;
                    getBlur(repCheck,checkTips,"请输入密码");
                }
            }


        });
        //确认密码
        var repCheck=$("#re_pcheck");
        var checkTips=repCheck.next();
        repCheck.focus(function(){
            getFocus(repCheck,checkTips);
        });
        repCheck.blur(function(){
            var _this=$(this);
            //判断确认密码是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(repCheck,checkTips,"请输入密码");
            }else if(repCheck.val()!= repPwd.val()){ //判断密码是否一致
                flag=false;
                getBlur(repCheck,checkTips,'两次输入的密码不一致，请重新输入...');
            }
            else{//通过验证
                checkTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                flag=true;
            }
        });

        //验证码
        //首先渲染

        var rePverify=$("#re_pverify");
        var pverify_img=$("#pverifyImg");
        var changeVerify=$(".change_verify");
        var vtips=$(".vtips");
        function sendAjax(obj){
            $.ajax({
                type:obj.type,
                url:obj.url,
                data:obj.data,
                success:function(res){
                    obj.callback(res);
                }
            })
        }
        function getVerifyImg(res){
            pverify_img.src=res.img;
        }
        sendAjax({type:'get',url:'../json/vverify.json',data:{},callback:getVerifyImg});
        //更换验证码
        pverify_img.click(function(){
            sendAjax({type:'get',url:'../json/vverify.json',callback:getVerifyImg});
        });
        changeVerify.click(function(){
            sendAjax({type:'get',url:'../json/vverify.json',callback:getVerifyImg});
        })
        rePverify.focus(function(){
            getFocus(rePverify,vtips,'');
        });

        rePverify.blur(function(){
            if(rePverify.val().length==0){
                flag=false;
                getBlur(rePverify,vtips,'请输入验证码');
            }else{
                flag=true;
                vtips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
            }
        })

        //短信验证
        var remsgVerify=$("#re_msgverify");
        var sendMsg=$("#send_msg");
        var sendMsgTips= sendMsg.next();
        remsgVerify.focus(function(){
            getFocus(remsgVerify,sendMsgTips);
        });
        remsgVerify.blur(function(){
            var _this=$(this);
            if(_this.val().length==0){
                flag=false;
                getBlur(remsgVerify,sendMsgTips,"请输入验证码");
            }else{
                sendMsgTips.html("<img src='../img/check_right.gif' alt='验证通过' />");
                sendMsgTips.children().css('marginTop',18);
                flag=true;
            }
        });
        //协议
        var serviceBtn=$("#service_btn");
        var serviceTips=$(".service_tips");
        serviceBtn.click(function () {
            if(!serviceBtn[0].checked){
                flag=false;
                getBlur(0,serviceTips,'请先阅读万步网服务条款再勾选');
            }else{
                flag=true;
                getBlur(0,serviceTips,'');
            }
        });
        //立即注册
        var fastRegister=$(".fast_register a");
        //发送数据
        if(flag){
            fastRegister.on("click",function(){
                var repForm=$("#re_phoneform");
                var data=repForm.serialize();
                $.ajax({
                    type:'post',
                    url:'',
                    data:data,
                    success:function(){}
                })
            })


        };

    }
    //邮箱注册
    regEmail();
    function regEmail(){
        //邮箱
        var reEmail=$("#re_email");
        var reEmailTips=reEmail.next();
        //验证标记
        var flag=false;
        //邮箱获得焦点时
        reEmail.focus(function(){
            getFocus(reEmail,reEmailTips)
        });
        //邮箱失去焦点时
        reEmail.blur(function(){
            var _this=$(this);
            //判断邮箱是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(reEmail,reEmailTips,'请输入邮箱');
            } else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(_this.val())){ //判断邮箱格式是否正确
                flag=false;
                getBlur(reEmail,reEmailTips,'邮箱格式不对，请重新输入');
            }else{
                //邮箱验证是否存在
                $.ajax({
                    type:'post',
                    url:'../json/register.json',
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

                    },
                })
            }
        });

        //昵称
        var reNick=$("#re_name");
        var reNickTips=reNick.next();
        reNick.focus(function(){
            getFocus(reNick,reNickTips,"昵称仅支持中英文、数字");
        });
        //昵称失去焦点时设置不通过的样式
        reNick.blur(function(){
            var _this=$(this);
            //判断是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(reNick,reNickTips,"请输入昵称");
            }else if(_this.val().length<6||_this.val().length>14){  //判断昵称的长度
                flag=false;
                getBlur(reNick,reNickTips,"最长14个英文或7个汉字");
            } else if(!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(_this.val())){  //判断昵称的格式
                flag=false;
                getBlur(reNick,reNickTips,"昵称仅支持中英文、数字");
            }else{
                $.ajax({
                    type:'post',
                    url:'../json/register.json',
                    data:reNick.val(),
                    success:function(data){
                        if(data.code==0){
                            //昵称存在
                            flag=false;
                            getBlur(reNick,reNickTips,data.msg);
                        }else if(data.code==1){
                            //昵称不存在
                            flag=true;
                            reNickTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                        }

                    },
                })
            }
        });


        //密码
        var rePwd=$("#re_pwd");
        var rePwdTips=rePwd.next();
        rePwd.focus(function(){
            getFocus(rePwd,rePwdTips,'支持大小写字母、数字');
        });
        rePwd.blur(function(){
            var _this=$(this);
            //判断密码是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(rePwd,rePwdTips,"请输入密码");
            }else if(_this.val().length<6||_this.val().length>30){ //判断密码长度
                flag=false;
                getBlur(rePwd,rePwdTips,"密码只能在6~30个字符之间");
            }else if(!/^[A-Za-z0-9]+$/.test(_this.val())){  //判断密码格式
                flag=false;
                getBlur(rePwd,rePwdTips,"仅支持大小写字母、数字，请重新输入");
            }else{  //通过验证
                flag=true;
                rePwdTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
            }

            //判断是否跟确认密码框的值是否相等


            if(reCheckpwd.val()!= rePwd.val()){
                flag=false;
                getBlur(reCheckpwd,recPwdTips,'两次输入的密码不一致，请重新输入...');
            }else{

                if(reCheckpwd.val().length!=0){
                    flag=true;
                    recPwdTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
                }else{
                    flag=false;
                    getBlur(reCheckpwd,recPwdTips,"请输入密码");
                }
            }

        });
        //确认密码
        var reCheckpwd=$("#re_checkpwd");
        var recPwdTips=reCheckpwd.next();
        reCheckpwd.focus(function(){
            getFocus(reCheckpwd,recPwdTips);
        });
        reCheckpwd.blur(function(){
            var _this=$(this);
            //判断确认密码是否为空
            if(_this.val().length==0){
                flag=false;
                getBlur(reCheckpwd,recPwdTips,"请输入密码");
            }else if(reCheckpwd.val()!=rePwd.val()){ //判断密码是否一致
                flag=false;
                getBlur(reCheckpwd,recPwdTips,'两次输入的密码不一致，请重新输入');
            }
            else{//通过验证
                flag=true;
                recPwdTips.html("<img src='../img/check_right.gif' alt='验证通过'/>");
            }
        });

        //验证码
        //获取验证码
        //这里省略........待解决
        var verifyImg=$(".everify_img");
        var randverify=$("#randverify");
        var vertips=$(".vertips");
        //首次渲染
        changeImg({});
        //obj是一个对象，属性值要发给后台的参数，和成功响应后一个回掉函数
        function changeImg(obj){
            var data={};
            if(obj.data){
                data=obj.data;
            }
            $.ajax({
                type:'get',
                url:'../json/vverify.json',
                data:data,
                success:function(res){
                    verifyImg.attr("src",res.img);
                    if(obj.callback){
                        obj.callback(data);
                    }
                },
            });
        };
        //给验证码图片和“换一换”注册点击事件更换验证码
        verifyImg.click(function(){
            changeImg({});
        });
        //判断验证码的输入框是否为空
        randverify.focus(function(){
            getFocus(randverify,vertips,'')
        });
        randverify.blur(function(){
            if(randverify.val().length==0){
                flag=false;
                getBlur(randverify,vertips,'请输入验证码');
            }else{
                flag=true;
                vertips.html("<img src='../img/check_right.gif' alt='验证通过' id='cross_img'/>");
            }
        });

        //协议
        var checkBtn=$("#check_btn");
        var serviceTips=$(".service_tips");
        checkBtn.click(function(){
            if(checkBtn[0].checked){
                flag=true;
                getBlur(0,serviceTips,'');
            }else{
                flag=false;
                getBlur(0,serviceTips,'请接受万步网服务条款');
            }
        })

        //快速注册
        var submitBtn=$("#submit_btn");
        var regEmailform=$("#reg_emailform");
        submitBtn.on('click',function(event){
            var data=regEmailform.serialize();
            console.log(flag);
            if(flag){
                $.ajax({
                    type:'post',
                    url:'../json/register.json',
                    data:data,
                    success:function(data){
                        //验证码不成功
                        if(data.code==0){
                            flag=false
                            changeImg({});
                            getBlur(randverify,vertips,'验证码错误，重新输入');
                        }else{
                            $.ajax({
                                type:'post',
                                url:'../json/register.json',
                                data:data,
                                success:function(){
                                    console.log("提交成功");
                                    $(window).attr('location','./login.html');
                                }
                            })
                        }
                        //提交失败
                    }
                })
            }
        })
    }

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
    function getFocus(reInput,reTip,msg){
        if(reTip){
            reTip.html(msg||'');
            reTip.css("color",'#ccc');
        }
        if(reInput){
            reInput.css({
                "backgroundColor":'',
                "border-color": ""
            });
        }


    }
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
    function getBlur(reInput,reTip,msg){
        if(reTip){
            reTip.html(msg||'');
            reTip.css("color",'#ff0000');
        }
        if(reInput){
            reInput.css({
                "backgroundColor":'#ffe6e7',
                "border-color": "#fca1a5"
            });
        }

    }




})