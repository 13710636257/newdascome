/**
 * Created by a on 2017/4/28.
 */
$(function(){
    //解决方案和应用软件的切换
    var aspans=$(".appliction_tab span");
    var adivs=$(".application_content>div");
    for(var i=0;i<aspans.length;i++){
        aspans[i].index=i;
    }
    aspans.click(function(){
        aspans.removeClass("active");
        $(this).addClass("active");
        adivs.hide();
        $(adivs[this.index]).show();
    })

	
	$(".email").click(function(){
		if($(".email span").css("display")=="none"){
		$('.email span').show();
		
		}else{
		
		$('.email span').hide();
	}
	
	})
	
	
	
})