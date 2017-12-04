/**
 * Created by Administrator on 2017/10/18.
 */
define(function () {
    //公用组
    var group = {
        r: 4, // 设置锚点的半径
        fill: '#C0C0C0',// 设置锚点的填充颜色
        stroke: '#616161',// 设置锚点的描边的填充颜色
        strokeWidth: 2,// 设置锚点的描边的宽度
        groupName: 'yoyo', //组的名字 name
        groupDragOnTop: true,

        outStrokeWidth: 1,//矩形的描边宽度
        outStroke: '#E92322',//矩形的描边颜色
        outDash: [4, 9],//矩形的描边的 dash 虚线参数
        rectFill: '#E0E0E0',
        rectWidth: 200,
        rectHeight: 150
    };

    var rect = {
        base: {
            x: 0,
            y: 0,
            width: 200,
            height: 150,
            fill: '#E0E0E0',

            stroke: '#E92322',
            strokeWidth: 1,
            dash: [4, 9]
        },
        others:{
            hoverColor:'#E92322'
        }

    }

    // 文本
    var text = {
        base: {
            x: 0,
            y: 0,
            padding: 10,
            text: '请输入内容',
            fill: '#1A1A1A',
            fontSize: 13,
            fontFamily: 'Helvetica',
            fontStyle:'normal',// normal, bold, or italic
            fontVariant:'small-caps',
            lineHeight: 1.5,
            name: 'textNode'//不可以修改
           // textDecoration(textDecoration)
           // get/set text 'underline', 'line-through' or combination
        },
        others: {
            maxWidth: 600,//文本最大的宽度
        }

    };
    //背景
    var background = {
        bgFill: '#ffffff',
        bgName: 'bgRect'//不可以修改
    };

    //图片
    var image = {
        imgWidth: 200,
        imgHeight: 150,
        src: '../img/cloud-print/logo.png'
    };
    // 椭圆
    var ellipse = {
        x: 0,
        y: 0,
        radius: {
            x: 100,
            y: 50
        },
        fill: '#fff',
        stroke: 'black',
        strokeWidth: 2,
        name:'ellipse'//不可以修改
    }


    var Anchor = {
        //新建 上下左右的锚点
        built: function (options) {
            var anchor = new Konva.Circle({
                x: options.x,
                y: options.y,
                name: options.name,

                stroke: DEFAULTS.stroke,
                fill: DEFAULTS.fill,
                strokeWidth: DEFAULTS.strokeWidth,
                radius: DEFAULTS.r,

                draggable: true,
                dragOnTop: false
            });

            var group = options.group;
            var layer = options.group.getLayer();


            anchor.on('dragmove', function () {
                // 更新拖拽锚点后，组的样式
                //////////////////////// options.update('目前拖拽锚点'，'该锚点的兄弟节点除了Circle外')
                options.update(this);
                layer.draw();
            });
            anchor.on('mousedown', function () {
                //左右在拖拽点 组不可以拖拽
                group.setDraggable(false);
                this.moveToTop();
            });
            anchor.on('dragend', function () {
                //组恢复 拖拽
                group.setDraggable(true);
                layer.draw();
            });
            // add hover styling
            anchor.on('mouseover', function () {
                document.body.style.cursor = 'pointer';
                this.setStrokeWidth(DEFAULTS.r);
                layer.draw();
            });
            anchor.on('mouseout', function () {
                document.body.style.cursor = 'default';
                this.setStrokeWidth(DEFAULTS.strokeWidth);
                layer.draw();
            });
            group.add(anchor);
        },
        // 返回：组中不是 锚点的的 shape
        sibling: function (group) {
            //return  group.getChildren(function (node) {
            //    return node.getClassName()!== 'Circle';
            //})
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
        }
    };

    return {
        text: text,
        image: image,
        group: group,
        rect:rect,
        ellipse:ellipse,
        background: background,
        extend: function () {
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
    }
});