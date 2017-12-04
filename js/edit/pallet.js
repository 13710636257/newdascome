/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/19.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/19.
 */
define(function (require, exports, module) {
    'use strict';
    var ColorPicker = require('colorpicker');
    var $ = require('jquery');
    // 调色板节点集合
    var dom = {
        proxy: document.getElementById('font_fancy'),//插件的容器

        rgbParent: $('.pallet_rgb'),
        red: $('#pallet_red'),
        green: $('#pallet_green'),
        blue: $('#pallet_blue'),

        hsbParent: $('.pallet_hsb'),
        hue: $('#pallet_hue'),
        saturation: $('#pallet_saturation'),
        brightness: $('#pallet_brightness'),

        hex: $('#pallet_hex'),// 显示当前的选择后的，颜色值（获取或是手动输入）
        newColor: $('.new_color'),// 显示当前新的值的：背景色
        oldColor: $('.old_color'),// 显示旧的值


        //用来当想要切换更换，背景颜色时候，
        // 把 dom.resetTypename 的 data-type 改为  background
        resetTypeName: $('.toggle_icon_box'),
        shapeType: 'shapetype',//表示 data-shapetype = 'text' =>shapetype
        // 导出此方法
        getShapeTypeName: function () {
            var shapesNameColletion = (function () {
                //获取左侧添加列表的 图形的对应的参数
                var $lis = $('#tool_list').find('li')
                    , shapesName = ['background']
                    ;
                $.each($lis, function (index, item) {
                    var s = $(item).data('shape').toLowerCase()
                    shapesName.push(s);
                });
                //取出重复的名字
                var noRepeatArr = function (arr) {
                    var obj = {}
                        , result = []
                        , len = arr.length
                        , i = 0
                        ;
                    for (; i < len; i++) {
                        var key = arr[i]; //15

                        /*
                         *  obj 刚开始 为空对象
                         *  所以 obj[key] 不存在 则为 false ，则设置为 obj[key] = true;  // {15:true,}
                         *
                         *  当下次 obj[key] = true 则跳过 条件继续下一个元素
                         * */
                        if (!obj[key]) {
                            result.push(key);
                            obj[key] = true;  // {15:true,}
                        }
                    }
                    return result;
                };
                //过滤重复的,返回结果
                return noRepeatArr(shapesName);
            })();


            var i = 0
                , len = shapesNameColletion.length
                , name = 'background'
                , shapeTypeDOM = document.querySelector('.toggle_icon_box')
                , outerHTML = shapeTypeDOM.outerHTML
                ;
            for (; i < len; i++) {
                if (new RegExp(shapesNameColletion[i], 'g').test(outerHTML)) {
                    name = shapesNameColletion[i];
                    break;
                }
            }
            return name;
        }

    };
    // 颜色插件实现封装
    var backgroundPallet = {
        init: function (callback) {
            // 回调：把鼠标点击颜色调色板的值 ，然后设置各
            // 把输入框的（手动输入的 **十六进制值**），更新到 哈希与 十六进制 对应的 view 上
            this.cpFancy = ColorPicker(dom.proxy, function (hex) {
                var rgb = ColorPicker.hex2rgb(hex);
                var hsv = ColorPicker.hex2hsv(hex);

                // 把鼠标点击颜色调色板的值全部大写显示
                dom.hex.val(hex.toUpperCase());//（右下角的输入框得值）

                // 十六进制颜色
                dom.red.val(rgb.r);
                dom.green.val(rgb.g);
                dom.blue.val(rgb.b);

                //哈希值颜色
                dom.hue.val(hsv.h.toFixed(2));
                dom.saturation.val(hsv.s.toFixed(2));
                dom.brightness.val(hsv.v.toFixed(2));

                // 显示 "原来"  "当前" 值的：背景色
                dom.newColor.css('backgroundColor', hex);

                // 同步设置的颜色到对应的实例对象中
                //instance.color(hex);
                // 用回调来控制，更灵活
                if (typeof callback === 'function') {
                    callback(hex);
                }

            });

            // 初始化一个颜色,不用初始化一个颜色，不然添加文字的时候会把，这个默认的颜色同步在字体上，导致文字看不到
            // 2017-10-26 已处理次 bug ,把 目标的 fill 获取设置
            //var initialHex = '#000000';
            // this.updateColorPickers(initialHex);
            //绑定事件
            this.bindHandlers();
        },
        // 更新颜色面板
        updateColorPickers: function (hex) {
            this.cpFancy.setHex(hex);
        },
        bindHandlers: function () {
            var _this = this;


            //HEX 手动输入的十六进制的值
            dom.hex.on('change', function () {
                _this.updateColorPickers(this.value);
            });

            // RGB 十进制表示
            dom.rgbParent.delegate('INPUT', 'change', function () {
                _this.updateColorPickers(ColorPicker.rgb2hex({
                        r: dom.red.val(),
                        g: dom.green.val(),
                        b: dom.blue.val()
                    })
                );
            });
            //HSB 哈希颜色表示
            dom.hsbParent.delegate('INPUT', 'change', function () {
                _this.updateColorPickers(ColorPicker.rgb2hsv({
                        h: dom.hue.val(),
                        s: dom.saturation.val(),
                        v: dom.brightness.val()
                    })
                );
            });

        }

    };
    //初始化，让插件工作
    backgroundPallet.init();
    // 标签页句柄
    var handler = (function () {
        //设置面板代理父元素
        //标签页切换
        var pallet = {
            tabParent: $('.slider_tab_list'),// tab 父元素
            panels: $('.pallet-content'),// 标签页切换内容panels
            active: 'tab_active',//tab 切换高亮状态 className
            show: 'panel_show'// 控制 panel 显示的类名
        };

        // 字体
        var font = {
            entry: $('.font_tip'),//当前用的字体
            list: $('.select_fontType'),// 字体列表
            selected: 'font_on'// 被选中的文本，的样式
        };

        // 三角形图标
        var triangle = {
            name: $('.icon_triangle'),//点击时候的三角形图标
            rotation: 'click_rotate'// 旋转的添加的类名，控制CSS
        };

        // 字体与调色板高度控制 折叠
        var slider = {
            dom: $('.slide_down'),// 折叠的触发的 h3
            ctrl: '.slide_down_ctrl'//被控制 折叠的容器
        };

        //////////////
        var $checkBox = $('#toggle_shapetype')//在 字体设置的 链接过来的按钮
            , $tplTabBtn = $('.tab_tpl_btn')//模板标签按钮
            , $bgPalletWrap = $('#bg_pallet_wrap')//背景色调色面板
            ;

        // 标签页切换
        pallet.tabParent.on('click', 'LI', function () {
            var $this = $(this)
                , index = $this.index()
                ;
            if ($this.hasClass(pallet.active)) return;
            //只有当 "预览" 时候，触发 "更新预览" 图片数据
            if ($this.hasClass('tab_preview_btn')) {
                //保证tab激活状态下，点击tab_preview_btn 不更新图片数据，通过 fa-refresh 来实现刷新
                $('.refresh-btn').triggerHandler('click');
            }
            //tab 切换
            $this.addClass(pallet.active).siblings().removeClass(pallet.active);
            // 相应的内容切换
            pallet.panels.eq(index).addClass(pallet.show).siblings().removeClass(pallet.show);
        });


        // 字体点击事件
        font.entry.on('click', function () {
            // 切换字体列表下滑与收起
            font.list.slideToggle();
            // 控制三角形图标的旋转类名
            triangle.name.toggleClass(triangle.rotation);
        });
        // 字体选择事件
        font.list.on('click', 'LI', function () {
            var $this = $(this)
                , name = $this.text()
                ;
            if ($this.hasClass(font.selected)) return;
            //添加类名
            $this.addClass(font.selected).siblings().removeClass(font.selected);
            //设置文本显示
            font.entry.text(name);
            // 设置文本后，收起列表
            font.entry.trigger('click');
        });
        // 控制 字体设置 与 调色板折叠
        // 14寸的屏幕小,高度不够只可以折叠，不够空间
        slider.dom.on('click', function () {
            var $this = $(this)
                , $siblingCtrl = $this.siblings(slider.ctrl)
                ;
            // 懒得考虑了，好麻烦。反正可以折叠的
            $siblingCtrl.slideToggle();
            $this.toggleClass('active');
        });

        //在 "字体标签" 触发到 背景颜色调色板去
        $checkBox.on('click', function () {
            // 触发打开
            $tplTabBtn.trigger('click');
            if ($bgPalletWrap.css('display') == 'none') {
                $bgPalletWrap.slideDown();
                $bgPalletWrap.siblings().addClass('active');
            }
        });

        //旧颜色 还原
        dom.oldColor.on('click', function () {
            var color = localStorage.getItem('oldHex');
            if (!color) return;
            //利用缓存 还原旧的颜色
            // 不要用 data 属性 有可能：由于作用于问题不能获取
            if(confirm('是否确定还原此颜色？')){
                backgroundPallet.updateColorPickers(color)
            }
          
        });

    })();
    // 修改字体的 样式
    var fontStyle = {
        //获取当前编辑的
        getInstance: function (stage) {
            var textInstanceCollection = stage.find('.textNode')
                , i = 0
                , len = textInstanceCollection.length
                , targetInstance
                ;
            if (0 === len) return;
            for (; i < len; i++) {
                if (textInstanceCollection[i].hasName('active')) {
                    targetInstance = textInstanceCollection[i];
                    break;
                }
            }
            return targetInstance;
        },
        //修改样式
        modify: function (stage) {
            var $fontStyleParent = $('.font_edit_list')
                , familyList = $('.select_fontType')// 字体列表
                ;


            // 设置字体种类  =》黑体 宋体...
            /////////////
            familyList.on('click', 'LI', function () {
                var family = $(this).text()
                    , targetInstance = fontStyle.getInstance(stage)
                    , layer
                    ;

                if (targetInstance == undefined) return;
                layer = targetInstance.getLayer();

                //console.log(family);
                targetInstance.fontFamily(family);
                layer.draw();
            });

            // 设置样式 =》加粗，斜体...
            /////////////
            $fontStyleParent.on('click', '.edit_item', function () {
                var $this = $(this)
                    , styleNumber = $this.data('style')
                    , targetInstance = fontStyle.getInstance(stage)
                    , layer
                    , fs
                    , td
                    , style = ''
                    ;
                if (targetInstance == undefined) return;
                layer = targetInstance.getLayer();
                fs = targetInstance.fontStyle();
                td = targetInstance.textDecoration();


                switch (styleNumber) {
                    case 1:
                        // 设置 加粗
                        // 加粗的语法设置与CSS一直
                        if (/600 italic/.test(fs)) {
                            style = 'normal'
                        }
                        ;
                        /600/.test(fs) ? style = 'normal' : style = '600';
                        targetInstance.fontStyle(style);
                        break;
                    case 2:
                        //  设置 斜体
                        if (/600 italic/.test(fs)) {
                            style = 'normal'
                        }
                        ;
                        /italic/.test(fs) ? style = 'normal' : style = 'italic';
                        targetInstance.fontStyle(style);
                        break;
                    case 3:
                        // 设置 下划线
                        /underline/.test(td) ? style = ' ' : style = 'underline';
                        targetInstance.textDecoration(style);
                        break;
                    case 4:
                        // 设置 删除线
                        /line-through/.test(td) ? style = ' ' : style = 'line-through';
                        targetInstance.textDecoration(style);
                        break;
                    case 12:
                        /600 italic/.test(fs) ? style = 'normal' : style = '600 italic';
                        targetInstance.fontStyle(style);
                        break;
                    case 34:
                        /underline line-through/.test(td) ? style = ' ' : style = 'underline line-through';
                        targetInstance.textDecoration(style);
                        break;
                }

                layer.draw();
            });
        }
    };
    // 设置文字 =》大小 与 旋转角度
    var fontSize = {
        //用来控制 上下左右箭头 输入 PX   ANGLE
        isController: false,
        isMoveFlag: false,
        move: function (stage) {
            var $w = $(window)
                , startX = 0
                , MAX_LEFT = $('.range_navbar').outerWidth()
                , _this = this
                , $fontSettingParent = $('.font_slide_setting')
                ;

            // 拖拽移动
            $fontSettingParent.on('mousedown', '.range_radius', function (event) {
                _this.isMoveFlag = true;
                var e = event.originalEvent || window.event.originalEvent
                    , $this = $(this)
                    , position = $this.position()
                    ;
                startX = e.clientX - parseInt(position.left);

                // 目标对象：暴露
                _this.anchor = $this;
            });
            // 拖拽
            $w.bind({
                mousemove: function (event) {
                    var e = event.originalEvent || window.event.originalEvent
                        , left
                        , $siblingInput
                        , type
                        , val
                        ;
                    if (!_this.isMoveFlag) return;
                    $siblingInput = _this.anchor.closest('.range_box').find('input');
                    type = $siblingInput.data('type');
                    left = e.clientX - startX;


                    // 边界设置
                    if (left > MAX_LEFT)left = MAX_LEFT;
                    if (left < 0)left = 0;
                    // console.log(left);

                    //设置位置
                    ////////////
                    _this.anchor.css({
                        left: left
                    });
                    // 设置input的值
                    //////////////////
                    type == 'size' ? val = left / MAX_LEFT * 100 : val = 360 / 100 * (left - 100);
                    $siblingInput.val(parseInt(val));
                    //////////////
                    //////////////
                    _this._updateFont(stage, type, val);
                },
                mouseup: function () {
                    _this.isMoveFlag = false;
                }
            });
            // input =》的输入域同步在滑动条
            $fontSettingParent.on('input propertychange', 'INPUT', function () {
                var $this = $(this)
                    , val = parseInt($this.val())
                    , type = $this.data('type')
                    , $siblingRadius = $this.closest('.range_box').find('.range_radius')

                    , fpsPX = 2
                    , fpsAngle = 3.6


                    ;
                //判断是否为数字
                // 若是为非数字  大小为 12px  角度为 0
                // type == 'size' ? val = 12 * fpsPX : val = 0;
                if (isNaN(val))val = 0;

                if (type == 'size') {
                    if (val < 0) val = 0;
                    if (val > 100) val = 100;
                    // 设置定位
                    $siblingRadius.css({
                        left: val * fpsPX
                    })
                } else {
                    if (val < -360) val = -360;
                    if (val > 360) val = 360;
                    val = (val + 360) / fpsAngle;
                    // 设置定位
                    $siblingRadius.css({
                        left: val
                    })
                }

                //////////////
                //////////////
                _this._updateFont(stage, type, val);
            });
            // 控制 上下左右箭头
            // 尚未实现，暂时放着
            ///////////////////
            $fontSettingParent.on('focusin focusout', 'INPUT', function (event) {
                var type = event.type || window.event.type
                    ;
                //console.log(event)
                switch (type) {
                    case 'focusin':
                        _this.isController = true;
                        break;
                    case 'focusout':
                        _this.isController = false;
                        break;
                }
            });


        },
        // 更新字体同步到舞台
        // 判断输入域是 控制大小  还是  旋转角度
        _updateFont: function (stage, type, val) {
            /////////
            var targetInstance = fontStyle.getInstance(stage)
                , layer
                ;
            if (targetInstance == undefined) return;
            layer = targetInstance.getLayer();

            //更新 字体到舞台
            type == 'size' ? targetInstance.fontSize(val) : targetInstance.rotation(val);
            layer.draw();
        }
    };
    //  更换背景图片
    var replaceColorOrImage = (function () {
        // 图片列表
        var $list = $('.bglist')//背景图片列表 ul
            , $images = $list.find('img')
            ;
        return function (backgroundInstance) {

            // 在 调色板的 入口给个标注：具体目前给的是  字体颜色 还是  背景颜色
            // 只有当前切换的是背景的才可以执行以下的设置
            // 背景图只作用于**背景实例**这里无需做判断
            //if (dom.resetTypeName.data(dom.shapeType) !== 'background') return;


            $list.on('click', 'IMG', function () {
                var $this = $(this)
                    , src = $this.attr('src')
                    ;
                // 历史的教训啊
                // 看来 标志不是顺便可以用的
                // 2017-10-26: 大bug:  本地选择 与  模板切换  =》先模板 1=》选本地=》先模板 1 不可以做背景图（其他的模板都可以） ，
                // 再这样循环会把 模板一张张不可以点击添加
                // if ($this.data('using')) return;
                //////////////////////////////////////////////////
                // $images.removeAttr('data-using');
                // $this.attr('data-using', 'active');

                //更换背景图片
                /////////////////
                backgroundInstance.image(src);
                // 给个标志，记录是否为当前使用的背景图片
            });

            //背景色
            (function () {
                var $hex = $('#bg_pallet_hex')
                    , rgb
                    , $rgb = $('#bg_pallet_rgb')
                    , proxy = document.getElementById('cp-default')//插件入口
                    , stage = backgroundInstance.bgRect.getStage()
                    , layer = stage.findOne('.mainLayer')
                    , konvaRectInstanceFill = backgroundInstance.bgRect.fill() // 保存背景色中 Konva.Rect 实例的填充颜色
                    ;

                var cpFancy = ColorPicker(proxy, function (hex) {
                    // 把鼠标点击颜色调色板的值全部大写显示
                    $hex.val(hex.toUpperCase());//（右下角的输入框得值）
                    rgb = ColorPicker.hex2rgb(hex);
                    $rgb.val('rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')');

                    /////////////////////
                    backgroundInstance.color(hex);
                    layer.draw();
                });

                //默认颜色 初始化
                updateColorPickers(konvaRectInstanceFill);

                //HEX 手动输入的十六进制的值
                $hex.on('change', function () {
                    updateColorPickers(this.value);
                });

                // 更新颜色面板
                function updateColorPickers(hex) {
                    cpFancy.setHex(hex);
                }
            }());

        }
    })();
    //上传本地图片的做背景图
    var uploadLocalImage = (function () {
        //选择本地图片按钮
        var $selectLocalImageBtn = $('.select_image_btn')//button
            , $fileInput = $('#select_local_image')// type="file"
            ;
        //选择本地图片事件
        $selectLocalImageBtn.on('click', function () {
            $fileInput.trigger('click');
        });
        return function (backgroundInstance) {
            // @bytes 要解析的字符大小
            // @decimal 取多少位小数
            function parseBytes(bytes, decimal) {
                var fileSize = 0,
                    units = ["KB", "MB", "GB", "TB"];
                decimal = decimal || 1;
                for (var i = 0, size = bytes / 1024; size > 1; size /= 1024, i++) {
                    fileSize = size.toFixed(decimal) + units[i];
                }
                return fileSize;
            }

            // file 字段事件
            $fileInput.on('change', function () {
                var files = this.files
                    , len = files.length
                    , MAX_SIZE = 1024 * 1024 * 3
                    , file = files[0]
                    ;
                if (0 === len) return;//没有选择文件，return
                if (!/image/.test(file.type)) {
                    confirm('请选择格式为：如 .png .jpg .jpeg 的格式图片!');
                    return;
                }
                if (file.size > MAX_SIZE) {
                    confirm('您选择的文件大小为：' + parseBytes(file.size) + ' , 已超过：' + parseBytes(MAX_SIZE) + ' 请重新选择一张图片！');
                    return;
                }
                //console.log(file);
                readFile(file);
                /////////////
                // 一定把 此时的 file 删除 ，不然在上传同一张的图片 不能更换
                // bug: =》上传 =》再更换模板的图片=》再上传 刚才那一张就不起效
                file = null;
            });

            function readFile(file) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    console.log(e);
                    var img = new Image()
                        ;
                    img.src = e.target.result;
                    $('.dd_local_image').html(img);

                    ////////////////
                    backgroundInstance.image(e.target.result);

                    ////////////////////////////////
                    //点击图片也可以 更换背景图
                    img.onload = function () {
                        this.onclick = function () {
                            ////////////////
                            backgroundInstance.image(this.src);
                        }
                    };


                };
                //读取文件为 ： url数据
                reader.readAsDataURL(file);
            }
        };
    })();
    //预览图片
    var previewPicture = (function () {
        var $previewList = $('.preview_image_list')//预览图片的 ul 列表
            , $refreshBtn = $('.refresh-btn')
            ;
        //传入一个Konva 的对象，以舞台，预览全个卡片的大小的信息
        return function (stage,callback) {
            $refreshBtn.on('click', function () {
                //先要移除掉所有的拖拽锚点
                // 不要改变舞台的数据的操作，都要以在复制的舞台操作
                // bug: 背景层的背景色或是背景图片无法生成图片 是因为用了 原生的上下文getContext()?
                //var cloneStage = stage.clone()
                //cloneStage.find('.anchor').remove();
                //cloneStage.draw();

                var layer = stage.find('.mainLayer')
                    , anchors = stage.find('.anchor')
                    ;
                anchors.hide();
                layer.draw();
                stage.toImage({
                    callback: function (img) {
                        anchors.show();
                        layer.draw();
                        // 不能在 闭包外 以变量形式获取 $img = $previewList.find('img')
                        // 不然每次预览都是第一次预览的数据图片
                        $previewList.find('img').replaceWith(img);
                        
                        //用来上传图片用
                        if(callback &&callback instanceof Function){
                            callback(img.src);
                        }

                    }
                });
            })
        }
    }());
    //导出
    /*****************************************************************************************************/
    module.exports = {
        initBackground: replaceColorOrImage,//初始化背景实例 更换背景色或是背景图
        syncColor: function (callback) {// 同步颜色调色板选择的颜色 同步更新当前***选中的*** 背景色或是其他图形
            backgroundPallet.init(callback);
        },
        initColor: function (hex) {
            // 不能 initColor  backgroundPallet.updateColorPickers ，此时的 this 指向了  module.exports 对象
            // 要用函数调用，不然报错
            backgroundPallet.updateColorPickers(hex);
        },
        localImage: uploadLocalImage,//上传本地图片的做背景图
        previewPicture: previewPicture,//预览图片
        setFont: function (stage) {
            fontStyle.modify(stage);//修改字体的样式： 字体类型  加粗 斜体
            fontSize.move(stage);// //修改字体的样式： 字体大小  旋转角度
        },
        getShapeTypeName: dom.getShapeTypeName,//获取当前 class="toggle_icon_box" 下的 data-shapetype 属性的值
    }
});
