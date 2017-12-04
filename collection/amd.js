/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */
//<!--<script data-main="../js/product.js" src="../js/asset/requirejs/require.js" defer async></script>-->
//html 头部引入


requirejs.config({
    /*
     * 三种情况:
     一、设置data-main，没配置baseUrl，以data-main的文件为基准；
     二、设置data-main，配置baseUrl，baseUrl以值以引用require.js的HTML为基准，require()的文件以baseUrl的值为基准；
     三、没配置data-main，以引用require.js的HTML为基准，没入口文件……
     */
    baseUrl: '../js/asset/',
    //paths 属性本来就是给路径加别名的方法
    paths: {
        jquery: 'jquery-1.9.1.min',
        common: '../common',

    }
});

// Start the main app logic.
requirejs(
    ['jquery', 'common'],
    function ($, common) {

        console.log($(window))

    });