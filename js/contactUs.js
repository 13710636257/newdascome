/**
 * Created by Administrator on 2017/6/13.
 */

$(function () {


    var $nav = $('.block_nav').children();


    $.each($nav, function () {
        var $this = $(this);

        $this.on('mouseenter', function () {
            if($this.hasClass('active')) return;
            $this.addClass('active').siblings().removeClass('active');
        })
    });



    $('.clamp_box').on('mouseenter', function () {
        var $this = $(this);
        if ($this.hasClass('active')) return;
        $this.addClass('active').siblings().removeClass('active');
    })


});