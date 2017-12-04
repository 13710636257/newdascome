/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */
define(function (require, exports, module) {
    'use strict';
    var Konva = require('konva');
    var config = require('config');
    var DEFAULTS = config.group;
    var imgParas = config.image;
    
   // console.log(config)


    //图片对象
    function Picture(options) {
        if (!this instanceof Picture) return new Picture(options);
        this.init(options)
    }

    Picture.prototype = {
        constructor: Picture,

        init: function (options) {

            var left
                , top;
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
                , src = options.src || imgParas.src
                , w = imgParas.imgWidth//输入当前图片的宽度
                , h = imgParas.imgHeight//输入当前图片的高度
                , imgDOM = new Image()
                ;


            this.instance = new Konva.Image({
                //添加 x y 坐标 ，数据变化对比需要
                x: 0,
                y: 0,
                width: w,
                height: h
            });
            //添加成一个组
            group.add(this.instance);
            imgDOM.onload = function () {
                _this.instance.fill(null);
                _this.instance.image(imgDOM);
                layer.draw();
            };
            //获取图片的链接
            imgDOM.src = src;
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


            //添加到层
            options.baseGroup.add(group);
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
                , image = this.instance
                , anchorX = activeAnchor.x()//获取当前拖拽点的 x y 的位置
                , anchorY = activeAnchor.y()
                , name = activeAnchor.getName()
                ;
            // 去掉 name里面的 anchor
            name = name.replace(/anchor\s+(.)/, '$1');
            // update anchor positions
            switch (name) {
                case 'topLeft'://根据拖拽点变化而知道改变 改变的拖拽点的位置
                    topRight.y(anchorY);
                    bottomLeft.x(anchorX);
                    break;
                case 'topRight':
                    topLeft.y(anchorY);
                    bottomRight.x(anchorX);
                    break;
                case 'bottomRight':
                    bottomLeft.y(anchorY);
                    topRight.x(anchorX);
                    break;
                case 'bottomLeft':
                    bottomRight.y(anchorY);
                    topLeft.x(anchorX);
                    break;
            }
            this.instance.position(topLeft.position());//设置图片的位置
            //设置 图片的宽度
            var width = topRight.getX() - topLeft.getX();
            var height = bottomLeft.getY() - topLeft.getY();
            if (width && height) {
                image.width(width);
                image.height(height);
            }

        },
        changeImage: function (src) {
            this.instance.attrs.image.src = src;
        },
        changeColor: function (color) {
            //不能设置node.image('' 或是 null) 改变成背景色 再 更换背景图 会报错
            //this.imgParas.image()
            this.instance.attrs.image.src = '';
            this.instance.fill(color);
        }

    };

    module.exports = Picture;
});
