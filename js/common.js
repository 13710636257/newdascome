/**
 * Created by a on 2017/8/28.
 */

$(document).ready(function () {
    'use strict';
    (function () {
        var footer = '<div class="service_info">' +
            '<div class="info_content clearfix">' +
            '<div class="footnav">' +
            '<h3>产品系列</h3>' +
            '<ul>' +
            '<li><a href="javascript:;">家用系列</a></li>' +
            '<li><a href="javascript:;">商用系列</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="footnav"><h3>服务支持</h3>' +
            '<ul>' +
            '<li><a href="javascript:;">驱动、固件下载</a></li>' +
            '<li><a href="javascript:;">服务机构查询</a></li>' +
            '<li><a href="javascript:;">常见问题</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="footnav">' +
            '<h3>购买指南</h3>' +
            '<ul>' +
            '<li><a href="javascript:;">经销商查询</a></li>' +
            '<li><a href="javascript:;">专卖店</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="footnav"><h3>关于得实</h3>' +
            '<ul>' +
            '<li><a href="javascript:;">公司简介</a></li>' +
            '<li><a href="javascript:;">新闻资讯</a></li>' +
            '<li><a href="javascript:;">中国业务网络</a></li>' +
            '</ul>' +
            '</div>' +
            '<div class="footnav"><h3>关联网站</h3>' +
            '<ul>' +
            '<li><a href="javascript:;">得实中国合作伙伴门户</a></li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="service_copyright"><div class="copyright_content">' +
            '<div class="aboutus">' +
            '<a href="javascript:;">网站地图</a>' +
            '<a href="javascript:;">联系我们</a>' +
            '<a href="javscript;;">加入我们</a>' +
            '<a href="javascript:;">使用声明</a>' +
            '<a href="javascript:;">隐私政策</a>' +
            '</div><p>© 2013 版权所有 得实集团 京ICP备10012480号<span></span>粤公网安备 44070402440764号</p>' +
            '</div>' +
            '</div>';
        var header = '<div class="header">' +
            '<div class="head_logo"><img src="../img/home/ds-log3.png" alt="div"/></div>' +
            '<div class="searchAll"></div>' +
            '<div class="sch">' +
            '<input type="text" class="inputleft" placeholder="请输入搜索内容/关键字"/>' +
            '<input type="submit" class="rightbtn" value="搜索"/>' +
            '</div>' +
            '<div class="nav">' +
            '<div class="login_register">' +
            '<div class="login-box login-active">' +
            '<a class="login" href="login.html">登录</a>' +
            '<a class="register" href="register.html">注册</a>' +
            '</div>' +
            '<div class="login-box">' +
            '<span class="login-username"></span>' +
            '<button id="quit-btn">退出</button>' +
            
            '<div class="account-setting">'+
                '<dl>	' +
                '<dd><a href="personal-center.html">个人中心</a></dd>' +
                '<dd><a href="userProfile.html">账号设置</a></dd>' +
                '<dd><a href="moderator-application.html">申请版主</a></dd>' +
                '<dd><a href="expert-application.html">专家申请</a></dd>	' +
                '</dl>' +
            '</div>	' +
               
            '</div>' +
            '</div>' +
            '<ul class="navUl">' +
            '<li><a href="home.html" class="taba">首页</a></li>' +
            '<li class="navtitle"><a href="product.html" class="taba">产品</a></li>' +
            '<li class="navtitle"><a href="aplt-solution.html" class="taba">应用与解决方案</a></li>' +
            '<li><a href="forum.html" class="taba">社区论坛</a></li>' +
            '<li><a href="cloud-print.html" class="taba">云打印</a></li>' +
            '<li><a href="contact-DS.html" class="taba">联系得实</a></li>' +
            '</ul>' +
            '</div>' +
            '<ul class="menu">' +
            '<li class="list">' +
            '<ul class="product">' +
            '<li>' +
            '<p class="printer_title">证卡打印机<p/>' +
            '<img src="../img/public/dyj2.jpg"/>' +
            '<a href="">AR-700（证卡版）</a>' +
            '<a href="productList.html" class="checkmore">查看更多></a>' +
            '</li>' +
            '<li>' +
            '<p class="printer_title">标签打印机</p>' +
            '<img src="../img/public/dyj3.jpg"/>' +
            '<a href="">DL-520（桌面型条码</a><a href="productList.html" class="checkmore">查看更多></a>' +
            '</li>' +
            '<li>' +
            '<p class="printer_title">针式打印机</p>' +
            '<img src="../img/public/dyj6.jpg"/>' +
            '<a href="">DL-520（针式微型机）</a>' +
            '<a href="productList.html" class="checkmore">查看更多></a>' +
            '</li>' +
            '<li>' +
            '<p class="printer_title">报表打印机</p>' +
            '<img src="../img/public/dyj7.jpg"/>' +
            '<a href="">DL-520（特高速型）</a>' +
            '<a href="productList.html" class="checkmore">查看更多></a>' +
            '</li>' +
            '<li>' +
            '<p class="printer_title">移动打印机</p>' +
            '<img src="../img/public/dyj4.jpg"/>' +
            '<a href="">DP-530（便携式）</a>' +
            '<a href="productList.html" class="checkmore">查看更多></a>' +
            '</li>' +
            '<li>' +
            '<p class="printer_title">色带耗材</p>' +
            '<img src="../img/public/sd.jpg"/>' +
            '<a href="">106D-3（带芯型号）</a>' +
            '<a href="productList.html" class="checkmore">查看更多>' +
            '</a>' +
            '</li>' +
            '</ul>' +
            '</li>' +
            '<li class="list">' +
            '<ul class="applicationSolution">' +
            '<li>' +
            '<h3>热门话题</h3>' +
            '<p>打印机、驱动行业创新</p>' +
            '<p>如何正确高效的使用打印机</p>' +
            '<p>打印机涉及的领域</p>' +
            '<p>软件定义网络</p>' +
            '</li>' +
            '<li><h3>行业</h3><p>行政事业</p><p>医疗</p><p>保险</p><p>农业</p>' +
            '<a class="more" href="">查看更多></a></li>' +
            '<li><h3>产品及服务</h3><p>打印机</p><p>驱动下载</p><p>应用软件</p><p>售后服务</p><a class="more" href="">查看更多></a>' +
            '</li>' +
            '<li class="support"><img src="../img/public/head-img.jpg"/><p>得实在线技术支持，驱动下载，无论你遇到任何问题，我们都将随时为你提供服务。</p></li>' +
            '</ul></li><li class="list">' +
            '</li>' +
            '</ul>' +
            '</div>';
        //还真的不可以用直接用 document.querySelector() 设置innerHTML
        //因为公用的引入的 注册登录没有公用
        $('.public-footer').html(footer);
        $('.public-header').html(header);

    }());

    //获取是否存在用户登录信息
    var data = must();
    if (data) {
        var username = data.username;
        switcher(true, username)
    }
    //记录页面
    var web = new Orientate();
    ///////////////////////////////////
    localStorage.setItem('test', Math.random());
    //登录
    $('#login_btn').on('click', function () {
        var $user = $('#login_user')
            , $pwd = $('#login_pwd')
            , data = {
                user: $user.val(),//保持前后台参数一致
                pwd: $pwd.val()
            };
        ///////////////////////////////////
        //模拟登录，连接测试
        //登录成功 ，设置token id 到session
        //跟着跳转网页
        //localStorage.setItem(Message.kn, 'LocalStorage---ajax-data');
        //Storage.set(Message.kn, 'sessionStorage---ajax-data');
        //web.go();
        ///////////////////////////////////
        //新建一个用户
        var user = new User({
            username: $user.val()
        });
        var $noteText = $('.note-text');
        //获取的当前的value 把前后的空格值去除 再判断是否合法
        if ($.trim($user.val()).length == 0 || $.trim($pwd.val()).length == 0) return;
        ////////////////
        //  用户登录
        ////////////////
        user.login(u.login(), function () {
            $.ajax({
                url: u.login(),
                data: JSON.stringify(data),
                type: 'POST',
                dataType: 'json',
                headers: {"Content-Type": "application/json"},
                success: function (responseData) {
                    console.log(responseData);

                    //登录成功 紧随获取打印机列表数据
                    if (responseData.id) {
                        var data = {
                            user: $('#login_user').val(),
                            id: responseData.id,
                            token: responseData.token
                        };
                        var _data_ = $.extend({t: new Date().getTime()}, data)
                        /////////////////////
                        //保存登录信息数据
                        localStorage.setItem(Message.kn, JSON.stringify(_data_));
                        /////////////////////
                    }
                },
                error: function (xhr) {
                    console.log(xhr.status);
                    var code = xhr.status;
                },
                statusCode: {
                    500: function (xhr) {
                        console.log('500 ' + xhr.responseText)
                        var msg = JSON.parse(xhr.responseText).error;
                        Message.error($noteText, msg);
                    },
                    409: function (xhr) {
                        console.log('409 ' + xhr.responseText)
                        var msg = JSON.parse(xhr.responseText).error;
                        Message.warning($noteText, msg);
                    },
                    406: function (xhr) {
                        console.log('406 ' + xhr.responseText)
                        var msg = JSON.parse(xhr.responseText).error;
                        Message.warning($noteText, msg);
                    },
                    404: function (xhr) {
                        console.log('404 ' + xhr.responseText)
                        var msg = JSON.parse(xhr.responseText).error;
                        Message.warning($noteText, msg);
                    },
                    401: function (xhr) {
                        console.log('401 ' + xhr.responseText)
                        var msg = JSON.parse(xhr.responseText).error;
                        Message.warning($noteText, msg);
                    },
                    400: function (xhr) {
                        console.log('400 ' + xhr.responseText)
                        var msg = JSON.parse(xhr.responseText).error;
                        Message.warning($noteText, msg);
                    },
                    201: function (data) {
                        //为何成功的返回 来的就是 ： 数据
                        //上面的就是 xhr 对象
                        console.log('201 ' + data)
                        console.log(data);
                        Message.warning($noteText, 'success');

                        //成功登陆后，返回上一页面
                        //同事处理，解决返回：上一页面不是 官网的页面
                        //例如：本来在百度搜索页面，再复制官网的登录页面，在此登录，返回一页面就是 百度的搜索的压面
                        //9-15:解决 注册成功跳转到登录，又跳回 注册页面 太多情况，还是解决不了的
                        //
                        ///////////////
                        // var go = sessionStorage.getItem('io');//login
                        // var here = sessionStorage.getItem('oi');//register
                        // if (go) {
                        //     if (!here) {
                        //         setTimeout(function () {
                        //            history.back();
                        //             Links.go('bG92ZQ==eW91');
                        //             //清空信息
                        //             $noteText.html('');
                        //             $user.val('');
                        //             $pwd.val('');
                        //         }, 400)
                        //     } else {
                        //         location.href = "index.html"
                        //     }
                        // } else {
                        //     location.href = "index.html"
                        // }

                        //9-17 ：用了我几个小时，终于写好跳转的插件 凌晨差不多三点了
                        setTimeout(function () {
                            web.go();
                            //清空信息
                            $noteText.html('');
                            $user.val('');
                            $pwd.val('');
                        }, 400);
                        ///////////////
                    },
                    200: function () {
                        console.log('200 OPTIONS预请求')
                    },
                    0: function () {
                        console.log('0 OPEN 初始化失败！');
                        Message.error($noteText, '服务器错误')
                    }

                }
            })
        });
    });
    //退出
    $('#quit-btn').on('click', function () {
        var data = localStorage.getItem(Message.kn);

        if (!data) {
            console.log('因为清除浏览器的缓存，把 web Storage 的数据清除掉，没有token获取失效');
            //手动进行处理这种状况，让其页面为正常退出的显示 并且不发送退出请求
            switcher(false);
            return false;
        }
        data = JSON.parse(data);
        var user = new User({
            username: data['user']
        });

        user.quit(u.quit(), function () {
            //2: 闭包保存 token
            //问题：只要刷新页面 token 就获取不了 ，报错 Uncaught ReferenceError: tokenClosure is not defined
            //与 localStorage 清除数据后，按退出一样的错误
            //var token = tokenClosure();

            //清除浏览器数据，再按退出
            // 报错：manage-printers.js:249 Uncaught TypeError: Cannot read property 'token' of null
            //原因：因为退出要携带 token,获取不了


            //3:保存在 某元素的 data 属性上 data-token
            //只要刷新页面 token 就获取不了 ，报错 undefined
            $.ajax({
                url: u.quit(),
                type: 'DELETE',
                dataType: 'json',
                headers: {
                    "Authorization": 'Bearer ' + data['token']//注意格式：有空格
                },
                success: function (response) {
                    console.log('success回调没有数据返回' + response);
                    ////////////////////////////////////////////
                    //清除登录的数据
                    localStorage.removeItem(Message.kn);
                    ////////////////////////////////////////////

                    //清空打印机列表
                    // $('.printers-list').empty();
                },
                error: function (xhr, code, err) {
                    console.log('textStatus：' + code);
                    //执行了退出错误也让页面退出显示
                    switcher(false);
                    ////////////////////////////////////////////
                    //清除登录的数据
                    localStorage.removeItem(Message.kn);
                    ////////////////////////////////////////////
                },
                statusCode: {
                    401: function () {
                        console.log('401 退出登录失败')
                    },
                    204: function () {
                        console.log('204 退出登录成功');
                        switcher(false);
                    }
                }
            })
        })
    });

    //给删除绑定清除事件
    var $form = $('.login-form'), $win = $(window);
    $form.on('click', '.fa-times', function () {
        var $this = $(this)
            , $sibling = $this.siblings('input');

        $sibling.val('');
    });
    $form.on('focusin focusout', '.login-input', function (event) {
        var type = event.type || window.event.type, $this = $(this);
        console.log(type)
        switch (type) {
            case 'focusin':
                $this.addClass('focus');
                break;
            case 'focusout':
                $this.removeClass('focus');
                break;
        }
    });


    $win.bind({
        //绑定回车 登录
        keydown: function (event) {
            var e = event || window.event
                , code = e.keyCode || e.which || e.charCode;
            if (code === 13) $('#login_btn').trigger('click');
        },
        //关闭浏览器清除localStorage
        //检测不到关闭动作
        beforeunload: function (event) {
            var e = event || window.event, y = e.clientY;
            if (y <= 0//点击浏览器或者选项卡的关闭按钮
                || y >= Math.max(document.body ? document.body.clientHeight : 0, document.documentElement ? document.documentElement.clientHeight : 0)//点击任务栏的关闭按钮
            ) {
                //IE 和 Firefox
                // e.returnValue = "确定要刷新或关闭浏览器窗口？";
                // localStorage.removeItem(Message.kn);
                console.log('关闭？')
            }
            //谷歌
            //return "确定要刷新或关闭浏览器窗口？";
            //localStorage.removeItem(Message.kn);
        },
        storage: function (event) {
            var e = event || window.event;
            console.log(e.originalEvent);


        }
    })
});
$(function () {
//	导航栏出现隐藏
    var timer = null
    $('.header .navtitle').each(function (i, ele) {
        $('.header .navtitle').eq(i).mouseenter(function () {
            clearTimeout(timer);
//		$(this).addClass("navbackgroud").siblings().removeClass("navbackgroud")
            $('.list').hide();
            $(".list").eq(i).slideDown(500);
            $(".list").eq(i).show();

        }).mouseleave(function () {
            timer = setTimeout(function () {
                $(".list").eq(i).hide();
            }, 200)
        })

        $(".list").eq(i).mouseenter(function () {
            clearTimeout(timer);
        }).mouseleave(function () {
            timer = setTimeout(function () {
                $(".list").eq(i).hide();
            }, 200)
        })
    })

    //搜索按钮点击显示隐藏
    $('.searchAll').click(function () {
        $('.sch').fadeToggle(100);
    })


});



