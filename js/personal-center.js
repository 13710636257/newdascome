/**
 * Created by ds008 on 2017/9/4.
 */

$(document).ready(function () {
    var username = localStorage.getItem('username')
    console.log(username);
    if (username) {
        $('.head-name').html(username).attr('href', 'javascript:;').css('color', 'red').css('font-size', '18px');
    }
    //用户个人资料接口
    $.ajax({
        url: "http://192.168.11.111/Apply/bbs/user/personalData",
        type: "GET",
        data: {
            uid: "",//用户ID，不传值时默认当前登录用户ID
            timeStamp: new Date().getTime()
        },
        dataType: "json",//后台处理后返回的数据格式
        success: function (result) { //ajax请求成功后触发的方法
            var data = result.data
            console.log(data);
            headpic(data)
            profile(data)
        }
    });

    //创建个人资料div
    function headpic(data) {
        var profileLeft = '';
        profileLeft +=
            '<img src="' + data.head_img + '"/>' +
            '<p>级别：' + '<span>' + data.grade + '</span>' + '</p>' +
            '<p>威望：' + '<span>' + data.exps + '</span>' + '</p>'
        $('.profile-img').html(profileLeft);
    }

    function profile(data) {
        var profileRight = '';
        profileRight +=
            '<dl>' +
            '<dd class="active-profile">' +
            '<p data-id="' + data.id + '">' + data.nickname + '</p>' +
            '<span>性别：</span>';
            if (data.sex == 1) {
                profileRight += '<span data-sex="' + data.sex + '">男</span>';
            } else if (data.sex == 2) {
                profileRight += '<span data-sex="' + data.sex + '">女</span>';
            } else if (data.sex == 3) {
                profileRight += '<span data-sex="' + data.sex + '">保密</span>';
            }
        profileRight += '<br/><br/>' +
            '<span>认证邮箱：1945904807@qq.com</span>' +
            '<span >手机号码：15889851763</span>' +
            '</dd>' +
            '<dd class="static">' +
            '<label>统计信息:</label>' +
            '<span>主题贴数 ' +
            '<i>' + data.post + '</i>' +
            '</span>' +

            '<span>精品贴数 ' +
            '<i>' + data.essence + '</i>' +
            '</span>' +
            '<span>关注人数 ' +
            '<i>' + data.my_follow + '</i>' +
            '</span>' +
            '<span>粉丝人数 ' +
            '<i>' + data.follow_me + '</i>' +
            '</span>' +
            '</dd>' +
            '<dd class="active-profile">' +
            '<p>活跃概况</p>' +
            '<span>注册时间：2017-8-14 13:07</span>' +
            '<span>最后访问时间：2017-8-20 12:00</span>' +
            '<span>上次发表时间：2017-7-3 13:23</span>' +
            '</dd>' +
            '</dl>'
        $('.personal').html(profileRight);
    }

    //我的帖子接口
    $.ajax({
        type: "GET",
        url: "http://192.168.11.111/Apply/bbs/user/myPost",
        data: {
            page: 1,   //页码
            uid: ""//用户ID，不传值时默认当前登录用户ID
        },
        dataType: "json",//后台处理后返回的数据格式
        success: function (result) { //ajax请求成功后触发的方法
            console.log(result);
            var data = result.data
            console.log(data[0].id)
            postDiv(data)
        }
    });

    //我的回复接口
    $.ajax({
        type: "GET",
        url: "http://192.168.11.111/Apply/bbs/user/myReply",
        data: {
            page: 1,   //页码
            uid: "",//用户ID，不传值时默认当前登录用户ID
            timeStamp: new Date().getTime()
        },
        dataType: "json",
        success: function (result) {
            console.log(result);
            var data = result.data
            replyDiv(data)
        }
    });

    //点击主题跳转到相应的页面
    $('table').delegate('a', 'click', function () {
        window.name = $(this).data("id");  //获取主贴的id
        console.log(window.name);
    });

    //创建我的帖子div
    function postDiv(dataArr) {
        var html = '';
        $.each(dataArr, function (index, data) {
            html +=
                '<tr class="thall" >' +  //存储主贴id
                '<td class="del-td"><a href="forum-content.html" data-id="' + data.id + '">' + data.theme + '</a></td>' +
                '<td class="frm">证卡打印机专区</td>' +
                '<td class="num">' + data.count + '</td>' +
                '<td class="time">' + data.time + '</td>' +
                '<td class="by">删除</td>' +
                '</tr>'
        });
        $('.mypost-table').append(html);
        delepost();
    }

    //创建我的回复的div
    function replyDiv(replydata) {
        var src = '';
        $.each(replydata, function (index, data) {
            src +=
                '<tr class="thall" >' +  //存储主贴id
                '<td class="headimg"><img src="' + data.head_img + '">' +
                '</td>' +
                '<td class="usename">' + data.nickname + '</td>' +
                '<td class="del-td frm"><a href="javascript:void(0);" data-id="' + data.id + '">' + data.theme + '</a></td>' +
                '<td class="reply-content">' + data.content + '</td>' +
                '<td class="time">' + data.time + '</td>' +
                '<td class="by">删除</td>' +
                '</tr>'
        });
        $('.myreply-table').append(src);
        delereply();
    }


    //删除帖主贴接口
    function delepost() {
        $('.mypost-table').on('click', '.by', function () {
            var id = $(this).siblings('.del-td').find('a').data('id');//
            console.log(id)
            var tr = $(this).parents('tr');
            $.ajax({
                type: 'POST',
                url: 'http://192.168.11.111/Apply/bbs/user/delPost',
                dataType: "json",
                data: {
                    pid: id
                },
                success: function (result) {//ajax请求成功后触发的方法
                    console.log(result);
                    var code = result.code
                    if (code == 1000) {
                        tr.remove();
                    }
                }
            });

        });
    };


    //删除评论接口
    function delereply() {
        $('.myreply-table').on('click', '.by', function () {
            var id = $(this).siblings('.del-td').find('a').data('id');//
            var tr = $(this).parents('tr');
            $.ajax({
                type: 'POST',
                url: 'http://192.168.11.111/Apply/bbs/user/delComment',
                data: {
                    cid: id
                },
                success: function (result) {//ajax请求成功后触发的方法
                    console.log(result);
                    var code = result.code
                    if (code == 1000) {
                        tr.remove(); //删除帖子
                    }
                }
            });

        });
    };


});


$(function () {

    $(".profile-top ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active")
        var index = $(this).index(); //获取li的当前下标
        $('.profile-centent').eq(index).show().siblings('.profile-centent').hide();
    });

    //我的帖子tab切换
    $(".post-top a").click(function () {
        $(this).addClass("show").siblings().removeClass("show")
        var index = $(this).index(); //获取li的当前下标
        $('.post-classify').eq(index).show().siblings('.post-classify').hide();
    });
})