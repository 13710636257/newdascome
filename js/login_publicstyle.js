/**
 * Created by ds008 on 2017/8/15.
 */
$(document).ready(function(){
    var username = localStorage.getItem('username') //获取登录的用户名
    console.log(username)
    //-------检查登录接口------
    $.ajax({
        type: "GET",
        url: "http://192.168.11.111/apply/User/login/isLogin",
        dataType: "json",
        success: function (result) {
            //sbIE(result)
            if (result.code == 1000) {
                $('.login').html(username).attr('href', 'javascript:;').css('color', 'red');
                $('.register').html('退出').attr('href', 'javascript:;');
                $('.reply-hint').hide();
                //personalNav();
            }else if(result.code == 1006){
                alert('未登录')
                loginStyle();
            }else {
                //sbIE('身份已过期,请重新登录');
                loginStyle();
            };
        }
    });


    function loginStyle(){
        $('.reply-hint').show();
        $('.login').html('登录').attr('href', 'loginff.html').css('color', 'white')
        $('.register').html('注册').attr('href', 'registerFF.html')
    }

    //个人中心下拉显示与隐藏
    personalNav()
    function personalNav(){
        $('.login_register .loginLi').hover(function(){
            $('.account-setting').show();
        },function(){
            $('.account-setting').hide();
        })
    }
    //退出登录接口
    $('.register').on('click', function () {
        //alert("退出登录")
        $.ajax({
            url: 'http://192.168.11.111/Apply/user/login/outLogin',
            dataType: 'json',
            type: 'DELETE',
            data:{},
            success: function (result) {
                if (result.code == 1000) {
                    alert('退出成功');
                    loginStyle();
                    localStorage.removeItem('username');//退出以后清除用户名
                }
            }
        });

    });

    //回到顶部
    window.onscroll=function(){
        if(document.body.scrollTop>900){
            $('.return-top').show();
        };
    };
    $('.return-top').on('click',function(){
        window.scrollTo(0,0);
        $('.return-top').hide();
    });




})




