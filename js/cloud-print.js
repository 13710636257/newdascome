
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
    
        //显示打印的状态
        var PrinterStatus = {
            //初始化打印机的不同状态的数目
            initView: function () {
                //获取打印机列表数据
                var GET_PRINTERS_URL = Common.Port.printers()
                    ,data = this.getData(GET_PRINTERS_URL)
                    ;
                //渲染页面
                this.renderView(data);
                console.log(data)

                //******************************* test ****************
                //test 存有数据登录测试
                // k();
                function k() {
                    $.ajax({
                        dataType: 'json',
                        url: "/FrontEnd/20170719/cloud-print/js/printers.json",
                        success: function (res) {
                            console.log(res)
                            PrinterStatus.renderView(res);
                            localStorage.setItem("printers", JSON.stringify(res))
                        }
                    })
                }
                //******************************* test ****************

            },
            //渲染获取打印机列表的信息 存在缓存在缓存拿，没有就ajax
            //@url ：ajax的url
            //返回 ：  ata
            getData: function (GET_PRINTERS_URL) {
                //获取用户信息
                //如果没有登录，存在 打印机列表也不渲染
                var data = Common.getUserData();
                if (!data)  return;
                var id = data.id
                    , token = data.token;
                ///////////////////////////

                var printers = localStorage.getItem('printers');
                //若是之前已经又存在数据缓存
                //直接在 localStorage获取，不然就ajax
                if (printers) {
                    return JSON.parse(printers);
                } else {
                    $.ajax({
                        url: GET_PRINTERS_URL,
                        type: 'GET',
                        dataType: 'json',
                        data: {
                            id: id,
                            token: token
                        },
                        success: function (res, textStatus, jqXHR) {
                            console.log(res);
                            // console.log(jqXHR.getAllResponseHeaders());
                            //渲染打印机列表
                            if (!res.printers) return;
                            ///////////////////////////////
                            ///////////////////////////////
                            //不存在缓存数据，把设置回来的数据return
                            printers = res;
                            //保存打印机列表数据
                            localStorage.setItem('printers', JSON.stringify(res));
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
                    });
                    return printers;

                }

            },
            //渲染获取打印机列表的信息
            //@data ：为缓存或是ajax的获取的原数据
            renderView: function (data) {
                if (!data) return;
                var printers = data.printers
                    , number = this.amount(printers)
                    , html = '<li class="all-print">' +
                    '<span>打印机</span><span>' + number.all + '</span>' +
                    '</li>' +
                    '<li class="offline-print">' +
                    '<span>离线</span><span>' + number.off + '</span>' +
                    '</li>' +
                    '<li class="nopaper-print">' +
                    '<span>缺纸或卡</span><span>' + number.noPaper + '</span>' +
                    '</li>' +
                    '<li class="online-print">' +
                    '<span>在线</span><span>' + number.on + '</span>' +
                    '</li>';

                $('.status-ul').html(html);
            },
            //返回不同状态打印机的数目
            // @printers： 为原数据中的打印列表
            amount: function (printers) {
                //用户没有绑定打印机，没有数据
                var defaults = {
                    all: 0,
                    off: 0,
                    on: 0,
                    noPaper: 0
                };
                if (!printers) return defaults;//不存在数据返回
                var on = 0
                    , no = 0 //没有纸或是卡
                    , len = printers.length
                    , i = 0;
                for (; i < len; i++) {
                    //若是在线的话  printers[i].alive === true;
                    if (printers[i].alive) {
                        on++;
                    }
                    //这个还不知道具体是那个纸判断
                    //
                    if (printers[i].status.sub) {
                        no++
                    }
                }

                defaults = {
                    all: len,
                    off: len - on,
                    on: on,
                    noPaper: no
                };
                console.log(defaults);
                //返回
                return defaults

            }
        };
        PrinterStatus.initView();


    
});


