function MAKE_STATUS(a,b,c,d)
{
	return (((a)|(b<<8)|(c<<16)|(d<<24)));
}
//主状态
//初始化中
var STATUS_MAIN_Initializing = MAKE_STATUS(0x4d,0x00,0x01,0x01);
//打印准备OK
var STATUS_MAIN_PrintReadyOK  = MAKE_STATUS(0x4d,0x00,0x02,0x01);
//开始接收打印数据 
var STATUS_MAIN_PrepareReceivePrintData  = MAKE_STATUS(0x4d,0x00,0x03,0x01);
//进卡中
var STATUS_MAIN_InjectingCard  = MAKE_STATUS(0x4d,0x00,0x04,0x01);
//Yellow打印中
var STATUS_MAIN_PrintingYellow  = MAKE_STATUS(0x4d,0x00,0x05,0x01);
//Magenta打印中
var STATUS_MAIN_PrintingMagenta  = MAKE_STATUS(0x4d,0x00,0x05,0x02);
//Cyan打印中
var STATUS_MAIN_PrintingCyan  = MAKE_STATUS(0x4d,0x00,0x05,0x03);
//Black打印中
var STATUS_MAIN_PrintingBlack  = MAKE_STATUS(0x4d,0x00,0x05,0x04);
//热转印进行中
var STATUS_MAIN_HeatTransferredPrinting  = MAKE_STATUS(0x4d,0x00,0x06,0x01);
//卡片翻转中
var STATUS_MAIN_FilpingCard  = MAKE_STATUS(0x4d,0x00,0x07,0x01);
//正面修正动作中
var STATUS_MAIN_DecurlingFront  = MAKE_STATUS(0x4d, 0x00, 0x08, 0x01);
//背面修正动作中
var STATUS_MAIN_DecurlingBack  = MAKE_STATUS(0x4d,0x00,0x08,0x02);
//排卡中
var STATUS_MAIN_EjectingCard  = MAKE_STATUS(0x4d ,0x00, 0x09, 0x01);
//Option设置变化
var STATUS_MAIN_OptionSetupChanged  = MAKE_STATUS(0x4d, 0x10 ,0x00, 0x00);
//TEST打印中
var STATUS_MAIN_PrintingTestCard  = MAKE_STATUS(0x4d, 0x10 ,0x01 ,0x01);

//子状态（保留）


//错误状态
//无错误
var STATUS_ERR_No_Error = MAKE_STATUS(0x45, 0x00, 0x00, 0x00);
//错误恢复要求
var STATUS_ERR_BadRestoreRequirements = MAKE_STATUS(0x45, 0x00, 0x00, 0x01);
//面盖打开中
var STATUS_ERR_CoverOpened = MAKE_STATUS(0x45, 0x00, 0x01, 0x01);
//卡片用完
var STATUS_ERR_CardRunout = MAKE_STATUS(0x45, 0x00, 0x02, 0x01);
//色带用尽
var STATUS_ERR_RibbonRunout = MAKE_STATUS(0x45, 0x00, 0x03, 0x01);
//色带识别异常
var STATUS_ERR_RibbonRecognizeError = MAKE_STATUS(0x45, 0x00, 0x03, 0x02);
//色带卷动异常
var STATUS_ERR_RibbonScrollError = MAKE_STATUS(0x45, 0x00, 0x03, 0x03);
//转印膜用完
var STATUS_ERR_FilmRunout = MAKE_STATUS(0x45, 0x00, 0x04, 0x01);
//转印膜识别异常
var STATUS_ERR_FilmRecognizeError = MAKE_STATUS(0x45, 0x00, 0x04, 0x02);
//转印膜卷动异常
var STATUS_ERR_FilmScrollError = MAKE_STATUS(0x45, 0x00, 0x04, 0x03);
//装卡时出错
var STATUS_ERR_InjectError = MAKE_STATUS(0x45, 0x00, 0x05, 0x01);
//卡片在翻转器中移动出错
var STATUS_ERR_FlippingCardError = MAKE_STATUS(0x45, 0x00, 0x05, 0x02);
//卡片在打印移动过程中出错
var STATUS_ERR_PrintingMovementError = MAKE_STATUS(0x45, 0x00, 0x05, 0x03);
//磁卡在打印移动过程中出错
var STATUS_ERR_MagcardPrintingMovementError = MAKE_STATUS(0x45, 0x00, 0x05, 0x04);
//磁卡数据写入时出错
var STATUS_ERR__MagcardWriteError = MAKE_STATUS(0x45, 0x00, 0x06, 0x01);
//磁卡数据读取时出错
var STATUS_ERR_MagcardReadError = MAKE_STATUS(0x45, 0x00, 0x06, 0x02);
//打印头出现故障
var STATUS_ERR_PrintHeadFault = MAKE_STATUS(0x45, 0x00, 0x80, 0x01);
//打印辊出现故障
var STATUS_ERR_PrintRollerFault = MAKE_STATUS(0x45, 0x00, 0x80, 0x02);
//翻转器出现故障
var STATUS_ERR_FlipDeviceFault = MAKE_STATUS(0x45, 0x00, 0x80, 0x03);
//卡片矫正模块出现故障
var STATUS_ERR_DecurlerFault = MAKE_STATUS(0x45, 0x00, 0x80, 0x04);
//磁卡数据读写器出现故障
var STATUS_ERR_MagcardReaderFault = MAKE_STATUS(0x45, 0x00, 0x80, 0x05);
//FW更新失败
var STATUS_ERR_FWUpdateFail = MAKE_STATUS(0x45, 0x10, 0x01, 0x01);
//技术故障
var STATUS_ERR_TechnicalFault = MAKE_STATUS(0x45, 0x80, 0x01, 0x01);

//警告状态
//无警告
var STATUS_WARNING_No_Warning = MAKE_STATUS(0x57,0,0,0);
//打印辊温度过低
var STATUS_WARNING_PrintRollerTempTooLow = MAKE_STATUS(0x57, 0x00, 0x01, 0x01);
//打印辊 温度过高
var STATUS_WARNING_PrintRollerTempTooHigh = MAKE_STATUS(0x57, 0x00, 0x02, 0x01);
//打印机内部温度异常
var STATUS_WARNING_PrinterInnerTempAbnormal = MAKE_STATUS(0x57, 0x00, 0x02, 0x02);
//请检查色带、转印膜
var STATUS_WARNING_CheckRibbonFilmRequired = MAKE_STATUS(0x57, 0x00, 0x03, 0x01);
//要求移除装卡器中的卡片
var STATUS_WARNING_RemoveCardFromCardLoaderRequired = MAKE_STATUS(0x57, 0x00, 0x04 ,0x01);
//要示移除翻转器中的卡片
var STAUTS_WARNING_RemoveCardFromFlipDeviceRequired = MAKE_STATUS(0x57, 0x00, 0x04, 0x02);
//要求移除送卡器中的卡片
var STATUS_WARNING_RemoveCardFromFeederRequired = MAKE_STATUS(0x57 ,0x00 ,0x04 ,0x03);
//要求移除磁卡读写器中的卡片
var STATUS_WARNING_RemoveCardFromMegcardReaderRequired = MAKE_STATUS(0x57 ,0x00, 0x04, 0x04);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//var DS_CPSDK_INVALID_ARG                    = 0x10000000;