/**
 * Created by a on 2017/4/25.
 */
$(function(){
    var tabLis=$(".download_tab li");
    var dcommon=$(".dcommon");
    for(var i=0;i<tabLis.length;i++){
        tabLis[i].index=i;
    }
    tabLis.click(function(){
        console.log(this.index);
        tabLis.removeClass("active");
        $(this).addClass("active");
        dcommon.css("display","none");
        $(dcommon[this.index]).css("display","block")
    });
    //视频控制
    var videoList=$(".video_list li");
    var videoPlay=$(".video_play");
    videoList.click(function(){
        var  myPlayer=null;
        var path=$(this).attr("path");
        var pathArr=[path+'.mp4',path+'.webm',path+'.ogg'];
        var videohtml=
            '<video id="my-video" class="video-js" controls width="800" height="264" autoplay="autoplay" controls preload="auto" data-setup="{}"  poster="../img/productDetail/v_background.jpg">' +
                '<source src='+pathArr[0]+' type="video/mp4">'+
                '<source src='+pathArr[1]+' type="video/webm">'+
                '<source src='+pathArr[2]+' type="video/ogg">'+
                '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that'+
                    '<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>'+
                '</p>'+
            '</video>'+
            '<div class="close">'+
                '<span class="close_btn">关闭</span>'+
             '</div>'
        videoPlay.css("display","block");
        videoPlay.html(videohtml);
        var  myPlayer=videojs('my-video');
        myPlayer.play();
        var closeBtn=$(".close_btn");
        closeBtn.click(function(){
            alert('加油')
            videoPlay.html("");
            videoPlay.css("display","none");
        })
    });
    //控制详情页
    var messageBtn=$(".message_btn");
    var imgShow=$(".img_show");
    var closeImg=$(".close_img");
    messageBtn.click(function(event){
        event.stopPropagation();
        imgShow.show();
    });
    closeImg.click(function(){
        imgShow.hide();
    })
    $(document).click(function(){
        imgShow.hide();
    })
})