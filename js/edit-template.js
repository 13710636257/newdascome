//新建画布
function Lower(options) {
    if (!this instanceof Lower) return new Lower(options);
    this.init(options)
}
Lower.prototype = {
    constructor: Lower,
    init: function (options) {
        var url = options.src || '../img/draw/HenequenCactus_ZH-CN11794616839_1920x1080.jpg'//图片的资源路径
            , WIDTH = options.width || 856
            , HEIGHT = options.height || 540
            , FILL = options.fill || '#F1F1F1'
            , corcnerRadius = options.corcnerRadius || 20
            , stage = options.stage

            , layer = new Konva.Layer({
                id: 'background-layer'
            })
            , image = new Image()
            , rect = new Konva.Rect({
                x: 0,
                y: 0,
                width: WIDTH,
                height: HEIGHT,
                fill: FILL,//图片 404 情况给个默认填充颜色
                cornerRadius: corcnerRadius,
                id: 'background-rect'
            });


        stage.width(WIDTH);
        stage.height(HEIGHT);
        layer.add(rect);
        stage.add(layer);

        image.src = url;
        image.onload = function () {
            var w = this.width
                , h = this.height;
            //若是更换图片，要先清除填充颜色,onload 回调执行，
            // 若是在选择事件再 rect.fill(null) 会出现更换图片迟缓
            rect.fill(null);
            rect.fillPatternImage(image);//填充图片
            // 缩放与画布一样大小尺寸
            //bug: 图片这样会变形不能等比缩放填满画布
            //不能如：background: no-repeat center center ;background-size:cover;
            rect.fillPatternScale({
                x: WIDTH / w,
                y: HEIGHT / h
            })
            layer.draw();
        }
    }
}
//新建画布模态框对象
var builtModal = {
    parent: $('.built-paper-aside'),
    show: function () {
        this.parent.fadeIn(100);
    },
    hide: function () {
        this.parent.fadeOut(100);
    },
    handle: function (stage) {
        var $confirm = $('.confirm-built')
            , $cancle = $('.cancel-built')
            , $paperWidth = $('#paper-width')
            , $paperHeight = $('#paper-height')
            , _this = this
            , $close = this.parent.find('.fa');


        //确认新建
        $confirm.on('click', function () {
            var w = $paperWidth.val()
                , h = $paperHeight.val()
            //判断获取数字类型
            w = returnDigit('width', w);
            h = returnDigit('height', h);
            //新建一张画布
            new Lower({
                width: w,
                height: h,
                stage: stage
            })

            //新建后隐藏
            _this.hide();
        });

        //取消的话，默认的宽高
        $cancle.on('click', function () {
            //新建一张画布
            new Lower({
                stage: stage
            })

            //新建后隐藏
            _this.hide();
        });

        //关闭图标
        $close.on('click', function () {
            $cancle.trigger('click');
        })

        //回车触发事件
        $(window).on('keydown', function (event) {
            var e = event || window.event
                , code = e.keyCode || e.which || e.charCode;
            if (code === 13) {
                if ($paperWidth.val().length < 1 || $paperHeight.val().length < 1) return false;
                $confirm.trigger('click');
            }
        })
    }
};

// global fn 返回数字
function returnDigit(node, number) {
    //isNaN("Hello") true
    var num = parseInt(number);
    if (isNaN(num)) throw  node + ': 请输入为数字类型';
    return num;
}
function positionXY(x, y) {
    $('.x').html('x: ' + parseInt(x));//加 toFixed()解决 进行屏幕缩放的出现多位小数点bug
    $('.y').html('y: ' +  parseInt(y));
}
var stage = new Konva.Stage({
    container: 'container'
});
builtModal.handle(stage);
//鼠标在画布移动坐标显示
stage.on('mousemove', function () {
    var positiosn = stage.getPointerPosition()
    positionXY(positiosn.x, positiosn.y)
})


$(function () {
    //渲染画板
    var drawFn = {
        container: '.canBox',
        forntMap: {},
        backMap: {},
        isSend: false,
        saveData: function () {
            var _this = this;

            $(this.container).delegate('INPUT', 'input', function () {
                // input 事件
                // change
                // input HTML5 IE8不支持
                // input propertychange IE

                var $this = $(this),
                    $parent = $this.parent();

                var id = $parent.attr('id'),
                    val = $this.val(),
                    xy = $parent.position(),
                    divHeight = $parent.height(),
                    size = $this.css('font-size'), // chrome "13.3333px"
                    color = $this.css('color'); // chrome "rgb(0, 0, 0)"

                console.log(size)

                // 爷爷 判断是正面还是反面
                var valMap;
                if (!_this.forntMap[id] || !_this.backMap[id]) {

                    var forntOrBack = id.slice(-1);

                    forntOrBack == 1 ? valMap = _this.forntMap : valMap = _this.backMap;


                    valMap[id] = {
                        xy: '',
                        txtValue: [],
                        ftSize: [],
                        ftColor: [],
                        divHeight: []
                    };

                    // 固定写死 位置 暂时无需记录
                    valMap[id]['xy'] = xy;
                    valMap[id]['txtValue'].push(val);
                    valMap[id]['ftSize'].push(size);
                    valMap[id]['ftColor'].push(color);
                    valMap[id]['divHeight'].push(divHeight);
                } else {
                    valMap[id]['xy'].push(xy);
                    valMap[id]['txtValue'].push(val);
                    valMap[id]['ftSize'].push(size);
                    valMap[id]['ftColor'].push(color);
                    valMap[id]['divHeight'].push(divHeight);
                }

                //console.log(valMap);
                sessionStorage.setItem('valMvp', JSON.stringify(valMap));
            })

        },
        dataRenderToCanvas: function (canvas, data) {
            if ($.isEmptyObject(data)) {
                // alert('留点数据下来，才可以预览！');
            }

            var _this = this;

            renderText();
            function renderText() {
                var ctx = canvas.getContext('2d');

                var w = canvas.width,
                    h = canvas.height;

                var img = new Image(),
                //"url("http://localhost:49697/20170719/again-draw/img/draw/cardTpl/bg_11_fornt.png")"
                //获取 src
                    imgSrc = $(canvas).closest('.card').css('background-image').replace('url("', '').replace('")', '');


                img.onload = function () {
                    // 预览图片的 img
                    var $front = $('.preview_fornt'),
                        $back = $('.preview_back');


                    // 绘制图片
                    ctx.drawImage(img, 0, 0, w, h);

                    // 填充文字
                    for (var key in data) {
                        if (data.hasOwnProperty(key)) {
                            var item = data[key];

                            ctx.fillStyle = item.ftColor.slice(-1)[0];

                            ctx.font = item.ftSize.slice(-1)[0] + ' Helvetica, Arial, 微软雅黑, 黑体, sans-serif';


                            var txtArr = item['txtValue'],
                                len = txtArr.length,
                                offsetH = item['divHeight'].slice(-1)[0],

                                x = item['xy'].left,
                                y = item['xy'].top + offsetH / 2 + 4;

                            ctx.fillText(txtArr[len - 1], x, y);


                            console.log('x:' + x + '\n y:' + y + '\n val:' + item['txtValue'][item['txtValue'].length - 1])
                        }

                    }

                    var base64 = canvas.toDataURL();
                    console.log(base64.slice(0, 40));

                    //////////////////////
                    ///////////////////////
                    //生成 url
                    // dataURItoBlob(base64)

                    // 发送图片标志
                    if (_this.isSend) {
                        uploadBlobData(base64);
                    }


                    // 预览图片
                    if ($(canvas).attr('id') == 'forntCan') {
                        $front.attr('src', base64)
                    } else if ($(canvas).attr('id') == 'backCan') {
                        $back.attr('src', base64)
                    } else if ($(canvas).attr('id') == 'oneCan') {

                        // 一张图片时候 预览的反面图片删除 只要正面的并居中
                        $front.attr('src', base64);
                        $front.css({
                            marginLeft: -$front.width() / 2,
                            marginTop: -$front.height() / 2
                        })
                        $back.remove()
                    }

                };
                img.src = imgSrc;
            }
        },
        // 发送图片
        uploadData: function () {
            this.isSend = true;
            this.previewImage();
        },
        // 预览图片
        previewImage: function () {
            var _this = this;
            $('.canvas-card').each(function (index, item) {
                var id = item.id;
                if (id == 'forntCan') {
                    _this.dataRenderToCanvas(item, _this.forntMap);
                } else if (id == 'backCan') {
                    _this.dataRenderToCanvas(item, _this.backMap);
                } else if (id == 'oneCan') {
                    _this.dataRenderToCanvas(item, _this.backMap);
                }
            })

        }
    };
    drawFn.saveData();
    //充公
    var addition = {
        showX: '.x',
        showY: '.y',
        verticalToolNav: '.tool_slider_nav'
    };
    var slider = {
        isDrag: false,// 改变宽高标志
        isMove: false,// 是否可以拖拽标志
        isAddGraph: false,//添加图形标志
        DEFAULTS: {
            originDragBox: '.dragBox',// 拖拽框
            container: '.canvas_wrapper',//大容器
            textInputBox: '.text-area-box'//文本输入框的容器
        },
        _init: function () {
            this.DEFAULTS = $.extend(this.DEFAULTS, addition);

            this.container = $(this.DEFAULTS.container);
            this.originDragBox = $(this.DEFAULTS.originDragBox);//原始拖拽框

            this.canvasBox = this.container.find('.card');//画布容器

            this.dragPoint = this.container.find('.point');//拖拽点
            this.originReplaceClass = 'font';//克隆拖拽框文字的类名  useless

            this.order = 0;//记录添加拖拽框的序号

            this.activeClass = 'edit-input-active';//当前激活的状态拖拽框

            this.isConfirmDel = false;//确认删除

            this.verticalToolNav = $(this.DEFAULTS.verticalToolNav);//左侧工具栏容器

            this.modifyTpl();


            // init item data
            // 记录所有拖拽框（不管是否删除）
            this.dragBoxData = {
                /*  1: {
                 exist: 0, //是否已删除标志
                 dragWH: [], // ['45:96',]
                 dragXY: [], // ['10:120',]
                 innerDom: {
                 content: [], // ['姓名'，] || ['width:height:bg']
                 font: [], // family-style-weight-color-size
                 }
                 }*/
            };

            this.stepData = [];//用来记录拖拽框数据改变次序 用来撤销与还原

            this.isDataChange = false;//判断拖拽框 mousedown 与 mouseup 这过程有没有数据变化（WH XY）


        },
        //设置相对画布坐标
        positionXY: function (x, y) {
            var $canvasBox = this.canvasBox,
                l = $canvasBox.offset().left,
                t = $canvasBox.offset().top,
                $x = $(this.DEFAULTS.showX),
                $y = $(this.DEFAULTS.showY);
            x = ( x - l).toFixed(0);
            y = (y - t).toFixed(0);

            $x.html('x: ' + x);//加 toFixed()解决 进行屏幕缩放的出现多位小数点bug
            $y.html('y: ' + y);
        },
        // 拖拽移动
        move: function () {

            var $container = this.container,
                selector = this.DEFAULTS.originDragBox,
                $canvasBox = this.canvasBox,

                textAreaBoxSelector = this.DEFAULTS.textInputBox,

                _this = this;


            var $window = $(window),
                anchorX = 0,
                anchorY = 0;

            this.dragIndex = 0;

            var originDragWidth = this.originDragBox.outerWidth(),
                originDragHeight = this.originDragBox.outerHeight();

            //获取宽高使用
            var $dragPoint = this.dragPoint;

            // 隐藏文本框的标志
            var isHiddenTextInputBox = false;
            // 隐藏拖拽点 与拖拽框 标志
            var isHiddenDragPoint = false;
            var activeClass = this.activeClass;


            //拖拽点代理
            $container.delegate('.point', 'mousedown', function () {
                var $this = $(this);

                //获取拖拽点的名称
                _this.dragPointName = $this.data('point');

                _this.isDrag = true;
            });
            //拖拽框代理
            $container.delegate(selector, 'mousedown mouseup mouseenter mouseleave dblclick click', function (event) {
                var e = event || window.event,
                    type = e.type;


                // 获取当前拖拽框 相对父元素的 left top
                var $this = $(this),
                //当前拖拽框的尺寸
                    curDragWidth = $this.outerWidth(),
                    curDragHeight = $this.outerHeight();

                var target = e.target;

                switch (type) {

                    case 'mousedown':
                        showActiveDragBox($this);

                        // 只有鼠标按下不是拖拽点的 拖拽框就可以拖拽
                        ///////////////////////////////////////
                        if (!$(target).hasClass('point')) {
                            _this.isMove = true;
                        }
                        ///////////////////////////////////////

                        var _top = $this.position().top,
                            _left = $this.position().left;
                        // 记录鼠标在拖拽框按下鼠标的位置
                        anchorX = e.clientX - _left;
                        anchorY = e.clientY - _top;


                        //获取当前的索引
                        _this.dragIndex = $(selector).index($this);

                        //一次数据的开始 标志位 push 1
                        _this.stepData.push(1);
                        console.log('鼠标mousedown时stepData,添加开始标志位');
                        console.log(_this.stepData);


                        _this.cloneStepData = $.extend({}, _this.dragBoxData[$this.data('order')]);

                        console.log('mousedown克隆当前的拖拽框的数据');
                        console.log(_this.cloneStepData);

                        break;

                    case 'mouseup':
                        //先记录数据再push 停止标志位
                        var order = $this.data('order');


                        (function () {
                            var upDragBoxData = _this.dragBoxData[order]
                            var downDragBoxData = _this.cloneStepData

                            for (var key in downDragBoxData) {
                                if (downDragBoxData.hasOwnProperty(key)) {
                                    //在鼠标按下 与 弹起 两个事件得到的数据 进行对比是否单纯的 按下与弹起（没有移动）
                                    //倘若其中的一项不同 isDataChange 为true
                                    // downDragBoxData[innerDom] 不用进行校验
                                    //因为 只要是 拖拽移动（downDragBoxData[dragXY]） 或是 改变宽高 downDragBoxData[dragWH]
                                    //或是改变文字 通过文字来 检测控制
                                    //(!downDragBoxData[key] instanceof Object) 这一步为false不用在判断过滤也可以
                                    if ((downDragBoxData[key] != upDragBoxData[key])) {
                                        console.log('有不相同的');
                                        _this.isDataChange = true;
                                    }
                                }
                            }

                        }());

                        if (_this.isDataChange) {
                            _this.stepData.push(_this.dragBoxData[order]);
                            //在拖拽框按下鼠标  push 0，表示一次结束
                            _this.stepData.push(0);
                            console.log('鼠标mouseup弹起stepData，添加结束标志位');
                            console.log(_this.stepData);
                            // _this.contrastData($this);

                            //记录后复位
                            _this.isDataChange = !_this.isDataChange;
                        } else {
                            //把 mousedown 的 push 的 1 删除掉
                            // _this.stepData.splice(-1, 1);
                        }


                        console.log(_this.stepData);

                        break;

                    case 'mouseenter':
                        isHiddenDragPoint = true;
                        break;

                    case 'mouseleave':
                        isHiddenDragPoint = false;
                        break;


                    case 'dblclick':
                        var POINT_WITH = $dragPoint.width(),
                            POINT_HEIGHT = $dragPoint.height();
                        var setTop = $this.offset().top + curDragHeight + POINT_HEIGHT / 2,
                            setLeft = $this.offset().left - POINT_WITH / 2;

                        // 判断当前拖拽框是不是含有文本
                        _this.curDragBox = $this;
                        var hasInputTextDom = $this.children().last().hasClass('font');
                        if (hasInputTextDom) {
                            ////////////////////////////////
                            //获取当前的显示文本框的对应的拖拽框
                            ////////////////////////////////
                            _this.importText($this, setTop, setLeft);
                        }
                        break;

                    case 'click':
                        //按住 ctrl进行多选
                        if (e.ctrlKey) {
                            $this.data('isdelete', true);
                        } else {
                            $this.data('isdelete', true).siblings(selector).data('isdelete', false);
                        }
                        var viewBg = function () {
                            $(selector).each(function () {
                                var $this = $(this);
                                //如果是 点击选中的高亮 data-isdelete = true
                                // 但是 除了当前有 activeClass 除外
                                if ($this.data('isdelete')) {
                                    if ($this.hasClass(activeClass)) {
                                        $this.css('backgroundColor', 'transparent')
                                    }
                                    $this.css('backgroundColor', 'rgba(0,0,0,.2)')
                                } else {
                                    $this.css('backgroundColor', 'transparent');
                                }
                            });
                        }();

                        break;
                }

            });


            //window 句柄
            $window.bind({

                mousemove: function (event) {
                    // 禁止 文本框的文字选中
                    preventDefault(event);
                    var e = event.originalEvent || window.event.originalEvent;

                    var newTop = e.clientY - anchorY,
                        newLeft = e.clientX - anchorX,
                        curIndex = _this.dragIndex,
                    ///////////////////////////////////////////////////////
                        $curDragBox = $(selector).eq(curIndex);//获取当前的拖拽框

                    _this.resize($curDragBox);

                    // 相对画布坐标
                    _this.positionXY(e.clientX, e.clientY);

                    if (_this.isMove) {
                        $curDragBox.css({
                            top: newTop,
                            left: newLeft
                        });
                        ///////////////////////////////////////////////////////
                        ///////////////////////////////////////////////////////
                        _this.initData($curDragBox, newLeft, newTop);


                        console.log('移动move后的stepData')
                        console.log(_this.stepData)

                        // _this._isReliableData($curDragBox);

                    }


                    if (_this.isDrag) {
                        var dragPointName = _this.dragPointName;

                        switch (dragPointName) {
                            case 'left':
                                leftDrag(e, $curDragBox);
                                break;

                            case 'right':
                                rightDrag(e, $curDragBox);
                                break;

                            case 'bottom':
                                bottomDrag(e, $curDragBox);
                                break;

                            case 'up':
                                upDrag(e, $curDragBox);
                                break;

                            case 'left-up':
                                leftDrag(e, $curDragBox);
                                upDrag(e, $curDragBox);
                                break;

                            case 'right-up':
                                rightDrag(e, $curDragBox);
                                upDrag(e, $curDragBox);
                                break;

                            case 'left-bottom':
                                leftDrag(e, $curDragBox);
                                bottomDrag(e, $curDragBox);
                                break;

                            case 'right-bottom':
                                rightDrag(e, $curDragBox);
                                bottomDrag(e, $curDragBox);
                                break;
                        }
                    }


                },

                mousedown: function () {

                    // 不在文本输入框里按下 就移除
                    if (!isHiddenTextInputBox) {
                        // 不能 remove 不然检测的的事件就不存在
                        $('.text-area-box').detach();
                    }


                    //获取添加在 CanvasBox 里的 拖拽框
                    ////////////////////////////////
                    //按下鼠标 把拖拽框隐藏
                    // 去除所有的背景颜色
                    var $dragBoxInCanvasBox = $canvasBox.find(selector);
                    if (!isHiddenDragPoint) {
                        $dragBoxInCanvasBox.removeClass(activeClass).css('backgroundColor', 'transparent');
                    }


                    // 因为原始拖拽框 没有被点击过因此  data-isdelete false

                },

                mouseup: function () {
                    _this.isDrag = false;
                    _this.isMove = false;

                },

                keydown: function (event) {
                    var e = event.originalEvent || window.event.originalEvent,
                        code = e.keyCode || e.which;


                    //删除 已选择的拖拽框
                    if ((code == 46)) {

                        // 遍历是否有符合 删除条件的
                        // 主要是为了 确认框的弹出条件设定
                        $(selector).each(function () {
                            if ($(this).data('isdelete')) {
                                _this.isConfirmDel = true;
                                return false;
                            }
                        });

                        if (_this.isConfirmDel && confirm('是否要删除你所选择的拖拽框的内容？')) {
                            _this.deletion();


                            _this.stepData.push(0);
                            console.log('删除拖拽框');
                            console.log(_this.stepData);


                            // 8-20bug解决：因为第一次删除拖拽框后  _this.isConfirmDel = true;
                            // 每次按 delete键都会弹出 删除确认（没有选择也会弹出）
                            // 需要再删除之后 手动复位 把   _this.isConfirmDel = false;
                            _this.isConfirmDel = false;
                        }
                    }


                },

                click: function () {
                    //获取添加在 CanvasBox 里的 拖拽框
                    ////////////////////////////////
                    //解决连续添加拖拽框时候 ，拖拽框都是激活状态
                    var $dragBoxInCanvasBox = $canvasBox.find(selector);
                    if (!isHiddenDragPoint) {
                        $dragBoxInCanvasBox.removeClass(activeClass);
                        $dragBoxInCanvasBox.data('isdelete', false);
                    }

                },

                dblclick: function (event) {
                    //双击时候再获取画布容器的 相对窗口的距离
                    var canvasBoxLeft = $canvasBox.offset().left,
                        canvasBoxTop = $canvasBox.offset().top;

                    var OFFSETX = 6;


                    //添加拖拽框
                    var e = event.originalEvent || window.event.originalEvent,
                        x = e.clientX - canvasBoxLeft + OFFSETX,
                        y = e.clientY - canvasBoxTop - originDragHeight / 2;
                    ////////////////////
                    _this.add(x, y);
                }
            });


            //window按下鼠标隐藏，但在文本输入框按下不执行隐藏
            // 只要在 文本框 或是拖拽框里 点击按下 均不会隐藏 拖拽点
            // 2017-8-25解决文本输入的时候，只要是拖拽的文本内容都会改变
            // 解决是：把文本域 盒子动态生成添加 ，再把文本域 盒子代理，控制 标志位
            $container.delegate(textAreaBoxSelector, 'mouseenter mouseleave', function (event) {
                var e = event || window.event,
                    type = e.type;
                switch (type) {
                    case 'mouseenter':
                        isHiddenTextInputBox = true;
                        isHiddenDragPoint = true;
                        break;
                    case 'mouseleave':
                        isHiddenTextInputBox = false;
                        isHiddenDragPoint = false;
                        break;
                }
            });


            // 显示激活状态的拖拽框
            function showActiveDragBox(curDragBox) {
                //获取添加在 CanvasBox 里的 拖拽框
                ////////////////////////////////
                var $dragBoxInCanvasBox = $canvasBox.find(selector);
                $dragBoxInCanvasBox.removeClass(activeClass);
                curDragBox.addClass(activeClass);
            }


            // 左
            function leftDrag(e, curDragBox) {
                var x = e.clientX - 4;
                var oldWidth = curDragBox.width();

                // 当前 offsetLeft - 鼠标按下拖动时刻的 x坐标
                var addWidth = curDragBox.offset().left - x;


                var newLeft = curDragBox.position().left - addWidth,
                    newTop = curDragBox.position().top;


                //设置 改编后的宽度 与 left值
                curDragBox.css({
                    width: oldWidth + addWidth,
                    left: newLeft
                });


                _this.initData(curDragBox, newLeft, newTop)
            }

            // 上
            function upDrag(e, curDragBox) {
                var y = e.clientY,
                    oldWidth = curDragBox.height();

                // 当前 offsetLeft - 鼠标按下拖动时刻的 x坐标
                var addHeight = curDragBox.offset().top - y;


                var newLeft = curDragBox.position().left,
                    newTop = curDragBox.position().top - addHeight;


                //设置 改编后的宽度 与 left值
                curDragBox.css({
                    height: oldWidth + addHeight,
                    top: newTop
                })

                _this.initData(curDragBox, newLeft, newTop)
            }

            //右
            function rightDrag(e, curDragBox) {
                var x = e.clientX;

                var newLeft = curDragBox.position().left,
                    newTop = curDragBox.position().top;

                //设置 改编后的宽度 与 left值
                curDragBox.css({
                    width: x - curDragBox.offset().left
                })


                _this.initData(curDragBox, newLeft, newTop)
            }


            // 下
            function bottomDrag(e, curDragBox) {
                var y = e.clientY;
                //设置 改编后的宽度 与 left值

                var newLeft = curDragBox.position().left,
                    newTop = curDragBox.position().top;

                curDragBox.css({
                    height: y - curDragBox.offset().top
                });

                _this.initData(curDragBox, newLeft, newTop)
            }

        },
        // 因为拖拽框改变大小，图形按比例缩放
        resize: function (current) {
            var curWidth = current.outerWidth(),
                curHeight = current.outerHeight(),

                scale = curHeight / curWidth,

                MIN_VALUE = Math.min(curWidth, curHeight);

            var $graph = current.children().eq(-1),
                detailGraph = $graph.attr('class');

            /*   var graphW = $graph.width(),
             graphH = $graph.height();*/

            var NORMAL_SCALE = 9 / 16,//条形码
                H_RECT_GRAPH_TO_CURRENT = 70 / 90,//正方形
                W_RECT_GRAPH_TO_CURRENT = 120 / 160,//正方形


                H_RADIUS_GRAPH_TO_CURRENT = 30 / 90,//正方形
                W_RADIUS_GRAPH_TO_CURRENT = 30 / 160,//正方形


                H_QRCODE_GRAPH_TO_CURRENT = 80 / 90;

            //根据判断 最后的子元素的类名 区分
            if (/line$/.test(detailGraph)) {

                if (curHeight > 120) {
                    $graph.height(4)
                }


            } else if (/rect/.test(detailGraph)) {

                $graph.width(MIN_VALUE * H_RADIUS_GRAPH_TO_CURRENT);
                $graph.height(MIN_VALUE * H_RADIUS_GRAPH_TO_CURRENT);


            } else if (/radius/.test(detailGraph)) {

                // 保持圆形
                $graph.width(MIN_VALUE * H_RADIUS_GRAPH_TO_CURRENT);
                $graph.height(MIN_VALUE * H_RADIUS_GRAPH_TO_CURRENT);
            }
            else if (/line-code|bg-image/.test(detailGraph)) {

                $graph.width(curWidth * W_RECT_GRAPH_TO_CURRENT);
                $graph.height(curHeight * H_RECT_GRAPH_TO_CURRENT);
            }
            else if (/qr-code/.test(detailGraph)) {

                $graph.width(MIN_VALUE * H_QRCODE_GRAPH_TO_CURRENT);
                $graph.height(MIN_VALUE * H_QRCODE_GRAPH_TO_CURRENT);
            }


        },
        //根据点击不同添加图案 来改变html再替换克隆拖拽框的 拖拽内容
        modifyTpl: function () {
            var $verticalToolNav = this.verticalToolNav,
                $originDragContent = this.originDragBox.children().eq(-1);
            //////////////////////原始的outerHTML ///////////////////////
            this.originOuterHTML = $originDragContent.get(0).outerHTML;

            var targetName = 'font',
                _this = this;
            $verticalToolNav.delegate('LI', 'click', function () {
                ///////////////////////
                // 添加图案标志
                _this.isAddGraph = true;
                //////////////////////
                var $this = $(this),
                    replacementClass = $this.data('step');
                $this.addClass('step-active').siblings().removeClass('step-active');

                _this.originOuterHTML = _this.originOuterHTML.replace(targetName, replacementClass);
                console.log('添加图案***' + _this.originOuterHTML + '***' + _this.isAddGraph);


                /////////////////////////////
                targetName = replacementClass;

                //// 为了添加问题有输入提示 "请输入文字"，其他为空
                ;
                +function () {
                    if (_this.originOuterHTML.indexOf('font') > -1) {
                        if (_this.originOuterHTML.indexOf('请输入文字') == -1) {
                            _this.originOuterHTML = _this.originOuterHTML.replace('font">', 'font">请输入文字')
                        }
                    } else {
                        _this.originOuterHTML = _this.originOuterHTML.replace('请输入文字', '');
                    }
                }();

            });


        },
        //添加拖拽框
        add: function (x, y) {
            var $cloneDragBox = this.originDragBox.clone(),
                $canvasBox = this.canvasBox,
                selector = this.DEFAULTS.originDragBox,
                activeClass = this.activeClass;

            var _this = this;


            if (this.isAddGraph) {
                // 全局变量
                var replacement = _this.originOuterHTML;

                // 8-20解决bug:一旦删除了拖拽框 重新连续添加 图形出现拖拽框激活状态的
                // 1：把 html 的了名edit-input-active去掉
                // 2::先把全部的拖拽框 移除激活状态
                //:3：为新添加的克隆拖拽框加上激活类名 addClass(activeClass);
                $(selector).each(function () {
                    $(this).removeClass(activeClass);
                });


                // 先修改 order 序号值再 append 这样查看 outerHTML 这样的order 都为正确添加的序号
                //就不是存在内存中 通过 刚开始 $cloneDragBox.eq(i).data(''order)'           获取查看了
                var outerHTML = $cloneDragBox[0].outerHTML;
                /////////////
                this.order++;
                /////////////
                outerHTML = outerHTML.replace('data-order="0"', 'data-order="' + this.order + '"');
                var $modifiedCloneDragBox = $(outerHTML);
                $canvasBox.append($modifiedCloneDragBox);

                // 根据父元素定位
                $modifiedCloneDragBox.css({
                    top: y,
                    left: x
                }).addClass(activeClass);


                //console.log($modifiedCloneDragBox[0].outerHTML)

                //获取拖拽框最后一个元素 被替换类名 动态改变
                var $die = $modifiedCloneDragBox.children().eq(-1);
                $die.replaceWith(replacement);
                // 替换元素,替换元素的类名不可以，因为替换后是返回类名的字符串 替换逻辑不在这里
                // var $die = $cloneDragBox.children().eq(-1).attr('class');
                //$die.replace(font, replacement)
                // console.log($modifiedCloneDragBox.children().eq(-1));


                //初始化数据
                ///////////
                this.stepData.push(1);
                this.initData($modifiedCloneDragBox, x, y);
                // 盘古开天
                this.stepData.push(this.dragBoxData[this.order]);

                //双击添加后 push 0停止标志
                this.stepData.push(0);

                console.log('------------------------------------');
                console.log('盘古开天');
                console.log(_this.stepData);
                console.log('------------------------------------');


                ///////////////////////
                ///////////////////////
                this.isAddGraph = false;
            }

        },
        // 删除拖拽框
        deletion: function () {
            var selector = this.DEFAULTS.originDragBox,
                $dragBoxes = $(selector);

            var _this = this;

            $.each($dragBoxes, function (index, item) {
                var $this = $(item),
                    isDelete = $this.data('isdelete');

                var delOrder = $this.data('order');
                //解决 刚添加的拖拽框 不是因为鼠标按下激活的
                if (isDelete) {
                    _this.stepData.push(1);
                    console.log('删除标志1');
                    console.log(_this.stepData);

                    //在删除前克隆一份
                    //2017-8-31 利用克隆 把 再把this.dragBoxData[delOrder]设置exist=0,
                    // 解决：this.stepData的 每一项的order相同中 exist=0 的bug
                    //var cloneDeleteBoforeDragBox = $.extend({}, _this.dragBoxData[delOrder])

                    $this.detach();

                    //可是 this.dragBoxData[delOrder] 还是为1
                    //cloneDeleteBoforeDragBox['exist'] = 0;
                    // _this.stepData.push(cloneDeleteBoforeDragBox);


                    //2017-8-31元素因为是 引用类型的原因
                    //不可以设置  _this.dragBoxData[delOrder][''exist]
                    // 这样会所有的  _this.dragBoxData[delOrder] 得 exist 都为 0
                    //***********这个设计就是为了 渲染在画布而做的标志***************
                    _this.dragBoxData[delOrder].exist = 0;
                    _this.stepData.push(_this.dragBoxData[delOrder]);

                    //为什么删除了 exist会把添加前this.stepData的exist为1 ，都会变成 0 了？？？
                    //  delete _this.dragBoxData[delOrder];


                    console.log('------------------------------------')
                    console.log('删除数据')
                    console.log(_this.stepData)
                    console.log(_this.dragBoxData)
                    console.log('------------------------------------')
                }
            })

        },
        // 文本域文本输入
        importText: function (curDragBox, dragInputTextTop, dragInputTextLeft) {
            var areaHtml =
                '<div class="text-area-box">'
                + ' <h2 class="text-area-caption">输入文字</h2>'
                + ' <textarea name="text-area" class="text-area" placeholder="输入文字" autofocus></textarea>'
                + ' </div>';
            var $textInputBox = $(areaHtml);
            this.canvasBox.append($textInputBox);
            var $textInput = $textInputBox.children('.text-area'),//文本域
                $dragInput = curDragBox.children().last();//获取当前的编辑框的 拖拽框的文本容器

            //把当前的拖拽框的拖拽文本 回写在 文本域中
            var dragInputText = $dragInput.html();
            $textInput.val(dragInputText);


            var curOrder = curDragBox.data('order'),
                _this = this,
                t = curDragBox.position().top,
                l = curDragBox.position().left;

            //设置文本输入框的位置
            // 判断是文本框时候才显示定位
            $textInputBox.offset({
                top: dragInputTextTop,
                left: dragInputTextLeft
            });

            // 这个不可以做代理，不然会重复之前 全部都会改变拖拽框文本内容
            $textInput.bind({
                input: function () {
                    var val = $(this).val();
                    $dragInput.html(val);

                    //不断更新数据
                    _this.initData(curDragBox, l, t);
                },
                change: function () {
                    //数据改变
                    //这个都不用判断 文字是否前后发生改变
                    // change 文字前后的变化 不一样就会触发 change事件
                    // 即时你输入了文字 但是最终的文字内容跟你输入之前一样 change事件不会触发
                    _this.stepData.push(1);
                    console.log('文本输入数据变化,标志位 1 ');


                    //追加文本改变数据
                    _this.stepData.push(_this.dragBoxData[curOrder]);
                    _this.stepData.push(0);

                    console.log('------------------------------------');
                    console.log('文本输入数据变化,标志位 0 ');
                    console.log(_this.stepData);
                    console.log('------------------------------------')
                }
            });
        },
        //获取 克隆时候拖拽框的数据
        // 数据变化的存放函数
        initData: function (initDragBox, x, y) {
            var dragW = initDragBox.width(),
                dragH = initDragBox.height(),
                _this = this,

                last = initDragBox.children().last(),//判断最后的一个类型
                order = initDragBox.data('order');//当前序号


            //初始化数据
            var _initData = {
                exist: 0, //是否已删除标志
                order: order, //序号
                dragWH: '', // ['45:96',]
                dragXY: '', // ['10:120',]

                innerDom: {
                    content: '', // ['姓名'，] || ['width:height:bg']
                    font: '' // family-style-weight-color-size
                }
            };

            var innerDomStyle = _getStyle(last);
            innerDomStyle = innerDomStyle.join(':');


            //微软雅黑:normal:bold:rgb(224, 11, 51):15px
            // console.log(innerDomStyle)

            _this.dragBoxData[order] = _initData;

            var item = _this.dragBoxData[order];

            item.exist = 1;
            item['dragWH'] = dragW + ':' + dragH;
            item['dragXY'] = x + ':' + y;

            if (last.hasClass('font')) {
                item['innerDom']['font'] = last.html();
            } else {
                //不是拖拽的文本框，则删除
                delete  item['innerDom']['font'];
            }
            item['innerDom']['content'] = innerDomStyle;

            //console.log(_this.dragBoxData);

            var storage = [];
            storage.push(_this.dragBoxData[order]);
            sessionStorage.setItem(order, JSON.stringify(storage));

            // 获取拖拽框的样式
            function _getStyle(element) {
                var styleCollection = [];
                return (function () {
                    var textStyles = ['top', 'left', 'fontFamily', 'fontStyle', 'fontWeight', 'color', 'fontSize'],//文本
                        graphStyles = ['width', 'height', 'top', 'left', 'backgroundColor', 'backgroundImage'],  //图形
                        _style;

                    element.hasClass('font') ? _style = textStyles : _style = graphStyles;

                    function ___getStyle(name) {
                        var oneStyle = element.css(name);
                        styleCollection.push(oneStyle);
                        // console.log(styleCollection);
                    }

                    Array.prototype.forEach.call(_style, ___getStyle);
                    return styleCollection;
                }());
            }

        },
        //检测数据 在指定的状态事件发生，拖拽框的数据是否改变
        //  cruisingDragBox 被巡查的当前拖拽框
        _isReliableData: function (cruisingDragBox) {

            var innerDom = cruisingDragBox.children().last();

            var outPara = ['width', 'height', 'left', 'top'],//拖拽外框
                inPara = ['fontFamily', 'fontStyle', 'fontWeight', 'color', 'fontSize', 'width', 'height', 'backgroundColor'];//里面的 统一

            var outCruisingArray = [],
                inCruisingArray = [],
                gone;

            $.each(outPara, function (i, item) {
                var _outStyle = cruisingDragBox.css(item);
                outCruisingArray.push(_outStyle);
            });

            //   inPara = inPara.slice(0, 5)不可以改变原数组的数据
            // 只能用另外一个容器存放
            if (innerDom.hasClass('font')) {
                gone = inPara.slice(0, 5);
                var txt = innerDom.html();
                //合并文本内容在一起
                inCruisingArray.push(txt)
            } else {
                gone = inPara.slice(5);
            }

            console.log('--------具体的内部元素样式--------------');
            console.log(gone);
            console.log('--------具体的内部元素样式--------------');

            $.each(gone, function (i, item) {
                var _inStyle = innerDom.css(item);
                inCruisingArray.push(_inStyle);
            });

            Array.prototype.push.apply(outCruisingArray, inCruisingArray);

            console.log('---------------------------------------');
            console.log('合并被巡查的当前拖拽框的数组');
            console.log(outCruisingArray);
            console.log('---------------------------------------');

            return outCruisingArray;
        },
        //截取当前拖拽框的 组后一组数据
        //对照的数据
        contrastData: function ($curDragBox) {
            var curOrder = $curDragBox.data('order'),
                curItem = this.dragBoxData[curOrder],
                last = $curDragBox.children().last(),
                innerDom = curItem['innerDom'];

            var contrastArray = [];

            var dragWH = curItem['dragWH'].split(':'),
                dragXY = curItem['dragXY'].split(':'),
                content = innerDom['content'].split(':'),
                font = innerDom['font'];


            //因为带有单位才这么麻烦
            Array.prototype.push.call(contrastArray,
                dragWH[0] + 'px',
                dragWH[1] + 'px',
                dragXY[0] + 'px',
                dragXY[1] + 'px'
            );

            //文本框 追加文本内容
            if (font != undefined) {
                contrastArray.push(font);
            }
            Array.prototype.push.apply(contrastArray, content);

            console.log('检查鼠标弹起来数据是否有变化');
            console.log(contrastArray)
        },
        //保存 画布的所有的outerHTML内容
        saveData: function () {
            localStorage.setItem('canvasData',this.canvasBox.outerHTML )
            return this.canvasBox.outerHTML;
        },
        getRenderData: function () {
            return this.dragBoxData;
        },

        init: function () {
            this._init();
            this.move();
        }
    };
    // slider.init();


//调试获取 拖拽框的所有当前每个的数据
    $('.fa-id-card').click(function () {
        var data = slider.getRenderData();
        console.log(data)
    })

    // 预览 模板
    function previewTpl() {
        var $previewContainer = $('.preview_box'),
            $topTool = $('.tool_top_nav');

        //关闭预览
        $('.fa-close').parent().on('click', function () {
            $previewContainer.fadeOut(150);
        });


        ////////////////////////
        var hasPrinter = false;
        ////
        function skip() {
            var curPrinters = $('.current-printer');
            if (curPrinters.data('selected') == 'YES')hasPrinter = true;

            var userData = must();
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

            hasPrinter = true;
        }

        // 上传云空间
        $topTool.delegate('LI', 'click', function () {
            var $this = $(this),
                name = $this.data('step');


            switch (name) {
                case 'print'://打印
                    skip();
                    //只有选择了，打印机之后才可以操作打印
                    if (hasPrinter) {
                        drawFn.uploadData();
                    }
                    break;


                case 'preview'://预览
                    // 调用 预览
                    drawFn.previewImage();
                    // 预览容器显示
                    $previewContainer.fadeIn(150)
                    break;

                case 'upload'://上传
                    skip();
                    // 调用 预览
                    //只有选择了，打印机之后才可以操作打印
                    if (hasPrinter) {
                        drawFn.uploadData();
                    }

                    break;
            }
        })


    }

    previewTpl();

    // 上传模板
    function uploadBlobData(base64Data) {
        //判断图片的大小
        var isPassSize = false;

        // 处理 base64 数据 将base64转换成二进制图片（Blob）
        function dataURItoBlob(base64Data) {
            // data:image/png;base64,数据
            var byteString;
            if (base64Data.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(base64Data.split(',')[1]);
            else
                byteString = decodeURIComponent(base64Data.split(',')[1]);
            var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];  // image/png

            var ia = new Uint8Array(byteString.length);//8位无符号整数
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            //charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数
            var blob = new Blob([ia], {type: mimeString}),
                limitSize = 1024 * 1024;// 1 m

            //判断图片的大小
            if (blob.size < limitSize) {
                console.log(blob.size)
                isPassSize = true;
            } else {
                alert('上传的图片过大！')
            }

            //生成二进制 blob URL
            var url = window.URL.createObjectURL(blob);
            console.log(url);

            return blob;


        };


        var isSend = false
            , formData = new FormData()
            , data = must()//获取用户是否存在登录信息
            , token = data.token
            , id = data.id
        //获取序列号
            , sn = $('.current-printer').html();

        console.log(data)
        //formData.append('timage', dataURItoBlob(base64Data));
        formData.append('file', dataURItoBlob(base64Data));
        formData.append('token', token);
        formData.append('id', id);

        //限制文件大小
        if (isPassSize) {
            // var n = prompt('请给输入模板名称：');
            //
            //
            //if (n != null) {
            //n = n.substr(0, 50);
            //
            //isSend = true;
            //var nameValue = n;
            //}
            //
            //formData.append('tname', nameValue);//别名
            //formData.append('sn', serialNumber);//序列号

            isSend = true;
            //添加文件别名
            if (isSend) {
                $.ajax({
                    // url: 'http://192.168.11.110:8080/Dascom/cloud_test',
                    //url: 'http://192.168.11.109:8080/devctrl/dev/' + serialNumber + '/print',
                    url: s.print(sn),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    headers: {
                        "File-Type": "application/jpg",
                    },
                    success: function (res) {
                        if (res == 'success') {
                            alert(res)
                        }
                    },
                    error: function (xhr, textStatus, errorThrow) {
                        console.log(xhr.readyState);
                    },
                    timeout: 8000,
                    complete: function (XMLHttpRequest, status) {
                        //请求完成后最终执行参数
                        var code = XMLHttpRequest.status;
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            // ajaxTimeoutTest.abort();
                            alert("超时，请稍后...");
                        }
                        if (code != 200) {
                            var t = JSON.parse(XMLHttpRequest.responseText)
                            alert("打印失败：" + code + '   ' + t.error);
                        }

                    }
                })
            }


        }


    };


    //绘制画布信息
    //返回回执号数据的画布
    var Paint = function (options) {
        this.init(options)
    };
    Paint.prototype = {
        constructor: Paint,
        init: function (options) {
            this.DB = options.data;
        },
        //绘制二维码之类的图片
        image: function () {


        }
    }


    //test  uploadFile()
    $('.fa-rotate-left').click(function () {
        uploadFile()
    })

    //开始上传文件
    // 打印 不用别名hoist.alias 为空， 接收的类型为 application/jpg
    // 上传问空间 需要别名
    function uploadFile(hoist) {
        var as, acceptType, canvas;
        if (hoist === undefined) {
            as = '', acceptType = "application/jpg";
            canvas = document.createElement('CANVAS');
        } else if (hoist instanceof Object) {
            as = hoist.alias || '';
            acceptType = hoist.acceptType || "application/jpg";
            canvas = hoist.canvas || document.createElement('CANVAS');
        }

        //上传文件
        Blobs.one({
            alias: as,//默认不用别名
            size: 2,//限制大小 2m
            canvas: canvas,
            upload: function (alias, blob) {
                var formData = new FormData()
                    , data = must();
                if (!data) return;//不登陆的话，直接返回

                //固定的必须数据
                var token = data.token
                    , id = data.id
                    , sn = $('.current-printer').html()//获取序列号
                    , fileType = acceptType;

                //三个固定的字段参数
                formData.append('file', blob);
                formData.append('token', token);
                formData.append('id', id);
                if ($.trim(alias).length > 1) {//去除前后空白格字符在判断
                    formData.append('alias', alias);
                }


                var currentAjax = $.ajax({
                    url: s.print(sn),
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    headers: {
                        "File-Type": fileType,
                    },
                    success: function (data) {
                        console.log(data);
                    },
                    error: function (xhr, textStatus, err) {
                        console.log(xhr.readyState);
                    },
                    timeout: 10000,//10秒
                    complete: function (XMLHttpRequest, status) { //请求完成后最终执行参数
                        if (status == 'timeout') {//超时,status还有success,error等值的情况
                            alert("超时，请稍后再试...");

                            //中断上传
                            if (currentAjax) {
                                currentAjax.abort();
                            }
                        }
                        console.log('status :' + status);
                    }
                })

            }
        });
    }

    //单个文件上传对象
    var Blobs = {
        //这边不管画布数据如何渲染生成，只管传入的画布对象
        one: function (options) {
            var img = new Image()
                , i = options.index || 0
                , cardBox = $('.card').eq(i)//正反面的时候通过 索引来控制上传图片
                , w = cardBox.outerWidth()
                , h = cardBox.outerHeight()
                , imgSrc = cardBox.css('background-image').replace('url("', '').replace('")', '')//注意 双引号要替换掉
            img.onload = function () {
                options.canvas.width = w;
                options.canvas.height = h;

                var cxt = options.canvas.getContext('2d');
                cxt.drawImage(img, 0, 0, w, h);
                console.log('base64: ' + options.canvas.toDataURL().slice(0, 50));

                //绘制好图片接着着色 图形图案文字

                //test
                //var i = new Image();
                //i.src = canvas.toDataURL();
                //document.body.appendChild(i);

                //获取base64，便开始转化
                var base64Data = options.canvas.toDataURL()
                    , blob = Blobs.convert(base64Data)
                    , LIMIT = 1024 * 1024 * 1
                    , size = options.size * LIMIT || parseBytes(LIMIT, 1)//默认1 m 大小
                    , fileSize = parseBytes(blob.size, 1)
                if (fileSize > size) {
                    alert("您发送的文件为：" + fileSize + '\n\r ，最大上传的文件大小为：' + size);
                    return false;//大于限制de文件大小不上传
                }
                //上传
                options.upload(options.alias, blob);
                console.log('上传的图片大小： ' + fileSize)
            }
            img.src = imgSrc;//引入图片资源

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
            var i = new Image();
            i.src = url;
            document.body.appendChild(i);
            //////////////////

            console.log('blob形式二进制URI：' + window.URL.createObjectURL(new Blob([ia], {type: mimeString})));
            return new Blob([ia], {type: mimeString});
        }
    };
    //序列号显示 选择
    var Series = {
        //检查是否已登录
        is: function () {
            var data = must();
            if (data != null) return true;
        },
        //获取打印机序列号
        read: function () {
            return localStorage.getItem(Message.sn) || '没有选中打印机';
        },
        //设置序列号内容
        write: function () {
            var curSN = this.read()
                , $currentPrinterSn = $('.current-printer'),
                islogin = this.is();
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
        },
    }
    //页面加载 便进行序列号视图渲染
    Series.write();
    Series.handle();

});






