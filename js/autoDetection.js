/**
 * Created by a on 2017/4/27.
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

                detectionAuto.show();
                for(var i=0;i<productArr.length;i++){
                   var str="<a>"+productArr[i]+"</a>";
                    detectionAuto.append(str);
                }
                var as=$(".detection_autoo a");

                as.click(function(){
                    searchInput.val($(this).text());
                    detectionAuto.hide();
                    $(".detection_autoo a").remove();
                })

                var closeAutoo=$(".close_autoo");
                closeAutoo.click(function(){
                    detectionAuto.hide();
                    $(".detection_autoo a").remove();
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
                //alert("发现设备数量 ："+obj.RtnVal+", \r\n\r\n" + obj.pathStr);

                var paths = obj.pathStr;
                var path_arr = paths.split("\r\n");
                //var str_dascom_device="一共搜索到得实设备：\r\n";
                //var find_dascom_device = 0;
                for(var item in path_arr)
                {
                    var curpath = path_arr[item];
                    var hdev = ocx.OpenDev(curpath,3000,3000,0x302,PORTINFO_PMODE_CTRL);
                    if(hdev==-1)
                        continue;
                    res = ocx.GetDevType(hdev);
                    var obj2 = eval('(' +  res  + ')');
                    productArr.push(obj2.DevType);
                    //if(obj2.RtnCode == 0)
                    //{
                    //    find_dascom_device++;
                    //    str_dascom_device += (find_dascom_device+". ");
                    //    str_dascom_device += obj2.DevType;
                    //    str_dascom_device += "\r\n";
                    //}
                    if(!ocx.CloseDev(hdev))
                        console.log("关闭"+curpath+"失败");
                }
                //if(find_dascom_device)
                //    alert(str_dascom_device);
                //else
                //    alert("未找到得实设备！");
            }
        }
    })

})




