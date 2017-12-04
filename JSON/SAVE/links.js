/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/15.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/15.

 */
(function (window, document) {
    var pages = {
        0: 'register',
        1: 'login',
        2: 'index',
        4: 'cloud-print',
        5: 'edit-template',
        6: 'manage-printer',
        7: 'cloud-space',
        8: 'picture-print',
        9: 'document-print',
        10: 'links'
    }

    var io = window.sessionStorage.getItem('io');
    var l = location.href;

    var path = "/20170719/colection/WEB%20storage/Storage.html?t=787878";
    var o = 'http://localhost:50099/20170719/cloud-print/html/login.html?_ijt=q43aj16qh49jd86k729pkaa679'
    o.replace(/(.+\/)(.+)(\.html)(.*)/, function ($1, $2, $3) {
        // console.log('1 :' + $1)
        // console.log('2: ' + $2)
        // console.log('3: ' + $3)
        //   console.log('4: ' + $4)
    });
    function simulate(url) {
        var o = '';
        //  url.replace(/(.+\/)(.+\.html)(.*)/, function ($1, $2, $3) {
        url.replace(/(.+\/)(.+)(\.html)(.*)/, function ($1, $2, $3) {
            // console.log('1 :' + $1);
            // console.log('2: ' + $2);
            // console.log('3: ' + $3);
            o = $3;
        });

        console.log(o)

        for (var key in pages) {
            if (pages.hasOwnProperty(key)) {
                if (pages[key] == o) {
                    console.log(key)
                    return key;
                }
            }

        }
        //return o;
    }

    console.log(simulate(o))

    function replace(l) {

    }

    // if (io) {
    //
    //     io = JSON.parse(io)
    //     var i = simulate(path)
    //     i = replace(i)
    //     io.push(i)
    //     console.log(io)
    //
    //     sessionStorage.setItem('io', JSON.stringify(io))
    // } else {
    //
    //     io = [];
    //     io.push(simulate(path))
    //     sessionStorage.setItem('io', JSON.stringify(io))
    //
    // }


    if (l.indexOf('login.html') > -1) {

    }


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
        simulate: function (key, url) {
            console.log('url : ' + url);
            this.legal(key);
            if (!url) throw '设置的值，一定要存在且为url';
            function output(b) {
                var o = '';
                b.replace(/(.+\/)(.+)(\.html)(.*)/, function ($1, $2, $3) {
                    //获取到页面的名字值
                    o = $3;
                    console.log('replace的$3: ' + o)
                });
                for (var key in pages) {
                    if (pages.hasOwnProperty(key)) {
                        if (pages[key] == o) {
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
                var last = arr.splice(-1);
                //如果是为空的话 push
                //不是的话，截取最后的一个值比较是否与目前添加的相同
                //不相同才 push
                //不用理 数组是否为空
                last === item ? arr.splice(-1, 1, item) : arr.push(item);
            }

            var value = output(url);
            console.log('output函数输出的value: ' + value);
            try {
                var data = this.get(key);
                if (data) {
                    data = this.ps(data);
                } else {
                    data = [];
                }
                cut(data, value);
                this.set(key, this.fy(data));

            } catch (e) {
                console.log(e);
                return false;
            }

        },

        go: function () {
            var v = this.get(key);


        }


    };

    var ll = location.href
    Links.simulate('ioi', ll)

})(window, document);