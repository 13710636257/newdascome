/**
 * Created by a on 2017/7/25.
 */

$(function () {
    // 初始化模板的数据
    var initTpl = {
        op: {
            container: '.drawing_tpl_list',
            srcDir: '../img/draw/cardTpl/',
            tplNumber: 17
        },
        // 跳转 模板编辑的标志位(在切换按钮上点击制作切换)
        isAllow: false,
        // 切换正反面
        switchPicture: function () {
            var $container = $(this.op.container),
                $tplItem = $(this.op.container).find('.drawing_tpl_item'),
                $switchBtn = $(this.op.container).find('.icon_switch');

            var _this = this;

            $container.delegate('.icon_switch', 'click mouseenter mouseleave', function (e) {
                var $this = $(this),
                    index = $switchBtn.index($this);

                // 切换正反面 预览
                var type = e.type || window.event.type;

                switch (type) {

                    case 'click':
                        $tplItem.eq(index).find('.tpl-item_div').toggle();
                        break;

                    case 'mouseenter':
                        _this.isAllow = true;
                        break;

                    case 'mouseleave':
                        _this.isAllow = false;
                        break;
                }
            })
        },
        // 渲染模板
        renderTpl: function () {
            var html = '',
                $container = $(this.op.container);

            for (var i = 1; i <= this.op.tplNumber; i++) {
                html +=
                    '<li class="drawing_tpl_item">'
                    + '<div class="tpl_item_fornt tpl-item_div">'
                    + ' <img class="lazy" src="' + this.op.srcDir + 'bg_' + i + '_fornt.png" alt="tpl:' + i + '-1"/>'
                    + ' </div>'
                    + ' <div class="tpl_item_back tpl-item_div">'
                    + ' <img class="lazy" src="' + this.op.srcDir + 'bg_' + i + '_back.png" alt="tpl:' + i + '-0"/>'
                    + '</div>'
                    + '<div class="icon_switch"> <i class="fa fa-refresh" aria-hidden="true"></i> </div>'
                    + ' </li>';
            }
            $container.html(html);
        },
        // 点击获取 当前图片的src
        getTplSrc: function () {
            var $container = $(this.op.container),
                _this = this;
            _this.srcMap = {};


            $container.delegate('LI', 'click', function () {
                var $this = $(this),
                    $img = $this.find('img');

                // 遍历 当前项 li display:block 的图片的 src
                $.each($img, function (idx, item) {
                    var $item = $(item);

                    if ($item.parent().css('display') == 'block') {

                        window.name = $item.attr('src');
                        // console.log($item.attr('alt'));

                        // 图片激活状态的图片的 src
                        _this.srcMap['src'] = $item.attr('src');
                        // 区分图片激活状态的图片的正反面
                        _this.srcMap['flag'] = $item.attr('alt');

                        console.log(JSON.stringify(_this.srcMap))
                    }
                });

                //  只有不是在 切换按钮 才可以跳转到 编辑模板
                if (!_this.isAllow) {
                    confirm('是否要模板编辑？') ? window.open('../html/editTemplate.html') : false;
                }
            });

        },
        init: function () {
            this.renderTpl();
            this.switchPicture();
            this.getTplSrc();
        }
    };
    initTpl.init();
});