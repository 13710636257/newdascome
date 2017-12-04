/**
 * Created by a on 2017/4/1.
 */
$(function(){
    //分页插件
    pagination();
    function pagination(){
        $('.pagination_box').pagination({
            coping:true,
            prevContent:'<',
            nextContent:'>'
        });
    }
})