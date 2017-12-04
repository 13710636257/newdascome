/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/14.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/14.
 */

//切换字体图标
function toggleICON(flag, target) {
    if (flag) {
        target.removeClass('fa-times').addClass('fa-check').attr('data-pass', true);
    } else {
        target.removeClass('fa-check').addClass('fa-times').attr('data-pass', false);
    }
}

$.fn.extend({
    iconTo: function (config) {
        var defaults = {
            error: 'fa-times',
            correct: 'fa-check'
        }
        if (config) {
            $(this).removeClass(defaults.error).addClass(defaults.correct).attr('data-pass', config);
            console.log(89)
        } else {
            $(this).removeClass(defaults.correct).addClass(defaults.error).attr('data-pass', config);
            console.log(555)
        }

    }

})


/* 新建画布*/
//新建画布
var originParameters = {
    __init: function (options) {
        var parameters = {
            container: '.canvas_wrapper',
            canvasBox: '<div class="card only_one"> <canvas id="oneCan" class="canvas-card" width="760" height="484"></canvas></div>',
            topNav: '.tool_top_nav',
            sliderNav: '.tool_slider_nav'
        };
        this.options = $({}, parameters, options);

        this.width = options.width || 760;
        this.height = options.height || 484;

        //console.log(options.width)

        this.canvasBox = $(parameters.canvasBox);
        this.container = $(parameters.container);
        this.topNav = $(parameters.topNav);
        this.sliderNav = $(parameters.sliderNav);

        var _this = this;
        this.container.append(_this.canvasBox);

        this.canvasBox.css({
            width: this.width,
            height: this.height
        })

        this.newBuilt();


    },
    newBuilt: function () {
        var $canvasBox = this.canvasBox,
            $container = $canvasBox.parent();


        // 只有把画布追加在HTML上才可以获取或设置元素的样式
        var canvasW = $canvasBox.width(),
            canvasH = $canvasBox.height(),
            topNavH = this.topNav.height(),
            sliderW = this.sliderNav.width();


        var outerW = window.outerWidth,//等价于 screen.availWidth  1600
            innerW = window.innerWidth,//等价于 $(window).innerWidth() 1600

            outerH = window.outerHeight,//860
            innerH = window.innerHeight;//794

        //存放正常屏幕 缩放或是F12时候的宽高
        var canvasPara = {
            width: 0,
            height: 0
        };

        //当浏览没有打开 F12 或是打开是 打开是 垂直窗口时候成立
        if (outerH - innerH > 20 && outerH - innerH < 120) {
            outerH = innerH;

            canvasPara['width'] = outerH;
            canvasPara['height'] = outerW;
            //可惜每次刷新
            //  localStorage.setItem('load' ,JSON.stringify(canvasPara))
        }

        var top = outerH / 2 - canvasH / 2 + topNavH / 2,
            left = outerW / 2 - canvasW / 2 + sliderW / 2;

        //居中屏幕
        $canvasBox.css({
            top: top,
            left: left,
        })
    },
    resetSize: function () {
    },
    zoom: function () {
    }
}

//倘若是 再次编辑数据 把 outerHTML加载进来，不用再新建画布
if (!$('.card').length) {
    //originParameters.__init({
    //    width: 520,
    //    height: 350
    //})
}