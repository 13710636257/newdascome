/**
 * Created by a on 2017/8/28.
 */
requirejs.config({
    baseUrl: '../js/asset/',
    //paths 属性本来就是给路径加别名的方法
    paths: {
        jquery: 'jquery-1.9.1.min',
        common: '../edit/common',
    }
});
requirejs(['jquery','common'],function ($,Common) {
    //console.log(Common)
    var Printer = {
        isModify: false,
        //修改当前打印机的别名的值,也可以在Storage获取
        oldAliasValue: '',
        //一检测到已经登陆
        //直接获取打印机列表
        initData: function (config) {
            var data = Common.getUserData();
            if (!data) {
                console.log('浏览器的缓存的 web Storage 的数据已清除掉，没有token获取失效');
                //手动进行处理这种状况，让其页面为正常退出的显示 并且不发送退出请求
                Common.toggleView(false);
                return false;
            }
            var id = data.id
                , token = data.token
                ,
                _this = this;


            $.ajax({
                url: config.url,
                //url: "/FrontEnd/20170719/cloud-print/js/printers.json",//test
                type: 'GET',
                dataType: 'json',

                data: {
                    id: id,
                    token: token
                },

                success: function (printers, textStatus, jqXHR) {
                    // console.log(printers);
                    // console.log(jqXHR.getAllResponseHeaders());

                    //渲染打印机列表
                    if (!printers.printers) return;
                    ///////////////////////////////
                    ///////////////////////////////
                    _this.renderPrinters(printers);//渲染打印机列表

                    //保存打印机列表数据
                    localStorage.setItem('printers', JSON.stringify(printers));

                },
                error: function (xhr, code, err) {
                    console.log('textStatus：' + xhr.status);

                },
                statusCode: {
                    404: function (xhr) {
                        console.log(404)
                    },
                    401: function (xhr) {
                        console.log(401)
                    },
                    400: function (xhr) {
                        console.log(400)
                    },
                    200: function () {
                        console.log('200 访问成功！')
                    }
                }
            })


        },
        //渲染打印列表信息
        renderPrinters: function (data) {
            var $printersContainer = $('.printers-list')
                , printsData = data.printers
                , on = []
                , off = []
                , i = 0
                , len = printsData.length;
            //分炼数据
            for (; i < len; i++) {
                var item = printsData[i];
                item.alive ? on.push(item) : off.push(item);
            }
            render(0, on);//在线
            render(1, off);//离线
            function render(i, dataArray) {
                var $list = $printersContainer.eq(i)
                    , $amount = $('.amount').eq(i)
                    , len = dataArray.length
                    , isAlive = true;//是否在线的判断
                $amount.html(len);
                dataArray === on ? isAlive = true : isAlive = false;
                if (!dataArray)return false;
                $list.empty();
                var html = '<dt class="printers-title"></dt>';
                $.each(dataArray, function (index, item) {
                    var aliasString = printerAlias.resolve(item.alias); //分解字符串，截取别名信息
                    html +=
                        '<dd class="printers-item" data-status=' + isAlive + '>'
                        + '<ul>'
                        + '<li><span>序列号:</span><span class="unique">' + item.sn + '</span></li>'
                        + '<li><span>型号:</span><span class="model">' + item.info.model + '</span></li>'
                        + '<li><span>别名:</span>'
                        + '<div class="edit-alias-box">'
                        + '<input class="alias" type="text" value="' + aliasString.name+ '" disabled="disabled" data-model="' + aliasString.model + '" data-group="' + aliasString.group + '"/>'
                        + ' <i class="fa fa-pencil-square-o" aria-hidden="true"></i>'
                        + '</li>'
                        + '<li><span>主状态:</span> <span class="alive">' + item.status.main + '</span></li>'
                        + '<li><span>子状态:</span> <span class="alive">' + item.status.sub + '</span></li>'
                        + '</ul>'
                        + '</dd>';
                    //记录
                });
                $list.html(html);
            }

            //绑定事件
            Printer.bindEvents();
        },
        //绑定事件
        bindEvents: function () {
            var $list = $('.printers-list'), _this = this;

            //获取用户登录信息
            var userData =  Common.getUserData();

            //选择序列号
            $list.on('click', '.printers-item', function () {
                var $this = $(this)
                    , SN = $this.find('.unique').html()
                    , isAlive = $this.data('status')//获取当前机器是否在线状态

                //只有登录后 事件才生效
                if (!userData) {
                    alert("请先登录，才能修改机器的别名！");
                    return false;
                }


                //退回之前的编辑打印页面
                if (_this.isModify)  return;

                if (isAlive) {
                    if (confirm('序列号： ' + SN + '\r\n 是否是选择这台打印机作业')) {
                        //设置序列号：
                        // 编辑 edit-template.html 模板页面，选择打印时候需要选择打印机序列号
                        window.name = SN;
                        localStorage.setItem(Common.Message.sn, SN);
                        console.log('window.name方式的 序列号' + window.name);
                        ///////////////////////////

                        location.href = "../html/edit-template.html";
                    }
                } else {
                    alert('序列号： ' + SN + '\r\n 这是一台离线的机器，无法进行打印作业！')
                }


            });
            //控制修改打印机别名事件
            $(window).on('click', function (event) {
                var target = event.target || window.event.srcElement
                    , $target = $(target);

                if ($target.hasClass('fa-pencil-square-o')) {
                    var $alias = $target.siblings('.alias');
                    //编辑状态
                    Common.Assist.pass($alias, {
                        bg: '#E0E0E0',
                        color: '#1A1A1A'
                    });

                } else if ($target.hasClass('alias')) {
                    console.log('这样加一个 else if 就可以加多一个 标志 神奇');
                } else {
                    Common.Assist.prevent('.alias', {
                        bg: '#333',
                        color: '#17ff0b'
                    })
                }
            });
            //修改打印机别名接口
            // @ user.modifyAlias.call(this, $this, url);
            $list.on('change focusin focusout mouseenter mouseleave', '.alias', function (event) {

                var type = event.type || window.event.type;
                var $this = $(this),
                    MAX_LENGTH = 12;//保存别名最大长度


                switch (type) {
                    case 'focusin':
                        //保存：修改前的用户名
                        //修改失败==》 还原
                        _this.oldAliasValue = $this.val();
                        if (!Common.getUserData()) {
                            if (confirm('请先登录，才能修改别名! \n\r 是否跳转到登录页面?')) {
                                location.href = "login.html"
                            }
                            $this.blur();
                            $(window).trigger('click');
                            return false;
                        }
                        //添加提示元素
                        var $parentDIV = $this.closest('.edit-alias-box');
                        $builtNoteText = $('<div class="edit-note-text">最多输入' + MAX_LENGTH + '个字符长度</div>');
                        $parentDIV.append($builtNoteText);
                        console.log('修改前的别名：' + _this.oldAliasValue);
                        break;

                    case 'change':
                        //发送修改别名与后台同步数据
                        /////////////////////////
                        if (!userData) {
                            alert("登录过期，请重新登录，再修改机器的别名！");
                            return false;
                        }
                        var ps = {
                            id: userData.id,
                            token: userData.token
                        }
                        //获取修改别名的接口
                            , url = Common.Port.alias(ps);
                        _this.modifyAlias($this, url);
                        break;

                    case 'focusout':
                        //移除提示元素
                        $this.siblings('.edit-note-text').remove();
                        break;

                    case 'input':
                        var curValue = $.trim($this.val());//去掉前后的空格符
                        if (curValue.length > MAX_LENGTH) {
                            var limit = $this.val().slice(0, MAX_LENGTH);
                            $this.val(limit);
                        }

                        break;

                    case 'mouseenter':
                        _this.isModify = true;
                        break;

                    case 'mouseleave':
                        _this.isModify = false;
                        break;
                }


            });
            //删除图标 门阀
            $list.on('mouseenter mouseleave', '.fa-pencil-square-o', function (event) {
                var type = event.type || window.event.type
                    , $this = $(this);

                switch (type) {
                    case 'mouseenter':
                        _this.isModify = true;
                        break;

                    case 'mouseleave':
                        _this.isModify = false;
                        break;
                }
            })
        },
        //修改别名
        modifyAlias: function ($this, url) {
            //获取是修改时哪一项的 序列号
            //确定保存具体的 sessionStorage 的数据 的打印机
            var newAlias = $this.val()
                , $unique = $this.parents('ul').find('.unique')
            // , sn = $unique.html() 合并成特定格式的字符串
                , sn = printerAlias.merge($this)
                , data = {
                alias: newAlias,
                sn: sn
            }
                , _this = this;


            $.ajax({
                url: url,
                type: 'PATCH',
                dataType: 'json',
                data: JSON.stringify(data),
                success: function (modifyData) {
                    console.log(modifyData);
                    //更新缓存
                },
                error: function (xhr, code, err) {
                    console.log('textStatus：' + xhr.status);
                    //修改失败，把修改前的别名还原
                    $this.val(_this.oldAliasValue);

                },
                contentType: 'application/json',
                statusCode: {
                    404: function () {
                        console.log(404);
                        location.href = '404.html';
                    },
                    401: function () {
                        console.log(401)
                    },
                    400: function () {
                        console.log(400)
                    },
                    200: function () {
                        console.log('200 修改别名成功！');
                        _this._updateStorage(sn, newAlias);
                        Common.Message.success('修改别名成功');

                        // alert('修改打印机别名成功!')
                        //修改成功再页面再同步
                        $this.val(newAlias);
                        $(window).trigger('click');
                    }
                }
            })

        },
        //保存修改别名，并再次更新缓存
        _updateStorage: function (sn, newAlias) {
            //成功修改后把：修改成功的数据同步到 缓存
            var data = JSON.parse(localStorage.getItem('printers'));
            for (var i = 0, printers = data.printers, l = printers.length; i < l; i++) {
                //找到匹配项目的 sn
                console.log(data.printers[i].alias)
                if (printers[i].sn == sn) {
                    printers[i].alias = newAlias;
                    console.log('更新缓存成功：别名： ', printers[i].alias)
                    break;
                }
            }

            localStorage.setItem('printers', JSON.stringify(data));
        },
        //解除绑定
        unbound: function ($this, url) {

        },
        //绑定
        bound: function ($this, url) {

        }
    };
    //初始化打印机列表
    Printer.initData({
        url: Common.Port.printers()
    });


    var $tabItem = $('.tab-item');
    $('.manage-main-tab').on('click', '.tab-item', function () {
        var $this = $(this);
        if ($this.hasClass('tab-active')) return false;
        $this.addClass('tab-active').siblings('.tab-item').removeClass('tab-active');
        var index = $tabItem.index($this);
        //真是一个神奇的网站 var index = $this.index() 返回 1 2 把dt 也在索引里面
        //只有在 $('.tab-item')集合的序列对应的索引
        //console.log(index)
        $('.manage-wrap').eq(index).addClass('active-wrap').siblings().removeClass('active-wrap');
    });

    var printerAlias = {
        //拆解 字符串 的打印机别名的字符串
        resolve: function (aliasString) {
            var group = '', alias = '', model = '';
            aliasString.replace(/(.+\/)(.+)(\(.+\))(.*)/g, function ($1, $2, $3, $4) {
                alias = $3; // 广州得实增
                group = $2; // 云端打印机/中国/
                model = $4;//(DC-1300:227116380030)

                console.log($1)
                console.log($2)
                console.log($3)
                console.log($4)
            });
            return {
                group: group,
                name: alias,
                model: model
            };// 不是undefined 返回 别名字符串
        },
        // 修改好，别名在合并字符串格式 ，上传
        // @para $this 修改的别名对象
        merge: function ($this) {
            var group = $this.data('group')
                , name = $this.val()
                , model = $this.data('model')
                , data = group + name + model
                ;
            return data; //云端打印机/中国/广州得实增(DC-1300:227116380030)
        }
    }
});


