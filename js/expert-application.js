/**
 * Created by ds008 on 2017/9/13.
 */
$(document).ready(function () {
    var username = localStorage.getItem('username')
    $('.application').on('change', '.inp-area', function () {
        var $this = $(this)
            , $tip = $this.siblings('.tip')
            , len = $this.val().length;

        if (len > 0 ) {//判断value值的长度
            $tip.attr('data-tip', 'hide')
        }
    });

    //提交按钮事件
    $('.submit').on('click', function () {
        var isHideTxex = true;//默认输入框全部填写内容  （人为开关）
        $('.tip').each(function () {
            if ($(this).data('tip') == 'show') {
                $(this).show();
                isHideTxex = false //其中一项没填写过，让提示显示
            }
        })

        if (isHideTxex) {
            console.log(323)
            $.ajax({
                type: "POST",//数据发送的方式（post 或者 get）
                url: "http://192.168.11.111/Apply/bbs/Expert/register",//要发送的后台地址
                data: {
                    //必选参数
                    name: $('.inp').val(),   //姓名
                    degree: $('#resideprovince').val(),   //学位
                    position: $('.job').val(),   //担任过职位
                    achievement: $('.achievetext').val(),   //主要成就
                    //可选参数
                    awards: $('.prize').val(),   //奖项
                },
                dataType: "json",//后台处理后返回的数据格式
                success: function (data) {//ajax请求成功后触发的方法
                    var code = data.code
                    if (code == 1000) {
                        alert('提交成功');
                        //$('.tip').each(function () {
                        //    var $this = $(this)
                        //        , $area = $this.siblings('.inp-area')//获取输入框
                        //    //$this.attr('data-tip', 'show');//显示提示
                        //   // $area.val('');//输入框为空
                        //})
                        isHideTxex = true
                    }
                }
            });
        }
    })
});