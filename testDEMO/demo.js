/**
 * Created by a on 2017/5/17.
 */


$(function () {


    var $tabs = $('.note_classify');
    var $panels = $('.note_item');

    $tabs.delegate('a', 'click', function () {

        if ($(this).hasClass('current'))return;
        $(this).addClass('current').siblings().removeClass('current');


        var tab_index = $(this).data('tab-item');

        $panels.eq(tab_index).show().siblings().hide();
    })


})