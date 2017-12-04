/**
 * Created by Administrator on 2017/7/20.
 */
requirejs.config({
    baseUrl: '../js/asset/',
    //paths 属性本来就是给路径加别名的方法
    paths: {
        jquery: 'jquery-1.9.1.min',
        common: '../edit/common',
    }
});
requirejs(['jquery','common'],function ($,Common) {
    
    var Space = function (options) {
        if (!this instanceof Space) return new Space(options);
        this.init(options);
    };
    Space.prototype = {
        constructor: Space,
        init: function (options) {
            this.DEFAULTS = {
                delSelector: '.fa-trash-o',//删除图标
                itemSelector: '.tpl_item',//每一张模板容器
                activeState: 'tpl_active'//模板激活选中状态
            };
            this.options = $.extend({}, this.DEFAULTS, options);
            this.container = options.container;//模板容器
            this.delFlag = false;

            this.renderTpl();
        },
        renderTpl: function () {

            this.bindEvent();
        },
        bindEvent: function () {
            var $container = this.options.container
                , delSelector = this.options.delSelector
                , itemSelector = this.options.itemSelector
                , delFlag = this.delFlag
                , _this = this;


            $container.on('click mouseenter mouseleave', delSelector, function (e) {
                var type = e.type || window.event.type;
                var $this = $(this)
                    , $tplName = $this.closest(itemSelector).find('.tpl_name')//获取当前项的 模板名称
                    , name = $tplName.html();

                switch (type) {
                    case 'mouseenter':
                        delFlag = true;
                        break;

                    case 'mouseleave':
                        delFlag = false;
                        break;

                    case 'click':
                        if (delFlag) {
                            confirm('是否删除？\n \n' + name + '\n') ? _this.deleteTpl($this) : false;
                        }
                        break;
                }


            });

            //选择当前模板事件
            $container.on('click', '.tpl_item', function () {
                var $this = $(this);
                _this.selectTpl($this);
            })
        },
        //删除模板
        deleteTpl: function ($this) {
            var itemSelector = this.options.itemSelector;

            $this.closest(itemSelector).remove();
            setTimeout(function () {
                alert('已删除!');
            }, 100)

        },
        //选择模板
        selectTpl: function ($item) {
            var active = this.options.activeState;
            // 在删除按钮上 click 无法选中图片
            if (!this.delFlag) {
                $item.toggleClass(active);
            }
        }
    };
    //实例化
    new Space({
        container: $('.tpl_box')
    });
    
});


