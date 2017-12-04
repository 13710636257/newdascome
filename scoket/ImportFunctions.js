document.write("<script language=javascript src='../scoket/DSWebsocketEngine.js'></script>");

function web_DS600ConnectionCheck()	{ConnectionTest();Invoke(arguments);}
function web_DS600InitService()		{InitService("127.0.0.1:6688");}
function web_DS600EnumPrinter( printerType){Invoke(arguments);}
function web_DS600GetPrinterListItem( printerList,  index){Invoke(arguments);}
function web_DS600OpenPrinter( Curprinter){Invoke(arguments);}
function web_DS600ClosePrinter(){Invoke(arguments);}
function web_DS600IsPrinterOpened(){Invoke(arguments);}
function web_DS600PrintImage( FrontSideImagePath,  backSideImagePath,   F_rotation,  B_rotation,  F_scalingmode,  B_scalingmode,  F_colormode,  B_colormode, printToImg){Invoke(arguments);}
function web_DS600AbortPrinting(){Invoke(arguments);}
function web_DS600PrintTestCard(){Invoke(arguments);}
function web_DS600GetInjectPosition(){Invoke(arguments);}
function web_DS600SetInjectPosition( cardType){Invoke(arguments);}
function web_DS600GetEjectPosition( cardType){Invoke(arguments);}
function web_DS600SetEjectPosition( cardType,  position){Invoke(arguments);}
function web_DS600GetPrinterStatus(){Invoke(arguments);}
function web_DS600GetPrinterInformation(){Invoke(arguments);}
function web_DS600GetRibbonFilmSurplus(){Invoke(arguments);}
function web_DS600GetHeadPrintFacesNumber(){Invoke(arguments);}
function web_DS600SetCardType( cardType){Invoke(arguments);}
function web_DS600DecurlCard( DecurlSide,  DecurlTime){Invoke(arguments);}
function web_DS600SetRibbonType( ribbonType){Invoke(arguments);}
function web_DS600GetFilmType( filmType){Invoke(arguments);}
function web_DS600RibbonThreshold( threshold){Invoke(arguments);}
function web_DS600FilmThreshold( threshold){Invoke(arguments);}
function web_DS600Buzzer(buzzer){Invoke(arguments);}
function web_DS600PowerSaveMode(powerSave,  powerSaveTime){Invoke(arguments);}
function web_DS600DirectIO( cmdToBeSend, recvDataLen){Invoke(arguments);}
function web_DS600SetIOTimeout( readTimeout,  writeTimeout){Invoke(arguments);}
function web_DS600DrawSetCardRect( cardWidth,  cardHeight){Invoke(arguments);}
function web_DS600BeginDraw(){Invoke(arguments);}
function web_DS600EndDraw( tagName){Invoke(arguments);}
function web_DS600DrawText( ox,  oy,  w,  h,  data){Invoke(arguments);}
function web_DS600DrawSetFont( fontName,  size){Invoke(arguments);}
function web_DS600DrawSetTextColor( R,  G,  B){Invoke(arguments);}
function web_DS600DrawSetTextDecorate(isStrong, isItalic, isUnderline){Invoke(arguments);}
function web_DS600DrawSetTextDirection(isLandScape, isReverseSequence, isAutoLineFeed, isLayDown){Invoke(arguments);}
function web_DS600DrawSetSpacing( lineSpacing,  charSpacing){Invoke(arguments);}
function web_DS600DrawBarCode( ox,  oy,  w,  h,  data,  barcodeType, isText, isUnderText,  barcodeMultiplier){Invoke(arguments);}
function web_DS600DrawQR( ox,  oy,  w,  h,  data,  errLev, isAutoFill){Invoke(arguments);}
function web_DS600DrawSetBarCodeColor( R,  G,  B){Invoke(arguments);}
function web_DS600DrawImage( ox,  oy,  w,  h,  imagefile, isPhoto){Invoke(arguments);}
function web_DS600DrawClear(){Invoke(arguments);}
function web_DS600DrawInSession(){Invoke(arguments);}
function web_DS600LogEnableLog( mode,  enableLog){Invoke(arguments);}
function web_DS600LogDirectory( mode,  path){Invoke(arguments);}
function web_DS600LogRetentionTime( mode,  days){Invoke(arguments);}
function web_DS600GetCardEjectSide(){Invoke(arguments);}
function web_DS600SetCardEjectSide( ejectSide){Invoke(arguments);}
function web_DS600UpdateHeaterSetupAll( strHeaterSetup){Invoke(arguments);}
function web_DS600EndDrawTag( tagName){Invoke(arguments);}
function web_DS600UdpConfig(ucFlags, usHTTPServerPort,  ulStaticIP,  ulGatewayIP,  ulSubnetMask,  ucModName,  username,  password, uiId,  UcUserMAC, ulTelnetTimeout, usTelnetLocalPort){Invoke(arguments);}
function web_DS600GetEthernetPar(){Invoke(arguments);}
function web_DS600UpdateEthernetPar(ucFlags, usHTTPServerPort,  ulStaticIP,  ulGatewayIP,  ulSubnetMask,  ucModName,  username,  password, uiId,  UcUserMAC, ulTelnetTimeout, usTelnetLocalPort, ulDeviceId){Invoke(arguments);}
function web_DS600ResetEthernetPar(){Invoke(arguments);}
function web_DS600GetPreviewPicture(){Invoke(arguments);}
function web_DS600GetRibbonSetup(){Invoke(arguments);}