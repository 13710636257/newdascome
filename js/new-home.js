/**
 * Created by a on 2017/4/28.
 */
$(function(){
    var ocx=null;
    ocx = document.getElementById("WDevObj");
    var detectionBtn=$(".detection_btn");
    var downloadTip=$(".download_tip");
    var searchInput=$(".search_input");
    detectionBtn.click(function(){
        if(ocx!=null)
        {
            try{
                var res = ocx.EnumDevPath(0x302, "", 0, 0);
            }catch(e){
                downloadTip.show();
                var dcloseBtn=$(".dclose_btn");
                dcloseBtn.click(function(){
                    downloadTip.hide();
                })
                return;
            }
            var PORTINFO_PMODE_CTRL=0x02;
            var productArr=[];
            test();
            //console.log(productResult);
            //将得到的型号返回
            if(productArr.length==0){
                alert("你当前并没有连接得实打印机");
            }else{
                var detectionAuto=$(".detection_autoo");
                var detectionList=$(".detection_list");
                detectionAuto.show();
                for(var i=0;i<productArr.length;i++){
                    var str="<a><span class='config_tip'>"+productArr[i]+"</span><span class='ptip'>请选择后点击搜索</span></a>";
                    detectionList.append(str);
                }

                var as=$(".detection_list a");
                as.click(function(){
                    var achildren=$(this).find(".config_tip");
                    searchInput.val($(achildren).text());
                    detectionAuto.hide();
                    $(".detection_list a").remove();
                })

                var closeAutoo=$(".close_autoo");
                closeAutoo.click(function(){
                    detectionAuto.hide();
                    $(".detection_list a").remove();
                })
            }
            function test()
            {
                var res = ocx.EnumDevPath(0x302, "", 0, 0);
                var obj = eval('(' +  res  + ')');//由传出的字串转为JSON对象
                if(obj.RtnCode != 0)
                {
                    alert("EnumDevPath失败");
                    return;
                }
                var paths = obj.pathStr;
                var path_arr = paths.split("\r\n");
                for(var item in path_arr)
                {
                    var curpath = path_arr[item];
                    var hdev = ocx.OpenDev(curpath,3000,3000,0x302,PORTINFO_PMODE_CTRL);
                    if(hdev==-1)
                        continue;
                    res = ocx.GetDevType(hdev);
                    var obj2 = eval('(' +  res  + ')');
                    productArr.push(obj2.DevType);
                    if(!ocx.CloseDev(hdev))
                    	console.log("关闭"+curpath+"失败");
                }
              
            }
        }
    })
    
 
//  搜索框获取焦点
    var srk=document.getElementsByClassName("search_input")[0];
  		srk.onfocus=function(){          //onfocus:获得焦点
			this.style.backgroundColor="#dadcdd";
		}
  		srk.onblur=function(){   //onblur：失去焦点
  			this.style.backgroundColor="#FFFFFF";
  		}
  		
  	//打印机区域	
  	var icon=$(".model-inside .service_list li ")
  	
  	//内容切换
	 icon.hover(function(){
	  		var _$this = $(this)
	  		index = icon.index(_$this); //获取li的当前下标
	  		
			$('.paper-content').eq(index).show().siblings().hide();
	
	})
//打印机内容切换
	var $list=$('.service_list'),
		$content=$('.paper-content'),
		$icon=$list.children('li');

	$list.delegate('LI','mouseenter',function(e){
		var _$this=$(this);
		var index=$icon.index(_$this);
		console.log(index)
		 $content.eq(index).show().animate({
		 	top:'20px',
		 	opacity:0.7
		 },500).siblings().css({
		 	top:-310,
		 	opacity:0.7
		 }).hide(); 
		 
	})
  		
  		
  		
  		
  		
  		
  		
    
    
})






