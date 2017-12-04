/**
 * Created by ds008 on 2017/6/4.
 */

$(document).ready(function () {
    //主题的id
    var pid = window.name || 1;

    var isThumbsUp; //点赞功能变量

    var username = localStorage.getItem('username');//获取登录的用户名
    sessionStorage.setItem('where', 'localhost');//设置当前地址，用来判断登录后是否跳转首页

    $.ajax({
        url: 'http://192.168.11.111/Apply/bbs/index/commentList',
        data: {
            pid: pid,
            page: 1
        },
        dataType: 'json',
        type: "GET",
        success: function (result) {
            if (result.code == 1000) {
                console.log(result.data)
                localStorage.setItem('load', JSON.stringify(result));

                var data = result.data
                creatpostDiv(data)
                creatDiv(data.list);
                pageCreate(data.pages)
            }
        }
    });

    //创建主贴内容 获取数据
    function creatpostDiv(data) {
        var postStarter = '';
        postStarter += '<div class="note_cleft" data-pid=' + window.name + '>' +
            '<p class="note_ctop">' + data.nickname + '</p>' +
            '<div class="personal_mesaage">' +
            '<img src="' + data.head_img + '" alt="">' +
            '<p>级别：' + '<span>' + data.grade + '</span>' + '</p>' +
            '<p>精华：' + '<span>' + data.essence + '</span>' + '</p>' +
            '<p>发帖：' + '<span>' + data.post + '</span>' + '</p>' +
            '<p>威望：' + '<span>' + data.exps + '</span>' + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="note_cright">' +
            '<div class="title_tright">' +
            '<span>' + data.theme + '</span>' +
            '<img src="../img/forumDetail/recommend_3.gif" />' +
            '</div>' +
            '<div>' +
            '<div class="note_crtop">' +
            '<p class="publish_time">' + data.time + '</span>' + '</p>' +
            '<div class="title_tleft">' +
            '<span>查看：</span>' +
            '<span class="note_data seecount">' + data.look + '</span>' +
            '<span class="reversion">回复：</span>' +
            '<span class="note_data">' + data.reply + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="note_crcontent">' + data.content + '</div>' +
            '<div class="note_setconfig pnote_set">' +
            '<span class="thumbs_up">' + data.like + '</span>' +
            '<span class="store">收藏</span>' +
            '<span class="report">举报</span>'+
            '</div>' +
            '</div>' +
            '</div>'
        $('.note_content').html(postStarter)
        ////点赞接口
    };


    //给提交评论按钮点击事件
    $('.submit').click(function () {
        var val=$('#replycontent').val();
        val.replace('<','&lt;').replace('<','&gt;')//转义字符
        if (username == undefined) {      //判断是否有登录
            window.location.href = './loginff.html';
        }
        else {
            if (!val.trim()) {
                alert('亲，请留下点东西！');
                return;
            };
            //利用ajax获取数据
            $.ajax({
                type: "POST",//数据发送的方式（post 或者 get）
                url: "http://192.168.11.111/Apply/bbs/index/comment",//要发送的后台地址
                data: {  //要发送的数据（参数）
                    pid: pid,    //被评论主题帖的ID
                    content: $('#replycontent').val() //评论内容
                },
                dataType: "json",//后台处理后返回的数据格式
                success: function (result) {
                    if (result.code == 1000) {
                        console.log(result)
                        var repeatData = getRepeatData();
                        repeatDiv(repeatData);
                        $('#replycontent').val("");
                    }

                }
            });
        };
    });


    function getRepeatData() {
        return {
            name1:username || '',
            pid:pid ,     //主帖ID
            head_img:'http://192.168.11.122/Apply/Public/Hplus/img/a1.jpg',
            content: $('#replycontent').val(),     //回复内容
            time:getTime(new Date()*1) ,  //回复时间
            exps: "16041",   //威望点
            essence: "60",   //精品贴数
            post: "582",   //发帖数
            grade: "至尊打印机",  //楼主等级
        };
    };

    //创建评论内容
    function repeatDiv(repeatData) {
        var commentlist =
            '<div class="pperson clearfix">' +
            '<div class="note_cleft">' +
            '<p class="note_top">' + repeatData.name1 + '</p>' +
            '<div class="personal_mesaage">' +
            '<img src="' + repeatData.head_img + '" alt="">' +
            '<p>级别：' + '<span>' + repeatData.grade + '</span>' + '</p>' +
            '<p>精华：' + '<span>' + repeatData.essence + '</span>' + '</p>' +
            '<p>发帖：' + '<span>' + repeatData.post + '</span>' + '</p>' +
            '<p>威望：' + '<span>' + repeatData.exps + '</span>' + '</p>' +
            '</div>' +
            '</div>' +
            '<div class="comment_right">' +
            '<div>' +
            '<div class="note_rtop">' +
            '<p class="publish_time">回复于 ' +
            '<span clas="reply_time">' + repeatData.time + '</span>' +
            '&nbsp;&nbsp;&nbsp;<span>只看该作者</span>' +
            '</p>' +
            '</div>' +
            '<div class="note_content">' + repeatData.content + '</div>' +
            '<div class="note_setconfig">' +
            '<span class="thumbs_up" style="color: rgb(153, 153, 153);">0</span>' +
            '<span class="setrestore">回复</span>' +
                //内层回复
            '<div class="restore_list">' +
            '<ul>' +
            '</ul>' +
            '<div class="restore_text">' +
            '<textarea class="text"></textarea>' +
            '<a href="javascript:;" class="restore_btn"><span>发表</span></a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        $('.comment-list').append(commentlist);
    };


    //创建回复内容 获取数据 遍历内容
    function creatDiv(list) {
        var commentlist = '';
        for (var i = 0; i < list.length; i++) {
            var reply = list[i].reply;
            commentlist +=
                '<div class="pperson clearfix">' +
                '<div class="note_cleft">' +
                '<p class="note_top">' + list[i].nickname + '</p>' +
                '<div class="personal_mesaage">' +
                '<img src="' + list[i].head_img + '" alt="">' +
                '<p>级别：' + '<span>' + list[i].grade + '</span>' + '</p>' +
                '<p>精华：' + '<span>' + list[i].essence + '</span>' + '</p>' +
                '<p>发帖：' + '<span>' + list[i].post + '</span>' + '</p>' +
                '<p>威望：' + '<span>' + list[i].exps + '</span>' + '</p>' +
                '</div>' +
                '</div>' +
                '<div class="comment_right">' +
                '<div>' +
                '<div class="note_rtop">' +
                '<p class="publish_time">回复于 ' +
                '<span clas="reply_time">' + list[i].time + '</span>' +
                '&nbsp;&nbsp;&nbsp;<span>只看该作者</span>' +
                '</p>' +
                '</div>' +
                '<div class="note_content" data-id="' + list[i].id + '"  data-uid="' + list[i].uid + '">' + list[i].content + '</div>' +
                '<div class="note_setconfig">' +
                '<span class="thumbs_up" style="color: rgb(153, 153, 153);">' + list[i].like + '</span>' +
                    //'<span><img style="width: 20px;"  src="../img/forumDetail/cai.png"/>0</span> &nbsp;&nbsp;' +
                    //'	<span>举报</span>' +
                '<span class="setrestore">回复</span>' +
                    //内层回复
                '<div class="restore_list">' +
                '<ul>';
                if (reply.length > 0) {
                    for (var j = 0; j < reply.length; j++) {
                        commentlist +=
                            '<li class="innerLi clearfix" data-userid=' + reply.id + ' data-ids="{id:+reply[j].id+,pid:+reply[j].pid+,cid:+reply[j].cid+,uid1:+reply[j].uid1+,uid2:+reply[j].uid2+}">' +
                            '<img src="../img/forumDetail/f3.jpg" alt="" />' +
                            '<div class="restore_right">' +
                            '<span class="restore_name">' + reply[j].name1 + '</span>&nbsp;:' +
                            '<span class="substance_name">' + reply[j].content + '</span>' +
                            '<p class="restore_time">' +
                            '<span>' + reply[j].time + '</span>' +
                            '<a href="javascript:;">回复</a>' +
                            '</p>' +
                            '</div>' +
                            '</li>';
                    };
                };
                commentlist += '</ul>' +
                    '<div class="restore_text">' +
                    '<textarea class="text"></textarea>' +
                    '<input type="submit" id="submit" value="发表" />' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                };
            $('.comment-list').append(commentlist);

    };

    // 点赞功能接口接口
    $('.host_note').delegate('.thumbs_up', 'click', function () {
        if ($(this).hasClass('active'))return;
        var $this = $(this) //获取当然点击的对象
        var index = $('.thumbs_up').index($(this));
        var id = $('.note_content').eq(index).data('id');//获取层内容的id
        var cid;
        id == undefined ? cid = '' : cid = id; //判断
        getLikeNUmber(id);
        if (username != undefined) { //判断是否有登录
            $(this).addClass('active');
            if (isThumbsUp == 1) {
                var num = parseInt($(this)[0].innerHTML) + 1;
                this.innerHTML = num;
                $.ajax({
                    url: 'http://192.168.11.111/Apply/bbs/index/like',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        pid: pid,    //主题帖的ID (唯一标识)
                        cid: cid  //层内容的ID；不传值时为点赞楼主，传值是点赞层主
                    },
                    success: function (data) {
                        var code = data.code
                        if (code == 1000) {
                            $this.css('color', 'red')
                        }
                    }
                });
            };
        } else {
            $('.prompt-login').show();
            setTimeout(function () {
                window.location.href = './loginff.html';
            }, 2000)
        };
    });


    //"is_like": 1,   //当前浏览用户能否被点赞 1：能 0：不能
    function getLikeNUmber(id) {
        var storage = localStorage['load'] //获取数据
        if (!storage) return;
        var jsonData = JSON.parse(storage);//将字符串解析为对象
        //获取楼主下的is_like
        var floorHost = jsonData.data;
        var hostId = floorHost['is_like']
        isThumbsUp = hostId;
        //获取评论人下的is_like
        var contentList = jsonData.data.list
        $.each(contentList, function (key, item) {
            var _contentId = item['id']
            if (id == _contentId) {
                var isLike = item['is_like']
                isThumbsUp = isLike;
            }
        });
    };

    //   点击 回复显示与隐藏
    var setrestore = $(".setrestore");
    $('.comment-list').delegate('.setrestore', 'click', function () {
        if (username == undefined) {
            $('.prompt-login').show();
            setTimeout(function () {
                window.location.href = './loginff.html';
            }, 2000)
        } else {
            $(this).toggleClass("current")
            $(this).siblings('.restore_list').toggle()
        };

    });

    //点击收藏改变颜色
    var store = $(".store");
    var storeFlag = true;
    $('.note_content ').delegate('.store', 'click', function () {
        if (storeFlag) {
            storeFlag = false;
            $(this).css("color", "#df5000");
        } else {
            $(this).css("color", "#999");
            storeFlag = true;
        }
    });

    //点击举报改变颜色
    $('.note_content').delegate('.report','click',function(){
        if (storeFlag) {
            storeFlag = false;
            $(this).css("color", "#df5000");
        } else {
            $(this).css("color", "#999");
            storeFlag = true;
        }
    });

    //获取层回复内容参数
    function reply(id, textarea) {
        return {
            id: id.data('id'),
            self: username,
            content: textarea.val(),
            time: getTime(new Date() * 1)
        }
    };

    //创建层内回复列表
    function innerDiv(ul, replyData) {
        var innerlist =
            '<li class="innerLi clearfix" data-userid=' + replyData.id + ' data-ids="{id:+reply[j].id+,pid:+reply[j].pid+,cid:+reply[j].cid+,uid1:+reply[j].uid1+,uid2:+reply[j].uid2+}">' +
            '<img src="../img/forumDetail/f3.jpg" alt="" />' +
            '<div class="restore_right">' +
            '<span class="restore_name">' + replyData.self + '</span>&nbsp;:' +
            '<span class="substance_name">' + replyData.content + '</span>' +
            '<p class="restore_time">' +
            '<span>' + replyData.time + '</span>' +
            '<a href="javascript:;">回复</a>' +
            '</p>' +
            '</div>' +
            '</li>';
        ul.append(innerlist);
    };

    // 层内容回复接口
    $('.comment-list').delegate('#submit', 'click', function () {
        var $ids = $(this).closest('.note_setconfig').siblings('.note_content')
        var ul = $(this).closest('.restore_text').siblings('ul');
        var $texrtarea = $(this).siblings(); //获取 文本内容
        $.ajax({
            type: "POST",//数据发送的方式（post 或者 get）
            url: "http://192.168.11.111/Apply/bbs/index/replyLayer",//要发送的后台地址
            data: {  //要发送的数据（参数）
                pid: pid,    //被评论主题帖的ID
                cid: $ids.data('id'),   //被评论内容的ID 即 层内容的ID
                ruid: $ids.data('uid'),    //被回复用户ID
                content: $texrtarea.val()  //评论内容
            },
            dataType: "json",//后台处理后返回的数据格式
            success: function (result) {
                console.log(result)
                if (result.code == 1000) {
                    var replyData = reply($ids, $texrtarea);
                    innerDiv(ul, replyData);
                    $texrtarea.val("");
                }
            }
        });
        return false;
    });


    //页面生成
    function pageCreate(pagesAll){
        var pageNum = $('.pageNum');
        console.log(pagesAll)
         pageNum.empty();

        for (var i = 0; i < pagesAll; i++) {
            var a = $('<a class="pageA" herf="javascript:;">')
            a.html(i + 1);
            a.on('click', function () {
                window.location.hash = "page=" + this.innerHTML;
                $(this).addClass('active').siblings().removeClass('active');
            })
            pageNum.append(a)
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
            if(hash>=pagesAll){
                hash=pagesAll
            }else{
                hash++;
            }
            window.location.hash = "page=" + hash;

            $('.pageA').eq(hash - 1).addClass("active").siblings().removeClass("active")
        });

        //首页
        $('.homePage').on('click', function () {
            var hash = window.location.hash.split('=')[1];
            window.location.hash = 'page=1';
            $('.pageA').eq(0).addClass("active").siblings().removeClass("active")
        });

        window.onhashchange = function () {
            var hash = window.location.hash.split('=')[1];
            console.log(hash)
            $.ajax({
                url: 'http://192.168.11.111/Apply/bbs/index/commentList',
                data: {
                    pid: pid,
                    page:hash,    //跳转页码
                    row:8   //每页显示条数
                },
                dataType: 'json',
                type: "GET",
                success: function (result) {
                    if (result.code == 1000) {
                        var list = result.data.list;
                        $('.comment-list').empty();
                        creatDiv(list);
                    }
                }
            })
        };

    };


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


})