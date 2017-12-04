/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/17.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/17.

 */
/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/11.

 */
'use strict';
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
        callback(this, arguments);
    },
    //退出
    quit: function (url, callback) {
        callback.call(this, arguments);
    },
    //注册
    register: function (url, callback) {
        callback.call(this, arguments);
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
    flag: 'bG92ZQ==eW91',
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
}
//华健
var s = {
    //默认
    u: {
        host: 'http://192.168.11.211:8080',
        path: '/devctrl/cloud/printers',
    },
    //获取打印列表
    printers: function () {
        return s.u.host + s.u.path;
    },
    //获取打印列表
    alias: function (sn) {
        return s.u.host + '/devctrl/cloud/' + sn + '/updateAlias';
    },
    //获取打印模板
    print: function (sn) {
        return s.u.host + '/devctrl/dev/' + sn + '/print';
    }

};
// 君
var u = {
    o: {
        host: 'http://192.168.11.211:12000',
        path: '/common/session/',
        x: 'http://192.168.11.211:12000/common/session/'
    },
    //注册
    register: function () {
        return u.o.host + '/common/users';
    },
    //登录
    login: function () {
        return u.o.x;
    },
    //退出
    quit: function () {
        return u.o.x;
    }
};
//切换顶部通栏的 登录与退出页面显示
//登录成功后，把 '登录' ==》用户名
//把'注册' ==》'退出'
//页面
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
    10: 'links'
};
//跳转连接
var Links = {
    is: function (le) {
        var o = false;
        if (le && le.setItem) {
            o = true;
            var key = '__' + Math.round();
            try {
                le.setItem(key, key);
                le.removeItem(key);
            } catch (err) {
                o = false;
            }
        }
        return o;
    },
    // key只允许字符串
    legal: function (key) {
        if (typeof(key) === 'string') {
            return key;
        } else if (typeof(key) === 'number' || key instanceof Array) {
            return key.toString();
        }
        throw "输入的键，只允许是 数字，字符串或是数组"
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
    //获取
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
    },
    //模拟存储
    simulate: function (key, url) {
        console.log('url : ' + url);
        this.legal(key);
        if (!url) throw '设置的值，一定要存在且为url';
        function output(b) {
            var o = '';
            b.replace(/(.+\/)(.+\.html)(.*)/, function ($1, $2, $3) {
                //获取到页面的名字值
                o = $3;
                console.log('replace的$3: ' + o)
            });
            for (var key in pages) {
                if (pages.hasOwnProperty(key)) {
                    if (pages[key] + '.html' == o) {
                        console.log('对应的页面的 键 ： ' + key);
                        return key;
                    } else {
                        //避免在测试 不是属于官网的网页，又在同域运行，
                        // 且该些网页又不在 pages对象中
                        //避免 return undefined
                        // return '1';
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

        var number = output(url);
        console.log('output函数输出的value: ' + number);
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

    },
    //跳转
    go: function (key) {
        var _this = this;

        function sign(_key) {
            var data = _this.get(_key);
            data = _this.ps(data);
            data.reverse();//颠倒过来
            var len = data.length
                , i = 1
                , web = 2;
            console.log(data);
            if (len == 1) {
                console.log('len=1: ' + web);
                return web;//直接是在登录页面登录，直接跳转到主页
            }

            for (; i < len; i++) {
                if (data[i] != '0' || data[i] != '1') {
                    console.log('data[i] : ' + data[i]);
                    console.log('索引 i:  ' + i);
                    return data[i];
                } else if (data[i] == undefined) {
                    console.log('undefined : ' + 2);
                    return 2;
                }
            }
        }

        function fly(number) {
            number = parseInt(number);
            location.href = pages[number] + '.html';
        }

        try {
            var number = sign(key);
            fly(number)
        } catch (e) {
            console.log(e)
            location.href = pages['2'] + '.html';
        }
    }
};

var Orientate = function (options) {
    this.init(options);
};
Orientate.prototype = extend({}, Links);
Orientate.prototype.constructor = Orientate;
Orientate.prototype.init = function (options) {
    if (!options) {
        this.key = Message.flag;
    } else {
        this.key = options.key || Message.flag;
    }
    this.location = window.location.href;
    this.simulate(this.location);
};
Orientate.prototype.simulate = function (url) {
    var key = this.key,_this = this;

    console.log('url : ' + url);
    console.log( Orientate.prototype);
    this.legal(key);
    if (!url) throw '设置的值，一定要存在且为url';
    function output(b) {
        var o = '';
        b.replace(/(.+\/)(.+\.html)(.*)/, function ($1, $2, $3) {
            //获取到页面的名字值
            o = $3;
            console.log('replace的$3: ' + o)
        });
        for (var key in pages) {
            if (pages.hasOwnProperty(key)) {
                if (pages[key] + '.html' == o) {
                    console.log('对应的页面的 键 ： ' + key);
                    return key;
                } else {
                    //避免在测试 不是属于官网的网页，又在同域运行，
                    // 且该些网页又不在 pages对象中
                    //避免 return undefined
                    // return '1';
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

    var number = output(url);
    console.log('output函数输出的value: ' + number);
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
        , key = this.key;

    function sign(_key) {
        var data = _this.get(_key);
        data = _this.ps(data);
        data.reverse();//颠倒过来
        var len = data.length
            , i = 1
            , web = 2;
        console.log(data);
        if (len == 1) {
            console.log('len=1: ' + web);
            return web;//直接是在登录页面登录，直接跳转到主页
        }

        for (; i < len; i++) {
            if (data[i] != '0' || data[i] != '1') {
                console.log('data[i] : ' + data[i]);
                console.log('索引 i:  ' + i);
                return data[i];
            } else if (data[i] == undefined) {
                console.log('undefined : ' + 2);
                return 2;
            }
        }
    }

    function fly(number) {
        number = parseInt(number);
        location.href = pages[number] + '.html';
    }

    try {
        var number = sign(key);
        fly(number)
    } catch (e) {
        console.log(e)
        location.href = pages['2'] + '.html';
    }
};

function switcher(flag, username) {
    var $login = $('.login-box'),
        $user = $('.login-username'),
        _username = username || '',
        index = 0;

    //登录状态
    /* if (flag) {
     $login.eq(1).addClass('login-active').siblings().removeClass('login-active');
     } else {
     //退出状态
     $login.eq(0).addClass('login-active').siblings().removeClass('login-active');
     }*/

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



