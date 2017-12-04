/**
 * Created by Administrator on 2017/6/9.
 */



(function ($) {

    /* IE lt 9 */
    
    /*
     * jQuery placeholder, fix for IE6,7,8,9
     * @author JENA
     * @since 20131115.1504
     * @website ishere.cn
     */
    'use strict';
    var JPlaceHolder = {
        //检测
        _check : function(){
            return 'placeholder' in document.createElement('input');
        },
        //初始化
        init : function(){
            if(!this._check()){
                this.fix();
            }
        },
        //修复
        fix : function(){
            $(':input[placeholder]').each(function(index, element) {
                var self = $(this), txt = self.attr('placeholder');
                self.wrap($('<div></div>').css({position:'relative', zoom:'1', border:'none', background:'none', padding:'none', margin:'none'}));
                var pos = self.position(), h = self.outerHeight(true)+"px", paddingleft = self.css('padding-left');
                var holder = $('<span></span>').text(txt).css({position:'absolute', left:pos.left, top:pos.top, height:h, lineHeight:h, paddingLeft:paddingleft, color:'#aaa'}).appendTo(self.parent());
                self.focusin(function(e) {
                    holder.hide();
                }).focusout(function(e) {
                    if(!self.val()){
                        holder.show();
                    }
                });
                holder.click(function(e) {
                    holder.hide();
                    self.focus();
                });
            });
        }
    };

        JPlaceHolder.init();

}(jQuery));


(function($) {
    /*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
     * Licensed under the MIT License (LICENSE.txt).
     *
     * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
     * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
     * Thanks to: Seamus Leahy for adding deltaX and deltaY
     *
     * Version: 3.0.6
     * 
     * Requires: 1.2.2+
     */
    'use strict';

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);

$(function () {
    'use strict';

    $.fn.extend({
        emotion: function (options) {
            var defaults = {
                /*
                 * @param baseUrl{string} 存放表情路径
                 * @param tipTxt{Array} 表情对应的文字描述
                 * @param isExist{Boolean} 是否加载过
                 * @param len{Number} 表情长度
                 * @param areaID{String} 文本框
                 * @param emotionBox{String} 存放表情的 ul
                 * @param emotionBox{String} 存放表情的 li
                 * */
                baseUrl: '../img/chatModal/emotion/',
                tipTxt: ['微笑', '流汗'],
                isExist: 0,
                len: 75,
                areaID: '#chatMsg_box',
                emotionItem: '.emotion_item '
            };
            options = $.extend(options, defaults);

            /* 渲染 表情到 ul */
            function renderDOM() {
                var i = 1, html = '';
                for (; i <= options.len; i++) {
                    html += '<li class="emotion_item">'
                        + '<img src="' + options.baseUrl + i + '.gif" class="face" alt="' + i + '" title="[em:' + i + ']">'
                        + '</li>';
                }
                $(options.emotionBox).html(html);

                /* 标志 已加载*/
                options.isExist = 1;

                /* 渲染后 ，给DOM 绑定事件句柄*/
                bindEvents();

            }

            if (options.isExist != 1) renderDOM();


            /* 绑定事件*/
            function bindEvents() {
                var $emotionItem = $(options.emotionItem);
                $emotionItem.live(options.type, function () {
                    var $this = $(this);
                    /* 向 输入框 插入 对应表情的文字描述*/
                    $(options.areaID).insertText($this.find('.face').attr('title'));
                })


            }

        },
        insertText: function (myValue, t) {

            var $t = $(this)[0];
            if (document.selection) {
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
                sel.moveStart('character', -l);
                var wee = sel.text.length;
                if (arguments.length == 2) {
                    var l = $t.value.length;
                    sel.moveEnd("character", wee + t);
                    t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);
                    sel.select();
                }
            } else if ($t.selectionStart || $t.selectionStart == '0') {
                var startPos = $t.selectionStart;
                var endPos = $t.selectionEnd;
                var scrollTop = $t.scrollTop;
                $t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
                this.focus();
                $t.selectionStart = startPos + myValue.length;
                $t.selectionEnd = startPos + myValue.length;
                $t.scrollTop = scrollTop;
                if (arguments.length == 2) {
                    $t.setSelectionRange(startPos - t, $t.selectionEnd + t);
                    this.focus();
                }
            } else {
                this.value += myValue;
                this.focus();
            }
        }

    });

});


$(document).ready(function () {
    'use strict';

    var $userList = $('.user_list');
    var $chatTitle = $('.right_top_box');

    var time = new Date().getHours() + ':' + new Date().getMinutes();

    var manualArr = [
        {
            type: 'preSale',
            describe: ["售后", "icon_nature_afterSale", "售后客服"],
            msg: "售后为你解决产品的维修与服务",
            unreadMsg: 0,
            lastTime: "9:08"
        },
        {
            type: 'preSale',
            describe: ["售前", "icon_nature_preSale", "售前客服"],
            msg: "售前咨询产品参数",
            unreadMsg: 0,
            lastTime: "9:08"
        },

        {
            type: 'technology',
            describe: ["技术", "icon_nature_technology", "技术部客服"],
            msg: "为你解决产品遇到问题与指引！",
            unreadMsg: 8,
            lastTime: "9:08"
        },
        {
            type: 'marketing',
            describe: ["营销", "icon_nature_marketing", "营销客服"],
            msg: "为你推广更好的产品",
            unreadMsg: 0,
            lastTime: "9:08"
        },
        {
            type: 'capacity',
            describe: ["智能", "icon_nature_capacity", "智能机器人"],
            msg: "贴心为你服务",
            unreadMsg: 0,
            lastTime: "9:08"
        }];


    /* 人工服务点击句柄*/
    var $manualBtn = $('.manual_service_btn');
    $manualBtn.on('click', function () {
        $userList.empty();
        renderManual(manualArr)
    });

    function renderManual(data) {

        var tmpl = '';

        $.each(data, function (index, item) {

            tmpl += '<li class="user_item">'
                + '<a href="javascript:void(0);" class="user_item_link">'
                + '<div class="user_item_logo">'
                + '<img src="../img/chatModal/user_logo.png" alt="头像">'
                + ' <i class="icon_nature ' + item.describe[1] + '">' + item.describe[0] + '</i>'
                + ' </div>'
                + ' <div class="user_item_detail">'
                + ' <h3 class="user_item_name">' + item.describe[2] + '</h3>'
                + '<span class="chat_msg_last">' + item.msg + '</span>'
                + '</div>'
                + '</div>'
                + '<div class="user_item_tip">'
                + '<span class="msg_tip">'

                + '<strong class="msg_count">' + item.unreadMsg + '</strong>'
                + '</span>'
                + ' <span class="time_tip">' + time + '</span>'
                + '</div>'
                + ' </a>'
                + '  </li>';


        });
        $userList.append(tmpl);

        /* 移除 未读信息为零的 Element */
        (function () {
            var $unreadMsg = $('.msg_count');

            $.each($unreadMsg, function () {
                var $this = $(this);
                if ($this.text() == 0) $this.remove();
            });

        })();


    }


    /* 表情 发图 评价*/

    var $chatToolkitBox = $('.chat_toolkitBox ');
    var panels = $('.panel');


    $chatToolkitBox.delegate('A', 'click', function () {
        var $this = $(this);
        var index = $this.index();
        panels.eq(index).fadeToggle(150).siblings().fadeOut(150);

        var $upLoad = $('.upload_image');


        if (index == 1) {
            $upLoad.click();
        } else if (index == 0) {


            /* 表情按钮 点击展示*/
            $('.js_emotion_btn  ').emotion({
                emotionBox: '.emotion_list',
                type: 'click'
            });
        }

    });


    /* 评价关闭按钮*/
    var $evaluateCloseBtn = $('.icon_evaluate_close');
    $evaluateCloseBtn.on('click', function () {
        panels.eq(2).fadeOut(150);
    });


    $userList.delegate('LI', 'click', function () {
        var $this = $(this),
            name = $this.find('.user_item_name').html(),
            logo = $this.find('.icon_nature').html(),
            classN = $this.find('.icon_nature').attr('class'),
            $unreadMsg = $this.find('.msg_count');

        if (!$this.hasClass('chat_current')) {
            $this.addClass('chat_current').siblings().removeClass('chat_current');

            var html = '<i class="' + classN + '">' + logo + '</i><h2 class="nature_name">' + name + '<i class="icon_state radius"></i></h2>';
            $chatTitle.html(html);

            /* 未读的信息提示 被点击过取消标记*/
            if ($unreadMsg.length) {
                $unreadMsg.remove();
            }
        }

    });


    var sentMsg = {

        renderTmp: function () {

        },

        handler: function () {
            var $sentMsgBtn = $('.chatModal_sentMsg_btn'),
                $chatMsgArea = $('.chatMsg_area'),
                $contentBox = $('.right_middle_box');



            /* 替换 文字为 表情*/
            function replace(str) {
                var baseUrl = './collegeVideo/emotion/';
                str = str.replace(/\</g, '&lt;');
                str = str.replace(/\>/g, '&gt;');
                str = str.replace(/[\r\n]/g, "");
                str = str.replace(/\[em:([0-9]*)\]/g, '<img src="' + baseUrl + '$1.gif" />');
                return str;
            }


            /* 渲染 数据*/
            function renderMsg() {

                var areaTxt = $chatMsgArea.val();
                var tmpl = '';

                tmpl = '';

                $contentBox.append(tmpl);

            }
            
            function test() {
                
                var html = '<div class="msg_agent"><div class="base"><strong class="name">佳佳</strong><span class="sentTime">'+new Date().toLocaleString()+'</span></div><div class="bubble"><span class="arrow"></span><div class="msgTxt">'+new Date().toLocaleString()+'您好，我是智能客服机器人佳佳</div></div></div>'

                $('.right_middle_box').append(html);
            }


            $sentMsgBtn.on('click', function () {
                var msg = $chatMsgArea.val();
                /* var endTime = new Date() * 1;
                 var interval = endTime - startTime;
                 var html = '';

                 if (!IS_SENT_TIME) {
                 html = '<p class="chatMsg_time">' + startTime + '</p>';
                 }

                 if (interval > mustTime) {
                 IS_SENT_TIME = true;
                 }*/


                test()

                var $contentContainer = $('.charModal_right_middle'),
                    $contentBox = $('.right_middle_box'),
                    $scrollBarBox = $('.chat_slider_bar'),
                    $scrollBar = $('.chat_bar');

                function setPosition(position) {

                    if (position < 0) {
                        position = 0;
                    } else if (position > $scrollBarBox.height() - $scrollBar.height()) {
                        position = $scrollBarBox.height() - $scrollBar.height();
                    }

                    $scrollBar.css({
                        top: position
                    });

                    var scale = position / ($scrollBarBox.height() - $scrollBar.height());

                    $contentBox.css({
                        top: -scale * ($contentBox.height() - $contentContainer.height())
                    });

                }

                setPosition($contentBox.height() - $contentContainer.height());

                !function () {
                    var rate = $scrollBarBox.height() * $contentContainer.height() / ($contentBox.height()),
                        height = Math.max(30, rate);
                    $scrollBar.css({
                        height: height,
                        top: $contentContainer.height() - height

                    });

                }();
            });

        },
        scrollHandler: function () {
            var $contentContainer = $('.charModal_right_middle'),
                $contentBox = $('.right_middle_box'),
                $scrollBarBox = $('.chat_slider_bar'),
                $scrollBar = $('.chat_bar');


            !function () {
                var rate = $scrollBarBox.height() * $contentContainer.height() / ($contentBox.height()),
                    height = Math.max(30, rate);
                $scrollBar.css({
                    height: height,
                    top: $contentContainer.height() - height

                });

            }();

            function wheelHandler(obj, fn) {

                var mouseWheel = function (event, detail) {

                    var e = event || window.event,
                        IS_DOWN = false;

                    /*
                     *  IE: wheelDelta 上滚的时候是正数 下滚的时候是负数 滚轮事件（mousewheel）
                     *
                     *  FF: detail     上滚的时候负数 下滚的时候是正数  滚轮事件（DOMMouseScroll）
                     * */
                    // IS_DOWN = e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0;

                    if (e.wheelDelta) {
                        detail = e.wheelDelta < 0 ? IS_DOWN = true : IS_DOWN = false;
                    } else {
                        detail = e.detail > 0 ? IS_DOWN = true : IS_DOWN = false;
                    }


                    fn && fn(IS_DOWN, e);
                    preventDefault(e);

                    console.log(e.wheelDelta + '-----' + e.detail)

                };

                var handlerType = new RegExp('firefox').test(window.navigator.userAgent.toLowerCase()) ? 'DOMMouseScroll' : 'mousewheel';

                obj.bind(handlerType, mouseWheel)

            }


            /*  wheelHandler($contentContainer, function (down) {
             var interval = $scrollBar.position().top;
             if (down) {
             interval += 10;
             } else {
             interval -= 10;
             }
             setPosition(interval);


             });*/

            $contentBox.on('mousewheel', function (event, delta) {
                var interval = $scrollBar.position().top;
                if (delta == -1) {
                    interval += 10;
                } else {
                    interval -= 10;
                }
                setPosition(interval);
                preventDefault(event)

            });


            function setPosition(position) {

                if (position < 0) {
                    position = 0;
                } else if (position > $scrollBarBox.height() - $scrollBar.height()) {
                    position = $scrollBarBox.height() - $scrollBar.height();
                }

                $scrollBar.css({
                    top: position
                });

                var scale = position / ($scrollBarBox.height() - $scrollBar.height());

                $contentBox.css({
                    top: -scale * ($contentBox.height() - $contentContainer.height())
                });

            }


            $scrollBar.on('mousedown', function (event) {
                var e = event || window.event;


                var y = e.clientY - $scrollBar.position().top;

                console.log(y + '---------' + $scrollBar.position().top + 'clientX' + e.clientY);


                $(document).on('mousemove', function (event) {
                    var e = event || window.event;
                    var position = e.clientY - y;

                    setPosition(position);

                    /*$scrollBar.css({
                     top: position
                     })*/
                });

                $(document).on('mouseup', function () {
                    var $_this = $(this);
                    $_this.off('mousemove');
                    $_this.off('mouseup');

                    $scrollBar.releaseCapture && $scrollBar.releaseCapture();
                });

                $scrollBar.setCapture && $scrollBar.setCapture();
                preventDefault(event)

            });


        }


    };
    sentMsg.handler();
    sentMsg.scrollHandler();

    function preventDefault(t) {
        var n = t || window.event;
        n.preventDefault ? n.preventDefault() : n.returnValue = !1;
    }
    
});