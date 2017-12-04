/**
 * Created by a on 2017/4/6.
 */
$(function(){
    var leftList=$(".middle_left li");
    var rightList=$(".ullis>li");
    for(var i=0;i<leftList.length;i++){
        leftList[i].index=i;
    }
    leftList.click(function(){
        leftList.removeClass("current");
        $(this).addClass("current");
        rightList.removeClass("current");
       $(rightList[this.index]).addClass("current");
    })
})