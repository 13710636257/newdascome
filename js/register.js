/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/11.
 */
(function ($) {
    'use strict';
    var Buttons = {
        image: $('.change-btn'),
        register: $('#register-btn')
    };
    var inputArea = {
        username: $('#register-username'),
        password: $('#register-password'),
        again: $('#confirm-password'),
        phone: $('#register-mobile'),
        email: $('#register-email'),
        code: $('#verify-number'),
        checkBox: $('#protocol'),
        isAllPass: false
    };
    //输入字段对象
    var Fields = function (options) {
        if (!options) {
            throw   'options参数是一个对象';
        } else if (!options.targetNode || ( options.targetNode && !(options.targetNode instanceof jQuery))) {
            throw   '请指定一个存在字段的jQuery对象';
        }

        this.init(options)
    };
    Fields.prototype = {
        constructor: Fields,
        init: function (options) {
            this.targetNode = options.targetNode;//目标输入框
            this.tip = this.targetNode.siblings('ul');//提示框
            this.url = options.url;//验证接口 url


            if (options.input && $.isFunction(options.input)) {
                this.input(options.input);
            }
            if (options.send && $.isFunction(options.send)) {
                this.change(options.send);
            }

            this.in(options.in);
            this.out();
        },
        in: function (cb) {
            var $ul = this.tip;
            this.targetNode.on('focusin', function () {
                $ul.fadeIn(100);
                var $this = $(this);
                if (cb && $.isFunction(cb)) {
                    cb($this, $ul);
                }
            })
        },
        out: function () {
            var $ul = this.tip;
            this.targetNode.on('focusout', function () {
                $ul.fadeOut(100);
            })
        },
        change: function (send) {
            var _this = this;
            this.targetNode.on('change', function () {
                var val = $(this).val();
                send(_this.url, val);
            });

        },
        input: function (input) {
            var $ul = this.tip;
            this.targetNode.on('input', function () {
                var $this = $(this);
                //   input.call(this, arguments);
                input($this, $ul);
            })
        }
    };

    //校验
    var Verify = {
        word: function (value) {
            var w = /./;
            return w.test(value);
        },
        isPhoneNumber: function (number) {
            var n = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            return n.test(number);
        },
        isEmail: function (email) {
            //只是判断格式是否符合   5@e.c   也是true 的
            // 邮箱后缀又不一样 无法固定 还有前缀的 每段字符数目又无法控制
            //只能是对格式做判断，简单的拦截
            var e = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
            return e.test(email)
        },
        //对密码输入字符控制
        // 允许字符：大小写字母 下划线 中横线 点 加号 星号
        password: function (value) {
            var p = /^[A-Za-z0-9_\.\-\+\*]+$/;
            return p.test(value);
        },
        //可以匹配空格、制表符、换页符等空白字符的其中任意一个
        //若存在以上的 return true
        blank: function (value) {
            var b = new RegExp(/\s/, 'g');
            return b.test(value);
        },
        //返回数字
        returnDigit: function (number) {
            var num = parseInt(number);
            if (!isNaN(num)) return num;
            else  throw  '请输入为数字类型';
        },
        //对输入的字符进行长度的限制
        length: function (config) {
            var defaults = {
                min: 6,
                max: 18
            }, min = 0, max = 0;
            if (!config || (config.value == undefined)) {
                throw '不能没有输入值';
            } else if (config) {
                min = config.min || defaults.min;
                max = config.max || defaults.max;
                //校验是否合法  把最小与最大输入进行转换成number
                Verify.returnDigit(min);
                Verify.returnDigit(max);
                var len = config.value.length;
                if (len >= min && len <= max) return true;
            }
            return false;
        }

    };
    //输入用户名字段
    var username = new Fields({
        targetNode: inputArea.username,
        url: '/ALL/20170908-cloud-print/JSON/change.json',
        send: function (url, value) {
            $.ajax({
                url: url,
                data: {
                    username: value
                },
                success: function (res) {
                    console.log(res)
                }
            })
        },
        input: function ($this, $ul) {
            //控制长度 门阀
            //////////////////
            var l = Verify.length({
                min: '6',
                max: 14,
                value: $this.val()
            });
            //控制字符 门阀
            //////////////////
            var w = Verify.word($this.val());
            console.log('输入长度是否合法： ' + l + '\r\n 输入字符是否合法： ' + w);
            var $length = $ul.children().first().children('.fa')
                , $word = $ul.children().last().children('.fa');
            $length.iconTo(l);
            $word.iconTo(w);
        }
    });
    //输入密码字段
    var password = new Fields({
        targetNode: inputArea.password,
        input: function ($this, $ul) {
            //控制长度 门阀
            var l = Verify.length({
                    min: 8,
                    max: 20,
                    value: $this.val()
                })
            //控制字符 门阀
                , p = Verify.password($this.val())
            // 检测空格符
                , b = Verify.blank($this.val())
            //找到对应的元素
                , $length = $ul.children().eq(0).children('.fa')
                , $word = $ul.children().eq(1).children('.fa')
                , $blank = $ul.children().eq(2).children('.fa');

            //console.log('输入长度是否合法： ' + l + '\r\n 输入字符是否合法： ' + p + '\r\n 输入字符有空白符： ' + b);
            $length.iconTo(l);
            $word.iconTo(p);
            $blank.iconTo(!b);
        }
    });
    //再次输入密码字段
    var Options = {
        common: function ($this, $ul) {
            var $password = $('#register-password')
                , confirmValue = $this.val()
                , passwordValue = $password.val()
                , $again = $ul.children().eq(1).children('.fa');
            confirmValue === passwordValue ? $again.iconTo(true) : $again.iconTo(false);
        },
        targetNode: inputArea.again,
        in: function ($this, $ul) {
            Options.common($this, $ul);
            var $legal = $ul.children().eq(0).children('.fa')
                , $password = $this.closest('dl').find('#register-password')
                , $fa = $password.siblings('.register-tip').find('.fa')//密码字段的 提示下的所有 i.fa 元素结合
                , num = 0
                , i
                , len = $fa.length;
            for (i = 0; i < len; i++) {
                var pass = $fa[i].getAttribute('data-pass');
                if (pass != 'no') {
                    num++
                }
            }
            //判断 数目是否三个都为 yes 才可以提示是否合法的图标
            len === num ? $legal.iconTo(true) : $legal.iconTo(false);
        },
        input: function ($this, $ul) {
            Options.common($this, $ul);
        }
    };
    var verifyPassword = new Fields(Options);
    //判断邮箱字段
    var email = new Fields({
        targetNode: inputArea.email,
        url: '/ALL/20170908-cloud-print/JSON/change.json',
        input: function ($this, $ul) {
            //邮箱格式 门阀
            var e = Verify.isEmail($this.val())
                , $allow = $ul.find('.fa').eq(0)//这个用来后台是否，允许校验邮箱
                , $format = $ul.find('.fa').eq(1);

            $format.iconTo(e);
        },
        send: function (url, value) {
            $.ajax({
                url: url,
                data: {
                    email: value
                },
                success: function (res) {
                    console.log(res)
                }
            })
        }

    });
    //判断手机字段
    var phone = new Fields({
        targetNode: inputArea.phone,
        url: '/ALL/20170908-cloud-print/JSON/change.json',
        input: function ($this, $ul) {
            var m = Verify.isPhoneNumber($this.val())
                , $allow = $ul.find('.fa').eq(0)//这个用来后台是否，允许校验手机存在，允许注册
                , $format = $ul.find('.fa').eq(1);

            $format.iconTo(m);
        }
    });
    //验证码
    var verifyCode = new Fields({
        targetNode: inputArea.code,
        input: function ($this, $ul) {

        }
    });


    function allPass() {
        var $fas = $('.fa')
            , num = 0
            , i
            , len = $fas.length;
        for (i = 0; i < len; i++) {
            var pass = $fas[i].getAttribute('data-pass');
            if (pass != 'no') {
                num++
            }
        }

        var ischecked = inputArea.checkBox.attr('checked');

        //判断 数目是否三个都为 yes 才可以提示是否合法的图标
        // 要这个 布尔觉得更语义些
        len === num ? inputArea.isAllPass = true : inputArea.isAllPass = false;
        return inputArea.isAllPass;
    }


    Buttons.register.on('click', function (event) {
        preventDefault(event);
        var para = {
            user: inputArea.username.val(),
            pwd: inputArea.password.val(),
            email: inputArea.email.val(),
            mobile:inputArea.phone.val(),
            role: {
                roleSort:"cloud",
                dsRole:"normal"
            }
        };

        //注册接口
        $.ajax({
            url: u.register(),
            type: 'POST',
            headers: {"Content-Type": "application/json"},
            data: JSON.stringify(para),
            success: function (res) {
                console.log(res)
            },
            error: function (xhr) {
                if(xhr.status !=201){
                    alert('注册失败，请重试');
                }
            },
            statusCode: {
                401: function () {
                    console.log('401 退出登录失败')
                },
                201: function () {
                    console.log('201 注册成功');
                    Message.success('注册成功');

                    //注册成功，跳转到登录界面
                    location.href = 'login.html';
                }
            }
        })
    });
    Buttons.image.on('click', function () {
        var url = ''
            , $randomImage = $(this).siblings('img');
        $randomImage.attr('src', url)
    });


    //切换字体图标
    $.fn.extend({
        iconTo: function (config) {
            var defaults = {
                error: 'fa-times',
                correct: 'fa-check'
            };
            if (config == undefined)  throw '参数为:' + config + ' 参数为不能为空且为布尔！';
            if (config) {
                $(this).removeClass(defaults.error).addClass(defaults.correct).attr('data-pass', 'yes');
            } else {
                $(this).removeClass(defaults.correct).addClass(defaults.error).attr('data-pass', 'no');
            }

        }

    })
})(jQuery);