/**
 * Created by ds008 on 2017/6/3.
 */
$(document).ready(function () {

    //论坛默认登录接口
    $.ajax({
        url: "http://192.168.11.111/Apply/bbs/login/index",
        type: 'GET',
        data:{
            timeStamp: new Date().getTime()
        },
        dataType: 'json',
        success: function (data) {
            // console.log(data);
        }
    });
    sessionStorage.setItem('where', 'localhost');//设置当前地址，用来判断登录后是否跳转首页

    $.ajax({
        url: 'http://192.168.11.111/Apply/bbs/index/seeall',

        dataType: 'json',
        type: "GET",
        data: {
            page: 1,
            timeStamp: new Date().getTime()
        },
        success: function (result) {
            if (result.code == 1000) {
                // console.log(result)
                var data = result.data.content;
                creatDiv(data)
                pagenum(result.data.pages) //传入页数
            }
        }
    });


    // 获取主帖统计分类接口---------一刷新就加载数据
    function renderNumber(data) {//分贴
        $('.today_number').html('今日：' + data.todayAll)
        $('.yesterday_number').html('昨日：' + data.yesterdayAll)
        $('.all_number').html('帖子总数：' + data.postAll)
        $('.boutique-post').html('精品贴子：' + data.eliteAll)
    };
    $.ajax({
        type: "GET",
        url: "http://192.168.11.111/Apply/bbs/index/statistics",
        dataType: "json",
        success: function (result) {
            if (result.code == 1000) {
                var data = result.data;
                renderNumber(data);
            }
        }
    });


    //头部关键字搜索接口
    $('.search_btn').on('click', function () {
        var inp = $('.search_input').val();
        if (inp == '') {
            return
        }
        $.ajax({
            url: 'http://192.168.11.111/Apply/bbs/index/seeall',
            data: {
                page: 1,
                row: 10,
                keyword: inp,
                timeStamp: new Date().getTime()//加时间戳为了兼容ie
            },
            dataType: 'json',
            type: "GET",
            success: function (result) {
                if (result.code == 1000) {
                    var $list = $('.note_list')
                    $list.empty();
                    var data = result.data.content;
                    creatDiv(data);
                    pagenum(result.data.pages) //传入页数
                }
            }
        });

    });

    //获取发贴分类接口
    function postClassify(data) {   //获取帖子分类内容函数
        $('.select_type').html('');
        var postType = '<option value="0">选择标题分类</option>';
        $.each(data, function (index, item) {
            postType += '<option value="' + item.key + '">' + item.type + '</option>'
        });
        $('.select_type').html(postType);
    };
    $.ajax({
        type: "GET",
        url: "http://192.168.11.111/Apply/bbs/index/classify",
        data:{
            timeStamp: new Date().getTime()
        },
        dataType: "json",

        success: function (result) {
            if (result.code == 1000) {
                var data = result.data;
                postClassify(data);
            }

        }
    });

    //动态创建div
    function creatDiv(list) {
        // console.log(list)
        var html = '';
        for (var i = 0; i < list.length; i++) {
            var data = list[i];
            html +=
                '<div class="comment" data-id = ' + data.id + '>' +
                '<div class="liLeft">' +
                '<p class="head_portrait"><img src="' + data.head_img + '">' +
                '</p>' +
                '<p>' + data.nickname + '</p>' +
                '</div>' +
                '<div class="liRight">' +
                '<p>' +
                '<a class="title theme-link" href="forum-content.html">' + data.theme + '</a>';
                if(data.is_top==1){
                    html+= '<img data-is_top src="../img/forumf/pin_1.gif">';
                }
                if(data.is_elite==1){
                    html+= '<img data-is_elite src="../img/forumf/choice.png">';
                }
                html+=
                '</p>' +
                '<div class="commentTime">' +
                '<p class="nlinfo">' +
                '<span class="nltime">' + data.time + '</span>' +
                ' <span class="nltype">' + data.type + '</span>' +
                '</p>' +
                '<p class="nlcomment">' +
                '<span class="nlcomment_btn">' + data.look + '</span>' +
                '<span class="nlsee_btn">' + data.reply + '</span>' +
                //'<span class="dle">删除</span>' +
                '</p>' +
                '</div>' +
                '</div>' +



                '</div>';
        }
        $('.note_list').append(html);

        //帖子区域精字的出现
        //(function () {  //立即执行
        //    $('.nlsee_btn').each(function (i, ele) {
        //        var num = Number($(ele).html())
        //        if (num > 50) {
        //            $(ele).parents(".liRight").find(".title").append('<img src="../img/forumf/choice.png">');
        //        }
        //    });
        //}());
    };


    //-----发帖区域接口
    var isNullType = function () {
        return $('.select_type option:selected').val() == 0 ? true : false;
    }

    var isNullTitle = function () {
        return $.trim($('.ntitle').val()) == 0;//去除头尾的空格 长度还是为零 则不给发送
    }
    //获取标签元素
    var commentPost = $('.ntitle');
    var submitBtn = $('.submit');
    //-----提交按钮点击事件-----
    submitBtn.on('click', function () {
        var username = localStorage.getItem('username');//获取登录的用户名
        if (username == undefined) {   //判断是否有登录
            window.location.href = './login.html';
        }
        else {

            if (isNullType()) {
                confirm("类型不能为空，请选择类型！");
                return;
            }
            ;
            if (isNullTitle()) {
                confirm("标题不能为空，请输入标题，请不要超过25字！");
                return;
            } else {
                if (!/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.test(commentPost.val())) {
                    // console.log('仅支持中英文、数字 _');
                }
                ;
            }
            ;
            /** 插件的 获取 textarea 的文本内容 name:description  ver:4.4.4--*/
            if (CKEDITOR.instances.description.getData() == "") {
                confirm("内容不能为空！");
                return false;
            } else {
                //获取 处理数据 返回文本内容
                var txtValue = CKEDITOR.instances.description.getData();
                txtValue = txtValue.replace("<br />", "");
                txtValue = txtValue.replace("<br>", "");
                txtValue = txtValue.replace("<p>", "");
                txtValue = txtValue.replace("</p>", "");
            }
            ;
            //-----发帖接口-------
            $.ajax({
                type: "POST",//数据发送的方式（post 或者 get）
                url: "http://192.168.11.111/Apply/bbs/index/posted",//要发送的后台地址
                data: {  //要发送的数据（参数）
                    theme: commentPost.val(), //主贴主题
                    content: txtValue, //主贴内容
                    type: $('.select_type option:selected').val(),
                },
                dataType: "json",//后台处理后返回的数据格式
                success: function (data) {//ajax请求成功后触发的方法
                    var code = data.code
                    if (code == 1000) {
                        alert('发帖成功');
                    }
                    CKEDITOR.instances.description.setData(""); //清空内容
                }
            });
        }
    });

    //----生成页码--------
    function pagenum(PAGE_TOTAL) {
        var pageNum = $('.pageNum');
        pageNum.empty();
        window.location.hash = 'page=1';  //页面一刷新hash就为1
        for (var i = 0; i < PAGE_TOTAL; i++) {
            var a = $('<a class="pageA" herf="javascript:;">')
            a.html(i + 1);
            a.on('click', function () {
                window.location.hash = "page=" + this.innerHTML;
                $(this).addClass("active").siblings().removeClass("active")
            })
            pageNum.append(a);
            $('.pageA').eq(0).addClass("active")
        };

        //上一页
        $('.ppage span').eq(1).on('click', function () {
            var hash = window.location.hash.split('=')[1];
            hash--;
            if (hash == 0) {
                hash = 1
            };
            window.location.hash = "page=" + hash;
            $('.pageA').eq(hash - 1).addClass("active").siblings().removeClass("active")
        });

        //下一页
        $('.ppage span').eq(2).on('click', function () {
            var hash = window.location.hash.split('=')[1];
            if (hash >= PAGE_TOTAL) {
                hash = PAGE_TOTAL
            } else {
                hash++;
            }
            window.location.hash = "page=" + hash;
            $('.pageA').eq(hash-1).addClass("active").siblings().removeClass("active")
        })

        //首页
        $('.homePage').on('click', function () {
            window.location.hash = 'page=1';
            $('.pageA').eq(0).addClass("active").siblings().removeClass("active");
        })

        window.onhashchange = function () {  //onhashchange hash值一改变就会触发的事件
            var hash = window.location.hash.split('=')[1];
            switchPage(hash)
        };

        // 页数变化 就改变对应的页数上显示
        function switchPage(hash) {
         var key= localStorage.getItem('themetype');

            jQuery.support.cors = true
            $.ajax({
                //url = "http://192.168.11.111/Apply/bbs/index/seeall=" + new Date().getTime();
                url: 'http://192.168.11.111/Apply/bbs/index/seeall',
                data: {
                    page: hash,  //跳转的页码
                    elite: '',//传“1”时为精品贴，不传为所有帖
                    row: 10,//每页显示条数，不传默认10条
                    keyword: $('.search_input').val(),//搜索帖子的关键字
                    class:key,
                    timeStamp: new Date().getTime()//加时间戳为了兼容ie
                },
                dataType: 'json',
                type: "GET",
                success: function (result) {
                    if (result.code == 1000) {
                        var data = result.data.content;
                        $('.note_list').empty();
                        creatDiv(data);
                    }
                }
            });
        };
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
        var riqi = Y + "-" + Mon + "-" + Data + ' ' + H + ':' + Min + ':' + Sec;  //时间用字符串拼接起来
        return riqi;
    };

    function oT(n) {
        return n = n < 10 ? '0' + n : '' + n;
    };


//获取主贴总内容接口
    $('.note_list').delegate('.theme-link', 'click', function () {
        var $this = $(this);
        var pid = $this.closest('.comment').data('id'); //获取主题帖的pid
        // console.log(pid)
        window.name = pid;
    })

});


















