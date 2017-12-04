/**
 * Created by a on 2017/4/10.
 */
$(function(){
    var lisTab=$("header li");
    var lis=$(".content>ul>li");
    console.log(lis);
   for(var i=0;i<lisTab.length;i++){
       lisTab[i].index=i;
   }
    lisTab.click(function(){
        lisTab.removeClass("current");
        $(this).addClass("current");
        lis.css("display","none");
        $(lis[this.index]).css("display","block");
    })
})