/**
 * Created by a on 2017/4/7.
 */
$(function(){
    var tabBtns=$(".tab_btn");
    var tabFlag=true;
    tabBtns.click(function(){
        if(tabFlag){
            $(this).text('-');
            $(this).parent().next().show();
            tabFlag=false;
        }else{
            $(this).text('+');
            $(this).parent().next().hide();
            tabFlag=true;
        }
    })
})