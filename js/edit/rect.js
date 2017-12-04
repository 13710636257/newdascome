/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */
define(function (require, exports, module) {
    'use strict';
    var Konva = require('konva');

    var config = require('config')
        , DEFAULTS = config.group
        , rect = config.rect
        ;


    function Rect(options) {
        if (!this instanceof Rect) return new Rect(options);
        this.init(options)
    }

    Rect.prototype = {
        constructor: Rect,
        init: function (options) {
            var left
                , top;
            // 通过 鼠标双击舞台位置而确定 坐标
            /////////////////////////////////////////
            left = (options.x && options.x >= DEFAULTS.r) ? left = options.x : left = DEFAULTS.r;
            top = (options.y && options.y >= DEFAULTS.r) ? top = options.y : top = DEFAULTS.r;
            var _this = this
                , layer = options.baseGroup.getLayer()
            //建立一个组
                , group = new Konva.Group({
                    x: left,
                    y: top,
                    name: 'unique-' + Math.random().toString(32).slice(2) + ' ' + DEFAULTS.groupName,
                    draggable: true,
                    dragOnTop: DEFAULTS.groupDragOnTop
                })

                , w = rect.base.width
                , h = rect.base.height
                ;


            //实例 Rect 矩形
            this.instanceRect = new Konva.Rect(rect.base);
            //添加成一个组
            group.add(this.instanceRect);
            options.baseGroup.add(group);


            //封装 resize 拖拽点
            function addPoint(OPTIONS) {
                var anchor = new Konva.Circle({
                    x: OPTIONS.x,
                    y: OPTIONS.y,
                    name: 'anchor',

                    stroke: DEFAULTS.stroke,
                    fill: DEFAULTS.fill,
                    strokeWidth: DEFAULTS.strokeWidth,
                    radius: DEFAULTS.r,
                    draggable: true,
                    dragOnTop: false
                });
                anchor.addName(OPTIONS.name);

                anchor.on('dragmove', function () {
                    // 更新拖拽锚点后，组的样式
                    //////////////////////// options.update('目前拖拽锚点'，'该锚点的兄弟节点除了Circle外')
                    _this.update(this);
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

            }

            addPoint({
                x: 0,
                y: 0,
                name: 'topLeft'
            });

            addPoint({
                x: w,
                y: 0,
                name: 'topRight'
            });

            addPoint({
                x: w,
                y: h,
                name: 'bottomRight'
            });

            addPoint({
                x: 0,
                y: h,
                name: 'bottomLeft'
            });
        },
        update: function (activeAnchor) {
            var group = activeAnchor.getParent()
                , topLeft = group.findOne('.topLeft')//类名形式
                , topRight = group.findOne('.topRight')
                , bottomRight = group.findOne('.bottomRight')
                , bottomLeft = group.findOne('.bottomLeft')
                , anchorX = activeAnchor.getX()//获取当前拖拽点的 x y 的位置
                , anchorY = activeAnchor.getY()
                , name = activeAnchor.getName()
                , size = activeAnchor.width()
                , limitX = 0
                , limitY = 0
                , width
                , height
                ;
            // 去掉 name里面的 anchor
            name = name.replace(/anchor\s+(.)/, '$1');

            switch (name) {
                case 'topLeft'://根据拖拽点变化而知道改变 改变的拖拽点的位置
                    topLeftFn();
                    break;
                case 'topRight':
                    topRightFn();
                    break;
                case 'bottomRight':
                    bottomRightFn();
                    break;
                case 'bottomLeft':
                    bottomLeftFn();
                    break;
            }
            this.instanceRect.position(topLeft.position());//设置图片的位置
            //设置 图片的宽度
            width = topRight.getX() - topLeft.getX();
            height = bottomLeft.getY() - topLeft.getY();

            this.instanceRect.width(width);
            this.instanceRect.height(height);

            function topLeftFn() {
                limitX = topRight.x() - size;
                limitY = bottomLeft.y() - size;
                if (anchorX - limitX >= 0) {
                    topLeft.x(limitX);
                    bottomLeft.x(limitX);

                    anchorX = limitX
                }

                if (anchorY - limitY >= 0) {
                    topLeft.y(limitY);
                    topRight.y(limitX);

                    anchorY = limitY
                }
                topRight.y(anchorY);
                bottomLeft.x(anchorX);
            }

            function topRightFn() {
                limitX = bottomLeft.x() + size;
                limitY = bottomLeft.y() - size;
                if (anchorX - limitX <= 0) {
                    topRight.x(limitX);
                    bottomRight.x(limitX);

                    anchorX = limitX
                }

                if (anchorY - limitY >= 0) {
                    topRight.y(limitY);
                    topLeft.y(limitY);

                    anchorY = limitY
                }

                topLeft.y(anchorY);
                bottomRight.x(anchorX);
            }

            function bottomRightFn() {
                limitX = topLeft.x() + size;
                limitY = topLeft.y() + size;
                if (anchorX - limitX <= 0) {
                    topRight.x(limitX);
                    bottomRight.x(limitX);

                    anchorX = limitX
                }
                if (anchorY - limitY <= 0) {
                    bottomRight.y(limitY);
                    bottomLeft.y(limitY);

                    anchorY = limitY
                }

                bottomLeft.y(anchorY);
                topRight.x(anchorX);
            }

            function bottomLeftFn() {
                limitX = topRight.x() - size;
                limitY = topRight.y() + size;
                if (anchorX - limitX >= 0) {
                    topLeft.x(limitX);
                    bottomLeft.x(limitX);

                    anchorX = limitX
                }
                if (anchorY - limitY <= 0) {
                    bottomRight.y(limitY);
                    bottomLeft.y(limitY);

                    anchorY = limitY
                }

                bottomRight.y(anchorY);
                topLeft.x(anchorX);
            }

        },
        //添加层或是组
        addGroupOrLayer: function (sup) {
            sup.add(this.group);
        }
    };

    module.exports = Rect;
});
