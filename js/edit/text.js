/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */
define(function (require, exports, module) {
    'use strict';
    var Konva = require('konva');
    var $ = require('jquery');

    var config = require('config')
        , DEFAULTS = config.text
        , groupName = config.group.groupName
        , groupDragOnTop = config.group.groupDragOnTop
        ;

    //console.log(DEFAULTS.base)

    function Text(options) {
        if (!this instanceof Text) return new Text(options);
        this.init(options);
    }

    Text.prototype = {
        constructor: Text,
        init: function (options) {
            var x = options.x == 0 ? 0 : options.x || 0
                , y = options.x == 0 ? 0 : options.y || 0
                ;

            this.group = new Konva.Group({
                x: x,
                y: y,
                name: 'unique-' + Math.random().toString(32).slice(2) + ' ' + groupName,
                draggable: true,
                dragOnTop: groupDragOnTop
            });

            //实例化 文本
            ////////////
            this.instance = new Konva.Text(DEFAULTS.base);
            this.group.add(this.instance);

        },
        bindEvents: function () {
            var textPosition = this.group.getAbsolutePosition()
                , group = this.group
                , stage = group.getStage()
                , layer = group.getLayer()
                , stageBox = stage.getContainer().getBoundingClientRect()
                , areaPosition = {
                    x: textPosition.x + stageBox.left,
                    y: textPosition.y + stageBox.top
                }
                , text = this.instance
                , MAX_WIDTH = DEFAULTS.others.maxWidth//文本最大的宽度
                ;
            // 创建 文本输入框

            console.log(layer)

            var $textarea = $('<textarea class="rewrite-text"></textarea>')
                , $body = $(document.body)
                ;
            $textarea.val(text.text());
            $body.append($textarea);
            $textarea.css({
                position: 'absolute',
                top: areaPosition.y,
                left: areaPosition.x,
                width: text.width(),
                height: text.height(),
                overflow: 'hidden',
                lineHeight: text.lineHeight(),
                border: '1px solid #919191',
                fontSize:text.fontSize(),
                fontFamily:text.fontFamily()
            });
            $textarea.focus();
            $textarea.on('keydown', function (event) {
                var e = event || window.event
                    , code = e.which || e.keyCode;
                if (code === 13 && e.shiftKey) {
                    clearRedBorder()
                }
            });
            $textarea.on('input propertychange', function () {
                //设置 实例的文本内容
                text.text($textarea.val());
                layer.draw();
                $textarea.css({
                    width: text.width(),
                    height: text.height(),
                });

                if (text.width() > MAX_WIDTH) {
                    text.width(MAX_WIDTH);
                }
            });

            $(window).on('mousedown', function (event) {
                var target = event.target || window.event.srcElement
                if ($(target).hasClass('rewrite-text'))return;//只要是不在文本输入框按下鼠标，就移除文本输入框
                clearRedBorder()
            });



            // 移除编辑框 并把 组的红色边框去除
            function clearRedBorder(){
                $textarea.remove();
                group.clearCache();
                layer.draw();
            }
        },
        //添加层或是组
        addGroupOrLayer: function (sup) {
            var _this = this;
            sup.add(this.group);
            // 添加到层或是组上后，注册事件
            ///////////////////////////
            this.group.on('dblclick', function () {
                _this.bindEvents();
            })
        }
    };

    module.exports = Text;
});
