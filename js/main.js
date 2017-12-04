/**
 * @Author: LIANY-YAN-BIAO
 * @Date:   on 2017/10/11.
 * @Last Modified by:   LIANY-YAN-BIAO
 * @Last Modified time: on 2017/10/11.
 */
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
        konva: 'konva/konva',
        colorpicker: 'colorpicker.min',

        shape: '../edit/shape',
        clutter: '../edit/clutter',
        common: '../edit/common',
        background: '../edit/background',
        picture: '../edit/picture',
        text: '../edit/text',
        rect: '../edit/rect',
        ellipse: '../edit/ellipse',
        config: '../edit/shape.config',
        pallet: '../edit/pallet'
    }
});

// 主函数入口
requirejs(
    ['konva', 'jquery', 'shape', 'clutter', 'pallet'],
    function (Konva, $, Shape, Clutter, Pallet) {

        var w = 600
            , h = 400
            , stage = new Konva.Stage({
                container: 'container',
                width: w,
                height: h,
                id: 'front'
            })
            , layer = new Konva.Layer({
                name: 'mainLayer' // 公共的层
            })
            , baseGroup = new Konva.Group({
                name: 'base'  // 公共的组
            })
        //中间层 用来获取画布的数据
            , middleLayer = new Konva.Layer({
                name: 'middleLayer',
                x: 0,
                y: 0
            })
        // 舞台的承载的容器
            , $container = $(stage.getContainer())
        // //////////////背景 实例对象
        ////////////////////////////////
            , bg = new Shape.Background({
                stage: stage,
                connerRadius: $container.css('border-radius')
            });


        layer.add(baseGroup);
        stage.add(layer);
        stage.add(middleLayer);
        // @todo : 设置层的 zIndex 注意在 node 添加到层或是舞台后才会生效的
        // 1: 背景层 bgLayer.setZIndex(2); 背景层的私有层级（转给背景图片转换用）bgPrivateLayer.setZIndex(1)
        // 2: 活动层 mainLayer.setZIndex(3);
        // 1: 中间层 middleLayer.setZIndex(1);
        layer.setZIndex(3);
        // 预览按钮
        var $tabPreviewBtn = $('.tab_preview_btn');
        // 画布的大小信息展示
        var info = (function () {
            // 画布的大小信息展示
            var io = {
                width: $('.info_width'),
                height: $('.info_height')
            };


            // 画布的大小信息
            return function (target) {
                var w = target.width()
                    , h = target.height()
                    ;
                io.width.text(w);
                io.height.text(h);
            }
        })();
        //默认显示 正面的画布的大小
        info($container);

        //初始化数据与绑定事件
        Clutter.initPattern({
            stage: stage
        });

        // ********************************************************** 测试************************
        //g()
        function g() {
            new Shape.Rect({
                x: 50,
                y: 100,
                baseGroup: baseGroup,
            });

            new Shape.Picture({
                x: 320,
                y: 200,
                baseGroup: baseGroup,
            });

            window.baseGroup = baseGroup
            window.instance = new Konva.Text({
                x: 30,
                y: 50,

                padding: 10,
                text: 'Konva的Text实例',
                fill: 'red',
                fontSize: 16,
                border: '1px solid #212121',
                draggable: true
                // stroke: 'red',

            })
            layer.add(instance)

            $('.fa-print').on('click', function () {
                window.text = new Shape.Text({
                    x: 200,
                    y: 120,
                })


                // instance.rotate(30)
                instance.rotation(5)
                instance.fontStyle('900')
                var s = instance.fontStyle()
                instance.fontStyle(s + ' italic')

                // instance.fontFamily(' DFKai-SB')

                instance.textDecoration('')

                //  instance.fontStyle('italic 900')
                console.log(instance.fontStyle())
                console.log(instance.fontFamily())

                layer.draw();
            })
            instance.textDecoration('line-through')

            var line = new Konva.Line({
                x: 100,
                y: 50,
                points: [73, 70, 340, 23, 450, 60, 500, 20],
                stroke: 'red',
                tension: 1,
                draggable: true
            });
            var oval = new Konva.Ellipse({
                x: stage.getWidth() / 2,
                y: stage.getHeight() / 2,
                radius: {
                    x: 50,
                    y: 50
                },
                fill: 'yellow',
                stroke: 'black',
                strokeWidth: 4,
                draggable: true
            });
            var path = new Konva.Path({
                x: 240,
                y: 40,
                data: 'M12.582,9.551C3.251,16.237,0.921,29.021,7.08,38.564l-2.36,1.689l4.893,2.262l4.893,2.262l-0.568-5.36l-0.567-5.359l-2.365,1.694c-4.657-7.375-2.83-17.185,4.352-22.33c7.451-5.338,17.817-3.625,23.156,3.824c5.337,7.449,3.625,17.813-3.821,23.152l2.857,3.988c9.617-6.893,11.827-20.277,4.935-29.896C35.591,4.87,22.204,2.658,12.582,9.551z',
                fill: 'green',
                scale: 2
            });

            var redLine = new Konva.Line({
                points: [5, 70, 300, 20],
                stroke: 'red',
                strokeWidth: 2,
                lineCap: 'round',
                lineJoin: 'round',
                draggable: true
            });

            redLine.on('mouseenter', function () {
                redLine.strokeWidth(8)
                console.log(9111)
            })
            redLine.on('dragend', function () {
                redLine.strokeWidth(2)
                console.log(5559)

            })
            // add the shape to the layer

            // layer.add(redLine);
            //layer.add(oval);
            //layer.add(path);
            // layer.add(line)

            console.log(stage instanceof Konva.Stage);

            var fd = new FormData()
            fd.append("size", 4)
            fd.append("url", "http://article.fd.zol-img.com.cn/t_s640x2000/g5/M00/07/0F/ChMkJ1m3XS6IAZeoAAIydpuS0A4AAgawQI7t0wAAjKO729.jpg")


            $.ajax({
                url: 'https://www.dascomyun.cn/devctrl/dev/print/8637765',
                headers: {
                    "File-Type": "application/url",
                },
                data: {},
                processData: false,
                contentType: false,


                type: "POST",
                success: function (res) {
                    console.log(res)


                }

            })
        }

        // ********************************************************** 测试************************


        layer.draw();
        //给 Shape.Background 的实例初始化，并绑定事件
        // 通过回调，就会更加明确的是那个实例
        // 同步背景色
        Pallet.initBackground(bg);
        //预览图片 右侧的标签切换按钮
        $tabPreviewBtn.on('click', function () {
            //预览图片
            Pallet.previewPicture(stage);
        });
        // 设置当前编辑的字体实例的样式 大小 旋转角度 颜色 粗体..
        // 初始化
        Pallet.setFont(stage);
        //选取的本地图片为背景图片
        Pallet.localImage(bg);
        //上传文件
        Clutter.initUploadFile(stage);


//******************************************************************************************************************************//
    });