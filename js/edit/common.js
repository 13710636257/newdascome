/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/12.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/12.
 */
define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');


    var User = function (options) {
        if (!this instanceof User) return new User(options);
        this._init(options);
    };
    User.prototype = {
        constructor: User,
        _init: function (options) {
            this.username = options.username;
        },
        //登录
        login: function (url, callback) {
            callback.call(this, url);
        },
        //退出
        quit: function (url, callback) {
            //callback.call(this, arguments);
            callback.call(this, url);
        },
        //注册
        register: function (url, callback) {
            // callback.call(this, arguments);
            callback.call(this, url);
        }
    };
//给不同的请求给予信息提示
    var Message = {
        error: function (receiver, msg) {
            if (receiver.css('display') === 'block')  receiver.html(msg);
            else receiver.show().html(msg);
        },
        warning: function (receiver, msg) {
            if (receiver.css('display') === 'block')  receiver.html(msg);
            else receiver.show().html(msg);
        },
        success: function (msg) {
            alert(msg);
        },
        //网页跳
        flag: 'bG92ZQ==eW91',//love you
        //缓存数据
        //登录信息
        kn: 'X2R0',//_dt
        //当前选中的打印机序列号
        sn: 'bmV3LXNu',//new-sn
        handleErr: function (err) {
            console.log(err);
        }
    };
//添加或取消 disabled 属性
    var assist = {
        pass: function (btn, config) {
            var _btn;
            if (typeof btn === 'string' || (typeof btn === 'object' && !(btn instanceof jQuery))) {
                _btn = $(btn);
            } else if (btn instanceof jQuery) {
                _btn = btn;
            }
            var activeBg = '#029AFF', activeC = '#fff';
            if (!config) {
                var _bg = activeBg,
                    _color = activeC;
            } else {
                _bg = config.bg || activeBg;
                _color = config.color || activeC;
            }
            _btn.removeAttr('disabled').css({
                backgroundColor: _bg,
                color: _color
            })
        },
        prevent: function (btn, config) {
            var _btn;
            if (typeof btn === 'string' || (typeof btn === 'object' && !(btn instanceof jQuery))) {
                _btn = $(btn);

            } else if (btn instanceof jQuery) {
                _btn = btn;
            }
            var disabledBg = '#B7B7B7', disabledC = '#fff';
            if (!config) {
                var _bg = disabledBg,
                    _color = disabledC;
            } else {
                _bg = config.bg || disabledBg;
                _color = config.color || disabledC;
            }


            _btn.attr('disabled', 'disabled').css({
                backgroundColor: _bg,
                color: _color
            })
        }
    };

    //华健
    var s = {
        //默认
        u: {
            host: 'https://www.dascomyun.cn',
            path: '/devctrl/cloud/printers'
        }
    };
    // 君
    var u = {
        o: {
            //host: 'http://192.168.11.108:12000',
            host: 'https://www.dascomyun.cn',
            path: '/v1.0/common/session',
            version: '/v1.0',
           // x: 'http://192.168.11.108:12000/v1.0.0/common/session'
            x: 'https://www.dascomyun.cn/v1.0/common/session'
        }
    };

    var port = {
        //获取打印列表
        printers: function () {
            return s.u.host + s.u.path;
        },
        //修改打印机别名
        alias: function (options) {
            return s.u.host + '/devctrl/v1.0/cloud/pdateAlias?id=' + options.id + '&token=' + options.token;
        },
        //获取打印模板
        print: function (sn) {
            return s.u.host + '/devctrl/v1.0/dev/print/' + sn;

        },
        //获取ip
        getIP: function () {
            return s.u.host + '/devctrl/cloud/getIP';
        },
        ////////////////////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////////
        //注册
        register: function () {
            return u.o.host + u.o.version + '/common/users';
        },
        //登录
        login: function () {
            return u.o.x;
        },
        //退出
        quit: function () {
            return u.o.x;
        }
    }


//官网页面
    var pages = {
        0: 'register',
        1: 'login',
        2: 'index',
        4: 'cloud-print',
        5: 'edit-template',
        6: 'manage-printers',
        7: 'cloud-space',
        8: 'picture-print',
        9: 'document-print',
    };
//跳转连接
    var Storage = {
        //类型输入的
        //这种方式设置不方便
        type: function (ws) {
            return ws || sessionStorage;
        },
        //是否支持
        is: function (ws) {
            var o = false;
            if (ws && ws.setItem) {
                o = true;
                var key = '__' + Math.random();
                try {
                    ws.setItem(key, key);
                    ws.removeItem(key);
                } catch (e) {
                    o = false;
                }
            }
            return o;
        },
        // key只允许字符串
        legal: function (key) {
            if (typeof(key) === 'string') {
                return key;
            } else if (typeof(key) === 'number' || key instanceof Array || key instanceof Date) {
                return key.toString();
            }
            throw "输入的键，只允许是 数字，字符串或是数组,日期"
        },
        //序列化
        fy: function (value) {
            return JSON.stringify(value);
        },
        //解析
        ps: function (value) {
            return JSON.parse(value);
        },
        //设置
        set: function (key, value, config) {
            var is = this.is(sessionStorage),
                k = this.legal(key)
                , v = this.fy(value);//传进来为一个数组
            if (value === undefined) throw '必须要输入有效的值';
            if (is) {
                sessionStorage.setItem(k, v);
            } else {
                if (config && config.o)  config.o(k, v);
            }
            return v;
        },
        //获取指定key 的解析后的对象
        get: function (key) {
            var k = this.legal(key), _this = this;
            try {
                //判断是否存在 存在解析
                var value = sessionStorage.getItem(key);
                try {
                    value = _this.ps(value);
                } catch (e) {
                    console.log(e);
                }
                return value;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        //删除指定的key/value
        remove: function (key) {
            this.legal(key);
            try {
                sessionStorage.remove(key);
            } catch (e) {
                console.log(e)
            }
        },
        //清除
        clear: function () {
            try {
                //判断是否存在 存在解析
                sessionStorage.clear();
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        //截取 值的长度
        slice: function (key, length) {
            var k = this.legal(key), _this = this;
            try {
                //判断是否存在 存在解析
                var value = sessionStorage.getItem(k);
                value = _this.ps(value);
                if (value instanceof Array) {
                    value.splice(0, length);
                }
                return value;
            } catch (e) {
                console.log(e);
                return false;
            }
        }
    };
//web 链接
    var Orientate = function (options) {
        this.init(options);
    };
    Orientate.prototype = extend({}, Storage);
    Orientate.prototype.constructor = Orientate;
    Orientate.prototype.init = function (options) {
        if (!options) {
            this.key = Message.flag;
        } else {
            this.key = options.key || Message.flag;
        }


        this.location = window.location.href;
        this.simulate();

    };
    Orientate.prototype.simulate = function () {
        var key = this.key
            , url = this.location;
        this.legal(key);
        if (!url) throw '设置的值，一定要存在且为url';
        function output(b) {
            var o = '';
            b.replace(/(.+\/)(.+\.html)(.*)/, function ($1, $2, $3) {
                //获取到页面的名字值
                o = $3;
                //console.log('res: ' + $1)
                //console.log('replace的$3: ' + o) //edit-template.html
            });
            for (var key in pages) {
                if (pages.hasOwnProperty(key)) {
                    if (pages[key] + '.html' == o) {
                        //console.log('对应的页面的 键 ： ' + key);
                        return key;//一遍历到相等便返回 key
                    }
                }
            }
        }

        //切割函数
        function cut(arr, item) {
            var len = arr.length, last = arr[len - 1];
            //如果是为空的话 push
            //不是的话，截取最后的一个值比较是否与目前添加的相同
            //不相同才 push
            //不用理 数组是否为空
            //return arr
            if (item != '0') {
                //把注册界面干掉不做记录
                //解决：因为注册界面 为 0 时候总是 跳转到 1
                last === item ? arr.splice(-1, 1, item) : arr.push(item);
            }
            return arr;
        }

        //获取转换的 数字
        var number = output(url);
        //console.log('output函数输出的value: ' + number);
        try {
            var data = this.get(key);
            if (data) {
                data = this.ps(data);
            } else {
                data = [];
            }
            var __data = cut(data, number);
            this.set(key, this.fy(__data));
        } catch (e) {
            console.log(e);
            return false;
        }
    };
    Orientate.prototype.go = function () {
        var _this = this
            , key = this.key
            , root = this.location

        //获取标志
        function sign(_key) {
            var data = _this.get(_key);
            data = _this.ps(data);
            data.reverse();//颠倒过来
            var len = data.length
                , i = 1
                , web = 2;
            //console.log(data);
            if (len == 1) {
                // console.log('len=1: ' + web);
                return web;//直接是在登录页面登录，直接跳转到主页
            }

            for (; i < len; i++) {
                if (data[i] != '0' || data[i] != '1') {
                    // console.log('data[i] : ' + data[i]);
                    //console.log('索引 i:  ' + i);
                    return data[i];
                } else if (data[i] == undefined || data[i] == null) {
                    //console.log('undefined : ' + 2);
                    return 2;
                }
            }
        }

        //连接
        function fly(number) {
            number = parseInt(number);
            var path = '';
            root.replace(/(.+\/)(.+)/, function ($1, $2) {
                //获取到页面的名字值
                //console.log('res: ' + $1)
                //console.log('replace的$2:path*** ' + $2)
                path = $2;

            });
            //localStorage.setItem('absolute', path + pages[number] + '.html')
            location.href = path + pages[number] + '.html';
        }


        try {
            var number = sign(key);
            fly(number)
        } catch (e) {
            console.log(e);
            location.href = pages['2'] + '.html';
        }
    };
//切换顶部通栏的 登录与退出页面显示
//登录成功后，把 '登录' ==》用户名
//把'注册' ==》'退出'
//页面
    function switcher(flag, username) {
        var $login = $('.login-box'),
            $user = $('.login-username'),
            _username = username || '',
            index = 0;
        flag ? index = 1 : index = 0;
        $login.eq(index).addClass('login-active').siblings().removeClass('login-active');

        $user.html(_username);
    }

//禁止默认行为
    function preventDefault(t) {
        var n = t || window.event;
        n.preventDefault ? n.preventDefault() : n.returnValue = !1;
    }

//阻止冒泡
    function stopPropagation(t) {
        var n = t || window.event;
        n.stopPropagation ? n.stopPropagation() : n.cancelBubble = 1;
    }

//复制
    function extend() {
        var key, i = 0, len = arguments.length, target = null, src;
        if (len === 0) {
            return;
        } else if (len === 1) {
            target = this;
        } else {
            i++;
            target = arguments[0];
        }
        for (; i < len; i++) {
            for (key in arguments[i]) {
                src = arguments[i];
                if (arguments[i].hasOwnProperty(key)) {
                    target[key] = src[key];
                }
            }
        }
        return target;
    }

//公用
    function must() {
        try {
            var data = JSON.parse(localStorage.getItem(Message.kn))
                , token = data['token']
                , user = data['user']
                , id = data['id'];
            return {
                token: token,
                id: id,
                username: user
            }
        } catch (e) {
            return null;
        }
    }


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

                '<div class="account-setting">' +
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
                '<li class="support"><img src="../img/public/group_nav_support.jpg"/><p>得实在线技术支持，驱动下载，无论你遇到任何问题，我们都将随时为你提供服务。</p></li>' +
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
        localStorage.setItem('Y2Fp', Math.random().toString(28));//cai test
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
            var LOGIN_URL = port.login()
            user.login(LOGIN_URL, function (url) {
                $.ajax({
                    url: url,
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
                            forum(data);
                            ////////////////////
                            web.go();

                            setTimeout(function () {
                                //清空信息
                                $noteText.html('');
                                $user.val('');
                                $pwd.val('');
                            }, 500);
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
                            console.log('201 ' + data.id)
                            console.log(data);
                            Message.warning($noteText, 'success');
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

            var QUIT_URL = port.quit()
            user.quit(QUIT_URL, function (url) {
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
                    url: url,
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
        //清除输入框的内容
        var $form = $('.login-form'), $win = $(window);
        $form.on('click', '.fa-times', function () {
            var $this = $(this)
                , $sibling = $this.siblings('input');
            $sibling.val('');
        });
        //给登录输入框焦点事件
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
        });
        //论坛
        function forum(data) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: "http://192.168.11.211/Apply/User/login/getToken",
                data: data,
                success: function (res) {
                    console.log(res);
                    if (res.status == 1) {
                        console.log('论坛通知登录成功')
                    }
                }
            })
        }
    });
    $(function () {
//	导航栏出现隐藏
        var timer = null
        $('.navtitle').each(function (i, ele) {
            $('.navtitle').eq(i).mouseenter(function () {
                clearTimeout(timer);
                $('.list').hide()
                    .eq(i).slideDown(800)
                    .eq(i).show();

            }).mouseleave(function () {
                timer = setTimeout(function () {
                    $(".list").eq(i).hide();
                }, 200)
            });

            $(".list").eq(i).mouseenter(function () {
                clearTimeout(timer);
            }).mouseleave(function () {
                timer = setTimeout(function () {
                    $(".list").eq(i).hide();
                }, 200)
            })
        });

        $('.searchAll').click(function () {
            $('.sch').fadeToggle(100);
        });


        //个人中心显示与隐藏
        var data = must();
        if (data) { //用户名存在时
            $('.login-active').hover(function () {
                $('.account-setting').show();
            }, function () {
                $('.account-setting').hide();
            })
        }

    });


    module.exports = {
        User: User,
        Orientate: Orientate,
        getUserData: must,
        extend: extend,
        preventDefault: preventDefault,
        stopPropagation: stopPropagation,
        toggleView: switcher,
        Port: port,
        Message: Message,
        Assist: assist
    }

});
