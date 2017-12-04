var DS_CPSDK_OK                             = 0;// Error Code is a 32 bit unsigned number

// Highest 4 bits of the error code serve as error category
var DS_CPSDK_INVALID_ARG                    = 0x10000000;
var DS_CPSDK_INVALID_ARG_BUFFER_TOO_LOW     = 0x10000001;
var DS_CPSDK_INVALID_ARG_IS_NULL            = 0x10000002;
var DS_CPSDK_INVALID_ARG_FORMAT_ERROR       = 0x10000003;
var DS_CPSDK_INVALID_ARG_LENGTH_ERROR       = 0x10000004;
var DS_CPSDK_INVALID_ARG_NOT_SUPPORT        = 0x10000005;

var DS_CPSDK_INVALID_ARG_OUT_OF_RANGE       = 0x10000006;
var DS_CPSDK_INVALID_ARG_OUT_OF_HEADERSIZE  = 0x10000007;
var DS_CPSDK_INVALID_ARG_TOO_LONG           = 0x10000008;
var DS_CPSDK_INVALID_ARG_CONFIG_NULL        = 0x10000009;
var DS_CPSDK_INVALID_ARG_BUFFER_TOO_BIG     = 0x1000000a;
var DS_CPSDK_INVALID_ARG_SEQUENCE_ERROR     = 0x1000000B;
var DS_CPSDK_INVALID_ARG_FILE_NO_FOUND      = 0x1000000c;

var DS_CPSDK_CLIENT_ERROR                   = 0x20000000;

var DS_CPSDK_CLIENT_MALLOC_FAILURE0          = 0x28000000;
var DS_CPSDK_CLIENT_MALLOC_FAILURE1          = 0x28000001;
var DS_CPSDK_CLIENT_MALLOC_FAILURE2          = 0x28000002;
var DS_CPSDK_CLIENT_MALLOC_FAILURE3          = 0x28000003;
var DS_CPSDK_CLIENT_MALLOC_FAILURE4          = 0x28000004;
var DS_CPSDK_CLIENT_TLS_OUT_OF_INDEXES       = 0x28000005;
var DS_CPSDK_CLIENT_MAC_ERROR                = 0x28000006;
var DS_CPSDK_CLIENT_JOB_NULL                 = 0x28000007;

var DS_CPSDK_TCP_CREATE_SOCKET_FAILURE       = 0x28000008;
var DS_CPSDK_TCP_CONNECT_SOCKET_FAILURE      = 0x28000009;
var DS_CPSDK_TCP_SEND_SOCKET_FAILURE         = 0x28000010;
var DS_CPSDK_TCP_READ_SOCKET_FAILURE         = 0x28000011;

var DS_CPSDK_USB_CreateFile_FAILURE          = 0x28000012;
var DS_CPSDK_USB_WriteFile_FAILURE           = 0x28000013;

var DS_CPSDK_SERVICE_CREATE_SOCKET_FAILURE       = 0x28000015;
var DS_CPSDK_SERVICE_CONNECT_SOCKET_FAILURE      = 0x28000016;
var DS_CPSDK_SERVICE_SEND_SOCKET_FAILURE         = 0x28000017;
var DS_CPSDK_SERVICE_READ_SOCKET_FAILURE         = 0x28000018;

var DS_CPSDK_PrinterName_IS_NULL                 = 0x28000019;
var DS_CPSDK_Card_IS_NULL                        = 0x2800001a;
var DS_CPSDK_USB_VENDER_Request_Failure          = 0x2800001b;
var DS_CPSDK_Printer_Is_Not_Ready                = 0x2800001c;
var DS_CPSDK_Request_NOT_SUPPORT                 = 0x2800001d;
var DS_CPSDK_Printer_Is_Not_Empty                = 0x2800001e;
var DS_CPSDK_UDP_Request_Failure                 = 0x2800001F;
var DS_CPSDK_UDP_Request_TIMEOUT                 = 0x28000020;
var DS_CPSDK_HID_NO_FOUND                        = 0x28000021;
var DS_CPSDK_Printer_NO_Response                 = 0x28000022;


var DS_CPSDK_GDI_ERROR                           = 0x27000000;
var DS_CPSDK_GDI_Init_Failure                    = 0x27000001;
var DS_CPSDK_GDI_CollisionDetect_Failure         = 0x27000002;
var DS_CPSDK_GDI_QR_Build_Error                  = 0x27000003;
var DS_CPSDK_GDI_CardSize_NOT_SUPPORT            = 0x27000004;
var DS_CPSDK_GDI_CardType_NOT_SUPPORT            = 0x27000005;
var DS_CPSDK_GDI_CardSize_Already_Set            = 0x27000006;
var DS_CPSDK_GDI_OUT_OF_RECT                     = 0x27000007;


var DS_CPSDK_SERVER_ERROR                        = 0x30000000;

// You must first ensure x != DS_CPSDK_OK before using these macros
// If you can be sure it is wrong by looking at client parameters then
// it's an invalid argument error.
// Otherwise, if the function fail before it tries to contact the server,
// or after the server returned a success response, it's a client error.
// Specifically, if client fails to connect the server, it is a client
// error.
// All other errors are surely server errors.
function DS_CPSDK_IS_INVALID_ARG(x)  {return ((x &= 0xF0000000) == 0x10000000);}
function DS_CPSDK_IS_CLIENT_ERROR(x) {return ((x &= 0xF0000000) == 0x20000000);}
function DS_CPSDK_IS_SERVER_ERROR(x) {return ((x &= 0xF0000000) == 0x30000000);}

// All specific error codes are defined relative to their category code
var DS_CPSDK_BUFFER_INVALID     = (DS_CPSDK_INVALID_ARG  + (1 & 0x0FFFFFFF));

var DS_CPSDK_CANT_CONNECT       = (DS_CPSDK_CLIENT_ERROR + (1 & 0x0FFFFFFF));

var DS_CPSDK_NO_RESPONSE        = (DS_CPSDK_SERVER_ERROR + (1 & 0x0FFFFFFF));

// You can furthur divide your category into sub categories.
// server errors
var DS_CPSDK_SERVER_UNKNOWN_ERROR         = (DS_CPSDK_SERVER_ERROR += 0x00);
var DS_CPSDK_SERVER_NOT_IMPLEMENTED       = (DS_CPSDK_SERVER_ERROR += 0x01);
var DS_CPSDK_SERVER_INVALID_FORMAT        = (DS_CPSDK_SERVER_ERROR += 0x02);
var DS_CPSDK_SERVER_PRINTER_NOT_FOUND     = (DS_CPSDK_SERVER_ERROR += 0x03);
var DS_CPSDK_SERVER_JOB_NOT_FOUND         = (DS_CPSDK_SERVER_ERROR += 0x04);
var DS_CPSDK_SERVER_JOB_TERMINATED        = (DS_CPSDK_SERVER_ERROR += 0x05);
var DS_CPSDK_SERVER_JOB_DONE              = (DS_CPSDK_SERVER_ERROR += 0x06);
var DS_CPSDK_SERVER_JOB_PRINTING          = (DS_CPSDK_SERVER_ERROR += 0x07);
var DS_CPSDK_SERVER_INVALID_PRINTER_NAME  = (DS_CPSDK_SERVER_ERROR += 0x08);
var DS_CPSDK_SERVER_JOB_ERROR             = (DS_CPSDK_SERVER_ERROR += 0x09);
var DS_CPSDK_SERVER_INVALID_MODEL         = (DS_CPSDK_SERVER_ERROR += 0x0A);
var DS_CPSDK_SERVER_INVALID_CONN_STRING   = (DS_CPSDK_SERVER_ERROR += 0x0B);
var DS_CPSDK_SERVER_DUPLICATE_NAME        = (DS_CPSDK_SERVER_ERROR += 0x0C);
var DS_CPSDK_SERVER_DUPLICATE_CONN_STRING = (DS_CPSDK_SERVER_ERROR += 0x0D);
var DS_CPSDK_SERVER_PRINTING_LAST_CARD    = (DS_CPSDK_SERVER_ERROR += 0x0E);
var DS_CPSDK_SERVER_COPY_COUNT_ZERO       = (DS_CPSDK_SERVER_ERROR += 0x0F);
var DS_CPSDK_SERVER_PRINTER_OFFLINE       = (DS_CPSDK_SERVER_ERROR += 0x10);
var DS_CPSDK_SERVER_JOB_WAITING           = (DS_CPSDK_SERVER_ERROR += 0x11);
var DS_CPSDK_SERVER_JOB_SUSPENDED         = (DS_CPSDK_SERVER_ERROR += 0x12);
var DS_CPSDK_SERVER_PRINTER_IN_USE        = (DS_CPSDK_SERVER_ERROR += 0x13);
var DS_CPSDK_SERVER_PRINTER_QUEUE_FULL    = (DS_CPSDK_SERVER_ERROR += 0x14);