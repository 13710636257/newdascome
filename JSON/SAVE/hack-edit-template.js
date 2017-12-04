/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/17.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/17.

 */
(function () {


    document.onreadystatechange = function () {
        var state = document.readyState;
        if (state == 'complete') {
            var outerW = window.outerWidth,//等价于 screen.availWidth  1600
                innerW = window.innerWidth,//等价于 $(window).innerWidth() 1600
                outerH = window.outerHeight,//860
                innerH = window.innerHeight;//794

            var canvasPara = {
                width: 0,
                height: 0
            };


            //当浏览没有打开 F12 或是打开是 打开是 垂直窗口时候成立
            if (outerH - innerH > 20 && outerH - innerH < 120) {
                outerH = innerH;
                canvasPara['width'] = outerH;
                canvasPara['height'] = outerW;

                localStorage.setItem('settings', JSON.stringify(canvasPara))
            }

        }

    };


}());
//设置 画布容器的尺寸
(function setAlignCenter() {
    // 画板可见区域容器 因为fixed没有滚动条 因此动态计算画布大容器的具体值 而设置其他的值
    // 不管怎样都会 浏览器变小 再刷新 就会有 bug
    var $canvasContainer = $('.canvas_wrapper'),
    //头部的工具栏
        $topTool = $('.tool_top_nav'),
        topH = $topTool.outerHeight(),

        winH = $(window).outerHeight(),
        winW = $(window).outerWidth(),
    // winH = screen.availHeight,
    //  winW = screen.availWidth,

        $sliderTool = $('.tool_slider_nav'),
    // 等价于上面 width + padding-left + padding-right
        sliderW = $sliderTool.outerWidth();


    // 设置画布容器的宽度
    var w = winW - sliderW,
        h = winH - topH;


    //设置侧边的工具栏铺满
    $sliderTool.css({
        height: winH
    });

    // 画布大容器的宽高
    $canvasContainer.css({
        width: w,
        height: h,
        paddingLeft: sliderW,
        paddingTop: topH
    });

    function no() {
        // 切换按钮的位置
        var $cardBox = $('.card'),
            cardH = $cardBox.height(),
            cardW = $cardBox.width(),
            top = w / 2 - cardW / 2,
            left = h / 2 - cardH / 2;
        $cardBox.css({
            top: top,
            left: left
        })
    }


    //固定 大容器的宽高
    //才把画布，居中在这大容器
    d()
    function d() {
        var $cardBox = $('.card'),
            cardH = $cardBox.height(),
            cardW = $cardBox.width();
        $cardBox.css({
            top: '50%',
            left: '50%',
            marginLeft: -cardW / 2 + sliderW / 2,
            // marginTop: -cardH / 2 + topH / 2 -33
            // 因为用winH = screen.availHeight 有66高度之差
            // $(window).outerHeight() 794
            // screen.availHeight 860 （66是 url输入部分与标签页部分占66px）
            marginTop: -cardH / 2 + topH / 2
        });

        $('.showPosition').css({
            bottom: 0
        })
    }
}());


// 切换模板
var switchFn = {
    op: {
        switchBtn: '.switch_btn',
        runClass: 'run'
    },
    runFn: function () {
        var $btn = $(this.op.switchBtn),
            run = this.op.runClass;


        $btn.on('click', function () {
            var $this = $(this),
                $supContainer = $this.closest('.canvas_wrapper');

            // 为 canvas_wrapper 添加 calss：run 为卡片切换 且 动画效果
            $supContainer.toggleClass(run);

            // edit_active 存在表示可以编辑
            $('.card').toggleClass('edit_active');

            // 当为 IE8以下 居中效果加切换效果
            exchangePosition($supContainer.hasClass(run))

        });


        function exchangePosition(flag) {

            var ieVersion = navigator.userAgent;

            if (ieVersion.indexOf('MSIE 8.0') > -1 || ieVersion.indexOf('MSIE 9.0') > -1) {

                var $cardBox = $('.card'),
                    cardH = $cardBox.height(),
                    cardW = $cardBox.width();

                if (flag) {
                    //正面
                    $('.card_back').animate({
                        marginLeft: -0.8 * cardW,
                        marginTop: -0.7 * cardH
                    }, 300);

                    //反面
                    $('.card_fornt').animate({
                        marginLeft: -0.2 * cardW,
                        marginTop: -0.3 * cardH
                    }, 300)
                } else {
                    //正面
                    $('.card_fornt').animate({
                        marginLeft: -0.8 * cardW,
                        marginTop: -0.7 * cardH
                    }, 300);

                    //反面
                    $('.card_back').animate({
                        marginLeft: -0.2 * cardW,
                        marginTop: -0.3 * cardH
                    }, 300)
                }
            }
        }
    }
};
switchFn.runFn();