/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/9/22.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/9/22.
 */

(function (window, document) {
    var footer = [
        '<footer class="public-footer">',
        '<div class="service_info">',
        '<div class="info_content clearfix">',
        '<div class="footnav">',
        '<h3>产品系列</h3>',
        '<ul>',
        '<li><a href="javascript:;">家用系列</a></li>',
        '<li><a href="javascript:;">商用系列</a></li>',
        '</ul>',
        '</div>',
        '<div class="footnav"><h3>服务支持</h3>',
        '<ul>',
        '<li><a href="javascript:;">驱动、固件下载</a></li>',
        '<li><a href="javascript:;">服务机构查询</a></li>',
        '<li><a href="javascript:;">常见问题</a></li>',
        '</ul>',
        '</div>',
        '<div class="footnav">',
        '<h3>购买指南</h3>',
        '<ul>',
        '<li><a href="javascript:;">经销商查询</a></li>',
        '<li><a href="javascript:;">专卖店</a></li>',
        '</ul>',
        '</div>',
        '<div class="footnav"><h3>关于得实</h3>',
        '<ul>',
        '<li><a href="javascript:;">公司简介</a></li>',
        '<li><a href="javascript:;">新闻资讯</a></li>',
        '<li><a href="javascript:;">中国业务网络</a></li>',
        '</ul>',
        '</div>',
        '<div class="footnav"><h3>关联网站</h3>',
        '<ul>',
        '<li><a href="javascript:;">得实中国合作伙伴门户</a></li>',
        '</ul>',
        '</div>',
        '</div>',
        '</div>',
        '<div class="service_copyright"><div class="copyright_content">',
        '<div class="aboutus">',
        '<a href="javascript:;">网站地图</a>',
        '<a href="javascript:;">联系我们</a>',
        '<a href="javscript;;">加入我们</a>',
        '<a href="javascript:;">使用声明</a>',
        '<a href="javascript:;">隐私政策</a>',
        '</div><p>© 2013 版权所有 得实集团 京ICP备10012480号<span></span>粤公网安备 44070402440764号</p>',
        '</div>',
        '</div>',
        '</footer>'
    ];
    var header = [
        '<header class="public-header">',
        '<div class="header">',
        '<div class="head_logo"><img src="../img/home/logo2.png" alt="div"/></div>',
        '<div class="searchAll"></div>',
        '<div class="sch">',
        '<input type="text" class="inputleft" placeholder="请输入搜索内容/关键字"/>',
        '<input type="submit" class="rightbtn" value="搜索"/>',
        '</div>',
        '<div class="nav">',
        '<div class="login_register">',
        '<div class="login-box login-active">',
        '<a class="login" href="login.html">登录</a>',
        '<a class="register" href="register.html">注册</a>',
        '</div>',
        '<div class="login-box">',
        '<span class="login-username"></span>',
        '<button id="quit-btn">退出</button>',

        '<div class="account-setting">',
        '<dl>	',
        '<dd><a href="personal-center.html">个人中心</a></dd>',
        '<dd><a href="userProfile.html">账号设置</a></dd>',
        '<dd><a href="moderator-application.html">申请版主</a></dd>',
        '<dd><a href="expert-application.html">专家申请</a></dd>	',
        '</dl>',
        '</div>	',

        '</div>',
        '</div>',
        '<ul class="navUl">',
        '<li><a href="index.html" class="taba">首页</a></li>',
        '<li class="navtitle"><a href="product.html" class="taba">产品</a></li>',
        '<li class="navtitle"><a href="applicationSolution.html" class="taba">应用与解决方案</a></li>',
        '<li><a href="new-forum.html" class="taba">社区论坛</a></li>',
        '<li><a href="cloud-print.html" class="taba">云打印</a></li>',
        '<li><a href="contact_ds.html" class="taba">联系得实</a></li>',
        '</ul>',
        '</div>',
        '<ul class="menu">',
        '<li class="list">',
        '<ul class="product">',
        '<li>',
        '<p class="printer_title">证卡打印机<p/>',
        '<img src="../img/public/dyj2.jpg"/>',
        '<a href="">AR-700（证卡版）</a>',
        '<a href="productList.html" class="checkmore">查看更多></a>',
        '</li>',
        '<li>',
        '<p class="printer_title">标签打印机</p>',
        '<img src="../img/public/dyj3.jpg"/>',
        '<a href="">DL-520（桌面型条码</a><a href="productList.html" class="checkmore">查看更多></a>',
        '</li>',
        '<li>',
        '<p class="printer_title">针式打印机</p>',
        '<img src="../img/public/dyj6.jpg"/>',
        '<a href="">DL-520（针式微型机）</a>',
        '<a href="productList.html" class="checkmore">查看更多></a>',
        '</li>',
        '<li>',
        '<p class="printer_title">报表打印机</p>',
        '<img src="../img/public/dyj7.jpg"/>',
        '<a href="">DL-520（特高速型）</a>',
        '<a href="productList.html" class="checkmore">查看更多></a>',
        '</li>',
        '<li>',
        '<p class="printer_title">移动打印机</p>',
        '<img src="../img/public/dyj4.jpg"/>',
        '<a href="">DP-530（便携式）</a>',
        '<a href="productList.html" class="checkmore">查看更多></a>',
        '</li>',
        '<li>',
        '<p class="printer_title">色带耗材</p>',
        '<img src="../img/public/sd.jpg"/>',
        '<a href="">106D-3（带芯型号）</a>',
        '<a href="productList.html" class="checkmore">查看更多>',
        '</a>',
        '</li>',
        '</ul>',
        '</li>',
        '<li class="list">',
        '<ul class="applicationSolution">',
        '<li>',
        '<h3>热门话题</h3>',
        '<p>打印机、驱动行业创新</p>',
        '<p>如何正确高效的使用打印机</p>',
        '<p>打印机涉及的领域</p>',
        '<p>软件定义网络</p>',
        '</li>',
        '<li><h3>行业</h3><p>行政事业</p><p>医疗</p><p>保险</p><p>农业</p>',
        '<a class="more" href="">查看更多></a></li>',
        '<li><h3>产品及服务</h3><p>打印机</p><p>驱动下载</p><p>应用软件</p><p>售后服务</p><a class="more" href="">查看更多></a>',
        '</li>',
        '<li class="support"><img src="../img/public/group_nav_support.jpg"/><p>得实在线技术支持，驱动下载，无论你遇到任何问题，我们都将随时为你提供服务。</p></li>',
        '</ul></li><li class="list">',
        '</li>',
        '</ul>',
        '</div>',
        '</header>'
    ];
    function write(dataArray) {
        var i = 0
            , len = dataArray.length;

        for (; i < len; i++) {
            document.write(dataArray[i]);
        }
    }
    write(header)
    write(footer)

    //创建iframeyua元素
    /*  var iframe = document.createElement('IFRAME');
     iframe.style.display = "none";
     document.body.appendChild(iframe);


     iframe.onload = function(){
     iframe.write('<streaming-element>');
     var su = iframe.contentDocument.querySelector('<streaming-element>');
     document.body.appendChild(su);
     write(header)
     document.write('</streaming-element>');
     iframe.contentDocument.close();

     }
     iframe.src = 'testWrite.html';*/

}(window, document));