/**
 * Created by Administrator on 2017/10/18.
 */
define(function (require, exports, module) {
    'use strict';
    var Konva = require('konva');
    var config = require('config');
    var DEFAULTS = config.background;

    //console.log(config.background)
    
    //背景图
    function Background(options) {
        if (!this instanceof Background) return new Background(options);
        this.init(options);
    }

    Background.prototype = {
        constructor: Background,
        init: function (options) {
            this.stage = options.stage;
            this.w = this.stage.width();
            this.h = this.stage.height();

            //背景层
            var layer = new Konva.Layer({
                    x: 0,
                    y: 0,
                    name: 'bgLayer'
                })
                  //防止舞台的容器不设置border-radius属性
                , connerRadius = options.connerRadius || 18
                ;
            // 背景层的载体 ：矩形
            this.bgRect = new Konva.Rect({
                width: this.w,
                height: this.h,
                name: DEFAULTS.bgName,
                fill: DEFAULTS.bgFill,
                cornerRadius: parseInt(connerRadius),//去掉 px ,虽然不影响圆角
                groupDragOnTop:false
            });

            // 数据 中间层
            this._middleLayer = new Konva.Layer({
                x: 0,
                y: 0,
                name: 'bgPrivateLayer'
            });


            layer.add(this.bgRect);
            this.stage.add(layer);
            this.stage.add(this._middleLayer);
            layer.draw();

            this._middleLayer.setZIndex(1);
            layer.setZIndex(2);
        },
        draw: function (data) {
            var rectCtx = this.bgRect.getContext();
            rectCtx.save();
            rectCtx.fill('transparent');
            rectCtx.putImageData(data);
            rectCtx.restore();
        },
        image: function (src) {
            var _image = new Image()
                , w = this.w
                , h = this.h
                , middleLayer = this._middleLayer
                , _this = this
                ;

            _image.onload = function () {
                var data
                    , middleCtx = middleLayer.getContext()
                    ;

                //利用一个中间的层来获取 背景图片的数据
                middleCtx.save();
                middleCtx.drawImage(_image, 0, 0, w, h);
                data = middleCtx.getImageData(0, 0, w, h);
                middleCtx.restore();

                // 绘制数据到画布
                _this.draw(data);

                //这一步： middleCtx.clearRect(0, 0, w, h);
                // 害死人啊 居然也会在舞台上不移除
                ///////////////////////////////////////
                middleCtx.clearRect(0, 0, w, h);
                // 绘制完成，删除 _image 对象
                _image = null;
            };
            _image.src = src
        },
        color: function (color) {
            var rectCtx = this.bgRect.getContext()
                , w = this.w
                , h = this.h
                ;

            rectCtx.save();
            rectCtx.clearRect(0, 0, w, h);
            rectCtx.fillStyle = color;
            rectCtx.fill(0, 0, w, h);
            rectCtx.restore();
        }

    };

    module.exports = Background;
});