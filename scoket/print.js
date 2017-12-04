/**
 * Created by a on 2017/8/21.
 */

window.onload=function()
{
    web_DS600InitService();
}

var Invoking = false;
var iterator = null;
var parent_iterator = null;
var InSub = 0;
var g_rtnval = 0;
function InitIterator(generator,getIterator)
{
    if(InSub && !getIterator)return;
    InSub++;
    if(getIterator)
    {
        return generator;
    }
    else
    {
        if(iterator == null)
        {
            iterator = generator;
            iterator.next();
        }
    }
}

function ClearIterator()
{
    InSub--;
    if(InSub == 0)
        iterator=null;
}

function check1()
{
    web_DS600DrawSetCardRect(85.6,53.98,con1);
    function con1(res){
        output(JSON.stringify(res));
        if(typeof(res) != "undefined" && res.RtnCode!=0)
            return;
        Invoke("web_DS600BeginDraw",con2);
    };

    function con2(res){
        output(JSON.stringify(res));
        if(typeof(res) != "undefined" && res.RtnCode!=0)
            return;
        web_DS600DrawImage(0,0,85.6,53.98,"D:\\广东省区划概图.jpg",false,con3);
    };

    function con3(res){
        output(JSON.stringify(res));
        if(typeof(res) != "undefined" && res.RtnCode!=0)
            return;
        web_DS600EndDraw("",con4);
    };

    function con4(res){
        output(JSON.stringify(res));
    }
}

function check2()
{
    InitIterator(__check2(),false);
    function* __check2()
    {
        try
        {
            Invoke("12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890",1,1,getres);
            var res = yield;

        }
        finally{
            ClearIterator();
        }

    }
}

function getres(res)
{
    if(iterator!=null)iterator.next(res);
}

function output(str)
{
    var o = document.getElementById("outputContent");
    if(str.length>0){
        o.textContent = (str + "\r\n" )+o.textContent ;
    }
    var s = o.textContent;
    if(s.length>4096){
        s.substring(0,4096);
        o.textContent = s;
    }
    if(str == "clr")
        o.textContent = "";
}

function CheckConnection()
{
    web_DS600ConnectionCheck(function(res){
        if(typeof(res) != "undefined" && res.RtnCode != 0)
            output("已停止");
        else
            output("正在运行");
    });
}

function enumprinter()
{

    return InitIterator(__enumprinter(),arguments[0] == "Get Iterator");
    function* __enumprinter()
    {
        try{
            web_DS600SetIOTimeout(300,300,getres);
            yield;
            web_DS600EnumPrinter(3,getres);
            var res = yield;
            if(typeof(res) != "undefined" && res.RtnCode != 0)
            {
                output("枚举失败，返回码："+TranslateErrorCode(res.RtnCode));
                return;
            }
            var pterNum = res.NumberOfPrinters;
            var PrinterList = res.PrinterList;

            output("枚举成功");
            var pterArr = PrinterList.split("\r\n");
            if(pterNum)
            {
                for(var i = 0;i < pterNum;++i)
                {
                    output(pterArr[i]);
                    if(i==0)
                        printername.value = pterArr[i];
                }
            }
            else
            {
                output("但未枚举到打印机");
            }
        }
        finally {
            web_DS600SetIOTimeout(3000,3000,getres);
            yield;
            ClearIterator();
        }
    }
}

function openprinter()
{

    return InitIterator(__openprinter(),arguments[0] == "Get Iterator");

    function* __openprinter()
    {
        try{
            var ret;
            var PterName = printername.value+"";
            if(PterName=="")
            {
                output("请输入要打开的打印机");
                return;
            }
            web_DS600OpenPrinter(PterName,getres);
            ret = yield;
            if(ret.RtnCode != 0)
            {
                output("打开打印机失败:"+TranslateErrorCode(res.RtnCode));
                return;
            }
            output("打开打印机成功");
        }
        finally{
            ClearIterator();
        }
    }
}

function closeprinter()
{

    return InitIterator(__closeprinter(),arguments[0] == "Get Iterator");
    function* __closeprinter()
    {
        try{
            web_DS600ClosePrinter(getres);
            var ret = yield;
            if(ret.RtnCode == 0)
            {
                output("关闭打印机成功");
            }
            else {
                output("关闭打印机失败:"+TranslateErrorCode(ret.RtnCode));
            }
        }
        finally {
            ClearIterator();
        }
    }
}

function SelectItemByValue(objSelect,objItemText)
{
    for(var i=0;i<objSelect.options.length;i++)
    {
        if(objSelect.options[i].value == objItemText) {
            objSelect.options[i].selected = true;
            break;
        }
    }
}

function GetCurSel(Obj)
{
    var obj = document.getElementById(Obj);//定位id
    var index = obj.selectedIndex;// 选中索引
    var text = obj.options[index].text;// 选中文本
    var v = obj.options[index].value;// 选中值
    return index;
}

function GetSelValue(Obj)
{
    var obj = document.getElementById(Obj);//定位id
    var index = obj.selectedIndex;// 选中索引
    var text = obj.options[index].text;// 选中文本
    var v = obj.options[index].value;// 选中值
    return v;
}

function readInjectEject()
{
    var __this = this;
    return InitIterator(__readInjectEject(),arguments[0] == "Get Iterator");
    function *__readInjectEject()
    {
        try{
            var a = 0;
            var res = 0;
            web_DS600GetInjectPosition(getres);
            res = yield;
            if(typeof(res) != "undefined" && res.RtnCode != 0)
            {
                output("读取进卡位置失败:"+TranslateErrorCode(res.RtnCode));
                return;
            }
            SelectItemByValue(injectSide,res.pos==0?"卡盒进卡":"侧面进卡");
            web_DS600GetEjectPosition(0,getres);
            res = yield;
            if(typeof(res) != "undefined" && res.RtnCode != 0)
            {
                output("读取标准卡出卡位置失败:"+TranslateErrorCode(res.RtnCode));
                return;
            }
            SelectItemByValue(ejectPosStd,res.pos==0?"左侧排卡":"右侧排卡");
            web_DS600GetCardEjectSide(getres);
            res = yield;
            if(typeof(res) != "undefined" && res.RtnCode!=0)
            {
                output("读取出卡方向失败:"+TranslateErrorCode(res.RtnCode));
                return;
            }
            SelectItemByValue(ejectSide,res.ejectSide==0?"打印面朝下":"打印面朝上");
            web_DS600GetEjectPosition(1,getres);
            res = yield;
            if(typeof(res) != "undefined" && res.RtnCode != 0)
            {
                output("读取错误卡出卡位置失败:"+TranslateErrorCode(res.RtnCode));
                return;
            }
            SelectItemByValue(ejectPosErr,res.pos==0?"左侧排卡":"右侧排卡");
            output("读取成功");
        }
        finally{
            ClearIterator();
        }
    }
}

function setInjectEject()
{
    var __this = this;
    return InitIterator(__setInjectEject(),arguments[0] == "Get Iterator");
    function* __setInjectEject()
    {
        try{
            var Inject_Pos = GetCurSel("injectSide");
            var EjectPos_std = GetCurSel("ejectPosStd");
            var Eject_Side = GetCurSel("ejectSide");
            var EjectPos_err = GetCurSel("ejectPosErr");

            web_DS600SetInjectPosition(Inject_Pos,getres);
            var RE = yield;
            if(RE.RtnCode != 0)
            {
                output("设置进卡位置失败:"+TranslateErrorCode(RE.RtnCode));
                return;
            }
            web_DS600SetEjectPosition(0,EjectPos_std,getres);
            RE = yield;
            if(RE.RtnCode != 0)
            {
                output("设置标准卡出卡位置失败:"+TranslateErrorCode(RE.RtnCode));
                return;
            }
            web_DS600SetCardEjectSide(Eject_Side,getres);
            RE = yield;
            if(RE.RtnCode != 0)
            {
                output("设置出卡方向失败:"+TranslateErrorCode(RE.RtnCode));
                return;
            }
            web_DS600SetEjectPosition(1,EjectPos_err,getres);
            RE = yield;
            if(RE.RtnCode != 0)
            {
                output("设置错误卡出卡位置失败:"+TranslateErrorCode(RE.RtnCode));
                return;
            }
            output("设置成功");
        }
        finally {
            ClearIterator();
        }
    }
}

function changecolor(color,targetObj,obj){
    if(color == "Separator")
    {
        SelectItemByValue(obj,"Separator");
        return;
    }
    var s = document.getElementById(targetObj);
    c=color;
    if("more" == color)
    {
        var sColor = dlgHelper.ChooseColorDlg();
        sColor = sColor.toString(16);
        if (sColor.length < 6)
        {
            var sTempString = "000000".substring(0,6-sColor.length);
            sColor = sTempString.concat(sColor);
        }
        c = "#"+sColor;
    }
    s.style.background = c;
    SelectItemByValue(obj,"Separator");
}

function CDrawCardDialog()
{
    this.m_coordX = 0.0;
    this.m_coordY = 0.0;
    this.m_width = 0.0;
    this.m_height = 0.0;
    this.m_txtData = "";
    this.m_fontSize = 0;
    this.m_bold = false;
    this.m_italic = false;
    this.m_underline = false;
    this.m_qrAutoFill = false;
    this.m_qrReliability = 0;
    this.m_barcodeType = 0;
    this.m_barcodeReadableLabel = false;
    this.m_barcodeLabelAsHeader = false;
    this.m_verticalText = false;
    this.m_reversedTextOrder = false;
    this.m_layDown = false;
    this.m_barcodeScale = 2;
    this.m_FeedLine = false;
    this.m_LineSpacing = 0;
    this.m_charSpacing = 0;
    this.m_imagePath = "";
    this.m_whiteAsTransparent = false;
    this.m_sizeSet = false;
    this.pdlg = this;
    this.m_bHasContent = false;

    this.m_fontFace = "宋体";
    this.m_imgIndex = 0;

    this.m_fontColor = "#000000";
    this.m_barcodeColor = "#000000";
    this.m_drawAngle = 0;
    this.m_frontImgPath = "";
    this.m_backImgPath = "";
    this.printToImg2 = false;
}

CDrawCardDialog.prototype.UpdateViewToData = function()
{
    this.m_coordX = parseFloat(x_pos.value);
    this.m_coordY = parseFloat(y_pos.value);
    this.m_width = parseFloat(wid.value);
    this.m_height = parseFloat(hei.value);
    this.m_txtData = text_content.value;
    this.m_fontSize = parseFloat(fontSize.value);
    this.m_bold = fontBold.checked;
    this.m_italic = fontItalic.checked;
    this.m_underline = underLine.checked;
    this.m_underline = underLine.checked;
    this.m_layDown = LandSacpe.checked;
    this.m_fontFace = fnameSelector.value;
    this.m_fontColor = document.all.colorDisp1.style.backgroundColor;
    this.m_barcodeColor = document.all.colorDisp2.style.backgroundColor;
    /////////////////////////////////////////////////////////////////////

    this.m_charSpacing = parseFloat(charspace.value);
    this.m_LineSpacing = parseFloat(linespace.value);
    this.m_verticalText = verticalAlignStyle.checked;
    this.m_reversedTextOrder = reverse.checked;
    this.m_FeedLine = autoLineFeed.checked;
    /////////////////////////////////////////////////////////////////////

    this.m_barcodeType = GetCurSel("barcodeTypeSelect");
    this.m_barcodeScale = parseInt(GetSelValue("scaleSize"));
    this.m_barcodeReadableLabel = humanRead.checked;
    this.m_barcodeLabelAsHeader = humanReadTop.checked;
    /////////////////////////////////////////////////////////////////////

    this.m_qrReliability = GetCurSel("qrErrLel");
    /////////////////////////////////////////////////////////////////////

    this.m_imagePath = picPath_draw.value;
    this.m_whiteAsTransparent = whiteAsTransparent.checked;
    /////////////////////////////////////////////////////////////////////////

}


CDrawCardDialog.prototype.BeginDrawImg = function ()
{
    var __this = this;
    return InitIterator(__BeginDrawImg(),arguments[0] == "Get Iterator");
    function* __BeginDrawImg()
    {
        try{
            web_DS600DrawInSession(getres);
            var res = yield;
            if(typeof(res) != "undefined" && res.RtnCode==0 && res.InSession==0)
            {
                __this.m_drawAngle = GetCurSel("dsdrawPrintDir");
                if(__this.m_drawAngle == 0)
                {
                    web_DS600DrawSetCardRect(85.6,53.98,getres);
                    yield;
                }
                else
                {
                    web_DS600DrawSetCardRect(53.98,85.6,getres);
                    yield;
                }
                web_DS600BeginDraw(getres);
                yield;
                dsdrawPrintDir.disabled = "disabled";
            }
        }
        finally{
            ClearIterator();
        }
    }
}

function TranslateErrorCode(code)
{
    var result;//var DS_CPSDK_INVALID_ARG                    = 0x10000000;
    result = code.toString(16);
//	if (result.length < 6)
//	{
//		var sTempString = "000000".substring(0,6-sColor.length);
//		result = sTempString.concat(result);
//	}
    result = "0x"+result+": ";

    switch (code) {
        case DS_CPSDK_INVALID_ARG:
            return result + ("无效的参数");
        case DS_CPSDK_INVALID_ARG_BUFFER_TOO_LOW:
            return result + ("缓冲区太小");
        case DS_CPSDK_INVALID_ARG_IS_NULL:
            return result + ("参数为空");
        case DS_CPSDK_INVALID_ARG_FORMAT_ERROR:
            return result + ("参数的格式不正确");
        case DS_CPSDK_INVALID_ARG_LENGTH_ERROR:
            return result + ("参数长度不正确");
        case DS_CPSDK_INVALID_ARG_NOT_SUPPORT:
            return result + ("不支持的选项");
        case DS_CPSDK_INVALID_ARG_OUT_OF_RANGE:
            return result + ("参数超出范围");
        case DS_CPSDK_INVALID_ARG_TOO_LONG:
            return result + ("参数太长");
        case DS_CPSDK_INVALID_ARG_CONFIG_NULL:
            return result + ("打印机配置表中没有条目");
        case DS_CPSDK_INVALID_ARG_BUFFER_TOO_BIG:
            return result + ("要求分配的缓冲区太大");
        case DS_CPSDK_INVALID_ARG_SEQUENCE_ERROR:
            return result + ("调用顺序不正确");
        case DS_CPSDK_INVALID_ARG_FILE_NO_FOUND:
            return result + ("无法打开文件：找不到文件或没有合适的权限");
        case DS_CPSDK_CLIENT_MALLOC_FAILURE0:
        case DS_CPSDK_CLIENT_MALLOC_FAILURE1:
        case DS_CPSDK_CLIENT_MALLOC_FAILURE2:
        case DS_CPSDK_CLIENT_MALLOC_FAILURE3:
        case DS_CPSDK_CLIENT_MALLOC_FAILURE4:
            return result + ("内存不足");
        case DS_CPSDK_CLIENT_TLS_OUT_OF_INDEXES:
            return result + ("线程局部存储索引(TLS index)耗尽");
        case DS_CPSDK_INVALID_ARG_OUT_OF_HEADERSIZE:
        case DS_CPSDK_CLIENT_MAC_ERROR:
            return result + ("服务器返回的响应无效");
        case DS_CPSDK_CLIENT_JOB_NULL:
            return result + ("打印任务没有内容");
        case DS_CPSDK_TCP_CREATE_SOCKET_FAILURE:
            return result + ("无法创建套接字");
        case DS_CPSDK_TCP_CONNECT_SOCKET_FAILURE:
            return result + ("无法连接到服务器");
        case DS_CPSDK_TCP_SEND_SOCKET_FAILURE:
        case DS_CPSDK_TCP_READ_SOCKET_FAILURE:
            return result + ("通信失败");
        case DS_CPSDK_USB_CreateFile_FAILURE:
        case DS_CPSDK_USB_WriteFile_FAILURE:
            return result + ("USB通信失败");
        case DS_CPSDK_SERVICE_CREATE_SOCKET_FAILURE:
            return result + ("系统资源不足，无法发起与服务器的通信");
        case DS_CPSDK_SERVICE_CONNECT_SOCKET_FAILURE:
            return result + ("连接服务器失败，请检查服务器的IP和端口以及防火墙设置");
        case DS_CPSDK_SERVICE_SEND_SOCKET_FAILURE:
            return result + ("向服务器发送数据失败");
        case DS_CPSDK_SERVICE_READ_SOCKET_FAILURE:
            return result + ("从服务器读取数据失败");
        case DS_CPSDK_PrinterName_IS_NULL:
            return result + ("打印机名称为空");
        case DS_CPSDK_Card_IS_NULL:
            return result + ("图像数据不符合要求");
        case DS_CPSDK_Printer_Is_Not_Ready:
            return  ("发生了如下情况之一：打印机忙、非空、必须清洁、前盖打开、打印机出错、卡盒装卡且卡盒无卡。");
        case DS_CPSDK_Request_NOT_SUPPORT:
            return result + ("系统不支持该请求");
        case DS_CPSDK_HID_NO_FOUND:
            return result + ("找不到HID设备");
        case DS_CPSDK_SERVER_UNKNOWN_ERROR:
            return result + ("在服务器上发生了未知的错误，请查看服务器上的Windows事件日志");
        case DS_CPSDK_SERVER_NOT_IMPLEMENTED:
            return result + ("服务器尚未实现该功能");
        case DS_CPSDK_SERVER_INVALID_FORMAT:
            return result + ("发送到服务器请求未通过服务器的校验");
        case DS_CPSDK_SERVER_PRINTER_NOT_FOUND:
            return result + ("服务器上不存在此名称的打印机");
        case DS_CPSDK_SERVER_JOB_NOT_FOUND:
            return result + ("服务器上没有对应于此ID的打印任务");
        case DS_CPSDK_SERVER_JOB_TERMINATED:
            return result + ("打印任务已被终止");
        case DS_CPSDK_SERVER_JOB_DONE:
            return result + ("打印任务已成功完成");
        case DS_CPSDK_SERVER_JOB_PRINTING:
            return result + ("打印任务已经处于打印中");
        case DS_CPSDK_SERVER_INVALID_PRINTER_NAME:
            return result + ("打印机名称中含有无效字符");
        case DS_CPSDK_SERVER_JOB_ERROR:
            return result + ("打印任务遇到未知错误，请终止或恢复该任务");
        case DS_CPSDK_SERVER_INVALID_MODEL:
            return result + ("打印机型号无效");
        case DS_CPSDK_SERVER_INVALID_CONN_STRING:
            return result + ("无效的打印机连接字符串");
        case DS_CPSDK_SERVER_DUPLICATE_NAME:
            return result + ("打印机配置列表中存在至少一对同名的打印机");
        case DS_CPSDK_SERVER_DUPLICATE_CONN_STRING:
            return result + ("打印机配置列表中存在至少一对连接串相同的打印机");
        case DS_CPSDK_SERVER_PRINTING_LAST_CARD:
            return result + ("正在打印任务中的最后一张卡片，无法暂停或终止");
        case DS_CPSDK_SERVER_COPY_COUNT_ZERO:
            return result + ("提交的打印任务中打印份数为0");
        case DS_CPSDK_SERVER_PRINTER_OFFLINE:
            return result + ("打印机已下线");
        case DS_CPSDK_SERVER_JOB_WAITING:
            return result + ("打印任务已经处于等待执行状态");
        case DS_CPSDK_SERVER_JOB_SUSPENDED:
            return result + ("打印任务已经处于暂停状态");
        case DS_CPSDK_SERVER_PRINTER_IN_USE:
            return result + ("打印机正在使用中");
        case DS_CPSDK_SERVER_PRINTER_QUEUE_FULL:
            return result + ("打印机队列满");
        case STATUS_ERR_TechnicalFault:
            return result + ("技术故障");
        case STATUS_WARNING_No_Warning:
            return result + ("无警告");
        case STATUS_ERR_No_Error:
            return result + ("无错误");
        default:
            return result + "未知状态";
    }
    return result;
}

function parseMainStatus(mainstatus)
{
    var strStatus = "";
    var tempRE = 0;
    switch(mainstatus)
    {
        case STATUS_MAIN_Initializing:
            strStatus = "初始化中";
            break;
        case STATUS_MAIN_PrintReadyOK:
            strStatus = "打印准备OK";
            break;
        case STATUS_MAIN_PrepareReceivePrintData:
            strStatus = "开始接收打印数据";
            break;
        case STATUS_MAIN_InjectingCard:
            strStatus = "进卡中";
            break;
        case STATUS_MAIN_PrintingYellow:
            strStatus = "Yellow打印中";
            break;
        case STATUS_MAIN_PrintingMagenta:
            strStatus = "Magenta打印中";
            break;
        case STATUS_MAIN_PrintingCyan:
            strStatus = "Cyan打印中";
            break;
        case STATUS_MAIN_PrintingBlack:
            strStatus = "Black打印中";
            break;
        case STATUS_MAIN_HeatTransferredPrinting:
            strStatus = "热转印进行中";
            break;
        case STATUS_MAIN_FilpingCard:
            strStatus = "卡片翻转中";
            break;
        case STATUS_MAIN_DecurlingFront:
            strStatus = "正面修正动作中";
            break;
        case STATUS_MAIN_DecurlingBack:
            strStatus = "背面修正动作中";
            break;
        case STATUS_MAIN_EjectingCard:
            strStatus = "排卡中";
            break;
        case STATUS_MAIN_OptionSetupChanged:
            strStatus = "Option设置已变更";
            break;
        case STATUS_MAIN_PrintingTestCard:
            strStatus = "TEST打印中";
            break;
        default:
            strStatus = "未知状态";
    }
    return strStatus;
}

function parseErrStatus(errorstatus)
{
    var strStatus;
    var tempRE = 0;
    switch(errorstatus)
    {
        case STATUS_ERR_No_Error:
            strStatus = "没有错误";
            break;
        case STATUS_ERR_BadRestoreRequirements:
            strStatus = "错误恢复要求";
            break;
        case STATUS_ERR_CoverOpened:
            strStatus = "面盖打开";
            break;
        case STATUS_ERR_CardRunout:
            strStatus = "卡片用完";
            break;
        case STATUS_ERR_RibbonRunout:
            strStatus = "色带用尽";
            break;
        case STATUS_ERR_RibbonRecognizeError:
            strStatus = "色带识别异常";
            break;
        case STATUS_ERR_RibbonScrollError:
            strStatus = "色带卷动异常";
            break;
        case STATUS_ERR_FilmRunout:
            strStatus = "转印膜用完";
            break;
        case STATUS_ERR_FilmRecognizeError:
            strStatus = "转印膜识别异常";
            break;
        case STATUS_ERR_FilmScrollError:
            strStatus = "转印膜卷动异常";
            break;
        case STATUS_ERR_InjectError:
            strStatus = "装卡时出错";
            break;
        case STATUS_ERR_FlippingCardError:
            strStatus = "卡片在翻转器中移动出错";
            break;
        case STATUS_ERR_PrintingMovementError:
            strStatus = "卡片在打印移动过程中出错";
            break;
        case STATUS_ERR_MagcardPrintingMovementError:
            strStatus = "磁卡在打印移动过程中出错";
            break;
        case STATUS_ERR__MagcardWriteError:
            strStatus = "磁卡数据写入时出错";
            break;
        case STATUS_ERR_MagcardReadError:
            strStatus = "磁卡数据读取时出错";
            break;
        case STATUS_ERR_PrintHeadFault:
            strStatus = "打印头出现故障";
            break;
        case STATUS_ERR_PrintRollerFault:
            strStatus = "打印辊出现故障";
            break;
        case STATUS_ERR_FlipDeviceFault:
            strStatus = "翻转器出现故障";
            break;
        case STATUS_ERR_DecurlerFault:
            strStatus = "卡片矫正模块出现故障";
            break;
        case STATUS_ERR_MagcardReaderFault:
            strStatus = "磁卡数据读写器出现故障";
            break;
        case STATUS_ERR_FWUpdateFail:
            strStatus = "FW更新失败";
            break;
        case STATUS_ERR_TechnicalFault:
            strStatus = "技术故障";
            break;
        default:
            strStatus = "未知状态";
    }
    return strStatus;
}

function parseWarningStatus(warningstatus)
{
    var strStatus="";
    var tempRE = 0;
    switch(warningstatus)
    {
        case STATUS_WARNING_No_Warning:
            strStatus = "没有警告";
            break;
        case STATUS_WARNING_PrintRollerTempTooLow:
            strStatus = "打印辊温度过低";
            break;
        case STATUS_WARNING_PrintRollerTempTooHigh:
            strStatus = "打印辊温度过高";
            break;
        case STATUS_WARNING_PrinterInnerTempAbnormal:
            strStatus = "打印机内部温度异常";
            break;
        case STATUS_WARNING_CheckRibbonFilmRequired:
            strStatus = "请检查色带、转印膜";
            break;
        case STATUS_WARNING_RemoveCardFromCardLoaderRequired:
            strStatus = "要求移除装卡器中的卡片";
            break;
        case STAUTS_WARNING_RemoveCardFromFlipDeviceRequired:
            strStatus = "要示移除翻转器中的卡片";
            break;
        case STATUS_WARNING_RemoveCardFromFeederRequired:
            strStatus = "要求移除送卡器中的卡片";
            break;
        case STATUS_WARNING_RemoveCardFromMegcardReaderRequired:
            strStatus = "要求移除磁卡读写器中的卡片";
            break;
        default:
            strStatus = "未知状态";
    }
    return strStatus;
}

function verifyRect()
{
    var xpos = document.getElementById("x_pos");
    var ypos = document.getElementById("y_pos");
    var wid_ = document.getElementById("wid");
    var hei_ = document.getElementById("hei");

    if(!CheckNum(xpos,false) || !CheckNum(ypos,false) || !CheckNum(wid_,false) || !CheckNum(hei_,false))
        return false;
    return true;
}

function CheckNum(obj,needinteger)
{
    var num = obj.value;
    if(num==null || isNaN(num))
        num=obj;
    if( num )
    {
        if( !isNaN( num ) )
        {
            if(parseInt(num)==num)//整数！
                return true;
            else
            {
                if(needinteger)
                    return false;
                else
                    return true;
            }
        }
        else
            return false;
    }
    else
        return false;
}


CDrawCardDialog.prototype.addText = function()
{

    var __this = this;
    return InitIterator(__addText(),arguments[0] == "Get Iterator");
    function* __addText()
    {
        try
        {
            if(!verifyRect())
            {
                output("输入的参数不合法");
                return;
            }
            __this.UpdateViewToData();

            yield* __this.BeginDrawImg("Get Iterator");

            var line = "";

            var fontNameT = __this.m_fontFace;

            line = "设置字体（名称 = " + fontNameT + "，大小 = " + __this.m_fontSize + "）";
            var fontName=fontNameT;
            web_DS600DrawSetFont(fontName, __this.m_fontSize,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功。\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }


            var color = __this.m_fontColor;
            var RGB = [];
            if(color.indexOf('#')>=0)
            {
                //ie8
                var f = color.length==4?true:false;
                var r;
                var g;
                var b;
                if(f)
                {
                    r = color.substr(color.indexOf('#')+1,1);
                    g = color.substr(color.indexOf('#')+2,1);
                    b = color.substr(color.indexOf('#')+3,1);
                }
                else
                {
                    r = color.substr(color.indexOf('#')+1,2);
                    g = color.substr(color.indexOf('#')+3,2);
                    b = color.substr(color.indexOf('#')+5,2);
                }

                RGB = [];
                RGB[0] = parseInt(r,16);
                RGB[1] = parseInt(g,16);
                RGB[2] = parseInt(b,16);
            }
            else
            {
                var _RGB = [];
                color = color.substr(color.indexOf('(')+1,color.indexOf(')') - color.indexOf('(')-1);
                _RGB = color.split(',');
                RGB[0] = parseInt(_RGB[0]);
                RGB[1] = parseInt(_RGB[1]);
                RGB[2] = parseInt(_RGB[2]);
            }
            line+="设置字体颜色为RGB("+RGB[0]+", "+RGB[1]+", "+RGB[2]+")";
            web_DS600DrawSetTextColor(
                RGB[0],
                RGB[1],
                RGB[2],getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功。\r\n";
            }
            else {
                line+="失败："+TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            var delim;
            var attributes = "";
            if (__this.m_bold) {
                attributes = ("粗体");
                delim = ("，");
            }
            if (__this.m_italic) {
                attributes += delim;
                attributes += ("斜体");
                delim = ("，");
            }
            if (__this.m_underline) {
                attributes += delim;
                attributes += ("下划线");
            }
            if (attributes.length==0) {
                attributes = ("正常");
            }
            line+="设置字体修饰（"+attributes+"）";
            web_DS600DrawSetTextDecorate(__this.m_bold, __this.m_italic, __this.m_underline,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            line+="设置打印方向为" +
                (__this.m_verticalText ?"竖排、" :"横排、") +
                (__this.m_reversedTextOrder ? "倒序、" : "顺序、") +
                (__this.m_FeedLine ? "换行" : "截断");
            web_DS600DrawSetTextDirection(!__this.m_verticalText, __this.m_reversedTextOrder,__this.m_FeedLine,__this.m_layDown,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            line+="设置行间距为"+__this.m_LineSpacing+"字间距为"+__this.m_charSpacing;

            web_DS600DrawSetSpacing(__this.m_LineSpacing,__this.m_charSpacing,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            var text = __this.m_txtData;
            line+="添加文本到（X = "+__this.m_coordX+"，Y = "+__this.m_coordY+"，宽 = "+__this.m_width+"，高 = "+__this.m_height+"）";
            web_DS600DrawText(__this.m_coordX, __this.m_coordY, __this.m_width, __this.m_height,text,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode)
            {
                line+="成功";
                __this.m_bHasContent = true;
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
            }
            output(line+"\r\n");
        }
        finally {
            ClearIterator();
        }
    }
}

CDrawCardDialog.prototype.addBarcode = function()
{

    var __this = this;
    return InitIterator(__addBarcode(),arguments[0] == "Get Iterator");
    function* __addBarcode()
    {
        try{
            __this.UpdateViewToData();

            yield* __this.BeginDrawImg("Get Iterator");

            var line = "";

            var fontNameT = __this.m_fontFace;
            if (__this.m_layDown) {
                fontNameT = "@" + fontNameT;
            }

            line = "设置字体（名称 = " + fontNameT + "，大小 = " + __this.m_fontSize + "）";
            var fontName=fontNameT;
            web_DS600DrawSetFont(fontName, __this.m_fontSize, getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功。\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret);
                output(line+"\r\n");
                return;
            }


            var color = __this.m_fontColor;
            var RGB = [];
            if(color.indexOf('#')>=0)
            {
                //ie8
                var f = color.length==4?true:false;
                var r;
                var g;
                var b;
                if(f)
                {
                    r = color.substr(color.indexOf('#')+1,1);
                    g = color.substr(color.indexOf('#')+2,1);
                    b = color.substr(color.indexOf('#')+3,1);
                }
                else
                {
                    r = color.substr(color.indexOf('#')+1,2);
                    g = color.substr(color.indexOf('#')+3,2);
                    b = color.substr(color.indexOf('#')+5,2);
                }

                RGB = [];
                RGB[0] = parseInt(r,16);
                RGB[1] = parseInt(g,16);
                RGB[2] = parseInt(b,16);
            }
            else
            {
                var _RGB = [];
                color = color.substr(color.indexOf('(')+1,color.indexOf(')') - color.indexOf('(')-1);
                _RGB = color.split(',');
                RGB[0] = parseInt(_RGB[0]);
                RGB[1] = parseInt(_RGB[1]);
                RGB[2] = parseInt(_RGB[2]);
            }

            line+="设置字体颜色为RGB("+RGB[0]+", "+RGB[1]+", "+RGB[2]+")";

            web_DS600DrawSetTextColor(
                RGB[0],
                RGB[1],
                RGB[2],getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功。\r\n";
            }
            else {
                line+="失败："+TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            var delim;
            var attributes = "";
            if (__this.m_bold) {
                attributes = ("粗体");
                delim = ("，");
            }
            if (__this.m_italic) {
                attributes += delim;
                attributes += ("斜体");
                delim = ("，");
            }
            if (__this.m_underline) {
                attributes += delim;
                attributes += ("下划线");
            }
            if (attributes.length==0) {
                attributes = ("正常");
            }
            line+="设置字体修饰（"+attributes+"）";
            web_DS600DrawSetTextDecorate(__this.m_bold, __this.m_italic, __this.m_underline,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }


            color = __this.m_barcodeColor;
            var RGB = [];
            if(color.indexOf('#')>=0)
            {
                //ie8
                var f = color.length==4?true:false;
                var r;
                var g;
                var b;
                if(f)
                {
                    r = color.substr(color.indexOf('#')+1,1);
                    g = color.substr(color.indexOf('#')+2,1);
                    b = color.substr(color.indexOf('#')+3,1);
                }
                else
                {
                    r = color.substr(color.indexOf('#')+1,2);
                    g = color.substr(color.indexOf('#')+3,2);
                    b = color.substr(color.indexOf('#')+5,2);
                }

                RGB = [];
                RGB[0] = parseInt(r,16);
                RGB[1] = parseInt(g,16);
                RGB[2] = parseInt(b,16);
            }
            else
            {
                var _RGB = [];
                color = color.substr(color.indexOf('(')+1,color.indexOf(')') - color.indexOf('(')-1);
                _RGB = color.split(',');
                RGB[0] = parseInt(_RGB[0]);
                RGB[1] = parseInt(_RGB[1]);
                RGB[2] = parseInt(_RGB[2]);
            }
            line+="设置条码/二维码颜色为RGB("+RGB[0]+", "+RGB[1]+", "+RGB[2]+")";
            web_DS600DrawSetBarCodeColor(RGB[0],RGB[1],RGB[2],getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功。\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            var data = __this.m_txtData;
            line+=("添加条形码到（X = "+__this.m_coordX+"，Y = "+__this.m_coordY+"，宽 = "+__this.m_width+"，高 = "+__this.m_height+"）");

            web_DS600DrawBarCode(__this.m_coordX, __this.m_coordY, __this.m_width, __this.m_height
                ,data,__this.m_barcodeType, __this.m_barcodeReadableLabel,
                !__this.m_barcodeLabelAsHeader, __this.m_barcodeScale ,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功";
                __this.m_bHasContent = true;
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
            }
            output(line+"\r\n");
        }
        finally {
            ClearIterator();
        }
    }
}

CDrawCardDialog.prototype.addQR = function()
{

    var __this = this;
    return InitIterator(__addQR(),arguments[0] == "Get Iterator");
    function* __addQR()
    {
        try{
            var line = "";
            __this.UpdateViewToData();

            yield* __this.BeginDrawImg("Get Iterator");

            color = __this.m_barcodeColor;
            var RGB = [];
            if(color.indexOf('#')>=0)
            {
                //ie8
                var f = color.length==4?true:false;
                var r;
                var g;
                var b;
                if(f)
                {
                    r = color.substr(color.indexOf('#')+1,1);
                    g = color.substr(color.indexOf('#')+2,1);
                    b = color.substr(color.indexOf('#')+3,1);
                }
                else
                {
                    r = color.substr(color.indexOf('#')+1,2);
                    g = color.substr(color.indexOf('#')+3,2);
                    b = color.substr(color.indexOf('#')+5,2);
                }

                RGB = [];
                RGB[0] = parseInt(r,16);
                RGB[1] = parseInt(g,16);
                RGB[2] = parseInt(b,16);
            }
            else
            {
                var _RGB = [];
                color = color.substr(color.indexOf('(')+1,color.indexOf(')') - color.indexOf('(')-1);
                _RGB = color.split(',');
                RGB[0] = parseInt(_RGB[0]);
                RGB[1] = parseInt(_RGB[1]);
                RGB[2] = parseInt(_RGB[2]);
            }
            line+="设置条码/二维码颜色为RGB("+RGB[0]+", "+RGB[1]+", "+RGB[2]+")";
            web_DS600DrawSetBarCodeColor(RGB[0],RGB[1],RGB[2],getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功。\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
                output(line+"\r\n");
                return;
            }

            var data = __this.m_txtData;
            line+="添加QR码到（X = "+__this.m_coordX+"，Y = "+__this.m_coordY+"，宽 = "+__this.m_width+"，高 = "+__this.m_height+"）";
            web_DS600DrawQR(__this.m_coordX, __this.m_coordY, __this.m_width, __this.m_height,
                __this.m_txtData,
                __this.m_qrReliability,
                true,getres);
            ret = yield;
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                line+="成功";
                __this.m_bHasContent = true;
            }
            else {
                line+="失败："+TranslateErrorCode(ret.RtnCode);
            }
            output(line+"\r\n");
        }
        finally {
            ClearIterator();
        }
    }
}
CDrawCardDialog.prototype.addImg = function()
{

    var __this = this;
    return InitIterator(__addImg(),arguments[0] == "Get Iterator");
    function* __addImg()
    {
        try{
            __this.UpdateViewToData();

            yield* __this.BeginDrawImg("Get Iterator");


            var line = "";

            if (__this.m_imagePath=="")
            {
                line = "请先选好要添加的图片";
                output(line);
                return;
            }
            web_DS600DrawImage(__this.m_coordX, __this.m_coordY, __this.m_width, __this.m_height,
                __this.m_imagePath, (__this.m_whiteAsTransparent ? false : true),getres);
            ret = yield;
            line+=("添加图片（X = "+__this.m_coordX+"，Y = "+__this.m_coordY+"，宽 = "+__this.m_width+"，高 = "+__this.m_height+"）");
            if (typeof(ret) != "undefined" && 0 == ret.RtnCode) {
                __this.m_bHasContent = true;
                line+="成功。\r\n";
            }
            else {
                line+="失败：" + TranslateErrorCode(ret.RtnCode);
            }
            output(line+"\r\n");
        }
        finally {
            ClearIterator();
        }
    }
}
CDrawCardDialog.prototype.cancelAct = function()
{

    var __this = this;
    return InitIterator(__cancelAct(),arguments[0] == "Get Iterator");
    function* __cancelAct()
    {
        try
        {
            web_DS600DrawClear(getres);
            var ret = yield;
            if(ret.RtnCode == 0)
            {
                dsdrawPrint.outerHTML = "<button id='dsdrawPrint' onclick='drawDialog.printimage()'>打印</button>";
                dualSideDraw.removeAttribute("disabled");
                dualSideDraw.checked = false;
                dsdrawPrintDir.removeAttribute("disabled");
                output("已取消绘图，请重新添加元素");
            }
        }finally
        {
            ClearIterator();
        }
    }
}
var dirArr = new Array([0,0]);
CDrawCardDialog.prototype.printimage = function()
{

    var __this = this;
    return InitIterator(__printimage(),arguments[0] == "Get Iterator");
    function* __printimage()
    {
        try
        {
            var line = "";
            var ret;
            __this.UpdateViewToData();
            if (!__this.m_bHasContent) {
                output("没有绘制任何内容，请先绘制内容。");
                return;
            }

            dsdrawPrintDir.removeAttribute("disabled");

            __this.m_bHasContent = false;

            m_dualSided = dualSideDraw.checked;

            if(m_dualSided)
            {
                if(__this.m_imgIndex==0)
                {
                    dualSideDraw.disabled = "disabled";
                    dsdrawPrint.outerHTML = "<button id='dsdrawPrint' onclick='drawDialog.printimage()'>打印</button>";

                    var pImg="";
                    web_DS600EndDraw("F",getres);
                    ret = yield;
                    var obj = ret;
                    if(typeof(obj) != "undefined" && obj.RtnCode != 0)
                    {
                        output(("生成图片失败：") + TranslateErrorCode(obj.RtnCode));
                        return;
                    }
                    pImg = obj.imgPath;
                    dirArr [0] = __this.m_drawAngle;
                    var fileName=pImg;
                    __this.m_frontImgPath = pImg;

                    output("生成图片成功:"+fileName);
                    __this.m_imgIndex++;
                }
                else
                {
                    dualSideDraw.removeAttribute("disabled");
                    dsdrawPrint.outerHTML = "<button id='dsdrawPrint' onclick='drawDialog.printimage()'>生成正面图像</button>";

                    var pImg="";
                    web_DS600EndDraw("B",getres);
                    ret = yield;
                    var obj = ret;
                    if(typeof(obj) != "undefined" && obj.RtnCode != 0)
                    {
                        output(("生成临时图片文件失败：") + TranslateErrorCode(obj.RtnCode));
                        return;
                    }
                    pImg = obj.imgPath;
                    dirArr [1] = __this.m_drawAngle;
                    var fileName = pImg;

                    m_backImgPath = pImg;
                    output("生成图片成功:"+m_backImgPath);
                    if(!__this.printToImg2)
                    {
                        web_DS600PrintImage(__this.m_frontImgPath,m_backImgPath,dirArr[0]==1?1:0,dirArr[1]==1?1:0,0,0,0,0,false,getres);
                        ret = yield;
                        if(ret.RtnCode !=0)
                            output("打印失败" + TranslateErrorCode(ret.RtnCode));
                    }
                    __this.m_frontImgPath = __this.m_backImgPath ="";
                    __this.m_imgIndex = 0;
                }
            }
            else
            {
                var pImg="";
                web_DS600EndDraw("",getres);
                ret = yield;
                var obj = ret;//由传出的字串转为JSON对象
                if(obj.RtnCode != 0)
                {
                    output(("生成临时图片文件失败：") + TranslateErrorCode(obj.RtnCode));
                    return;
                }
                output("生成图片成功:"+obj.imgPath);
                pImg = obj.imgPath;
                if(!__this.printToImg2)
                {
                    web_DS600PrintImage(pImg,"",__this.m_drawAngle==1?1:0,0,0,0,0,0,false,getres);
                    ret = yield;
                    if(ret.RtnCode !=0)
                        output("打印失败" + TranslateErrorCode(ret.RtnCode));
                }
            }
        }
        finally {
            ClearIterator();
        }
    }
}

CDrawCardDialog.prototype.isPrintToImg = function(status)
{
    this.printToImg2 = status;
}

CDrawCardDialog.prototype.switchMode = function(status)
{
    if(status)
    {
        if(this.m_imgIndex==0)
        {
            //dsdrawPrint").prop("outerHTML","<button id='dsdrawPrint' onclick='drawDialog.printimage()'>生成正面图像</button>");
            document.getElementById("dsdrawPrint").outerHTML = "<button id='dsdrawPrint' onclick='drawDialog.printimage()'>绘制正面图像</button>";
        }
        else
        {
            //dsdrawPrint").prop("outerHTML","<button id='dsdrawPrint' onclick='drawDialog.printimage()'>打印</button>");
            document.getElementById("dsdrawPrint").outerHTML = "<button id='dsdrawPrint' onclick='drawDialog.printimage()'>打印</button>";
        }
    }
    else
    {
        dsdrawPrint.outerHTML = "<button id='dsdrawPrint' onclick='drawDialog.printimage()'>打印</button>";
    }
    dummyBtn.click;
}

var drawDialog = new CDrawCardDialog();


function getWarningStatus()
{

    var __this = this;
    return InitIterator(__getWarningStatus(),arguments[0] == "Get Iterator");
    function* __getWarningStatus()
    {
        try{
            //&shellTemp,&headTemp,&heaterTemp,&mainStatus,&subStatus,&errorStatus,&warningStatus
            web_DS600GetPrinterStatus(getres);
            var ret = yield;
            if(ret.RtnCode != 0)
            {
                output("获取状态失败");
                return;
            }
            output("内部温度："+ret.shellTemp);
            output("打印头温度："+ret.headTemp);
            output("发热辊温度："+ret.heaterTemp);
            output("主状态："+parseMainStatus(ret.mainStatus));
            output("错误状态："+parseErrStatus(ret.errorStatus));
            output("警告状态："+parseWarningStatus(ret.warningStatus));
        }
        finally{
            ClearIterator();
        }
    }
}

function getRibbonStatus()
{

    var __this = this;
    return InitIterator(__getRibbonStatus(),arguments[0] == "Get Iterator");
    function* __getRibbonStatus()
    {
        try{
            //"{\"RtnCode\":0,\"RibbonType\":%u,\"FilmType\":%u,\"RibbonNearEnd\":%d,\"FilmNearEnd\":%d}"
            web_DS600GetRibbonSetup(getres);
            var ret = yield;
            if(ret.RtnCode != 0)
            {
                output("获取状态失败");
                return;
            }
            output("色带类型："+ret.RibbonType);
            output("转印膜类型："+ret.FilmType);
            output("色带将尽阈值："+ret.RibbonNearEnd);
            output("转印膜将尽阈值："+ret.FilmNearEnd);
        }
        finally{
            ClearIterator();
        }
    }
}

function getPrinterSerialNumber()
{

    var __this = this;
    return InitIterator(__getPrinterSerialNumber(),arguments[0] == "Get Iterator");
    function* __getPrinterSerialNumber()
    {
        try{
            //"{\"RtnCode\":0,\"RibbonType\":%u,\"FilmType\":%u,\"RibbonNearEnd\":%d,\"FilmNearEnd\":%d}"
            web_DS600GetPrinterInformation(getres);
            var ret = yield;
            if(ret.RtnCode != 0)
            {
                output("获取状态失败");
                return;
            }
            output("打印机序列号："+ret.printerSerialNumber);
        }
        finally{
            ClearIterator();
        }
    }
}

function printImage()
{

    var __this = this;
    return InitIterator(__printImage(),arguments[0] == "Get Iterator");
    function* __printImage()
    {
        try{
            var pt2img = printImage.checked;
            web_DS600PrintImage(picpath_f.value,picpath_b.value,0,0,0,0,0,0,prttoimg2.checked,getres);
            var res = yield;
            if(typeof(res) != "undefined" && res.RtnCode == 0)
            {
                output("打印成功");
                if(prttoimg2.checked)
                {
                    output("图片："+res.imgpath);
                }
            }
            else
            {
                output("打印失败");
            }
        }
        finally
        {
            ClearIterator();
        }
    }
}

function settimeout(v)
{

    return InitIterator(__settimeout(),arguments[0] == "Get Iterator");
    function* __settimeout()
    {
        try{
            if(false == CheckNum(v,true))
            {
                output("输入参数无效");
                return;
            }
            web_DS600SetIOTimeout(v,v,getres);
            var res = yield;
            if(typeof(res) != "undefined" && res.RtnCode == 0)
            {
                output("设置超时成功");
            }
            else
            {
                output("设置超时失败");
            }
        }
        finally
        {
            ClearIterator();
        }
    }
}

function getImgURL(node) {

    var imgURL = "";
    try{
        var file = null;
        if(node.files && node.files[0] ){
            file = node.files[0];
        }else if(node.files && node.files.item(0)) {
            file = node.files.item(0);
        }
        //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
        try{
            //Firefox7.0
            imgURL =  file.getAsDataURL();
            //alert("//Firefox7.0"+imgRUL);
        }catch(e){
            //Firefox8.0以上
            imgURL = window.URL.createObjectURL(file);
            //alert("//Firefox8.0以上"+imgRUL);
        }
    }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常
        //支持html5的浏览器,比如高版本的firefox、chrome、ie10
        if (node.files && node.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                imgURL = e.target.result;
            };
            reader.readAsDataURL(node.files[0]);
        }
    }
    return imgURL;
}


printHandler()
function printHandler(){

    var f_url = 'blob:http://localhost:63342/953a082f-ace1-4256-83ae-0bedc942b2e4';
    $('#picpath_f').val(f_url)

    var $printContainer = $('.print_container');

    $printContainer.delegate(':button','click', function () {
        var $this  = $(this),judgeId = $this.attr('id');

        console.log(judgeId)

        switch(judgeId){
            case 'enumeration': enumprinter() ;break;
            case 'open': openprinter(); break;
            case 'close':closeprinter(); break;
            case 'printImg':printImage();break;
            case 'clrbox':output('clr');break;
            case 'default': break;
        }

    })

   $('.fa-window-close').on('click', function () {
       $printContainer.hide();
   })
    $('.fa-print').on('click', function () {
        $printContainer.show();
    })


}
