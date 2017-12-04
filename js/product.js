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
        zsl: '../zsl',

    }
});

//开始逻辑
// Start the main app logic.
requirejs(
    ['jquery','zsl'],
    function ($,zsl) {

        console.log(zsl)


        //amdStu.must();

        

    });