/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/21.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/21.
 */


// 设置 屏幕缩放让轮播居中显示
;(function(){
    var w =$(window).width();
    $('.banner').width(w);
})();

function bannerListFn(a,b,c,d,e,f){
    var $bannerMaxWapDom=a;
    var windowWidth=$(window).width();


    var timeShow=0;
    var array=0;
    var timeOff=0;

    var imgPos=$bannerMaxWapDom.find("ul").find("li");

    $.each(imgPos,function(i,item){
        var $item = $(item);

        var imgSrc = $item.data('image-lg');

        $item.css('backgroundImage','url("'+imgSrc+'")');
    })

    var cloneOne=imgPos.first().clone();
    $bannerMaxWapDom.find("ul").append(cloneOne);
    $bannerMaxWapDom.find("li").width(windowWidth);
    var liWidth=imgPos.width();
    var liLength=$bannerMaxWapDom.find("li").length;
    $bannerMaxWapDom.find("ul").width(liWidth*(liLength+1));

    var $imgBtnList=b;

    setTimeout(function(i){
        timeShow++;
        (timeShow == 1) ? $bannerMaxWapDom.find("ul").fadeIn() : $bannerMaxWapDom.find("ul").hide();
    },20);

    (e === undefined) ? e=2000 : e=e;

    function imgListBtn (){

        for (var i=0; i < liLength-1; i++ ){
            $imgBtnList.append("<span></span>");
        }

        $imgBtnList.children().eq(0).addClass("current");

        $imgBtnList.children().click(function(){
            var index=$(this).index();
            array=index;
            bannerImgList(index);
            $imgBtnList.children().eq(array).addClass("current").siblings().removeClass("current");

        });

    }

    imgListBtn();

    function bannerImgList(a){
        $bannerMaxWapDom.find("ul").animate({left: -a*windowWidth},400)
    }

    function setTime(){
        timeOff=setInterval(function(){
            array++;
            move();
        },e)
    }

    (f) ? setTime() : setTime;

    c.stop(true).click(function(){
        array--;
        move();
    });

    d.stop(true).click(function(){
        array++;
        move();
    });

    function move(){

        if (array == liLength){
            $bannerMaxWapDom.find("ul").css({left:0});
            array=1;
        }

        if (array == -1){
            $bannerMaxWapDom.find("ul").css({left:-liWidth*(liLength-1)});
            array=liLength-2
        }

        $bannerMaxWapDom.find("ul").stop(true).animate({
            left:-array*liWidth
        });

        (array == liLength-1) ? $imgBtnList.children().eq(0).addClass("current").siblings().removeClass("current") : $imgBtnList.children().eq(array).addClass("current").siblings().removeClass("current");


    }

    $bannerMaxWapDom.hover(function(){
        clearInterval(timeOff);
    },function(){(f) ? setTime() : setTime;});
}

$(function(){
    var ocx=document.getElementById("WDevObj");
    var productArr=[];
    var snArr=[];
    var FWVerArr=[];
    var PORTINFO_PMODE_CTRL=0x02;
    var detectionBtn=$(".detection_btn");
    var downloadTip=$(".download_tip");
    var searchInput=$(".search_input");

    //传递参数
    bannerListFn(
        $(".banner"),  //banner最大容器
        $(".img-btn-list"),  //banner======>按钮父容器============必填
        $(".left-btn"),     //banner====>左右按钮对象名===========必填
        $(".right-btn"),
        3000,    //banner滚动时间==================>可选项=======>默认为2000
        true     //是否需要自动轮播需要==========true============不需要false:必填
    );

    function checkForm() {
        //校验搜索文本框
        var keyword = document.getElementById("keyword").value;
        if (keyword == null || keyword == '')
        {
            alert("请输入搜索内容!");
            return false;
        }
    }

    detectionBtn.click(function(){
        if(ocx!=null)
        {
            try{
                var res = ocx.EnumDevPath(0x301, "", 0, 0);
            }catch(e){
                downloadTip.show();
                var dcloseBtn=$(".dclose_btn");
                dcloseBtn.click(function(){
                    downloadTip.hide();
                })
                return;
            }


            test();

            //将得到的型号返回

            if(productArr.length==0){
                alert("你当前并没有连接得实打印机");
            }else{
                var detectionAuto=$(".detection_autoo");
                var detectionList=$(".detection_list");
                detectionAuto.show();

                //<span class='ptip'>请选择后点击搜索</span>
                //192.168.11.173:8080/product_findByName?keyword=${keyword}&page=1
                for(var i=0;i<productArr.length;i++){
                    var str='<a href="http://192.168.11.158:5656/Dascom/product_findByName?keyword=' + productArr[i] +'&page=1"><span class="config_tip">'+productArr[i]+'</span><span class="sn">'+ snArr[i] + '</span></a><input class="binddev" type="button" value="绑定"/>';
                    detectionList.append(str);
                }

                var as=$(".detection_list a");
                as.click(function(){
                    var achildren=$(this).find(".config_tip");
                    searchInput.val($(achildren).text());
                    detectionBtn.prop('disabled', false);
                    detectionAuto.hide();
                    $(".detection_list a").remove();
                    $(".detection_list input").remove();
                })



                var closeAutoo=$(".close_autoo");
                closeAutoo.click(function(){
                    detectionBtn.prop('disabled', false);
                    detectionAuto.hide();
                    $(".detection_list a").remove();
                    $(".detection_list input").remove();
                })

                detectionBtn.prop('disabled', true);
            }


        }
    });

    //绑定序列号到指定设备
    $('.detection_list').delegate('INPUT','click', function () {
        alert('编写绑定序列号逻辑');
    });

    function test() {
        var res = ocx.EnumDevPath(0x301, "", 0, 0);
        var obj = eval('(' +  res  + ')');//由传出的字串转为JSON对象
        if(obj.RtnCode != 0)
        {
            //console.log("EnumDevPath失败");
            return;
        }
        var path_arr = obj.pathStr.split("\r\n");

        productArr.splice(0,productArr.length);
        snArr.splice(0,snArr.length);
        FWVerArr.splice(0,FWVerArr.length);
        for(var item in path_arr)
        {
            var curpath = path_arr[item];
            var hdev = ocx.OpenDev(curpath,3000,3000,0x301,PORTINFO_PMODE_CTRL);

            if(hdev==-1)
                continue;

            res = ocx.GetDevType(hdev);          //设备型号
            var obj2 = eval('(' +  res  + ')');

            if(!obj2.DevType)
                continue;

            productArr.push(obj2.DevType);
            var obj_sn = ocx.GetDevSN(hdev);     //设备序列号
            obj_sn = eval('(' +  obj_sn  + ')');
            snArr.push(obj_sn.DevSN);
            var obj_FWVer = ocx.GetDevFWVer(hdev);  //固件版本号
            obj_FWVer = eval('(' +  obj_FWVer  + ')');
            FWVerArr.push(obj_FWVer.DevFWVer);
            if(!ocx.CloseDev(hdev)){
                //console.log("关闭"+curpath+"失败");
            }


        }

        //保存路径集合

        sessionStorage.setItem("path_arr",JSON.stringify(path_arr));
    }
})

//打印机区域
var icon=$(".model-inside .service_list li ")

//内容切换
icon.hover(function(){
    var _$this = $(this)
    index = icon.index(_$this); //获取li的当前下标

    $('.paper-content').eq(index).show().siblings().hide();

})


var $list = $('.service_list'),
    $content = $(".paper-content"),
    $icon = $list.children('li');


$list.delegate('LI', 'mouseenter', function (e) {
    // e.originalEvent.type ==》 mouseover
    // e.type ==》 mouseenter
    //var type = e.type || window.event.type;
    //console.log(e.originalEvent.type)
    var _$this = $(this);

    var index = $icon.index(_$this);
    $content.eq(index).show().animate({
        top: 20,
        opacity: 0.6
    }, 500).siblings().css({
        top: -310,
        opacity: 0.6
    }).hide();

})
