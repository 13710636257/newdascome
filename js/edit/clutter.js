/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */

define(function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var Shape = require('shape');
    var Pallet = require('pallet');
    var Common = require('common');

    console.log(Common)


    //用于 代理事件的 父元素
    var agency = {
        sliderSuper: $('.tool_slider_nav'), // 左侧添加 图形组的 父元素 div.tool_slider_nav
        navSuper: $('.tool_top_nav '), // 顶部导航栏 父元素 div.tool_top_nav
        pointX: $('.x'),
        pointY: $('.y')
    };
    //顶部通栏的 按钮
    var Buttons = {
        undo: $('.undo-btn'),//撤销
        regain: $('.regain-btn'),//还原
        front: $('.front-btn'),//正面
        reverse: $('.reverse-btn'),//反面
        upload: $('.upload-btn'),//上传云空间
        print: $('.print-btn')//打印
    };
    // 调色板节点集合
    // 用来设置当前的 颜色调色板作用于 那种类型图形实例
    var dom = {
        //用来当想要切换更换，背景颜色时候，
        // 把 dom.resetTypename 的 data-type 改为  background
        resetTypeName: $('.toggle_icon_box'),
        shapeType: 'shapetype',//表示 data-shapetype = 'text' =>shapetype
        oldColor: $('.old_color'),// 显示旧的值

    };
    // 图形
    var Pattern = {
        isAddGroup: false, // 用作标志： 组 是否添加
        removeText: 'toBeRemove',// 标记是否将被删除
        stepDataCollection: [],//用来存放：绘制时候步骤的撤销与还原
        markedNameCollection: [],//存放组的 索引i标记的name 用
        stepIndex: 0,//记录当前记录的索引值
        //显示鼠标在舞台的坐标
        showPosition: function (POSITION) {
            var x = parseInt(POSITION.x)
                , y = parseInt(POSITION.y);
            agency.pointX.html(x);
            agency.pointY.html(y);
        },
        // 键盘delete 键 是否弹出提示的标志
        // 当有 组中含有 toBeRemove 的标志 return true
        isRemovedGroup: function (stage) {
            var groups = stage.find('.yoyo')
                , i = 0
                , len = groups.length;
            for (; i < len; i++) {
                if (groups[i].hasName(this.removeText)) return true;
            }
            return false;
        },
        //移除
        remove: function (stage) {
            var groups = stage.find('.yoyo')
                , layer = stage.findOne('.mainLayer')
                , removeText = this.removeText
                , baseGroup
                , cloneGroupData
                ;

            //遍历被选中的，将被删除出层
            groups.forEach(function (group, index) {
                if (group.hasName(removeText)) {
                    group.remove();
                }
            });
            // 删除组后 ，获取复制当前的 baseGroup 的数据 插入记录
            baseGroup = stage.findOne('.base');
            cloneGroupData = baseGroup.clone();
            this.insertData(cloneGroupData);
            layer.draw();

            console.log('***删除*** 组的数据信息发生改变');
            console.log(this.stepDataCollection);
        },
        //当前组 在编辑状态 或是多选状态提示
        activate: function (group, removeText) {
            if (!group)return;
            group.addName(removeText);
            /////////////////
            //改源码：2592行  把sceneContext.setAttr('lineWidth',5);  ==》 变成 sceneContext.setAttr('lineWidth',15);
            //改源码：2591行  把sceneContext.setAttr('strokeStyle', 'red');
            group.cache({
                drawBorder: true
            });
            // 给 字体实例添加一个属性
            // 只给最后激活的 字体实例 设置样式
            Pattern.toolkit.addTextName(group);
            //draw
            group.getLayer().draw()
        },
        //全部失活状态：不在当前编辑或是多选
        deactivate: function (groups, removeText) {
            if (groups.length === 0)return;
            groups.forEach(function (group, index) {
                group.removeName(removeText);

                //没按住 ctrl 点击选择才会给 组 取消绘制红色边框
                // bug:  group.cache({drawBorder: true}); 会导致 拖拽点无法拖拽
                // 解决： group.clearCache();
                group.clearCache();
            });

            groups[0].getLayer().draw();
        },
        //添加组
        add: function (options) {
            var layer = options.baseGroup.getLayer();
            /* switch (options.shapeType) {
             case 'bg-image':

             new Shape.Picture({
             x: options.x,
             y: options.y,
             baseGroup: options.baseGroup,
             });


             break;

             case 'rect':
             new Shape.Rect({
             x: options.x,
             y: options.y,
             baseGroup: options.baseGroup,
             });
             break;

             case 'default':

             new Shape.Rect({
             x: options.x,
             y: options.y,
             baseGroup: options.baseGroup,
             });

             break;
             }*/

            var instance = new Shape[options.shapeType]({
                x: options.x,
                y: options.y,
                baseGroup: options.baseGroup
            });
            //改变颜色调色板的，作用的图形类型  默认刚开始是背景图  通过选择作用于 文本  图形（矩形，椭圆）
            //////////////////
            Pattern.toolkit.resetColorType(options.shapeType.toLowerCase());

            if (options.shapeType == 'Text') {
                instance.addGroupOrLayer(options.baseGroup);
                var instanceText = instance.instance
                // 添加之后也要触发 "字体面板"
                Pattern.toolkit.openTextPanel();
                // 添加类名
                options.baseGroup.getStage().find('.textNode').forEach(function (text, index) {
                    text.removeName('active');
                });
                instanceText.addName('active');


                /////////
                ///////// 同步数据
                Pattern.toolkit.initOldData(instanceText);
                Pallet.syncColor(function (hex) {
                    //console.log('添加add: clutter  Pallet.syncColor ')
                    var shapetype = Pallet.getShapeTypeName();
                    if (shapetype == 'text') {
                        instanceText.fill(hex);
                        //一定要 draw()，不然会，慢一步才会绘制上去
                        layer.draw();
                    }
                });
            }
            console.log(instance);

            layer.draw();
            /////////////////////
            /////////////////////
            this.isAddGroup = false;
        },
        //重复利用
        reuse: function (stage, i) {
            var undoOrRegainGroup = stage.findOne('.base')
                , layer = stage.findOne('.mainLayer')
            //, i = this.stepIndex
                ;

            //程序出错，把 baseGroup 都删除没有了 ，导致报错的
            if (!undoOrRegainGroup) return;
            // 把从在 this.stepDataCollection[i] 取出来的记录组数据
            // 覆盖舞台的组
            layer.add(this.stepDataCollection[i]);
            //添加纪录数据组 再移除当前的 baseGroup
            undoOrRegainGroup.remove();
            layer.draw();
        },
        //撤销上一步骤舞台数据
        //删除撤销： 直接 add 到layer
        //组的数据变化，需要寻找到 layer 里面的 组 Konva自带的 id 做判别
        //寻找到与撤回的组 把现有的 remove掉，再把 this.stepDataCollection 还原回到layer
        //Konva会把实例的 id index动态控制，难以控制读写
        undoData: function (stage) {
            this.stepIndex <= 0 ? this.stepIndex = 0 : this.stepIndex--;
            if (this.stepIndex < 0) return;//此时的 记录数据的长度为零 既没有数据 就返回不执行
            console.log('撤销： ' + this.stepIndex)
            this.reuse(stage, this.stepIndex);
        },
        //还原上一步骤的撤销
        regainData: function (stage) {
            var len = this.stepDataCollection.length;
            if (this.stepIndex >= len) return;//当此时的记录数据长度与 索引一直 就返回

            this.stepIndex >= len ? this.stepIndex = len : this.stepIndex++;
            this.reuse(stage, this.stepIndex - 1);
            console.log('还原： ' + this.stepIndex)
        },
        //添加变化数据 并记录
        insertData: function (cloneGroupData) {
            console.log('插入数据**前**this.stepIndex ：' + this.stepIndex)
            //插入 组的变化复制的数据
            this.stepDataCollection.splice(this.stepIndex, 0, cloneGroupData);
            // 索引 ++
            this.stepIndex++;
            console.log(this.stepDataCollection)
            console.log('插入数据**后**this.stepIndex ：' + this.stepIndex)
        },
        //用来保存 组的数据变化对照
        // 返回需要检测 组的数据对象
        cacheData: function (targetGroup) {
            var groupPositionData = targetGroup.position()
            //////////////
                , contentClassName = Pattern.toolkit.getSiblingName(targetGroup)//获取目标
                , contentShape = targetGroup.findOne(contentClassName)
                , contentShapeAttrsData = contentShape.getAttrs()
                ;
            var allData = {};
            //若是 图片实例 保存SRC对照
            if (contentClassName === 'Image') {
                contentShapeAttrsData['src'] = contentShapeAttrsData.image.src
            }
            allData.group = extend({}, groupPositionData);
            allData.content = extend({}, contentShapeAttrsData);

            return allData;
            // return extend({}, groupPositionData, contentShapeAttrsData)
        },
        bindEvents: function (stage) {
            var $sliderSuper = agency.sliderSuper
                , _this = this
                , layer = stage.findOne('.mainLayer')
                , isGroupInset = false//是否在组里面按下鼠标 来进行 去掉红色的组边框 与 组的标志name : toBeRemove
                , baseGroup = layer.findOne('.base')
                ;


            //舞台事件 点击舞台任何位置均可以出发点击事件
            stage.on('click mousemove mouseenter mouseleave mousedown mouseup', function (e) {
                //console.log(e.target.parent);
                var target = e.target.parent// 获取 组Group
                    , originalEvent = e.evt
                    , eventType = e.type
                    , groups = stage.find('.yoyo')
                    , position = stage.getPointerPosition()
                    ;


                switch (eventType) {
                    case 'mousemove':
                        // 显示鼠标在舞台时候的位置坐标
                        _this.showPosition(position);

                        break;

                    case 'mouseenter':
                        // 显示鼠标在舞台时候的位置坐标
                        isGroupInset = true;
                        break;

                    case 'mouseleave':
                        // 显示鼠标在舞台时候的位置坐标
                        isGroupInset = false;
                        break;

                    case 'mousedown':
                        // 显示鼠标在舞台时候的位置坐标
                        // 这样才可以：拖拽点可以拖拽
                        target.clearCache();
                        layer.draw();


                        // 组 getAttrs()中只有 x y坐标有效其他的多余，size() width height 都是为零 组里面的如图片 的 x y也是为零
                        // 故结合： x y 取组的， width height 取组里面内容
                        _this.mousedownCloneAttrs = JSON.stringify(_this.cacheData(target));

                        //console.log(_this.mousedownCloneAttrs)

                        break;

                    case 'mouseup':
                        // 不用 对象遍历这样进行数据的比对
                        // 直接 json 字符串对比
                        (function () {
                            var mouseupCurrentData = JSON.stringify(_this.cacheData(target))
                                , mousedownCloneData = _this.mousedownCloneAttrs
                                ;

                            if (mousedownCloneData != mouseupCurrentData) {
                                console.log('组的数据信息，发生改变');

                                // 记录 改变的组的数据
                                /////////////////////////
                                var cloneGroupData = stage.findOne('.base').clone();
                                _this.insertData(cloneGroupData);
                                //console.log(_this.stepDataCollection);
                                //console.log('当前的this.stepIndex ： ' + _this.stepIndex);
                            }

                        }());
                        // 显示鼠标在舞台时候的位置坐标
                        if (target.name() !== _this.removeText) return;
                        target.cache({
                            drawBorder: true
                        });
                        layer.draw();


                        break;


                    case 'click':
                        if (target.nodeType != 'Group') return;
                        //按住 ctrl 键 实现多个选中功能
                        if (originalEvent.ctrlKey) {
                            _this.activate(target, _this.removeText);

                        } else {
                            _this.deactivate(groups, _this.removeText);
                            _this.activate(target, _this.removeText);
                        }


                        console.log(target)

                        break;


                    case 'default':
                        return false;
                        break;


                }


                // console.log(groups)
                // console.log(e)
            });
            //全局的window事件
            $(window).bind({
                dblclick: function () {
                    if (!_this.isAddGroup) return;
                    var position = stage.getPointerPosition();

                    _this.add({
                        shapeType: _this.shapeType,
                        x: position.x,
                        y: position.y,
                        baseGroup: baseGroup
                    });


                    var cloneGroupData = stage.findOne('.base').clone();
                    _this.insertData(cloneGroupData)
                },
                keydown: function (event) {
                    var e = event || window.event
                        , code = e.which || e.keyCode;
                    if (_this.isRemovedGroup(stage) != true)return;// 含有 toBeRemove 标志的才进行删除操作
                    if (46 === code && confirm('是否删除选择的内容框？')) {
                        _this.remove(stage);
                    }
                },
                mousedown: function () {
                    if (!isGroupInset) {
                        var groups = stage.find('Group');
                        _this.deactivate(groups, _this.removeText);
                    }
                }
            });
            // 侧边 导航栏 代理事件
            //  1：控制添加 组的标志
            //  2:   获取要添加组 的类型
            $sliderSuper.on('click', 'LI', function () {
                var $this = $(this);
                _this.shapeType = $this.data('shape');
                ///////////////////////
                ///////////////////////
                _this.isAddGroup = true;
                console.log($this.data('shape'));
            });


            //撤销
            Buttons.undo.on('click', function () {
                _this.undoData(stage);
                // console.log('撤销: ' + _this.stepIndex);
            });
            //还原上一步
            Buttons.regain.on('click', function () {
                _this.regainData(stage);
                // console.log('还原: ' + _this.stepIndex);
            })

        },
        init: function (options) {
            var baseGroup = options.stage.findOne('.base')
                , cloneGroupData = baseGroup.clone()
                ;
            //初始化数据
            this.insertData(cloneGroupData);
            // 绑定事件
            this.bindEvents(options.stage);
        }
    };
    //额外的方法
    Pattern.toolkit = {
        // 在点击 文本的组的时候，触发打开右边的 "字体面板"
        // 不符合此空间命名的属性  凑合用
        openTextPanel: function () {
            // 面板里的元素
            var $fontSetting = $('.font_slide_setting');
            $('.tab_font_btn').trigger('click');
            if ($fontSetting.css('display') == 'none') {
                $fontSetting.slideDown();
                $fontSetting.siblings().addClass('active');
            }
        },
        //改变颜色调色板的，作用的图形类型  默认刚开始是背景图  通过选择作用于 文本  图形（矩形，椭圆）
        resetColorType: function (type) {
            // 修改对应的 类型字符
            dom.resetTypeName.attr('data-' + dom.shapeType, type);
            // 添加了，其他的就切换成 灰色图标
        },
        //初始化当前之前编辑的数据，还原
        initOldData: function (instance) {
            var fontSize = instance.fontSize()
                , rotation = instance.rotation()
                , fill = instance.fill()
                , $size = $('#size_currentValue')
                , $sizeSibling = $('.size-radius')
                , $angle = $('#angle_currentValue')
                , $angleSibling = $('.angle-radius')
                , fpsAngle = 360 / 100 //3.6deg/px
                ;
            //设置 大小
            $size.val(fontSize);
            $sizeSibling.css({
                left: fontSize
            });
            //设置 角度
            $angle.val(rotation);
            $angleSibling.css({
                left: (rotation + 360) / fpsAngle
            });
            //颜色
            dom.oldColor.css({
                backgroundColor: fill
            });
            //为什么总是获取不了 data 属性的数据呢
            // 不可以用这个，用 缓存 localStorage
            //dom.oldColor.attr('data-color', fill);

            localStorage.setItem('oldHex', fill);
        },
        //点击组的时候，是 文本组
        addTextName: function (group) {
            // 给 字体实例添加一个属性
            // 只给最后激活的 字体实例 设置样式
            var text = group.findOne('Text')
                ;
            //console.log(text)
            if (text) {
                group.getStage().find('.textNode').forEach(function (text, index) {
                    text.removeName('active');
                });
                ///////// this ////
                //console.log(this === Pattern.toolkit)
                text.addName('active');
                this.openTextPanel();


                //添加了如 picture ,点击有文本的组 把类型变成：=》 data-shapetype = "text"
                this.resetColorType('text');
                /////////
                ///////// 同步选择颜色，同步在被选的文字实例上

                $('#angle_currentValue').val(100).triggerHandler('input')


                //初始化数据
                ///////////
                this.initOldData(text);
                Pallet.syncColor(function (hex) {
                    console.log('点击事件：clutter  Pallet.syncColor ');
                    var layer = group.getLayer()
                    var shapetype = Pallet.getShapeTypeName();
                    if (shapetype == 'text') {
                        text.fill(hex);
                        //一定要 draw()，不然会，慢一步才会绘制上去
                        // 一定在判断，选择后接着删除，改变颜色，draw 会报错  因为 group 已被删除
                        if (layer)layer.draw();
                    }
                });

            }


        },
        //获取组里面 内容的 Konva.Shape 的名字
        getSiblingName: function (group) {
            var shapes = group.getChildren()
                , i = 0
                , len = shapes.length
                , name
                , defaultShapeName = 'Circle';

            for (; i < len; i++) {
                name = shapes[i].getClassName();
                if (name !== 'Circle') {
                    defaultShapeName = name;
                    break;
                }
            }
            return defaultShapeName;
        },
        // 返回：舞台是否含有指定name的组
        getSpecifiedGroup: function (stage, markedName) {
            var groups = stage.find('.yoyo')
                , i = 0
                , len = groups.length;
            console.log('传进来的 name: ' + markedName);
            for (; i < len; i++) {
                var name = groups[i].getName();
                //  if (name.indexOf(markedName) > -1) {
                // /markedName/.test(name) 在这样字面量的正则表达式中不可以是 形参参数，必须变量变量形式（正则匹配字符）
                // var o = markedName
                // if(/o/.test(name)){
                if (new RegExp(markedName, 'g').test(name)) {
                    console.log('舞台有匹配的name : ' + name);
                    return groups[i];
                }
            }
            console.log('舞台没有匹配的name');
            return null;
        },
        // 返回：用来标记组的className
        // 组的索引 或是 id 均被Konva 动态控制 ，难以作为标记
        getSpecifiedGroupName: function (group) {
            var name = group.getName()
                , o = ''
                ;
            // var o = 'yoyo unique-ad4qk8i7iho'.replace(/yoyo (.*)/,'$1')
            name.replace(/(.+\b)\s+yoyo/, function (res, $1) {
                //  console.log(res)
                console.log('正则匹配标记的name:  ' + $1);
                o = $1;
            });
            return o;
        }

    };
    //转化文件
    var Blobs = {
        //传入要生成图片数据的 舞台对象
        one: function (options) {
            //获取base64，便开始转化
            var base64Data;
            // console.log(options.canvasOrBase64)
            //@todo:传入的是舞台还是，预览图片的数据 base64DataURL
            if (options.canvasOrBase64 instanceof Konva.Stage) {
                //舞台形式
                var stage = options.canvasOrBase64
                    , layer = stage.find('.mainLayer')
                    , anchors = stage.find('.anchor')
                    ;
                anchors.hide();
                layer.draw();
                base64Data = stage.toDataURL({
                    quality: 1,
                    callback: function (base64Data) {
                        anchors.show();
                        layer.draw();
                        console.log(base64Data.slice(0, 60))
                    }
                });
            } else {
                // 数据形式
                base64Data = options.canvasOrBase64;
            }

            var blob = Blobs.convert(base64Data)//转变成 Blob
                , LIMIT = 1024 * 1024 //默认 1M 大小
                , size = options.size * LIMIT || parseBytes(LIMIT, 1)//默认1 m 大小
                , fileSize = parseBytes(blob.size, 1);//获取文件的大小
            if (fileSize > size) {
                alert("您发送的文件为：" + fileSize + '\n\r ，最大上传的文件大小为：' + size);
                return false;//大于限制de文件大小不上传
            }
            ///////////////////////////////////
            //上传
            options.upload(options.alias, blob);
            console.log('上传的图片大小： ' + fileSize);


            // @bytes 要解析的字符大小
            // @decimal 取多少位小数
            function parseBytes(bytes, decimal) {
                var fileSize = 0,
                    units = ["KB", "MB", "GB", "TB"];
                decimal = decimal || 3;
                for (var i = 0, size = bytes / 1024; size > 1; size /= 1024, i++) {
                    fileSize = size.toFixed(decimal) + units[i];
                }
                return fileSize;
            }
        },
        //转化成 Blob
        convert: function (base64Data) {
            // data:image/png;base64,数据
            var byteString;
            if (base64Data.split(',')[0].indexOf('base64') >= 0) {
                byteString = atob(base64Data.split(',')[1]);
            } else {
                byteString = decodeURIComponent(base64Data.split(',')[1]);
            }
            var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];  // image/png
            var ia = new Uint8Array(byteString.length);//8位无符号整数
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);//charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
            }

            //////////////////
            //test
            var url = window.URL.createObjectURL(new Blob([ia], {type: mimeString}));
            var ii = new Image();
            ii.src = url;
            document.body.appendChild(ii);
            //////////////////

            console.log('blob形式二进制URI：' + window.URL.createObjectURL(new Blob([ia], {type: mimeString})));
            return new Blob([ia], {type: mimeString});
        }
    };
    //上传文件
    Blobs.uploadFile = {
        //开始上传
        begin: function (hoist) {
            var as = hoist.alias || ''
                , acceptType = hoist.acceptType || "application/jpg"
                , _this = this
                ;

            //上传文件
            Blobs.one({
                alias: as,//默认不用别名
                size: 2,//限制大小 2m
                canvasOrBase64: hoist.stage,//传入舞台或是 base64数据
                upload: function (alias, blob) {
                    var formData = new FormData()
                        , data = Common.getUserData()
                        , fileType = acceptType
                        , sn
                        ;


                    //不匿名
                    if (hoist.isAnonymity === false) {
                        if (!data) return;//不登陆的话，直接返回
                        //固定的必须数据
                        var token = data.token
                            , id = data.id
                            ;
                        sn = $('.current-printer').html();//获取序列号


                        //字段参数
                        formData.append('token', token);
                        formData.append('id', id);
                        ////////////////////
                        // 匿名
                    } else {
                        var name = prompt("请输入的序列号", "")
                        if (name) {
                            sn = name;
                        } else {
                            return false;
                        }

                    }


                    //字段参数
                    formData.append('file', blob);//打印，的数据流
                    formData.append('size', 4);//打印尺寸
                    if ($.trim(alias).length > 1) {//去除前后空白格字符在判断
                        formData.append('alias', alias);
                    }


                    _this.currentAjax = $.ajax({
                        ///////////
                        url: "https://www.dascomyun.cn/devctrl/dev/print/8637765",

                        type: 'POST',
                        data: formData,
                        processData: false,
                        contentType: false,
                        headers: {
                            "File-Type": fileType
                        },
                        success: function (res) {
                            console.log(res);

                        },
                        error: function (xhr, textStatus, err) {
                            console.log(xhr.readyState);
                        },
                        timeout: 10000,//10秒
                        complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                            if (status == 'timeout') {//超时,status还有success,error等值的情况
                                alert("超时，请稍后再试...");

                                //中断上传
                                if (_this.currentAjax) {
                                    _this.currentAjax.abort();
                                }
                            }

                            var code =  XMLHttpRequest.status;
                            if(code == 200){
                                alert("打印成功")
                            }else{
                                var res = JSON.parse(XMLHttpRequest.responseText);

                                alert("打印不成功，原因： " + res.error)
                            }
                        }
                    })

                }
            });
        },
        //中断上传
        abort: function () {
            this.currentAjax.abort();
        }
    };
    //打印的逻辑操作
    var Operation = (function () {
        ////////////////////////
        var hasPrinter = false;
        //打印前的 判断
        function printBeforeCheck() {
            var curPrinters = $('.current-printer');
            if (curPrinters.data('selected') == 'YES')hasPrinter = true;

            ///////////////////
            // 获取用户登录信息
            var userData = Common.getUserData();

            console.log(userData);
            //如果没有登录，就跳转登录
            if (!userData) {
                if (confirm('请先登录！\r\n 是否跳转到登录页面')) {
                    location.href = "../html/login.html";
                }
            } else {
                //登录后，若还没有选择默认的打印机
                //跳转到 打印机管理页面进行选择
                //只要判断没有选择中打印机就不执行
                if (!hasPrinter) {
                    if (confirm('请先选择一台打印机！\r\n是否跳转到打印机管理页面，选择打印机')) {
                        location.href = "../html/manage-printers.html";
                    }
                }
            }


        }

        //序列号显示 选择
        var Series = {
            //检查是否已登录
            is: function () {
                var data = Common.getUserData();
                if (data != null) return true;
            },
            //获取打印机序列号
            read: function () {
                return localStorage.getItem(Common.Message.sn) || '没有选中打印机';
            },
            //设置序列号内容
            write: function () {
                var curSN = this.read()
                    , $currentPrinterSn = $('.current-printer')
                    , islogin = this.is()
                    ;
                if (curSN.indexOf('没有选中打印机') == -1 && islogin) {
                    //序列号可以不删除，有一个默认（除非用户手动清除缓存数据）
                    //只有 用户登录 且 缓存中存在有序列号的数据 =>不到打印机管理选择，也有一个默认处理
                    //才设置被选择的属性为 ture;
                    $currentPrinterSn.attr('data-selected', 'YES');
                }
                $currentPrinterSn.html(curSN);
            },
            //给选择打印机图标绑定事件
            handle: function () {
                var $printTip = $('.print-tip');
                $('.fa-list').bind({
                    mouseenter: function () {
                        $printTip.fadeIn(100);
                    },
                    mouseleave: function () {
                        $printTip.fadeOut(100);
                    },
                    //如果是没有选中有=》打印机管理选择
                    //若是选择有=》更换打印机
                    click: function () {
                        if (confirm('是否跳转到打印机管理页面，选择打印机')) {
                            location.href = "../html/manage-printers.html";
                        }

                    }
                })
            }
        };
        //页面加载 便进行序列号视图渲染
        Series.write();
        Series.handle();

        return function (stage) {
            //打印按钮
            Buttons.print.on('click', function () {
                //打印前的 判断
                printBeforeCheck();

                // 打印
                //////////////
                if(!hasPrinter) return;
                Blobs.uploadFile.begin({
                    stage: stage,
                    isAnonymity: false//不匿名
                });

            });

            $('.noname-print-btn').on('click', function () {
                // 打印
                //////////////
                Blobs.uploadFile.begin({
                    stage: stage,
                    isAnonymity: true//匿名
                });

            });
        }
    })();
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
                //此处不需要 函数类型的数据对比
                ///////////////////////////
                if (arguments[i].hasOwnProperty(key) && !(src[key] instanceof Function)) {
                    target[key] = src[key];
                }
            }
        }
        return target;
    }

    //导出
    /*****************************************************************************************************/
    module.exports = {
        initPattern: function (options) {
            Pattern.init(options);//传入舞台
        },
        //上传文件，初始化
        initUploadFile: function (stage) {
            Operation(stage);
        }
    };
});
