/**
 * Created by ds008 on 2017/9/8.
 */
$(document).ready(function(){
    //最新主题接口
    $.ajax({
        url:'http://192.168.11.111/Apply/bbs/Community/newest',
        type:'GET',
        data:{
            rows:8  //显示条数 //可选参数
        },
        dataType:'json',
        success:function(result){
            var data = result.data;
            newhost(data);
        }
    });


    //热门帖子接口
    $.ajax({
        url:'http://192.168.11.111/Apply/bbs/Community/hottest',
        type:'GET',
        data:{
            //可选参数
            rows:6  //显示条数
        },
        dataType:'json',
        success:function(result){
            var data = result.data;
            hothost(data);
        }
    });

    //常见问题帖子接口
    $.ajax({
        url:'http://192.168.11.111/Apply/bbs/Community/commonIssue',
        type:'GET',
        data:{
            rows:5  //显示条数  //可选参数
        },
        dataType:'json',
        success:function(result){
            var data = result.data;
            console.log(data)
            commonProblem(data);
        }
    });

    //产品分类接口
    $.ajax({
        url:'http://192.168.11.111/Apply/bbs/Community/goodsClass',
        type:'GET',
        dataType:'json',
        success:function(result){
            var data = result.data;
            console.log(data)
            pdClassify(data);
        }
    });


    //点击常见问题帖子跳转到相应的页面
    $('.questions').delegate('a','click',function(){
        window.name = $(this).data("id");  //获取主贴的id
    });

    //点击主题跳转到相应的页面
    $('.hot-post').delegate('a','click',function(){
        window.name = $(this).data("id");  //获取主贴的id
    });


    //创建最新主题li
    function newhost(hostdata){
        var newhostLi='';
        $.each(hostdata,function(idex,data){
            newhostLi+=
                '<li>'+
                '<a href="forum-content.html"data-id="' + data.id + '">'+data.theme+'</a>'+
                '</li>'
        })
        $('.newhotUl').append(newhostLi);
    };

    //创建热门帖子div
    function hothost(hotdata){
       var hothostLi="";
        $.each(hotdata,function(index,data){
            hothostLi+=
                '<li>'+
                '<a href="forum-content.html"data-id="' + data.id + '">'+data.theme+'</a>'+
                '</li>'
        });
        $('.hotpostUl').append(hothostLi);
   }
    //创建常见问题div
    function commonProblem(questiondata){
        var questions=$('.problem-content').find('.questions')
        var questionsP='';
        $.each(questiondata,function(index,data){
            questionsP+=
            '<p>'+
            '<a href="forum-content.html"data-id="' + data.id + '">'+data.theme+'</a>'+
            '</p>'
        })
        questions.append(questionsP);
    }


    //创建产品分类div
    function pdClassify(ClassifyData){
        var printerLi='';
        $.each(ClassifyData,function(index,data){
            printerLi +=
                '<li>' +
                '<p class="product_icon">' +
                '<img src="../img/forumf/product1.png" />' +
                '</p>' +
                '<div class="product_content">' +
                '<a class="title" href="forum-detail.html" data-key="' + data.key + '">'+data.type+'</a>' +

                '<div class="commentTime">' +
                '<span class="xs1 xw0 i">今日:' +
                '<strong class="xi1">'+data.dayRows+'</strong>' +
                '<b class="ico_fall">&nbsp;</b>' +
                '<span class="pipe">| </span>主题:' +
                '<strong class="xi1">'+data.allRows+'</strong>' +
                '<b class="ico_fall">&nbsp;</b>' +
                '</span>' +
                '</div>' +
                '<p style="font-size: 14px; line-height: 20px;">'+data.introduce+'</p>' +
                '</div>'+
            '</li>'
         });
        $('.product_classify ul').append(printerLi)
    };

    $('.note_list').delegate('.title', 'click', function () {
        var $this = $(this);
        var key = $this.data('key'); //获取主题帖的pid
        // console.log(pid)
        window.localStorage.setItem('themetype',key)
    })




})


