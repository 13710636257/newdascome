
$(function () {

    'use strict';

    ;
    (function () {
        var $selectTip = $('.jop_tip'),
            $select = $('.item'),
            $arrow = $('.icon_arrow');

        var $confirmBtn = $('.confirm_btn');

        $confirmBtn.on('click', function () {

            console.log(1)
        });


        $.each($select, function () {
            var $this = $(this);

            $this.delegate('LI', 'click', function () {
                var _$this = $(this),
                    txt = _$this.text();

                var index = $select.index($this);

                if (_$this.hasClass('current')) return;
                _$this.addClass('current').siblings().removeClass('current');

                $selectTip.eq(index).html(txt);
                $arrow.eq(index).removeClass('click_rotate');
                $this.fadeOut(150);
            });

        });


        $.each($selectTip, function () {
            var $this = $(this);

            $this.on('click', function () {
                var index = $selectTip.index($this);

                $select.eq(index).fadeToggle(150);
                $arrow.eq(index).toggleClass('click_rotate');
            });

        })

    })();



});