/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/25.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/25.
 */
define(function (require, exports, module) {
    'use strict';
    var Konva = require('konva')
        , config = require('config')
        , DEFAULTS = config.group
        , ellipse = config.ellipse


    function Ellipse(options) {
        if (!this instanceof Ellipse) return new Ellipse(options);
        this.init(options);
    }

    Ellipse.prototype = {
        constructor: Ellipse,
        init: function (options) {
            var x
                , y
                , left = options.x || 0
                , top = options.y || 0
                , _this = this
                , layer = options.baseGroup.getLayer()
            //建立一个组
                , group = new Konva.Group({
                    x: left,
                    y: top,
                    name: 'unique-' + Math.random().toString(32).slice(2) + ' ' + DEFAULTS.groupName,
                    draggable: true,
                    dragOnTop: DEFAULTS.groupDragOnTop
                })

                ;


            //实例 Rect 矩形
            this.instanceEllipse = new Konva.Ellipse(ellipse);
            //添加成一个组
            group.add(this.instanceEllipse);
            options.baseGroup.add(group);


            //获取包围框信息
            this.boundRect = this.instanceEllipse.getSelfRect();//{x: -100, y: -50, width: 200, height: 100}
            x = this.boundRect.x
            y = this.boundRect.y


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
                x: x,
                y: y,
                name: 'topLeft'
            });

            addPoint({
                x: -x,
                y: y,
                name: 'topRight'
            });

            addPoint({
                x: -x,
                y: -y,
                name: 'bottomRight'
            });

            addPoint({
                x: x,
                y: -y,
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
                , x0 = this.boundRect.x
                , y0 = this.boundRect.y
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

            //设置 图片的宽度
            width = topRight.getX() - topLeft.getX();
            height = bottomLeft.getY() - topLeft.getY();

            //设置包围框的长宽
            this.instanceEllipse.size({
                width: width,
                height: height
            });

            //设置包围框的中心坐标
            this.instanceEllipse.position({
                x: x0 + width / 2,
                y: y0 + height / 2
            });//设置图片的位置

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

        }

    }

    module.exports = Ellipse;
});
